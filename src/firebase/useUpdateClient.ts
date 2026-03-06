import { useState } from 'react';

import { addMonths } from 'date-fns';
import { doc, updateDoc } from 'firebase/firestore';

import { getCurrentMonthKey } from '@/pages/admin/Pagos/utils/kpis';

import { db } from './config';

export function useUpdateClient() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Marks a client's current month payment as 'ok' in the pagos map
   * and updates fechaCorte to 1 month from now.
   */
  const markAsPaid = async (clientId: string) => {
    setLoading(true);
    setError(null);
    try {
      const monthKey = getCurrentMonthKey();
      const nextCutDate = addMonths(new Date(), 1);
      await updateDoc(doc(db, 'clientes', clientId), {
        [`pagos.${monthKey}`]: 'ok',
        fechaCorte: nextCutDate.toISOString(),
      });
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err));
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { markAsPaid, loading, error };
}
