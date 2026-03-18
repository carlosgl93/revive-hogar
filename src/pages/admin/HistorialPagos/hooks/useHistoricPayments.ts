import { useCallback, useMemo, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

import { getAuth } from 'firebase/auth';
import { collection, doc, orderBy, query, updateDoc } from 'firebase/firestore';

import { db } from '@/firebase/config';
import { UserHistoricPayments } from '@/types/payku';

const PENDING_THRESHOLD_DAYS = 30;

export type PaymentFilter = 'pendientes' | 'todos';

export function useHistoricPayments() {
  const [filter, setFilter] = useState<PaymentFilter>('pendientes');
  const [searchQuery, setSearchQuery] = useState('');

  const [snapshot, loading, error] = useCollection(
    query(collection(db, 'userHistoricPayments'), orderBy('lastPaymentDate', 'desc')),
  );

  const customers = useMemo<(UserHistoricPayments & { id: string; isPending: boolean })[]>(() => {
    if (!snapshot) return [];

    const now = new Date();
    const thresholdDate = new Date(now.getTime() - PENDING_THRESHOLD_DAYS * 24 * 60 * 60 * 1000);

    return snapshot.docs.map((d) => {
      const data = d.data() as Omit<UserHistoricPayments, 'id'>;
      const lastDate = data.lastPaymentDate ? new Date(data.lastPaymentDate) : null;
      const gapDetected = !lastDate || lastDate < thresholdDate;
      const isPending = gapDetected && !data.manuallySettled;

      return {
        id: d.id,
        ...data,
        isPending,
      };
    });
  }, [snapshot]);

  const filteredCustomers = useMemo(() => {
    let result = filter === 'pendientes' ? customers.filter((c) => c.isPending) : customers;

    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (c) =>
          c.direccion.toLowerCase().includes(q) ||
          (c.email && c.email.toLowerCase().includes(q)) ||
          (c.fullName && c.fullName.toLowerCase().includes(q)),
      );
    }

    return result;
  }, [customers, filter, searchQuery]);

  const toggleSettled = useCallback(async (docId: string, currentlySettled: boolean) => {
    const ref = doc(db, 'userHistoricPayments', docId);
    const user = getAuth().currentUser;
    if (currentlySettled) {
      await updateDoc(ref, {
        manuallySettled: false,
        settledAt: null,
        settledBy: null,
      });
    } else {
      await updateDoc(ref, {
        manuallySettled: true,
        settledAt: new Date().toISOString(),
        settledBy: user?.email || null,
      });
    }
  }, []);

  return {
    customers: filteredCustomers,
    allCustomers: customers,
    loading,
    error,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    totalCount: customers.length,
    pendingCount: customers.filter((c) => c.isPending).length,
    toggleSettled,
  };
}
