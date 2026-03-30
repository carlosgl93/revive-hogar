import { useMemo, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import {
  Alert,
  Button,
  Container,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';

import { paykuSubscriptionsApi } from '@/api';
import { useClients } from '@/firebase/useClients';
import { Cliente } from '@/types/models';
import { PaykuSubscriptionV3 } from '@/types/payku';

import CardRenewalDialog from './components/CardRenewalDialog';
import CreateSubscriptionDialog from './components/CreateSubscriptionDialog';
import CreateTransactionDialog from './components/CreateTransactionDialog';
import Dashboard from './components/Dashboard';
import PendientesTable from './components/PendientesTable';
import SubscriptionDetailDialog from './components/SubscriptionDetailDialog';
import SubscriptionsTable from './components/SubscriptionsTable';
import { SubscriptionStatusFilter, usePaykuSubscriptionsV3 } from './hooks/usePaykuSubscriptionsV3';
import { calculateKPIs } from './utils/kpis';

const STATUS_LABELS: Record<SubscriptionStatusFilter | 'all', string> = {
  all: 'Todas',
  active: 'Activas',
  suspended: 'Suspendidas',
  cancel: 'Canceladas',
  delete: 'Eliminadas',
};

type StatusView = SubscriptionStatusFilter | 'all';

function Pagos() {
  const { clients, loading: clientsLoading } = useClients();
  const {
    subscriptions,
    loading: subsLoading,
    error: subsError,
    statusCounts,
    refetch: refetchSubs,
  } = usePaykuSubscriptionsV3();

  const [statusView, setStatusView] = useState<StatusView>('all');
  const [createSubOpen, setCreateSubOpen] = useState(false);
  const [selectedSub, setSelectedSub] = useState<PaykuSubscriptionV3 | null>(null);
  const [renewCardOpen, setRenewCardOpen] = useState<{
    subscriptionId: string;
    clientName: string;
  } | null>(null);
  const [txnClient, setTxnClient] = useState<Cliente | null>(null);

  const filteredSubscriptions = useMemo(() => {
    if (statusView === 'all') return subscriptions;
    // For active, also include subscriptions whose combined status is al_dia/atrasado
    if (statusView === 'active') return subscriptions.filter((s) => s.status === 'active');
    return subscriptions.filter((s) => s.status === statusView);
  }, [subscriptions, statusView]);

  const kpis = useMemo(
    () => (subsLoading ? null : calculateKPIs(subscriptions, clients, statusCounts)),
    [subscriptions, clients, subsLoading, statusCounts],
  );

  const handleStatusChange = (_: React.MouseEvent<HTMLElement>, newStatus: StatusView | null) => {
    if (newStatus) setStatusView(newStatus);
  };

  const handleDeleteSubscription = async (subscriptionId: string) => {
    try {
      await paykuSubscriptionsApi.delete(subscriptionId);
      refetchSubs();
    } catch {
      // silent
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Stack spacing={3}>
        <Typography variant="h4" fontWeight={700}>
          Gestion de Pagos
        </Typography>

        <Dashboard kpis={kpis} loading={subsLoading || clientsLoading} />

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={1}
        >
          <ToggleButtonGroup
            value={statusView}
            exclusive
            onChange={handleStatusChange}
            size="small"
          >
            {(Object.keys(STATUS_LABELS) as StatusView[]).map((key) => (
              <ToggleButton key={key} value={key}>
                {STATUS_LABELS[key]}
                {key !== 'all' && statusCounts[key as SubscriptionStatusFilter] > 0 && (
                  <Typography component="span" variant="caption" sx={{ ml: 0.5, fontWeight: 700 }}>
                    ({statusCounts[key as SubscriptionStatusFilter]})
                  </Typography>
                )}
                {key === 'all' && subscriptions.length > 0 && (
                  <Typography component="span" variant="caption" sx={{ ml: 0.5, fontWeight: 700 }}>
                    ({subscriptions.length})
                  </Typography>
                )}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
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
          subscriptions={filteredSubscriptions}
          loading={subsLoading}
          onRenewCard={(id, name) => setRenewCardOpen({ subscriptionId: id, clientName: name })}
          onDelete={handleDeleteSubscription}
          onRowClick={setSelectedSub}
        />

        {/* Clients with pending debt (monto pendiente) */}
        {clients.some((c) => c.activo && (c.montoPendiente ?? 0) > 0) && (
          <>
            <Typography variant="h6" fontWeight={600} sx={{ mt: 2 }}>
              Clientes con Monto Pendiente
            </Typography>
            <PendientesTable
              clients={clients}
              loading={clientsLoading}
              onCreateSubscription={() => setCreateSubOpen(true)}
              onCreateTransaction={(c) => setTxnClient(c)}
            />
          </>
        )}
      </Stack>

      <CreateSubscriptionDialog
        open={createSubOpen}
        onClose={() => setCreateSubOpen(false)}
        onCreated={refetchSubs}
        clients={clients}
      />
      {renewCardOpen && (
        <CardRenewalDialog
          open
          subscriptionId={renewCardOpen.subscriptionId}
          clientName={renewCardOpen.clientName}
          onClose={() => setRenewCardOpen(null)}
        />
      )}
      <SubscriptionDetailDialog
        subscription={selectedSub}
        open={!!selectedSub}
        onClose={() => setSelectedSub(null)}
      />
      <CreateTransactionDialog
        open={!!txnClient}
        client={txnClient}
        onClose={() => setTxnClient(null)}
      />
    </Container>
  );
}

export default Pagos;
