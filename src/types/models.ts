export enum PlanType {
  BASICO = 'basico',
  PRO_S = 'pro-s',
  PRO_L = 'pro-l',
  ORGANICO_S = 'organico-s',
  ORGANICO_L = 'organico-l',
  CURICO = 'curico',
}

export enum PaymentType {
  SUBSCRIPTION = 'Suscripcion',
  TRANSFER = 'Transferencia',
  BOTON_DE_PAGO = 'Boton de pago',
  SUSPENDIDA = 'Suspendida',
  NA = 'NA',
  RECUPERAR = 'Recuperar',
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
  montoPendiente?: number;
}

// ── Weighing records (pesaje) ──────────────────────────────────────────

export interface Pesaje {
  id?: string;
  fecha: string;
  choferUid: string;
  choferNombre: string;
  rutaId: string;
  vidrio: number;
  cartonPapel: number;
  pet: number;
  latas: number;
  totalKg: number;
  fotoUrl?: string;
  createdAt: string;
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

// ── User roles ──────────────────────────────────────────────────────────

export type UserRole = 'admin' | 'chofer';

export interface Usuario {
  id?: string;
  uid: string;
  email: string;
  nombre: string;
  role: UserRole;
  activo: boolean;
  createdAt: string;
}

// ── Route management ────────────────────────────────────────────────────

export interface Parada {
  clienteId: string;
  orden: number;
  nombre: string;
  direccion: string;
  comuna: string;
  telefono: string;
}

export interface Ruta {
  id?: string;
  dia: string;
  choferUid?: string;
  choferNombre?: string;
  paradas: Parada[];
}

// ── Pickup tracking (driver route execution) ────────────────────────────

export type EstadoRetiro = 'pendiente' | 'completado' | 'problema';

export type TipoProblema = 'no_pudieron_retirar' | 'mucho_material' | 'mezclado' | 'otro';

export interface Retiro {
  id?: string;
  fecha: string;
  rutaId: string;
  choferUid: string;
  clienteId: string;
  clienteNombre: string;
  direccion: string;
  comuna: string;
  telefono: string;
  orden: number;
  estado: EstadoRetiro;
  tipoProblema?: TipoProblema;
  descripcionProblema?: string;
  fotoUrl?: string;
  lat?: number;
  lng?: number;
  completadoAt?: string;
  notas?: string;
}
