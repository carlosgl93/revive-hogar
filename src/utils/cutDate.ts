import { addMonths, isBefore, startOfDay } from 'date-fns';

export function calculateCutDate(paymentDate: Date): Date {
  return addMonths(paymentDate, 1);
}

export function isClientUpToDate(cutDate: Date | string): boolean {
  const date = typeof cutDate === 'string' ? new Date(cutDate) : cutDate;
  return !isBefore(startOfDay(date), startOfDay(new Date()));
}

export type PaymentStatusLabel = 'al_dia' | 'deudor';

export function getPaymentStatusLabel(cutDate: Date | string): PaymentStatusLabel {
  return isClientUpToDate(cutDate) ? 'al_dia' : 'deudor';
}
