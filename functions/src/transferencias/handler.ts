import * as admin from 'firebase-admin';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { defineString } from 'firebase-functions/params';

import { createGmailClient, GmailClient, GmailMessage } from './gmail';
import { matchCliente, MatchResult } from './matcher';
import { applyTransferencia } from './applier';
import { parseBice } from './parser/bice';
import { parseLlm } from './parser/llm';
import { Email, ParseResult } from './parser/types';

if (!admin.apps.length) {
  admin.initializeApp();
}

const MINIMAX_API_KEY = defineString('MINIMAX_API_KEY', { default: '' });
const GMAIL_CLIENT_ID = defineString('GMAIL_CLIENT_ID', { default: '' });
const GMAIL_CLIENT_SECRET = defineString('GMAIL_CLIENT_SECRET', { default: '' });
const GMAIL_REFRESH_TOKEN = defineString('GMAIL_REFRESH_TOKEN', { default: '' });

const LABEL_TRANSFERENCIAS = 'ReviveHogar/Transferencias';
const LABEL_PROCESADAS = 'ReviveHogar/Procesadas';

interface InboxWrite {
  reason: string;
  parse?: ParseResult | null;
  candidates?: Array<{ clienteId: string; nombre: string; score: number; reason: string }>;
}

interface EmailRecord {
  messageId: string;
  threadId: string;
  from: string;
  subject: string;
  bodyPlain: string;
  bodyHtml?: string;
  internalDate: string;
}

interface LabelMutationClient extends GmailClient {
  modifyMessageLabels?(messageId: string, addLabelIds: string[], removeLabelIds: string[]): Promise<void>;
  _listAllLabels?(): Promise<Array<{ id: string; name: string }>>;
}

function gmailMessageToEmail(m: GmailMessage): EmailRecord {
  return {
    messageId: m.id,
    threadId: m.threadId,
    from: m.from,
    subject: m.subject,
    bodyPlain: m.bodyText,
    bodyHtml: m.bodyHtml,
    internalDate: m.date,
  };
}

async function buildLabelMap(gmail: GmailClient): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  const txId = await gmail.findLabelByName(LABEL_TRANSFERENCIAS);
  if (txId) map.set(LABEL_TRANSFERENCIAS, txId);
  const procId = await gmail.findLabelByName(LABEL_PROCESADAS);
  if (procId) map.set(LABEL_PROCESADAS, procId);
  return map;
}

async function listUnprocessedEmails(
  gmail: GmailClient,
  labelIdTransferencias: string,
  _labelIdProcesadas: string,
): Promise<EmailRecord[]> {
  const out: EmailRecord[] = [];
  let pageToken: string | undefined;
  do {
    const res = await gmail.listMessagesByLabel(labelIdTransferencias, 50, pageToken);
    for (const m of res.messages) {
      const full = await gmail.getMessage(m.id);
      out.push(gmailMessageToEmail(full));
    }
    pageToken = res.nextPageToken;
  } while (pageToken);
  return out;
}

async function markEmailProcessed(
  gmail: GmailClient,
  messageId: string,
  labelIdTransferencias: string,
  labelIdProcesadas: string,
): Promise<void> {
  // GmailClient from T8 doesn't expose label mutation methods.
  // If they exist (e.g., test-only), use them. Otherwise no-op.
  const extended = gmail as LabelMutationClient;
  if (typeof extended.modifyMessageLabels === 'function') {
    await extended.modifyMessageLabels(messageId, [labelIdProcesadas], [labelIdTransferencias]);
  } else {
    console.warn(`[markEmailProcessed] modifyMessageLabels not available; skipping label move for ${messageId}`);
  }
}

async function writeToInbox(
  db: FirebaseFirestore.Firestore,
  email: EmailRecord,
  data: InboxWrite,
): Promise<void> {
  await db.collection('transferenciasSinMatch').add({
    emailId: email.messageId,
    receivedAt: admin.firestore.FieldValue.serverTimestamp(),
    reason: data.reason,
    parse: data.parse ?? null,
    candidates: data.candidates ?? [],
    email: {
      from: email.from,
      subject: email.subject,
      bodyPlain: email.bodyPlain,
      bodyHtml: email.bodyHtml ?? null,
    },
    status: 'pending',
    resolvedBy: null,
    resolvedAt: null,
    resolvedAction: null,
    resolvedClienteId: null,
  });
}

async function logCriticalError(type: string, details: string): Promise<void> {
  await admin.firestore().collection('notificationLogs').add({
    type: 'transferencias_critical_error',
    errorType: type,
    details,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });
}

