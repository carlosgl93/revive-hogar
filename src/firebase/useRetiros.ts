import { useMemo } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

import {
  Query,
  collection,
  deleteField,
  doc,
  orderBy,
  query,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';

import { EstadoRetiro, Retiro, Ruta, TipoProblema } from '@/types/models';

import { db } from './config';

function buildRetiroQuery(fecha: string, choferUid?: string): Query {
  const base = collection(db, 'retiros');
  if (choferUid) {
    return query(
      base,
      where('fecha', '==', fecha),
      where('choferUid', '==', choferUid),
      orderBy('orden'),
    );
  }
  return query(base, where('fecha', '==', fecha), orderBy('orden'));
}

export function useRetiros(fecha: string, choferUid?: string) {
  const q = buildRetiroQuery(fecha, choferUid);
  const [snapshot, loading, error] = useCollection(q);

  const retiros = useMemo<Retiro[]>(
    () =>
      snapshot?.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Retiro, 'id'>),
      })) ?? [],
    [snapshot],
  );

  return { retiros, loading, error };
}

export async function updateRetiroEstado(
  retiroId: string,
  estado: EstadoRetiro,
  extra?: {
    tipoProblema?: TipoProblema;
    descripcionProblema?: string;
    fotoUrl?: string;
    lat?: number;
    lng?: number;
    notas?: string;
  },
) {
  const ref = doc(db, 'retiros', retiroId);
  await updateDoc(ref, {
    estado,
    ...(estado === 'completado' ? { completadoAt: new Date().toISOString() } : {}),
    ...(estado === 'problema' && extra
      ? {
          tipoProblema: extra.tipoProblema ?? deleteField(),
          descripcionProblema: extra.descripcionProblema ?? deleteField(),
          fotoUrl: extra.fotoUrl ?? deleteField(),
        }
      : {}),
    ...(extra?.lat != null ? { lat: extra.lat } : {}),
    ...(extra?.lng != null ? { lng: extra.lng } : {}),
    ...(extra?.notas ? { notas: extra.notas } : {}),
  });
}

export async function generarRetirosDiarios(ruta: Ruta, fecha: string, choferUid: string) {
  const batch = writeBatch(db);

  for (const parada of ruta.paradas) {
    const ref = doc(collection(db, 'retiros'));
    batch.set(ref, {
      fecha,
      rutaId: ruta.id ?? '',
      choferUid,
      clienteId: parada.clienteId,
      clienteNombre: parada.nombre,
      direccion: parada.direccion,
      comuna: parada.comuna,
      telefono: parada.telefono,
      orden: parada.orden,
      estado: 'pendiente',
    } satisfies Omit<Retiro, 'id'>);
  }

  await batch.commit();
}
