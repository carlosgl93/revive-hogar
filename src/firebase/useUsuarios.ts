import { useMemo } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

import { collection, orderBy, query } from 'firebase/firestore';

import { Usuario } from '@/types/models';

import { db } from './config';

export function useUsuarios() {
  const [snapshot, loading, error] = useCollection(
    query(collection(db, 'usuarios'), orderBy('nombre')),
  );

  const usuarios = useMemo<Usuario[]>(
    () =>
      snapshot?.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Usuario, 'id'>),
      })) ?? [],
    [snapshot],
  );

  return { usuarios, loading, error };
}
