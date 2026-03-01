export enum PlanType {
  BASICO = 'basico',
  MEDIO = 'medio',
  PREMIUM = 'premium',
}

export enum PaymentType {
  SUBSCRIPTION = 'Suscripcion',
  TRANSFER = 'Particular',
  CASH = 'Efectivo',
}

export type PaymentStatus = 'ok' | 'pendiente' | 'atrasado' | '';

/**
 * Represents a client record.
 * Maps to a Firestore document in the `clientes` collection.
 */
export interface Cliente {
  id?: string;
  dia: string;
  movil: string;
  monto: number;
  direccion: string;
  comuna: string;
  nombre: string;
  correo: string;
  telefono: string;
  tipoPago: PaymentType | string;
  plan?: PlanType;
  paykuSubscriptionId?: string;
  paykuSubscriptionUrl?: string;
  fechaCorte?: string;
  activo: boolean;
  notas?: string;
  pagos: Record<string, PaymentStatus>;
}

/**
 * Represents a daily route entry.
 */
export interface RutaDiaria {
  orden: number;
  nombre: string;
  correo: string;
  direccion: string;
  comuna: string;
  sector: string;
  telefono: string;
  tipoPago: PaymentType | string;
  fechaPago: string;
}

/**
 * A daily route document grouping multiple entries.
 */
export interface RutaDiariaDoc {
  fecha: string;
  movil: string;
  entregas: RutaDiaria[];
}
