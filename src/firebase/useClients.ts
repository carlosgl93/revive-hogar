import { useMemo } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

import { collection, orderBy, query } from 'firebase/firestore';

import { Cliente } from '@/types/models';

import { db } from './config';

export function useClients() {
  const [snapshot, loading, error] = useCollection(
    query(collection(db, 'clientes'), orderBy('nombre')),
  );

  const clients = useMemo<Cliente[]>(
    () =>
      snapshot?.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Cliente, 'id'>),
      })) ?? [],
    [snapshot],
  );

  return { clients, loading, error };
}
