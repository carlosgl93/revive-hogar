import { Cliente, PaymentStatus, PaymentType } from '../types';

// Spanish months pattern: "enero 2025", "febrero 2026", etc.
const MONTH_PATTERN =
  /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\s+\d{4}$/i;

function normalizeMonto(raw: string): number {
  // Remove $, dots used as thousand separators, spaces
  const cleaned = raw.replace(/[$.\s]/g, '').replace(',', '.');
  const n = parseFloat(cleaned);
  return isNaN(n) ? 0 : n;
}

function normalizeTipoPago(raw: string): PaymentType | string {
  const lower = raw.trim().toLowerCase();
  if (lower.includes('suscripcion') || lower.includes('suscripción')) return PaymentType.SUBSCRIPTION;
  if (lower.includes('particular') || lower.includes('transferencia')) return PaymentType.TRANSFER;
  if (lower.includes('efectivo')) return PaymentType.CASH;
  return raw.trim();
}

function normalizePaymentStatus(raw: string): PaymentStatus {
  const lower = raw.trim().toLowerCase();
  if (lower === 'ok' || lower === 'pagado' || lower === 'pagada') return 'ok';
  if (lower === 'pendiente') return 'pendiente';
  if (lower === 'atrasado' || lower === 'atrasada') return 'atrasado';
  return '';
}

function isRowEmpty(row: string[]): boolean {
  return row.every((cell) => !cell || cell.trim() === '');
}

export interface TransformResult {
  cliente: Omit<Cliente, 'id'> | null;
  error: string | null;
  rowIndex: number;
}

export function buildHeaderIndex(headers: string[]): Record<string, number> {
  const index: Record<string, number> = {};
  headers.forEach((h, i) => {
    index[h.trim().toLowerCase()] = i;
  });
  return index;
}

export function transformRow(
  row: string[],
  headerIndex: Record<string, number>,
  rowIndex: number,
): TransformResult {
  if (isRowEmpty(row)) {
    return { cliente: null, error: null, rowIndex };
  }

  const get = (key: string): string => {
    const idx = headerIndex[key];
    return idx !== undefined ? (row[idx] ?? '').trim() : '';
  };

  const correo = get('correo');
  if (!correo) {
    const nombre = get('nombre') || `fila ${rowIndex + 1}`;
    return {
      cliente: null,
      error: `Fila ${rowIndex + 1} (${nombre}): correo vacío`,
      rowIndex,
    };
  }

  // Build pagos from month columns
  const pagos: Record<string, PaymentStatus> = {};
  for (const [header, idx] of Object.entries(headerIndex)) {
    if (MONTH_PATTERN.test(header)) {
      pagos[header] = normalizePaymentStatus(row[idx] ?? '');
    }
  }

  const cliente: Omit<Cliente, 'id'> = {
    dia: get('dia'),
    movil: get('movil'),
    monto: normalizeMonto(get('monto')),
    direccion: get('direccion'),
    comuna: get('comuna'),
    nombre: get('nombre'),
    correo,
    telefono: get('telefono'),
    tipoPago: normalizeTipoPago(get('tipo de pago')),
    activo: true,
    pagos,
  };

  return { cliente, error: null, rowIndex };
}
