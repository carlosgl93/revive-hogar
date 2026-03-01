import { useState } from 'react';

export interface PagosFiltersState {
  paymentType: 'all' | 'Suscripcion' | 'Particular' | 'Efectivo';
  paymentStatus: 'all' | 'al_dia' | 'deudor';
}

export function useFilters() {
  const [filters, setFilters] = useState<PagosFiltersState>({
    paymentType: 'all',
    paymentStatus: 'all',
  });

  const setFilter = <K extends keyof PagosFiltersState>(key: K, value: PagosFiltersState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return { filters, setFilter };
}
