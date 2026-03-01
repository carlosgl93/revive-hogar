import cors from 'cors';
import * as admin from 'firebase-admin';
import { onRequest } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';

import { createPaykuClient } from './client';

const corsHandler = cors({ origin: true });

const PAYKU_PUBLIC_TOKEN = defineSecret('PAYKU_PUBLIC_TOKEN');
const PAYKU_PRIVATE_TOKEN = defineSecret('PAYKU_PRIVATE_TOKEN');

if (!admin.apps.length) {
  admin.initializeApp();
}

async function verifyFirebaseToken(authHeader: string | undefined): Promise<void> {
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('Missing or invalid Authorization header');
  }
  const token = authHeader.split('Bearer ')[1];
  await admin.auth().verifyIdToken(token);
}

export const listPaykuSubscriptions = onRequest(
  { secrets: [PAYKU_PUBLIC_TOKEN, PAYKU_PRIVATE_TOKEN] },
  (req, res) => {
    corsHandler(req, res, async () => {
      try {
        await verifyFirebaseToken(req.headers.authorization);
      } catch {
        res.status(401).json({ error: 'Unauthenticated' });
        return;
      }

      const client = createPaykuClient(PAYKU_PUBLIC_TOKEN.value(), PAYKU_PRIVATE_TOKEN.value());

      try {
        const response = await client.get('/sususcription');
        res.json(response.data);
      } catch (error) {
        console.error('Failed to fetch Payku subscriptions:', error);
        res.status(500).json({ error: 'Failed to fetch subscriptions from Payku' });
      }
    });
  },
);

export const getPaykuSubscriptionStatus = onRequest(
  { secrets: [PAYKU_PUBLIC_TOKEN, PAYKU_PRIVATE_TOKEN] },
  (req, res) => {
    corsHandler(req, res, async () => {
      try {
        await verifyFirebaseToken(req.headers.authorization);
      } catch {
        res.status(401).json({ error: 'Unauthenticated' });
        return;
      }

      const subscriptionId = req.query.subscriptionId as string | undefined;
      if (!subscriptionId) {
        res.status(400).json({ error: 'subscriptionId query param is required' });
        return;
      }

      const client = createPaykuClient(PAYKU_PUBLIC_TOKEN.value(), PAYKU_PRIVATE_TOKEN.value());

      try {
        const response = await client.get(`/sususcription/${subscriptionId}`);
        res.json(response.data);
      } catch (error) {
        console.error('Failed to fetch Payku subscription status:', error);
        res.status(500).json({ error: 'Failed to fetch subscription status' });
      }
    });
  },
);
