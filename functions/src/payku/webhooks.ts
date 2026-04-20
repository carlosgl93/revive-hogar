import * as admin from 'firebase-admin';
import { Request, Response } from 'express';

import { PaykuSubscriptionWebhook, PaykuPaymentWebhook } from './types';

const SPANISH_MONTHS = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];

function getSpanishMonthKey(date: Date): string {
  const month = SPANISH_MONTHS[date.getMonth()];
  const year = date.getFullYear();
  return `${month} ${year}`;
}

function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

// ─── Webhook: Subscription Activation ───

export async function webhookSubscriptionActivation(req: Request, res: Response): Promise<void> {
  const { id, status } = req.body as PaykuSubscriptionWebhook;

  if (!id) {
    res.status(400).json({ error: 'Missing subscription id' });
    return;
  }

  const db = admin.firestore();

  try {
    let snapshot = await db
      .collection('clientes')
      .where('paykuSubscriptionId', '==', id)
      .limit(1)
      .get();

    if (snapshot.empty && req.body.client) {
      const clientEmail = typeof req.body.client === 'string' ? req.body.client : req.body.client.email;
      if (clientEmail) {
        snapshot = await db
          .collection('clientes')
          .where('correo', '==', clientEmail)
          .limit(1)
          .get();

        if (!snapshot.empty) {
          await snapshot.docs[0].ref.update({ paykuSubscriptionId: id });
        }
      }
    }

    if (!snapshot.empty) {
      const clientDoc = snapshot.docs[0];
      await clientDoc.ref.update({
        activo: status === 'active',
      });
    }

    await db.collection('webhookLogs').add({
      type: 'subscription_activation',
      subscriptionId: id,
      clientId: !snapshot.empty ? snapshot.docs[0].id : null,
      matchedBy: !snapshot.empty
        ? (snapshot.docs[0].data().paykuSubscriptionId === id ? 'subscriptionId' : 'email')
        : 'none',
      status,
      receivedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook subscription activation error:', error);
    res.status(500).json({ error: 'Internal error processing webhook' });
  }
}

// ─── Webhook: Payment Charge ───

export async function webhookPaymentCharge(req: Request, res: Response): Promise<void> {
  const payload = req.body as PaykuPaymentWebhook;

  if (!payload.subscriptions?.id) {
    res.status(400).json({ error: 'Missing subscription id' });
    return;
  }

  const db = admin.firestore();
  const now = new Date();
  const monthKey = getSpanishMonthKey(now);

  try {
    const existingLog = await db
      .collection('webhookLogs')
      .where('transactionId', '==', payload.transaction_id)
      .where('type', '==', 'payment_charge')
      .limit(1)
      .get();

    if (!existingLog.empty) {
      res.status(200).json({ received: true, deduplicated: true });
      return;
    }

    let snapshot = await db
      .collection('clientes')
      .where('paykuSubscriptionId', '==', payload.subscriptions.id)
      .limit(1)
      .get();

    if (snapshot.empty && payload.subscriptions.client) {
      const clientIdentifier = payload.subscriptions.client;
      if (clientIdentifier.includes('@')) {
        snapshot = await db
          .collection('clientes')
          .where('correo', '==', clientIdentifier)
          .limit(1)
          .get();
      }

      if (!snapshot.empty) {
        await snapshot.docs[0].ref.update({ paykuSubscriptionId: payload.subscriptions.id });
      }
    }

    const matchedBy = !snapshot.empty
      ? (snapshot.docs[0].data().paykuSubscriptionId === payload.subscriptions.id ? 'subscriptionId' : 'email')
      : 'none';

    if (!snapshot.empty) {
      const clientDoc = snapshot.docs[0];

      if (payload.status === 'success') {
        const nextCutDate = addMonths(now, 1);
        await clientDoc.ref.update({
          [`pagos.${monthKey}`]: 'ok',
          fechaCorte: nextCutDate.toISOString(),
        });
      } else {
        await clientDoc.ref.update({
          [`pagos.${monthKey}`]: 'atrasado',
        });
      }
    }

    await db.collection('webhookLogs').add({
      type: 'payment_charge',
      subscriptionId: payload.subscriptions.id,
      clientId: payload.subscriptions.client,
      transactionId: payload.transaction_id,
      status: payload.status,
      order: payload.order,
      matchedBy,
      receivedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook payment charge error:', error);
    res.status(500).json({ error: 'Internal error processing webhook' });
  }
}
