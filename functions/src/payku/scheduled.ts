import { createHash } from 'crypto';
import * as admin from 'firebase-admin';
import { onSchedule } from 'firebase-functions/v2/scheduler';

import { createPaykuClient } from './client';

if (!admin.apps.length) {
  admin.initializeApp();
}

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

function buildQueryString(params: Record<string, string | number | boolean | undefined>): string {
  const entries = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== false,
  );
  if (entries.length === 0) return '';
  return (
    '?' +
    entries
      .map(([k, v]) => {
        if (typeof v === 'boolean' && v) return `${encodeURIComponent(k)}=true`;
        return `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`;
      })
      .join('&')
  );
}

function hashDireccion(direccion: string): string {
  return createHash('sha256').update(direccion.trim().toLowerCase()).digest('hex').slice(0, 40);
}

// Runs daily at 6:00 AM Chile time (UTC-3 / UTC-4 depending on DST)
export const scheduledSyncCurrentYear = onSchedule(
  {
    schedule: '0 10 * * *', // 10:00 UTC = ~6-7 AM Chile
    timeZone: 'America/Santiago',
    timeoutSeconds: 540,
  },
  async () => {
    const year = new Date().getFullYear();
    const pub = process.env.PAYKU_PUBLIC_TOKEN;
    const priv = process.env.PAYKU_PRIVATE_TOKEN;
    if (!pub || !priv) throw new Error('PAYKU_PUBLIC_TOKEN and PAYKU_PRIVATE_TOKEN must be set');
    const paykuClient = createPaykuClient(pub, priv);
    const db = admin.firestore();

    // 1. Fetch all successful transactions for the current year
    const allTransactions: PaykuTransactionItem[] = [];
    let page = 1;

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

      if (data.status === 'failed') break;

      const transactions: PaykuTransactionItem[] = data.transaction || [];
      if (transactions.length === 0) break;

      allTransactions.push(...transactions);
      page++;
    }

    // 2. Group by direccion
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
    const historicCollection = db.collection('userHistoricPayments');
    let customersUpdated = 0;

    const entries = Array.from(grouped.entries());
    for (let i = 0; i < entries.length; i += 500) {
      const batch = db.batch();
      const chunk = entries.slice(i, i + 500);

      for (const [docId, data] of chunk) {
        const docRef = historicCollection.doc(docId);
        const existing = await docRef.get();
        const existingData = existing.exists ? existing.data() : null;

        const mergedPayments: Record<string, { createdAt: string; [k: string]: unknown }> = {
          ...((existingData?.payments as Record<string, { createdAt: string }>) || {}),
          ...data.payments,
        };

        const allDates = Object.values(mergedPayments).map((p) => p.createdAt);
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
      `scheduledSyncCurrentYear: year=${year}, transactions=${allTransactions.length}, ` +
      `customers=${customersUpdated}, skipped=${skipped}`,
    );
  },
);
