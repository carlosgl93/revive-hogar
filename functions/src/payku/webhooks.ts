import * as admin from 'firebase-admin';
import { onRequest } from 'firebase-functions/v2/https';

import { PaykuSubscriptionWebhook, PaykuPaymentWebhook } from './types';

if (!admin.apps.length) {
  admin.initializeApp();
}

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
// Payku POSTs { id, status } when a subscription becomes active

export const webhookSubscriptionActivation = onRequest(async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { id, status } = req.body as PaykuSubscriptionWebhook;

  if (!id) {
    res.status(400).json({ error: 'Missing subscription id' });
    return;
  }

  const db = admin.firestore();

  try {
    // Find client by paykuSubscriptionId
    let snapshot = await db
      .collection('clientes')
      .where('paykuSubscriptionId', '==', id)
      .limit(1)
      .get();

    // Fallback: try matching by email from the Payku client field
    if (snapshot.empty && req.body.client) {
      const clientEmail = typeof req.body.client === 'string' ? req.body.client : req.body.client.email;
      if (clientEmail) {
        snapshot = await db
          .collection('clientes')
          .where('correo', '==', clientEmail)
          .limit(1)
          .get();

        // Auto-link the subscription ID so future lookups are direct
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

    // Log the webhook event
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
});

// ─── Webhook: Payment Charge ───
// Payku POSTs { transaction_id, verification_key, order, status, subscriptions: { id, client } }

export const webhookPaymentCharge = onRequest(async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const payload = req.body as PaykuPaymentWebhook;

  if (!payload.subscriptions?.id) {
    res.status(400).json({ error: 'Missing subscription id' });
    return;
  }

  const db = admin.firestore();
  const now = new Date();
  const monthKey = getSpanishMonthKey(now);

  try {
    // Deduplicate: check if this transaction was already processed
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

    // Find client by paykuSubscriptionId
    let snapshot = await db
      .collection('clientes')
      .where('paykuSubscriptionId', '==', payload.subscriptions.id)
      .limit(1)
      .get();

    // Fallback: try matching by Payku client email
    if (snapshot.empty && payload.subscriptions.client) {
      // payload.subscriptions.client could be a Payku client ID or email
      const clientIdentifier = payload.subscriptions.client;
      // Try as email first (contains @)
      if (clientIdentifier.includes('@')) {
        snapshot = await db
          .collection('clientes')
          .where('correo', '==', clientIdentifier)
          .limit(1)
          .get();
      }

      // Auto-link the subscription ID so future lookups are direct
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
        // Payment successful: mark month as 'ok', update cut date
        const nextCutDate = addMonths(now, 1);
        await clientDoc.ref.update({
          [`pagos.${monthKey}`]: 'ok',
          fechaCorte: nextCutDate.toISOString(),
        });
      } else {
        // Payment failed: mark month as 'atrasado'
        await clientDoc.ref.update({
          [`pagos.${monthKey}`]: 'atrasado',
        });
      }
    }

    // Log the webhook event
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
});
