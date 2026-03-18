import { Cliente } from '@/types/models';
import { PaykuSubscriptionV3 } from '@/types/payku';

const MONTH_NAMES = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];

/**
 * Returns the current month key matching the pagos map format, e.g. "marzo 2026".
 */
export function getCurrentMonthKey(): string {
  const now = new Date();
  return `${MONTH_NAMES[now.getMonth()]} ${now.getFullYear()}`;
}

/** Payment types that generate income (includes 'Particular' as legacy alias for Transferencia) */
const PAYING_TYPES = ['Suscripcion', 'Transferencia', 'Particular', 'Boton de pago'];

export interface DashboardKPIs {
  totalSubscriptions: number;
  activeSubscriptions: number;
  suspendedSubscriptions: number;
  registeredSubscriptions: number;
  cancelledSubscriptions: number;
  /** Optimistic: sum of monto for all active paying clients */
  expectedMonthlyIncome: number;
  /** Confirmed: sum of actual payments received this month */
  actualMonthlyIncome: number;
  expectedYearlyIncome: number;
  subscriptionMonthlyIncome: number;
  transferMonthlyIncome: number;
  botonDePagoMonthlyIncome: number;
  totalClients: number;
  clientsAlDia: number;
  clientsDeudor: number;
  collectionRate: number;
}

export function calculateKPIs(
  subscriptions: PaykuSubscriptionV3[],
  clients: Cliente[],
): DashboardKPIs {
  const activeSubscriptions = subscriptions.filter((s) => s.status === 'active').length;
  const suspendedSubscriptions = subscriptions.filter((s) => s.status === 'suspended').length;
  const registeredSubscriptions = subscriptions.filter((s) => s.status === 'register').length;
  const cancelledSubscriptions = subscriptions.filter(
    (s) => s.status === 'cancel' || s.status === 'finish',
  ).length;

  const monthKey = getCurrentMonthKey();
  const activeClients = clients.filter((c) => c.activo);

  // --- Expected income (optimistic: everyone pays) ---
  const expectedMonthlyIncome = activeClients
    .filter((c) => PAYING_TYPES.includes(c.tipoPago))
    .reduce((sum, c) => sum + (c.monto ?? 0), 0);

  // --- Actual income from Payku subscriptions (last successful paid cycle) ---
  const subscriptionMonthlyIncome = subscriptions
    .filter((s) => s.status === 'active')
    .reduce((sum, s) => {
      const lastSuccess = [...(s.paid ?? [])].reverse().find((p) => p.status === 'success');
      return sum + (lastSuccess?.amount_paid ?? 0);
    }, 0);

  // --- Actual income from Transferencia clients (current month pagos === 'ok') ---
  const transferMonthlyIncome = activeClients
    .filter(
      (c) =>
        (c.tipoPago === 'Transferencia' || c.tipoPago === 'Particular') &&
        c.pagos?.[monthKey] === 'ok',
    )
    .reduce((sum, c) => sum + (c.monto ?? 0), 0);

  // --- Actual income from Boton de pago clients (current month pagos === 'ok') ---
  const botonDePagoMonthlyIncome = activeClients
    .filter((c) => c.tipoPago === 'Boton de pago' && c.pagos?.[monthKey] === 'ok')
    .reduce((sum, c) => sum + (c.monto ?? 0), 0);

  const actualMonthlyIncome =
    subscriptionMonthlyIncome + transferMonthlyIncome + botonDePagoMonthlyIncome;

  // --- Al dia / Deudor ---
  // Build set of emails with active Payku subscriptions for cross-reference
  const activeSubEmails = new Set(
    subscriptions.filter((s) => s.status === 'active').map((s) => s.client.email.toLowerCase()),
  );

  let clientsAlDia = 0;
  let clientsDeudor = 0;

  for (const c of activeClients) {
    if (!PAYING_TYPES.includes(c.tipoPago)) continue;

    if (c.tipoPago === 'Suscripcion') {
      // Use Payku subscription status as source of truth
      if (activeSubEmails.has(c.correo.toLowerCase())) {
        clientsAlDia++;
      } else {
        clientsDeudor++;
      }
    } else {
      // Transferencia / Particular / Boton de pago: use pagos map for current month
      if (c.pagos?.[monthKey] === 'ok') {
        clientsAlDia++;
      } else {
        clientsDeudor++;
      }
    }
  }

  return {
    totalSubscriptions: subscriptions.length,
    activeSubscriptions,
    suspendedSubscriptions,
    registeredSubscriptions,
    cancelledSubscriptions,
    expectedMonthlyIncome,
    actualMonthlyIncome,
    expectedYearlyIncome: expectedMonthlyIncome * 12,
    subscriptionMonthlyIncome,
    transferMonthlyIncome,
    botonDePagoMonthlyIncome,
    totalClients: clients.length,
    clientsAlDia,
    clientsDeudor,
    collectionRate:
      expectedMonthlyIncome > 0 ? (actualMonthlyIncome / expectedMonthlyIncome) * 100 : 0,
  };
}
