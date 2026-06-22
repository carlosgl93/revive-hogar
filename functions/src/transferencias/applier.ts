import * as admin from 'firebase-admin';
import { addMonths } from 'date-fns';

import { Cliente } from '../types';
import { ParseResult } from './parser/types';

const TOLERANCE = 0.05;  // 5% tolerance for monto ratio

export interface ApplyResult {
  mesesAplicados: string[];
  montoDistribuido: number;
  montoResidual: number;
}

const SPANISH_MONTHS: Record<string, number> = {
  enero: 1, febrero: 2, marzo: 3, abril: 4, mayo: 5, junio: 6,
  julio: 7, agosto: 8, septiembre: 9, octubre: 10, noviembre: 11, diciembre: 12,
};

const SPANISH_MONTH_NAMES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

function getMonthKey(date: Date): string {
  return `${SPANISH_MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
}

function shiftMonthKey(monthKey: string, offset: number): string {
  const [monthName, yearStr] = monthKey.split(' ');
  const monthNum = SPANISH_MONTHS[monthName];
  const year = parseInt(yearStr, 10);
  const date = new Date(year, monthNum - 1, 1);
  date.setMonth(date.getMonth() + offset);
  return getMonthKey(date);
}

function getPrioridad(status: string | undefined): number {
  if (status === 'atrasado') return 0;
  if (status === 'pendiente') return 1;
  if (!status || status === '') return 2;
  return 3; // 'ok'
}

export async function applyTransferencia(
  clienteId: string,
  parse: ParseResult,
  emailId: string,
  db: FirebaseFirestore.Firestore,
): Promise<ApplyResult> {
  // Read cliente
  const clienteRef = db.collection('clientes').doc(clienteId);
  const clienteSnap = await clienteRef.get();
  if (!clienteSnap.exists) {
    throw new Error('cliente_not_found');
  }
  const cliente = clienteSnap.data() as Cliente;

  if (!cliente.monto || cliente.monto <= 0) {
    throw new Error('no_monthly_amount');
  }

  // Compute months covered
  const ratio = parse.monto / cliente.monto;
  const mesesCubiertos = Math.round(ratio);
  if (mesesCubiertos === 0 || Math.abs(ratio - mesesCubiertos) > TOLERANCE) {
    throw new Error('partial_amount');
  }

  // Idempotency check
  const existingLog = await db.collection('transferenciaLog')
    .where('emailId', '==', emailId)
    .limit(1)
    .get();
  if (!existingLog.empty) {
    return {
      mesesAplicados: [],
      montoDistribuido: 0,
      montoResidual: 0,
    };
  }

  // Determine which months to apply
  const pagos = cliente.pagos ?? {};
  const now = new Date();
  const currentMonthKey = getMonthKey(now);

  // Sort months by priority: atrasado > pendiente > '' > 'ok'
  // Consider [currentMonthKey - 3, currentMonthKey + 3] window
  const candidateMonths: string[] = [];
  for (let offset = -3; offset <= 3; offset++) {
    candidateMonths.push(shiftMonthKey(currentMonthKey, offset));
  }
  candidateMonths.sort((a, b) => {
    const aStatus = pagos[a];
    const bStatus = pagos[b];
    const aPri = getPrioridad(aStatus);
    const bPri = getPrioridad(bStatus);
    return aPri - bPri;
  });

  const mesesAplicados = candidateMonths.slice(0, mesesCubiertos);

  // Compute new state
  const newPagos = { ...pagos };
  for (const mes of mesesAplicados) {
    newPagos[mes] = 'ok';
  }
  const newMontoPendiente = Math.max(0, (cliente.montoPendiente ?? 0) - mesesCubiertos * cliente.monto);
  const baseFechaCorte = cliente.fechaCorte ? new Date(cliente.fechaCorte) : new Date();
  const newFechaCorte = addMonths(baseFechaCorte, mesesCubiertos);

  // Write in transaction
  await db.runTransaction(async (tx) => {
    tx.update(clienteRef, {
      pagos: newPagos,
      montoPendiente: newMontoPendiente,
      fechaCorte: newFechaCorte.toISOString(),
    });
    const logRef = db.collection('transferenciaLog').doc();
    tx.set(logRef, {
      emailId,
      processedAt: admin.firestore.FieldValue.serverTimestamp(),
      clienteId,
      clienteNombre: cliente.nombre,
      parseSource: parse.source,
      monto: parse.monto,
      mesesAplicados,
      score: 0,  // filled by handler
      rut: parse.rut,
      fechaTransferencia: parse.fecha,
      comentario: parse.comentario,
      resultado: 'applied',
    });
  });

  return {
    mesesAplicados,
    montoDistribuido: mesesCubiertos * cliente.monto,
    montoResidual: parse.monto - mesesCubiertos * cliente.monto,
  };
}
