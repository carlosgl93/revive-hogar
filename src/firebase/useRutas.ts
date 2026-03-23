import { useMemo } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

import { collection, orderBy, query } from 'firebase/firestore';

import { Ruta } from '@/types/models';

import { db } from './config';

const DIAS_ORDEN: Record<string, number> = {
  Lunes: 1,
  Martes: 2,
  Miercoles: 3,
  Jueves: 4,
  Viernes: 5,
  Sabado: 6,
};

export function useRutas() {
  const [snapshot, loading, error] = useCollection(query(collection(db, 'rutas'), orderBy('dia')));

  const rutas = useMemo<Ruta[]>(() => {
    const list =
      snapshot?.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Ruta, 'id'>),
      })) ?? [];

    return list.sort((a, b) => (DIAS_ORDEN[a.dia] ?? 99) - (DIAS_ORDEN[b.dia] ?? 99));
  }, [snapshot]);

  return { rutas, loading, error };
}
