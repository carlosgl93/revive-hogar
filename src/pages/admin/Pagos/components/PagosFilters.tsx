import { useMemo } from 'react';

import { FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';

import { Cliente } from '@/types/models';

import { PagosFiltersState } from '../hooks/useFilters';

interface PagosFiltersProps {
  filters: PagosFiltersState;
  onFilterChange: <K extends keyof PagosFiltersState>(key: K, value: PagosFiltersState[K]) => void;
  clients: Cliente[];
}

function PagosFilters({ filters, onFilterChange, clients }: PagosFiltersProps) {
  const uniqueDays = useMemo(() => {
    const weekdayOrder = ['lunes', 'martes', 'miércoles', 'miercoles', 'jueves', 'viernes'];
    const days = new Set(clients.map((c) => c.dia).filter(Boolean));
    return Array.from(days).sort((a, b) => {
      const indexA = weekdayOrder.findIndex((day) => day === a.toLowerCase());
      const indexB = weekdayOrder.findIndex((day) => day === b.toLowerCase());
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });
  }, [clients]);

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel>Tipo de pago</InputLabel>
        <Select
          value={filters.paymentType}
          label="Tipo de pago"
          onChange={(e) => onFilterChange('paymentType', e.target.value)}
        >
          <MenuItem value="all">Todos</MenuItem>
          <MenuItem value="Suscripcion">Suscripcion</MenuItem>
          <MenuItem value="Transferencia">Transferencia</MenuItem>
          <MenuItem value="Boton de pago">Boton de pago</MenuItem>
          <MenuItem value="Suspendida">Suspendida</MenuItem>
          <MenuItem value="NA">NA</MenuItem>
          <MenuItem value="Recuperar">Recuperar</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel>Estado</InputLabel>
        <Select
          value={filters.paymentStatus}
          label="Estado"
          onChange={(e) =>
            onFilterChange('paymentStatus', e.target.value as PagosFiltersState['paymentStatus'])
          }
        >
          <MenuItem value="all">Todos</MenuItem>
          <MenuItem value="al_dia">Al dia</MenuItem>
          <MenuItem value="deudor">Deudor</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel>Día de ruta</InputLabel>
        <Select
          value={filters.dia}
          label="Día de ruta"
          onChange={(e) => onFilterChange('dia', e.target.value)}
        >
          <MenuItem value="all">Todos</MenuItem>
          {uniqueDays.map((day) => (
            <MenuItem key={day} value={day}>
              {day}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}

export default PagosFilters;
