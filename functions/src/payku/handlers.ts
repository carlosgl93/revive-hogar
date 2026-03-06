import cors from 'cors';
import * as admin from 'firebase-admin';
import { onRequest } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';

import { verifyFirebaseToken } from '../middleware';
import { createPaykuClient } from './client';

const corsHandler = cors({ origin: true });

const PAYKU_PUBLIC_TOKEN = defineSecret('PAYKU_PUBLIC_TOKEN');
const PAYKU_PRIVATE_TOKEN = defineSecret('PAYKU_PRIVATE_TOKEN');

if (!admin.apps.length) {
  admin.initializeApp();
}

/**
 * Helper: build query string from params object for HMAC signing.
 * Axios config.params are appended AFTER the interceptor runs,
 * so we must include them in config.url for correct HMAC signing.
 */
function buildQueryString(params: Record<string, string | number | boolean | undefined>): string {
  const entries = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== false,
  );
  if (entries.length === 0) return '';
  return (
    '?' +
    entries
      .map(([k, v]) => {
        // Status filters: active=true, suspended=true, etc.
        if (typeof v === 'boolean' && v) return `${encodeURIComponent(k)}=true`;
        return `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`;
      })
      .join('&')
  );
}

// ─── Existing: List Subscriptions (V2) ───

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

// ─── Existing: Get Subscription Status ───

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

// ─── Clients: List (paginated) ───

export const listPaykuClients = onRequest(
  { secrets: [PAYKU_PUBLIC_TOKEN, PAYKU_PRIVATE_TOKEN] },
  (req, res) => {
    corsHandler(req, res, async () => {
      if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
      }
      try {
        await verifyFirebaseToken(req.headers.authorization);
      } catch {
        res.status(401).json({ error: 'Unauthenticated' });
        return;
      }

      const client = createPaykuClient(PAYKU_PUBLIC_TOKEN.value(), PAYKU_PRIVATE_TOKEN.value());
      const page = req.query.page as string | undefined;
      const perPage = req.query.per_page as string | undefined;

      const qs = buildQueryString({
        page: page ? Number(page) : undefined,
        per_page: perPage ? Number(perPage) : undefined,
      });

      try {
        const response = await client.get(`/suclient/customers${qs}`);
        res.json(response.data);
      } catch (error) {
        console.error('Failed to list Payku clients:', error);
        res.status(500).json({ error: 'Failed to list clients from Payku' });
      }
    });
  },
);

// ─── Clients: Get by ID or email ───

export const getPaykuClient = onRequest(
  { secrets: [PAYKU_PUBLIC_TOKEN, PAYKU_PRIVATE_TOKEN] },
  (req, res) => {
    corsHandler(req, res, async () => {
      if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
      }
      try {
        await verifyFirebaseToken(req.headers.authorization);
      } catch {
        res.status(401).json({ error: 'Unauthenticated' });
        return;
      }

      const identifier = req.query.identifier as string | undefined;
      if (!identifier) {
        res.status(400).json({ error: 'identifier query param is required' });
        return;
      }

      const client = createPaykuClient(PAYKU_PUBLIC_TOKEN.value(), PAYKU_PRIVATE_TOKEN.value());

      try {
        const response = await client.get(`/suclient/${identifier}`);
        res.json(response.data);
      } catch (error) {
        console.error('Failed to get Payku client:', error);
        res.status(500).json({ error: 'Failed to get client from Payku' });
      }
    });
  },
);

// ─── Clients: Create ───

export const createPaykuClientFn = onRequest(
  { secrets: [PAYKU_PUBLIC_TOKEN, PAYKU_PRIVATE_TOKEN] },
  (req, res) => {
    corsHandler(req, res, async () => {
      if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
      }
      try {
        await verifyFirebaseToken(req.headers.authorization);
      } catch {
        res.status(401).json({ error: 'Unauthenticated' });
        return;
      }

      if (!req.body.email || !req.body.name) {
        res.status(400).json({ error: 'email and name are required' });
        return;
      }

      const client = createPaykuClient(PAYKU_PUBLIC_TOKEN.value(), PAYKU_PRIVATE_TOKEN.value());

      try {
        const response = await client.post('/suclient', req.body);
        res.json(response.data);
      } catch (error) {
        console.error('Failed to create Payku client:', error);
        res.status(500).json({ error: 'Failed to create client in Payku' });
      }
    });
  },
);

// ─── Clients: Update ───

export const updatePaykuClient = onRequest(
  { secrets: [PAYKU_PUBLIC_TOKEN, PAYKU_PRIVATE_TOKEN] },
  (req, res) => {
    corsHandler(req, res, async () => {
      if (req.method !== 'PUT') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
      }
      try {
        await verifyFirebaseToken(req.headers.authorization);
      } catch {
        res.status(401).json({ error: 'Unauthenticated' });
        return;
      }

      const identifier = req.query.identifier as string | undefined;
      if (!identifier) {
        res.status(400).json({ error: 'identifier query param is required' });
        return;
      }

      const client = createPaykuClient(PAYKU_PUBLIC_TOKEN.value(), PAYKU_PRIVATE_TOKEN.value());

      try {
        const response = await client.put(`/suclient/${identifier}`, req.body);
        res.json(response.data);
      } catch (error) {
        console.error('Failed to update Payku client:', error);
        res.status(500).json({ error: 'Failed to update client in Payku' });
      }
    });
  },
);

// ─── Clients: Delete ───

