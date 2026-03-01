import { useMemo } from 'react';

import { Alert, CircularProgress, Container, Stack, Typography } from '@mui/material';

import { useClients } from '@/firebase/useClients';

import ClientsTable from './components/ClientsTable';
import PagosFilters from './components/PagosFilters';
import SubscriptionsTable from './components/SubscriptionsTable';
import { useFilters } from './hooks/useFilters';
import { usePaykuSubscriptions } from './hooks/usePaykuSubscriptions';
import { applyFilters } from './utils/filters';

function Pagos() {
  const { clients, loading } = useClients();
  const { filters, setFilter } = useFilters();
  const { paykuSubscriptions, loading: subsLoading, error: subsError } = usePaykuSubscriptions();

  console.log({ paykuSubscriptions });

  const filteredClients = useMemo(() => applyFilters(clients, filters), [clients, filters]);

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Stack spacing={3}>
        <Typography variant="h4" fontWeight={700}>
          Gestion de Pagos
        </Typography>
        <PagosFilters filters={filters} onFilterChange={setFilter} />
        <ClientsTable clients={filteredClients} loading={loading} />

        <Typography variant="h5" fontWeight={600}>
          Suscripciones Payku
        </Typography>
        {subsLoading && <CircularProgress />}
        {subsError && (
          <Alert severity="error">Error al cargar suscripciones: {subsError.message}</Alert>
        )}
        {!subsLoading && !subsError && paykuSubscriptions.length === 0 && (
          <Typography color="text.secondary">No hay suscripciones.</Typography>
        )}
        {paykuSubscriptions.length > 0 && <SubscriptionsTable subscriptions={paykuSubscriptions} />}
      </Stack>
    </Container>
  );
}

export default Pagos;
