import { useCallback, useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import SyncIcon from '@mui/icons-material/Sync';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';

import { paykuHistoricApi } from '@/api/paykuHistoric';
import { SyncHistoricPaymentsResponse } from '@/types/payku';

import CustomerPaymentsModal from './components/CustomerPaymentsModal';
import HistoricCustomersTable from './components/HistoricCustomersTable';
import { MergedClientRow, PaymentFilter, useHistoricPayments } from './hooks/useHistoricPayments';

function getYearOptions(): number[] {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let y = currentYear; y >= 2018; y--) {
    years.push(y);
  }
  return years;
}

function HistorialPagos() {
  const {
    customers,
    loading,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    totalCount,
    pendingCount,
    toggleSettled,
  } = useHistoricPayments();

  // Sync state
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<SyncHistoricPaymentsResponse | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);

  // Detail modal
  const [selectedCustomer, setSelectedCustomer] = useState<MergedClientRow | null>(null);

  const handleSync = useCallback(async () => {
    setSyncing(true);
    setSyncResult(null);
    setSyncError(null);
    try {
      const res = await paykuHistoricApi.sync(selectedYear);
      setSyncResult(res.data);
    } catch (err) {
      setSyncError(err instanceof Error ? err.message : 'Error al sincronizar transacciones');
    } finally {
      setSyncing(false);
    }
  }, [selectedYear]);

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Stack spacing={3}>
        <Typography variant="h4" fontWeight={700}>
          Historial de Pagos
        </Typography>

        {/* Sync controls */}
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}
        >
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Ano</InputLabel>
            <Select
              value={selectedYear}
              label="Ano"
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              disabled={syncing}
            >
              {getYearOptions().map((y) => (
                <MenuItem key={y} value={y}>
                  {y}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            startIcon={syncing ? <CircularProgress size={18} color="inherit" /> : <SyncIcon />}
            onClick={handleSync}
            disabled={syncing}
          >
            {syncing ? 'Sincronizando...' : 'Sincronizar'}
          </Button>
          {syncResult && (
            <Alert severity="success" sx={{ flex: 1 }}>
              {syncResult.year}: {syncResult.transactionsProcessed} transacciones procesadas,{' '}
              {syncResult.customersUpdated} clientes actualizados
            </Alert>
          )}
          {syncError && (
            <Alert severity="error" sx={{ flex: 1 }}>
              {syncError}
            </Alert>
          )}
        </Stack>

        {/* Filter + search + stats */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Stack direction="row" spacing={2} alignItems="center">
            <ToggleButtonGroup
              value={filter}
              exclusive
              onChange={(_, val) => {
                if (val) setFilter(val as PaymentFilter);
              }}
              size="small"
            >
              <ToggleButton value="pendientes">Pendientes ({pendingCount})</ToggleButton>
              <ToggleButton value="todos">Todos ({totalCount})</ToggleButton>
            </ToggleButtonGroup>
            <TextField
              size="small"
              placeholder="Buscar por direccion, email o nombre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ minWidth: 300 }}
            />
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Mostrando {customers.length} clientes
          </Typography>
        </Stack>

        {/* Table */}
        <Box>
          <HistoricCustomersTable
            customers={customers}
            loading={loading}
            onViewDetail={setSelectedCustomer}
            onToggleSettled={toggleSettled}
          />
        </Box>
      </Stack>

      {/* Detail modal */}
      <CustomerPaymentsModal
        customer={selectedCustomer}
        open={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
        onToggleSettled={toggleSettled}
      />
    </Container>
  );
}

export default HistorialPagos;