export const deletePaykuClient = onRequest(
  { secrets: [PAYKU_PUBLIC_TOKEN, PAYKU_PRIVATE_TOKEN] },
  (req, res) => {
    corsHandler(req, res, async () => {
      if (req.method !== 'DELETE') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
      }
      try {
        await verifyFirebaseToken(req.headers.authorization);
      } catch {
        res.status(401).json({ error: 'Unauthenticated' });
        return;
      }

      const identifier = req.query.identifier as string | undefined;
      if (!identifier) {
        res.status(400).json({ error: 'identifier query param is required' });
        return;
      }

      const client = createPaykuClient(PAYKU_PUBLIC_TOKEN.value(), PAYKU_PRIVATE_TOKEN.value());

      try {
        const response = await client.delete(`/suclient/${identifier}`);
        res.json(response.data);
      } catch (error) {
        console.error('Failed to delete Payku client:', error);
        res.status(500).json({ error: 'Failed to delete client from Payku' });
      }
    });
  },
);

// ─── Subscriptions: List V3 (with date + status filters + pagination) ───

export const listPaykuSubscriptionsV3 = onRequest(
  { secrets: [PAYKU_PUBLIC_TOKEN, PAYKU_PRIVATE_TOKEN] },
  (req, res) => {
    corsHandler(req, res, async () => {
      if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
      }
      try {
        await verifyFirebaseToken(req.headers.authorization);
      } catch {
        res.status(401).json({ error: 'Unauthenticated' });
        return;
      }

      const client = createPaykuClient(PAYKU_PUBLIC_TOKEN.value(), PAYKU_PRIVATE_TOKEN.value());

      const qs = buildQueryString({
        date_init: req.query.date_init as string | undefined,
        date_end: req.query.date_end as string | undefined,
        page: req.query.page as string | undefined,
        per_page: req.query.per_page as string | undefined,
        active: req.query.active === 'true' ? true : undefined,
        suspended: req.query.suspended === 'true' ? true : undefined,
        register: req.query.register === 'true' ? true : undefined,
        finish: req.query.finish === 'true' ? true : undefined,
        cancel: req.query.cancel === 'true' ? true : undefined,
      });

      try {
        const response = await client.get(`/sususcriptionv3${qs}`);
        res.json(response.data);
      } catch (error) {
        console.error('Failed to list Payku subscriptions V3:', error);
        res.status(500).json({ error: 'Failed to fetch subscriptions from Payku' });
      }
    });
  },
);

// ─── Subscriptions: Create ───

export const createPaykuSubscription = onRequest(
  { secrets: [PAYKU_PUBLIC_TOKEN, PAYKU_PRIVATE_TOKEN] },
  (req, res) => {
    corsHandler(req, res, async () => {
      if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
      }
      try {
        await verifyFirebaseToken(req.headers.authorization);
      } catch {
        res.status(401).json({ error: 'Unauthenticated' });
        return;
      }

      const { plan, client: clientId } = req.body;
      if (!plan || !clientId) {
        res.status(400).json({ error: 'plan and client are required' });
        return;
      }

      const client = createPaykuClient(PAYKU_PUBLIC_TOKEN.value(), PAYKU_PRIVATE_TOKEN.value());

      try {
        const response = await client.post('/sususcription', {
          plan,
          client: clientId,
        });
        res.json(response.data);
      } catch (error) {
        console.error('Failed to create Payku subscription:', error);
        res.status(500).json({ error: 'Failed to create subscription in Payku' });
      }
    });
  },
);

// ─── Subscriptions: Get single ───

export const getPaykuSubscription = onRequest(
  { secrets: [PAYKU_PUBLIC_TOKEN, PAYKU_PRIVATE_TOKEN] },
  (req, res) => {
    corsHandler(req, res, async () => {
      if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
      }
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
        console.error('Failed to get Payku subscription:', error);
        res.status(500).json({ error: 'Failed to get subscription from Payku' });
      }
    });
  },
);

// ─── Subscriptions: Delete ───

export const deletePaykuSubscription = onRequest(
  { secrets: [PAYKU_PUBLIC_TOKEN, PAYKU_PRIVATE_TOKEN] },
  (req, res) => {
    corsHandler(req, res, async () => {
      if (req.method !== 'DELETE') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
      }
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
        const response = await client.delete(`/sususcription/${subscriptionId}`);
        res.json(response.data);
      } catch (error) {
        console.error('Failed to delete Payku subscription:', error);
        res.status(500).json({ error: 'Failed to delete subscription from Payku' });
      }
    });
  },
);

// ─── Card: Affiliate new card to subscription ───

export const affiliatePaykuCard = onRequest(
  { secrets: [PAYKU_PUBLIC_TOKEN, PAYKU_PRIVATE_TOKEN] },
  (req, res) => {
    corsHandler(req, res, async () => {
      if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
      }
      try {
        await verifyFirebaseToken(req.headers.authorization);
      } catch {
        res.status(401).json({ error: 'Unauthenticated' });
        return;
      }

      const { subscriptionId } = req.body;
      if (!subscriptionId) {
        res.status(400).json({ error: 'subscriptionId is required in body' });
        return;
      }

      const client = createPaykuClient(PAYKU_PUBLIC_TOKEN.value(), PAYKU_PRIVATE_TOKEN.value());

      try {
        const response = await client.post('/suinscriptionscards', {
          suscription: subscriptionId,
        });
        res.json(response.data);
      } catch (error) {
        console.error('Failed to affiliate Payku card:', error);
        res.status(500).json({ error: 'Failed to affiliate card in Payku' });
      }
    });
  },
);
