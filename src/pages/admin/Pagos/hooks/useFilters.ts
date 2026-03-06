import { useState } from 'react';

export interface PagosFiltersState {
  paymentType: string;
  paymentStatus: 'all' | 'al_dia' | 'deudor';
  dia: string;
}

export function useFilters() {
  const [filters, setFilters] = useState<PagosFiltersState>({
    paymentType: 'all',
    paymentStatus: 'all',
    dia: 'all',
  });

  const setFilter = <K extends keyof PagosFiltersState>(key: K, value: PagosFiltersState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return { filters, setFilter };
}
