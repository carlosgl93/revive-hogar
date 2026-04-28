import { useCallback, useMemo, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

import { getAuth } from 'firebase/auth';
import { collection, doc, orderBy, query, updateDoc } from 'firebase/firestore';

import { db } from '@/firebase/config';
import { Cliente } from '@/types/models';
import { UserHistoricPayments } from '@/types/payku';

export type PaymentFilter = 'pendientes' | 'todos';

export interface MergedClientRow {
  id: string;
  // from clientes
  nombre: string;
  correo: string;
  direccion: string;
  telefono: string;
  monto: number;
  montoPendiente: number;
  movil: string;
  dia: string;
  // from userHistoricPayments (optional)
  lastPaymentDate: string | null;
  totalPayments: number;
  payments: UserHistoricPayments['payments'];
  manuallySettled: boolean;
  settledAt?: string | null;
  settledBy?: string | null;
  // computed
  isPending: boolean;
  hasHistoric: boolean;
}

const PENDING_THRESHOLD_DAYS = 30;

export function useHistoricPayments() {
  const [filter, setFilter] = useState<PaymentFilter>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  const [clientesSnap, clientesLoading] = useCollection(
    query(collection(db, 'clientes'), orderBy('nombre')),
  );

  const [historicSnap, historicLoading] = useCollection(
    query(collection(db, 'userHistoricPayments')),
  );

  const customers = useMemo<MergedClientRow[]>(() => {
    if (!clientesSnap) return [];

    const now = new Date();
    const thresholdDate = new Date(now.getTime() - PENDING_THRESHOLD_DAYS * 24 * 60 * 60 * 1000);

    // Build email -> historic payments map
    const historicByEmail = new Map<string, UserHistoricPayments & { id: string }>();
    if (historicSnap) {
      for (const d of historicSnap.docs) {
        const data = d.data() as Omit<UserHistoricPayments, 'id'>;
        if (data.email) {
          historicByEmail.set(data.email.toLowerCase(), { id: d.id, ...data });
        }
      }
    }

    return clientesSnap.docs.map((d) => {
      const cliente = d.data() as Omit<Cliente, 'id'>;
      const historic = cliente.correo
        ? historicByEmail.get(cliente.correo.toLowerCase())
        : undefined;

      const lastPaymentDate = historic?.lastPaymentDate ?? null;
      const lastDate = lastPaymentDate ? new Date(lastPaymentDate) : null;
      const noRecentPayment = !lastDate || lastDate < thresholdDate;
      const hasPendingAmount = (cliente.montoPendiente ?? 0) > 0;
      const manuallySettled = historic?.manuallySettled ?? false;

      const isPending = (noRecentPayment || hasPendingAmount) && !manuallySettled;

      return {
        id: d.id,
        nombre: cliente.nombre,
        correo: cliente.correo,
        direccion: cliente.direccion,
        telefono: cliente.telefono,
        monto: cliente.monto,
        montoPendiente: cliente.montoPendiente ?? 0,
        movil: cliente.movil,
        dia: cliente.dia,
        lastPaymentDate,
        totalPayments: historic?.totalPayments ?? 0,
        payments: historic?.payments ?? {},
        manuallySettled,
        settledAt: historic?.settledAt,
        settledBy: historic?.settledBy,
        isPending,
        hasHistoric: !!historic,
      };
    });
  }, [clientesSnap, historicSnap]);

  const filteredCustomers = useMemo(() => {
    let result = filter === 'pendientes' ? customers.filter((c) => c.isPending) : customers;

    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (c) =>
          c.direccion.toLowerCase().includes(q) ||
          c.correo.toLowerCase().includes(q) ||
          c.nombre.toLowerCase().includes(q),
      );
    }

    return result;
  }, [customers, filter, searchQuery]);

  const toggleSettled = useCallback(
    async (docId: string, currentlySettled: boolean) => {
      // docId is the clientes doc id; update the userHistoricPayments doc by correo
      const clienteDoc = clientesSnap?.docs.find((d) => d.id === docId);
      if (!clienteDoc) return;
      const correo = (clienteDoc.data() as Cliente).correo;
      if (!correo) return;

      const historicDoc = historicSnap?.docs.find(
        (d) => (d.data() as UserHistoricPayments).email?.toLowerCase() === correo.toLowerCase(),
      );
      const user = getAuth().currentUser;

      if (historicDoc) {
        if (currentlySettled) {
          await updateDoc(doc(db, 'userHistoricPayments', historicDoc.id), {
            manuallySettled: false,
            settledAt: null,
            settledBy: null,
          });
        } else {
          await updateDoc(doc(db, 'userHistoricPayments', historicDoc.id), {
            manuallySettled: true,
            settledAt: new Date().toISOString(),
            settledBy: user?.email || null,
          });
        }
      }
    },
    [clientesSnap, historicSnap],
  );

  return {
    customers: filteredCustomers,
    allCustomers: customers,
    loading: clientesLoading || historicLoading,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    totalCount: customers.length,
    pendingCount: customers.filter((c) => c.isPending).length,
    toggleSettled,
  };
}
