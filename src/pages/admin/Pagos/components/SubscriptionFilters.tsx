import SearchIcon from '@mui/icons-material/Search';
import { Button, Checkbox, FormControlLabel, FormGroup, Stack } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { SubscriptionFiltersState } from '../hooks/usePaykuSubscriptionsV3';

interface SubscriptionFiltersProps {
  filters: SubscriptionFiltersState;
  onDateChange: <K extends 'dateInit' | 'dateEnd'>(key: K, value: Date) => void;
  onStatusChange: (status: keyof SubscriptionFiltersState['statusFilters'], value: boolean) => void;
  onApply: () => void;
  loading: boolean;
}

const STATUS_LABELS: Record<keyof SubscriptionFiltersState['statusFilters'], string> = {
  register: 'Registro',
  active: 'Activa',
  finish: 'Finalizada',
  delete: 'Eliminada',
  cancel: 'Cancelada',
  suspended: 'Suspendida',
};

function SubscriptionFilters({
  filters,
  onDateChange,
  onStatusChange,
  onApply,
  loading,
}: SubscriptionFiltersProps) {
  return (
    <Stack spacing={2}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
        <DatePicker
          label="Desde"
          value={filters.dateInit}
          onChange={(date) => date && onDateChange('dateInit', date)}
          format="dd/MM/yyyy"
          slotProps={{ textField: { size: 'small' } }}
        />
        <DatePicker
          label="Hasta"
          value={filters.dateEnd}
          onChange={(date) => date && onDateChange('dateEnd', date)}
          format="dd/MM/yyyy"
          slotProps={{ textField: { size: 'small' } }}
        />
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={onApply}
          disabled={loading}
          size="medium"
        >
          Buscar
        </Button>
      </Stack>
      <FormGroup row>
        {(
          Object.entries(STATUS_LABELS) as [
            keyof SubscriptionFiltersState['statusFilters'],
            string,
          ][]
        ).map(([key, label]) => (
          <FormControlLabel
            key={key}
            control={
              <Checkbox
                size="small"
                checked={filters.statusFilters[key]}
                onChange={(e) => onStatusChange(key, e.target.checked)}
              />
            }
            label={label}
          />
        ))}
      </FormGroup>
    </Stack>
  );
}

export default SubscriptionFilters;
