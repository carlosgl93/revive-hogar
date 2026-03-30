import { PaykuPaidCycle } from '@/types/payku';

/**
 * Determines if a subscription is "up to date" with payments.
 * If >30 days since last successful payment → atrasado.
 */
export function isSubscriptionUpToDate(paid: PaykuPaidCycle[]): boolean {
  if (!paid || paid.length === 0) return false;

  const successfulPayments = paid.filter((p) => p.status === 'success');
  if (successfulPayments.length === 0) return false;

  const sorted = [...successfulPayments].sort(
    (a, b) => new Date(b.pay_day).getTime() - new Date(a.pay_day).getTime(),
  );
  const lastPayDate = new Date(sorted[0].pay_day);
  const now = new Date();
  const diffDays = (now.getTime() - lastPayDate.getTime()) / (1000 * 60 * 60 * 24);

  return diffDays <= 30;
}
