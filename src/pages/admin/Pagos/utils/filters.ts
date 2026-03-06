import { Cliente } from '@/types/models';
import { getPaymentStatusLabel } from '@/utils/cutDate';

import { PagosFiltersState } from '../hooks/useFilters';

export function applyFilters(clients: Cliente[], filters: PagosFiltersState): Cliente[] {
  let result = clients;

  if (filters.paymentType !== 'all') {
    result = result.filter((c) => c.tipoPago === filters.paymentType);
  }

  if (filters.paymentStatus !== 'all') {
    result = result.filter((c) => {
      if (!c.fechaCorte) {
        return filters.paymentStatus === 'deudor';
      }
      return getPaymentStatusLabel(c.fechaCorte) === filters.paymentStatus;
    });
  }

  if (filters.dia !== 'all') {
    result = result.filter((c) => c.dia === filters.dia);
  }

  return result;
}