async function sendAdminAlert(message: string): Promise<void> {
  await admin.firestore().collection('notificationLogs').add({
    type: 'admin_alert',
    message,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  console.log('[transferenciasInbound] ADMIN ALERT:', message);
}

async function processSingleEmail(
  gmail: GmailClient,
  db: FirebaseFirestore.Firestore,
  email: EmailRecord,
  labelIdTransferencias: string,
  labelIdProcesadas: string,
  apiKey: string,
): Promise<'auto' | 'inbox' | 'error'> {
  try {
    const existing = await db.collection('transferenciaLog')
      .where('emailId', '==', email.messageId)
      .limit(1)
      .get();
    if (!existing.empty) {
      await markEmailProcessed(gmail, email.messageId, labelIdTransferencias, labelIdProcesadas);
      return 'auto';
    }

    const emailForParse: Email = {
      messageId: email.messageId,
      from: email.from,
      subject: email.subject,
      bodyPlain: email.bodyPlain,
      bodyHtml: email.bodyHtml,
      internalDate: email.internalDate,
    };

    let parse: ParseResult | null = parseBice(emailForParse);
    if (!parse) {
      parse = await parseLlm(emailForParse, apiKey);
    }

    if (!parse) {
      await writeToInbox(db, email, { reason: 'parse_failed' });
      await markEmailProcessed(gmail, email.messageId, labelIdTransferencias, labelIdProcesadas);
      return 'inbox';
    }

    const match: MatchResult = await matchCliente(parse, db);
    if (match.decision === 'auto' && match.candidates[0]) {
      try {
        await applyTransferencia(
          match.candidates[0].clienteId,
          parse,
          email.messageId,
          db,
        );
        await markEmailProcessed(gmail, email.messageId, labelIdTransferencias, labelIdProcesadas);
        return 'auto';
      } catch (applyErr) {
        const reason = String((applyErr as Error).message);
        const mappedReason =
          reason === 'no_monthly_amount' || reason === 'partial_amount'
            ? reason
            : 'apply_failed';
        await writeToInbox(db, email, {
          reason: mappedReason,
          parse,
          candidates: match.candidates.map((c) => ({
            clienteId: c.clienteId,
            nombre: c.cliente.nombre,
            score: c.score,
            reason: c.reason,
          })),
        });
        await markEmailProcessed(gmail, email.messageId, labelIdTransferencias, labelIdProcesadas);
        return 'inbox';
      }
    } else {
      await writeToInbox(db, email, {
        reason: match.reason,
        parse,
        candidates: match.candidates.map((c) => ({
          clienteId: c.clienteId,
          nombre: c.cliente.nombre,
          score: c.score,
          reason: c.reason,
        })),
      });
      await markEmailProcessed(gmail, email.messageId, labelIdTransferencias, labelIdProcesadas);
      return 'inbox';
    }
  } catch (err) {
    console.error(`[processSingleEmail] Error ${email.messageId}:`, err);
    return 'error';
  }
}

export const _testable = {
  processEmails: async (
    gmail: GmailClient,
    db: FirebaseFirestore.Firestore,
    apiKey: string,
  ): Promise<{ auto: number; inbox: number; errors: number }> => {
    const labelMap = await buildLabelMap(gmail);
    const labelIdTransferencias = labelMap.get(LABEL_TRANSFERENCIAS);
    const labelIdProcesadas = labelMap.get(LABEL_PROCESADAS);
    if (!labelIdTransferencias || !labelIdProcesadas) {
      throw new Error('Gmail labels not found');
    }
    const emails = await listUnprocessedEmails(gmail, labelIdTransferencias, labelIdProcesadas);
    if (emails.length === 0) return { auto: 0, inbox: 0, errors: 0 };

    let auto = 0;
    let inbox = 0;
    let errors = 0;
    for (const email of emails) {
      const outcome = await processSingleEmail(
        gmail,
        db,
        email,
        labelIdTransferencias,
        labelIdProcesadas,
        apiKey,
      );
      if (outcome === 'auto') auto++;
      else if (outcome === 'inbox') inbox++;
      else errors++;
    }
    return { auto, inbox, errors };
  },
};

export const transferenciasInbound = onSchedule(
  {
    schedule: 'every 5 minutes',
    timeZone: 'America/Santiago',
    timeoutSeconds: 300,
    memory: '512MiB',
  },
  async () => {
    const db = admin.firestore();
    const apiKey = MINIMAX_API_KEY.value();
    const clientId = GMAIL_CLIENT_ID.value();
    const clientSecret = GMAIL_CLIENT_SECRET.value();
    const refreshToken = GMAIL_REFRESH_TOKEN.value();

    if (!clientId || !clientSecret || !refreshToken) {
      await logCriticalError(
        'gmail_config_missing',
        'GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, or GMAIL_REFRESH_TOKEN unset',
      );
      return;
    }

    let gmail: GmailClient;
    try {
      gmail = createGmailClient({
        email: 'rosario@gmail.com',
        refreshToken,
        clientId,
        clientSecret,
      });
    } catch (err) {
      await logCriticalError('gmail_auth_failed', String(err));
      return;
    }

    try {
      const result = await _testable.processEmails(gmail, db, apiKey);
      const today = new Date().toISOString().split('T')[0];
      await db.collection('notificationLogs').add({
        type: 'transferencias_inbound_summary',
        date: today,
        processed: result.auto + result.inbox + result.errors,
        autoApplied: result.auto,
        sentToInbox: result.inbox,
        errors: result.errors,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      if (result.inbox > 5) {
        await sendAdminAlert(
          `${result.inbox} transferencias sin matchear, revisá /admin/transferencias`,
        );
      }
      console.log(
        `[transferenciasInbound] auto=${result.auto}, inbox=${result.inbox}, errors=${result.errors}`,
      );
    } catch (err) {
      await logCriticalError('processing_failed', String(err));
    }
  },
);