import cors from 'cors';
import { createHash } from 'crypto';
import * as admin from 'firebase-admin';
import { onRequest } from 'firebase-functions/v2/https';

import { verifyFirebaseToken } from '../middleware';
import { createPaykuClient } from './client';

const corsHandler = cors({ origin: true });

function buildPaykuClient() {
  const pub = process.env.PAYKU_PUBLIC_TOKEN;
  const priv = process.env.PAYKU_PRIVATE_TOKEN;
  if (!pub || !priv) throw new Error('PAYKU_PUBLIC_TOKEN and PAYKU_PRIVATE_TOKEN must be set');
  return createPaykuClient(pub, priv);
}

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
  {},
  (req, res) => {
    corsHandler(req, res, async () => {
      try {
        await verifyFirebaseToken(req.headers.authorization);
      } catch {
        res.status(401).json({ error: 'Unauthenticated' });
        return;
      }

      const client = buildPaykuClient();

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
  {},
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

      const client = buildPaykuClient();

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
  {},
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

      const client = buildPaykuClient();
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
  {},
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

      const identifier = req.query.id as string | undefined;
      if (!identifier) {
        res.status(400).json({ error: 'id query param is required' });
        return;
      }

      const client = buildPaykuClient();

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
  {},
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

      const client = buildPaykuClient();

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
  {},
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

      const client = buildPaykuClient();

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
  {},
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

      const client = buildPaykuClient();

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
  {},
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

      const client = buildPaykuClient();

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
  {},
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

      const client = buildPaykuClient();

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
  {},
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

      const client = buildPaykuClient();

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
  {},
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

      const client = buildPaykuClient();

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
  {},
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

      const client = buildPaykuClient();

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

// ─── Transactions: Create a one-time payment link for a client ───

export const createPaykuTransactionForClient = onRequest(
  {},
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

      const { clienteId, email, amount, subject } = req.body;
      if (!clienteId || !amount) {
        res.status(400).json({ error: 'clienteId and amount are required' });
        return;
      }

      const db = admin.firestore();

      try {
        // Look up client to get email if not provided
        let clientEmail = email;
        if (!clientEmail) {
          const clientDoc = await db.collection('clientes').doc(clienteId).get();
          if (clientDoc.exists) {
            clientEmail = clientDoc.data()?.correo || '';
          }
        }

        if (!clientEmail) {
          res.status(400).json({ error: 'Client email not found' });
          return;
        }

        const orderId = `ret-${Date.now()}`;
        const paykuClient = buildPaykuClient();

        const response = await paykuClient.post('/transaction', {
          email: clientEmail,
          order: orderId,
          subject: subject || 'Pago retiro reciclaje - Revive Hogar',
          amount: Math.round(amount),
          currency: 'CLP',
          payment: 99,
          urlreturn: 'https://revivehogar.cl/pago-completado',
          urlnotify: 'https://webhookpaymentcharge-gqzgwmmqkq-uc.a.run.app',
          additional_parameters: {
            clienteId,
          },
        });

        if (response.data.status === 'failed' || !response.data.url) {
          console.error('Payku returned error:', response.data);
          res.status(422).json({
            error: response.data.message_error || 'Payku rejected the transaction',
            details: response.data,
          });
          return;
        }

        // Log the transaction creation
        await db.collection('transactionLogs').add({
          type: 'transaction_created',
          clienteId,
          email: clientEmail,
          amount,
          orderId,
          paykuId: response.data.id ?? null,
          paykuUrl: response.data.url ?? null,
          createdAt: new Date().toISOString(),
        });

        res.json(response.data);
      } catch (error) {
        console.error('Failed to create Payku transaction:', error);
        res.status(500).json({ error: 'Failed to create transaction in Payku' });
      }
    });
  },
);

// ─── Transactions: Sync historic payments to Firestore ───

interface PaykuTransactionItem {
  id: string;
  status: string;
  created_at: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  amount: number;
  order: string;
  subject: string;
  payment: {
    start: string;
    end: string;
    media: string;
    transaction_id: string;
    payment_key: string;
    deposit_date: string;
    additional_parameters: Record<string, string | null>;
    [key: string]: unknown;
  };
  subscriptions?: {
    id: string;
    status: string;
  };
  [key: string]: unknown;
}

function hashDireccion(direccion: string): string {
  return createHash('sha256').update(direccion.trim().toLowerCase()).digest('hex').slice(0, 40);
}

