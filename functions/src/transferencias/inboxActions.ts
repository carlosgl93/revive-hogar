import * as admin from 'firebase-admin';
import { onCall, HttpsError } from 'firebase-functions/v2/https';

import { verifyFirebaseToken } from '../middleware';
import { applyTransferencia } from './applier';
import { ParseResult } from './parser/types';

if (!admin.apps.length) {
  admin.initializeApp();
}

interface ResolveRequest {
  inboxId: string;
  action: 'manual_apply' | 'dismiss';
  clienteId?: string;
}

/**
 * Admin callable to resolve a transferenciasSinMatch entry.
 * - manual_apply: applies the saved parse to the chosen clienteId
 * - dismiss: marks as rejected without applying
 */
export const resolveTransferenciaInbox = onCall(
  { region: 'us-central1' },
  async (req) => {
    // Auth: require authenticated admin (role check enforced by firestore.rules)
    const authHeader = req.rawRequest.headers.authorization as string | undefined;
    try {
      await verifyFirebaseToken(authHeader);
    } catch {
      throw new HttpsError('unauthenticated', 'Must be authenticated');
    }

    const data = req.data as ResolveRequest;
    if (!data.inboxId || !data.action) {
      throw new HttpsError('invalid-argument', 'inboxId and action are required');
    }
    if (data.action === 'manual_apply' && !data.clienteId) {
      throw new HttpsError('invalid-argument', 'clienteId required for manual_apply');
    }

    const db = admin.firestore();
    const inboxRef = db.collection('transferenciasSinMatch').doc(data.inboxId);
    const inboxSnap = await inboxRef.get();
    if (!inboxSnap.exists) {
      throw new HttpsError('not-found', 'inbox entry not found');
    }
    const inboxData = inboxSnap.data();
    if (inboxData?.status !== 'pending') {
      throw new HttpsError('failed-precondition', `already ${inboxData?.status}`);
    }

    if (data.action === 'dismiss') {
      await inboxRef.update({
        status: 'rejected',
        resolvedBy: req.auth?.uid ?? null,
        resolvedAt: admin.firestore.FieldValue.serverTimestamp(),
        resolvedAction: 'dismiss',
      });
      return { ok: true, action: 'dismissed' };
    }

    // manual_apply
    const parse = inboxData?.parse as ParseResult | undefined;
    if (!parse || !parse.monto) {
      throw new HttpsError('failed-precondition', 'no parse data to apply');
    }

    try {
      const result = await applyTransferencia(
        data.clienteId!,
        parse,
        inboxData.emailId,
        db,
      );
      await inboxRef.update({
        status: 'confirmed',
        resolvedBy: req.auth?.uid ?? null,
        resolvedAt: admin.firestore.FieldValue.serverTimestamp(),
        resolvedAction: 'manual_apply',
        resolvedClienteId: data.clienteId,
      });
      return { ok: true, action: 'applied', mesesAplicados: result.mesesAplicados };
    } catch (err) {
      await inboxRef.update({
        status: 'expired',
        resolvedBy: req.auth?.uid ?? null,
        resolvedAt: admin.firestore.FieldValue.serverTimestamp(),
        resolvedAction: 'manual_apply',
        resolvedClienteId: data.clienteId,
      });
      throw new HttpsError('internal', `apply failed: ${(err as Error).message}`);
    }
  },
);