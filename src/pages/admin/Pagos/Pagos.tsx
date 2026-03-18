import { useCallback, useMemo, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import {
  Alert,
  Box,
  Button,
  Container,
  InputAdornment,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';

import { useClients } from '@/firebase/useClients';
import { useUpdateClient } from '@/firebase/useUpdateClient';
import { PaykuCustomer } from '@/types/payku';

import ClientFormDialog from './components/ClientFormDialog';
import ClientsTable from './components/ClientsTable';
import CreateSubscriptionDialog from './components/CreateSubscriptionDialog';
import CustomerDetailModal from './components/CustomerDetailModal';
import CustomersTable from './components/CustomersTable';
import Dashboard from './components/Dashboard';
import PagosFilters from './components/PagosFilters';
import { useClientCrud } from './hooks/useClientCrud';
import { useFilters } from './hooks/useFilters';
import { usePaykuCustomers } from './hooks/usePaykuCustomers';
import { usePaykuSubscriptionsV3 } from './hooks/usePaykuSubscriptionsV3';
import { applyFilters } from './utils/filters';
import { calculateKPIs } from './utils/kpis';

function Pagos() {
  // Data hooks
  const { clients, loading: clientsLoading } = useClients();
  const { filters: clientFilters, setFilter: setClientFilter } = useFilters();
  const { subscriptions, loading: subsLoading, refetch: refetchSubs } = usePaykuSubscriptionsV3();
  const { createClient, loading: crudLoading } = useClientCrud();
  const { markAsPaid, loading: markPaidLoading } = useUpdateClient();
  const {
    customers,
    loading: customersLoading,
    loadingMore: customersLoadingMore,
    error: customersError,
    hasMore: customersHasMore,
    setSearchEmail,
    loadMore: loadMoreCustomers,
  } = usePaykuCustomers();

  // UI state
  const [tab, setTab] = useState(0);
  const [createSubOpen, setCreateSubOpen] = useState(false);
  const [clientFormOpen, setClientFormOpen] = useState(false);
  const [customerDetail, setCustomerDetail] = useState<PaykuCustomer | null>(null);
  const [emailInput, setEmailInput] = useState('');

  // Derived data
  const filteredClients = useMemo(
    () => applyFilters(clients, clientFilters),
    [clients, clientFilters],
  );

  const kpis = useMemo(
    () => (subsLoading ? null : calculateKPIs(subscriptions, clients)),
    [subscriptions, clients, subsLoading],
  );

  // Handlers
  const handleCreateClient = async (data: Parameters<typeof createClient>[0]) => {
    await createClient(data);
    setClientFormOpen(false);
  };

  const handleSearchCustomers = useCallback(() => {
    setSearchEmail(emailInput.trim());
  }, [emailInput, setSearchEmail]);

  const handleSearchKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') handleSearchCustomers();
    },
    [handleSearchCustomers],
  );

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Stack spacing={3}>
        <Typography variant="h4" fontWeight={700}>
          Gestion de Pagos
        </Typography>

        {/* Dashboard KPIs */}
        <Dashboard kpis={kpis} loading={subsLoading || clientsLoading} />

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)}>
            <Tab label="Clientes" />
            <Tab label="Suscripciones" />
          </Tabs>
        </Box>

        {/* Clientes Tab */}
        {tab === 0 && (
          <Stack spacing={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <PagosFilters
                filters={clientFilters}
                onFilterChange={setClientFilter}
                clients={clients}
              />
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => setClientFormOpen(true)}
              >
                Nuevo Cliente Payku
              </Button>
            </Stack>
            <ClientsTable
              clients={filteredClients}
              loading={clientsLoading}
              onMarkPaid={markAsPaid}
              markPaidLoading={markPaidLoading}
            />
          </Stack>
        )}

        {/* Suscripciones / Clientes Payku Tab */}
        {tab === 1 && (
          <Stack spacing={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="row" spacing={1} alignItems="center">
                <TextField
                  size="small"
                  placeholder="Buscar por email..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
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
                <Button
                  variant="contained"
                  onClick={handleSearchCustomers}
                  disabled={customersLoading}
                  size="medium"
                >
                  Buscar
                </Button>
                {emailInput && (
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => {
                      setEmailInput('');
                      setSearchEmail('');
                    }}
                  >
                    Limpiar
                  </Button>
                )}
              </Stack>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setCreateSubOpen(true)}
                sx={{ flexShrink: 0 }}
              >
                Nueva Suscripcion
              </Button>
            </Stack>
            {customersError && (
              <Alert severity="error">
                Error al cargar clientes Payku: {customersError.message}
              </Alert>
            )}
            <CustomersTable
              customers={customers}
              loading={customersLoading}
              onViewDetail={setCustomerDetail}
            />
            {customersHasMore && !customersLoading && (
              <Box sx={{ textAlign: 'center' }}>
                <Button
                  variant="outlined"
                  onClick={loadMoreCustomers}
                  disabled={customersLoadingMore}
                >
                  {customersLoadingMore ? 'Cargando...' : 'Cargar mas clientes'}
                </Button>
              </Box>
            )}
          </Stack>
        )}
      </Stack>

      {/* Dialogs */}
      <CreateSubscriptionDialog
        open={createSubOpen}
        onClose={() => setCreateSubOpen(false)}
        onCreated={refetchSubs}
        clients={clients}
      />
      <ClientFormDialog
        open={clientFormOpen}
        onClose={() => setClientFormOpen(false)}
        onSubmit={handleCreateClient}
        loading={crudLoading}
      />
      <CustomerDetailModal
        customer={customerDetail}
        open={!!customerDetail}
        onClose={() => setCustomerDetail(null)}
      />
    </Container>
  );
}

export default Pagos;
