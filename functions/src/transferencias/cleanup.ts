import * as admin from 'firebase-admin';
import { onSchedule } from 'firebase-functions/v2/scheduler';

if (!admin.apps.length) {
  admin.initializeApp();
}

const NINETY_DAYS_MS = 90 * 24 * 60 * 60 * 1000;

/**
 * Runs at 3:00 AM Chile time on the 1st of each month.
 * Deletes transferenciasSinMatch entries that were resolved (>90d ago).
 */
export const transferenciasCleanup = onSchedule(
  {
    schedule: '0 3 1 * *',
    timeZone: 'America/Santiago',
    timeoutSeconds: 120,
  },
  async () => {
    const db = admin.firestore();
    const cutoff = new Date(Date.now() - NINETY_DAYS_MS);
    const snap = await db.collection('transferenciasSinMatch')
      .where('status', 'in', ['confirmed', 'rejected', 'expired'])
      .where('resolvedAt', '<', cutoff)
      .get();

    if (snap.empty) {
      console.log('[transferenciasCleanup] No entries to delete');
      return;
    }

    const batch = db.batch();
    snap.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
    console.log(`[transferenciasCleanup] Deleted ${snap.size} old entries`);
  },
);
