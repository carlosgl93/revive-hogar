import { Cliente } from '@/types/models';
import { PaykuSubscriptionV3 } from '@/types/payku';

import { StatusCounts } from '../hooks/usePaykuSubscriptionsV3';
import { isSubscriptionUpToDate } from './subscriptionStatus';

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

export function getCurrentMonthKey(): string {
  const now = new Date();
  return `${MONTH_NAMES[now.getMonth()]} ${now.getFullYear()}`;
}

const PAYING_TYPES = ['Suscripcion', 'Transferencia', 'Particular', 'Boton de pago'];

export interface DashboardKPIs {
  activeSubscriptions: number;
  suspendedSubscriptions: number;
  cancelledSubscriptions: number;
  deletedSubscriptions: number;
  totalSubscriptions: number;
  subsAlDia: number;
  subsAtrasados: number;
  expectedMonthlyIncome: number;
  actualMonthlyIncome: number;
  subscriptionMonthlyIncome: number;
  transferMonthlyIncome: number;
  botonDePagoMonthlyIncome: number;
  totalClients: number;
  clientsAlDia: number;
  clientsDeudor: number;
  collectionRate: number;
  totalMontoPendiente: number;
  clientsConPendiente: number;
}

export function calculateKPIs(
  allSubscriptions: PaykuSubscriptionV3[],
  clients: Cliente[],
  statusCounts: StatusCounts,
): DashboardKPIs {
  const monthKey = getCurrentMonthKey();
  const activeClients = clients.filter((c) => c.activo);

  // Active subscriptions from the full dataset
  const activeSubs = allSubscriptions.filter((s) => s.status === 'active');

  // Up to date logic for active subs
  let subsAlDia = 0;
  let subsAtrasados = 0;
  for (const sub of activeSubs) {
    if (isSubscriptionUpToDate(sub.paid)) {
      subsAlDia++;
    } else {
      subsAtrasados++;
    }
  }

  // Expected income from internal clients (Transferencia / Boton de pago)
  const expectedClientIncome = activeClients
    .filter((c) => PAYING_TYPES.includes(c.tipoPago) && c.tipoPago !== 'Suscripcion')
    .reduce((sum, c) => sum + (c.monto ?? 0), 0);

  // Expected subscription income: for each active sub, use last successful payment amount as estimate
  const expectedSubIncome = activeSubs.reduce((sum, s) => {
    const lastSuccess = [...(s.paid ?? [])].reverse().find((p) => p.status === 'success');
    return sum + (lastSuccess?.amount_paid ?? 0);
  }, 0);

  const expectedMonthlyIncome = expectedSubIncome + expectedClientIncome;

  // Actual subscription income (only from al-dia subs)
  const subscriptionMonthlyIncome = activeSubs
    .filter((s) => isSubscriptionUpToDate(s.paid))
    .reduce((sum, s) => {
      const lastSuccess = [...(s.paid ?? [])].reverse().find((p) => p.status === 'success');
      return sum + (lastSuccess?.amount_paid ?? 0);
    }, 0);

  // Transfer income
  const transferMonthlyIncome = activeClients
    .filter(
      (c) =>
        (c.tipoPago === 'Transferencia' || c.tipoPago === 'Particular') &&
        c.pagos?.[monthKey] === 'ok',
    )
    .reduce((sum, c) => sum + (c.monto ?? 0), 0);

  // Boton de pago income
  const botonDePagoMonthlyIncome = activeClients
    .filter((c) => c.tipoPago === 'Boton de pago' && c.pagos?.[monthKey] === 'ok')
    .reduce((sum, c) => sum + (c.monto ?? 0), 0);

  const actualMonthlyIncome =
    subscriptionMonthlyIncome + transferMonthlyIncome + botonDePagoMonthlyIncome;

  // Client al dia / deudor
  const upToDateEmails = new Set(
    activeSubs
      .filter((s) => isSubscriptionUpToDate(s.paid))
      .map((s) => s.client.email.toLowerCase()),
  );

  let clientsAlDia = 0;
  let clientsDeudor = 0;

  for (const c of activeClients) {
    if (!PAYING_TYPES.includes(c.tipoPago)) continue;
    if (c.tipoPago === 'Suscripcion') {
      if (upToDateEmails.has(c.correo.toLowerCase())) {
        clientsAlDia++;
      } else {
        clientsDeudor++;
      }
    } else {
      if (c.pagos?.[monthKey] === 'ok') {
        clientsAlDia++;
      } else {
        clientsDeudor++;
      }
    }
  }

  // Monto pendiente (historic debt)
  const pendienteClients = activeClients.filter((c) => (c.montoPendiente ?? 0) > 0);
  const totalMontoPendiente = pendienteClients.reduce((sum, c) => sum + (c.montoPendiente ?? 0), 0);

  return {
    totalSubscriptions:
      statusCounts.active + statusCounts.suspended + statusCounts.cancel + statusCounts.delete,
    activeSubscriptions: statusCounts.active,
    suspendedSubscriptions: statusCounts.suspended,
    cancelledSubscriptions: statusCounts.cancel,
    deletedSubscriptions: statusCounts.delete,
    subsAlDia,
    subsAtrasados,
    expectedMonthlyIncome,
    actualMonthlyIncome,
    subscriptionMonthlyIncome,
    transferMonthlyIncome,
    botonDePagoMonthlyIncome,
    totalClients: clients.length,
    clientsAlDia,
    clientsDeudor,
    collectionRate:
      expectedMonthlyIncome > 0 ? (actualMonthlyIncome / expectedMonthlyIncome) * 100 : 0,
    totalMontoPendiente,
    clientsConPendiente: pendienteClients.length,
  };
}
