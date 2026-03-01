import { FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';

import { PagosFiltersState } from '../hooks/useFilters';

interface PagosFiltersProps {
  filters: PagosFiltersState;
  onFilterChange: <K extends keyof PagosFiltersState>(key: K, value: PagosFiltersState[K]) => void;
}

function PagosFilters({ filters, onFilterChange }: PagosFiltersProps) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel>Tipo de pago</InputLabel>
        <Select
          value={filters.paymentType}
          label="Tipo de pago"
          onChange={(e) =>
            onFilterChange('paymentType', e.target.value as PagosFiltersState['paymentType'])
          }
        >
          <MenuItem value="all">Todos</MenuItem>
          <MenuItem value="Suscripcion">Suscripcion</MenuItem>
          <MenuItem value="Particular">Transferencia</MenuItem>
          <MenuItem value="Efectivo">Efectivo</MenuItem>
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
    </Stack>
  );
}

export default PagosFilters;
