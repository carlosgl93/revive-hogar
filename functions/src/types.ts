export type PaymentStatus = 'ok' | 'pendiente' | 'atrasado' | '';

export enum PaymentType {
  SUBSCRIPTION = 'Suscripcion',
  TRANSFER = 'Particular',
  CASH = 'Efectivo',
}

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
  activo: boolean;
  pagos: Record<string, PaymentStatus>;
  plan?: string;
  paykuSubscriptionId?: string;
  paykuSubscriptionUrl?: string;
  fechaCorte?: string;
  notas?: string;
}
