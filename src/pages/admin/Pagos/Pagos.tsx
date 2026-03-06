import { useMemo, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import { Alert, Box, Button, Container, Stack, Tab, Tabs, Typography } from '@mui/material';

import { paykuSubscriptionsApi } from '@/api';
import { useClients } from '@/firebase/useClients';
import { useUpdateClient } from '@/firebase/useUpdateClient';

import CardRenewalDialog from './components/CardRenewalDialog';
import ClientFormDialog from './components/ClientFormDialog';
import ClientsTable from './components/ClientsTable';
import ConfirmDialog from './components/ConfirmDialog';
import CreateSubscriptionDialog from './components/CreateSubscriptionDialog';
import Dashboard from './components/Dashboard';
import PagosFilters from './components/PagosFilters';
import SubscriptionFilters from './components/SubscriptionFilters';
import SubscriptionsTable from './components/SubscriptionsTable';
import { useClientCrud } from './hooks/useClientCrud';
import { useFilters } from './hooks/useFilters';
import { usePaykuSubscriptionsV3 } from './hooks/usePaykuSubscriptionsV3';
import { applyFilters } from './utils/filters';
import { calculateKPIs } from './utils/kpis';

function Pagos() {
  // Data hooks
  const { clients, loading: clientsLoading } = useClients();
  const { filters: clientFilters, setFilter: setClientFilter } = useFilters();
  const {
    subscriptions,
    loading: subsLoading,
    error: subsError,
    filters: subFilters,
    updateFilter: updateSubFilter,
    updateStatusFilter,
    refetch: refetchSubs,
  } = usePaykuSubscriptionsV3();
  const { createClient, loading: crudLoading } = useClientCrud();
  const { markAsPaid, loading: markPaidLoading } = useUpdateClient();

  // UI state
  const [tab, setTab] = useState(0);
  const [createSubOpen, setCreateSubOpen] = useState(false);
  const [clientFormOpen, setClientFormOpen] = useState(false);
  const [renewCard, setRenewCard] = useState<{
    open: boolean;
    subscriptionId: string;
    clientName: string;
  }>({
    open: false,
    subscriptionId: '',
    clientName: '',
  });
  const [confirmDelete, setConfirmDelete] = useState<{ open: boolean; subscriptionId: string }>({
    open: false,
    subscriptionId: '',
  });
  const [deleteLoading, setDeleteLoading] = useState(false);

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
  const handleRenewCard = (subscriptionId: string, clientName: string) => {
    setRenewCard({ open: true, subscriptionId, clientName });
  };

  const handleDeleteSubscription = (subscriptionId: string) => {
    setConfirmDelete({ open: true, subscriptionId });
  };

  const handleConfirmDelete = async () => {
    setDeleteLoading(true);
    try {
      await paykuSubscriptionsApi.delete(confirmDelete.subscriptionId);
      setConfirmDelete({ open: false, subscriptionId: '' });
      refetchSubs();
    } catch {
      // Error is visible in console; could enhance with snackbar later
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleCreateClient = async (data: Parameters<typeof createClient>[0]) => {
    await createClient(data);
    setClientFormOpen(false);
  };

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

        {/* Suscripciones Tab */}
        {tab === 1 && (
          <Stack spacing={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <SubscriptionFilters
                filters={subFilters}
                onDateChange={(key, value) => updateSubFilter(key, value)}
                onStatusChange={updateStatusFilter}
                onApply={refetchSubs}
                loading={subsLoading}
              />
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setCreateSubOpen(true)}
                sx={{ flexShrink: 0 }}
              >
                Nueva Suscripcion
              </Button>
            </Stack>
            {subsError && (
              <Alert severity="error">Error al cargar suscripciones: {subsError.message}</Alert>
            )}
            <SubscriptionsTable
              subscriptions={subscriptions}
              loading={subsLoading}
              onRenewCard={handleRenewCard}
              onDelete={handleDeleteSubscription}
            />
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
      <CardRenewalDialog
        open={renewCard.open}
        onClose={() => setRenewCard({ open: false, subscriptionId: '', clientName: '' })}
        subscriptionId={renewCard.subscriptionId}
        clientName={renewCard.clientName}
      />
      <ConfirmDialog
        open={confirmDelete.open}
        title="Eliminar Suscripcion"
        message={`¿Estas seguro de eliminar la suscripcion ${confirmDelete.subscriptionId}? Esta accion no se puede deshacer.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmDelete({ open: false, subscriptionId: '' })}
        loading={deleteLoading}
      />
    </Container>
  );
}

export default Pagos;
