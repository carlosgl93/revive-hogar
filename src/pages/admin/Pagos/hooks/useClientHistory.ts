import { useCallback, useState } from 'react';

import { collection, getDocs, query, where } from 'firebase/firestore';

import { db } from '@/firebase/config';
import { Cliente } from '@/types/models';
import { UserHistoricPayments } from '@/types/payku';

export type HistoricRow = UserHistoricPayments & { id: string; isPending: boolean };

const PENDING_THRESHOLD_DAYS = 30;

export function useClientHistory() {
  const [historyData, setHistoryData] = useState<HistoricRow | null>(null);
  const [loading, setLoading] = useState(false);

  const lookupHistory = useCallback(async (client: Cliente) => {
    setLoading(true);
    setHistoryData(null);
    try {
      const q = query(collection(db, 'userHistoricPayments'), where('email', '==', client.correo));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setHistoryData(null);
        return null;
      }

      const doc = snapshot.docs[0];
      const data = doc.data() as Omit<UserHistoricPayments, 'id'>;
      const now = new Date();
      const thresholdDate = new Date(now.getTime() - PENDING_THRESHOLD_DAYS * 24 * 60 * 60 * 1000);
      const lastDate = data.lastPaymentDate ? new Date(data.lastPaymentDate) : null;
      const gapDetected = !lastDate || lastDate < thresholdDate;

      const row: HistoricRow = {
        id: doc.id,
        ...data,
        isPending: gapDetected && !data.manuallySettled,
      };

      setHistoryData(row);
      return row;
    } catch (err) {
      console.error('Failed to lookup client history:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearHistory = useCallback(() => setHistoryData(null), []);

  return { historyData, loading, lookupHistory, clearHistory };
}