export const syncHistoricPayments = onRequest(
  { timeoutSeconds: 540 },
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

      const year = Number(req.query.year);
      if (!year || year < 2018 || year > 2100) {
        res.status(400).json({ error: 'year query param is required (e.g. ?year=2025)' });
        return;
      }

      const paykuClient = buildPaykuClient();
      const db = admin.firestore();

      // 1. Fetch all successful transactions for the year, paginating
      const allTransactions: PaykuTransactionItem[] = [];
      let page = 1;

      try {
        while (true) {
          const qs = buildQueryString({
            date_init: `${year}-01-01`,
            date_end: `${year}-12-31`,
            per_page: 100,
            success: true,
            page,
          });

          const response = await paykuClient.get(`/transaction${qs}`);
          const data = response.data;

          // Stop signal: Payku returns { status: "failed", message_error: "..." }
          if (data.status === 'failed') {
            break;
          }

          const transactions: PaykuTransactionItem[] = data.transaction || [];
          if (transactions.length === 0) {
            break;
          }

          allTransactions.push(...transactions);
          page++;
        }
      } catch (error) {
        console.error('Failed to fetch Payku transactions:', error);
        res.status(500).json({ error: 'Failed to fetch transactions from Payku' });
        return;
      }

      // 2. Group by additional_parameters.direccion
      const grouped = new Map<string, {
        direccion: string;
        email: string;
        fullName: string | null;
        phone: string | null;
        payments: Record<string, {
          amount: number;
          createdAt: string;
          subject: string;
          order: string;
          type: 'subscription' | 'boton_de_pago';
          subscriptionId: string | null;
          depositDate: string;
          media: string;
          email: string;
        }>;
      }>();

      let skipped = 0;
      for (const tx of allTransactions) {
        const direccion = tx.payment?.additional_parameters?.direccion?.trim();
        if (!direccion) {
          skipped++;
          continue;
        }

        const key = hashDireccion(direccion);
        if (!grouped.has(key)) {
          grouped.set(key, {
            direccion,
            email: tx.email || '',
            fullName: tx.full_name || null,
            phone: tx.phone || null,
            payments: {},
          });
        }

        const group = grouped.get(key)!;
        // Update contact info with latest
        if (tx.email) group.email = tx.email;
        if (tx.full_name) group.fullName = tx.full_name;
        if (tx.phone) group.phone = tx.phone;

        const hasSubscription = !!tx.subscriptions;
        group.payments[tx.id] = {
          amount: tx.amount,
          createdAt: tx.created_at,
          subject: tx.subject,
          order: tx.order,
          type: hasSubscription ? 'subscription' : 'boton_de_pago',
          subscriptionId: hasSubscription ? tx.subscriptions!.id : null,
          depositDate: tx.payment?.deposit_date || '',
          media: tx.payment?.media || '',
          email: tx.email || '',
        };
      }

      // 3. Batch write to Firestore
      const collection = db.collection('userHistoricPayments');
      let customersUpdated = 0;

      const entries = Array.from(grouped.entries());
      // Process in batches of 500 (Firestore batch limit)
      for (let i = 0; i < entries.length; i += 500) {
        const batch = db.batch();
        const chunk = entries.slice(i, i + 500);

        for (const [docId, data] of chunk) {
          const docRef = collection.doc(docId);

          // Read existing doc to merge payments
          const existing = await docRef.get();
          const existingData = existing.exists ? existing.data() : null;

          const mergedPayments: Record<string, { createdAt: string; [k: string]: unknown }> = {
            ...((existingData?.payments as Record<string, { createdAt: string }>) || {}),
            ...data.payments,
          };

          // Compute lastPaymentDate from all payments
          const allDates = Object.values(mergedPayments).map(
            (p: { createdAt: string }) => p.createdAt,
          );
          allDates.sort();
          const lastPaymentDate = allDates[allDates.length - 1] || '';

          const existingSyncedYears: number[] = existingData?.syncedYears || [];
          const syncedYears = existingSyncedYears.includes(year)
            ? existingSyncedYears
            : [...existingSyncedYears, year].sort();

          batch.set(docRef, {
            direccion: data.direccion,
            email: data.email,
            fullName: data.fullName,
            phone: data.phone,
            lastPaymentDate,
            totalPayments: Object.keys(mergedPayments).length,
            syncedYears,
            payments: mergedPayments,
          });

          customersUpdated++;
        }

        await batch.commit();
      }

      console.log(
        `syncHistoricPayments: year=${year}, transactions=${allTransactions.length}, ` +
        `customers=${customersUpdated}, skipped=${skipped}`,
      );

      res.json({
        customersUpdated,
        transactionsProcessed: allTransactions.length,
        year,
        skipped,
      });
    });
  },
);
