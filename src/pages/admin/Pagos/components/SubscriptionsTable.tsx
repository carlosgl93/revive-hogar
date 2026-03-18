import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import {
  Box,
  Chip,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { PaykuPaidCycle, PaykuSubscriptionStatus, PaykuSubscriptionV3 } from '@/types/payku';

interface SubscriptionsTableProps {
  subscriptions: PaykuSubscriptionV3[];
  loading: boolean;
  onRenewCard: (subscriptionId: string, clientName: string) => void;
  onDelete: (subscriptionId: string) => void;
}

function statusColor(status: PaykuSubscriptionStatus) {
  switch (status) {
    case 'active':
      return 'success' as const;
    case 'register':
      return 'info' as const;
    case 'suspended':
      return 'warning' as const;
    case 'cancel':
    case 'delete':
      return 'error' as const;
    case 'finish':
      return 'default' as const;
    default:
      return 'default' as const;
  }
}

const STATUS_LABELS: Record<string, string> = {
  active: 'Activa',
  register: 'Registro',
  suspended: 'Suspendida',
  cancel: 'Cancelada',
  delete: 'Eliminada',
  finish: 'Finalizada',
};

const PAID_STATUS_LABELS: Record<string, string> = {
  success: 'Pagado',
  pending: 'Pendiente',
  failed: 'Fallido',
  rejected: 'Rechazado',
};

function formatDate(dateStr: string | null) {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('es-CL');
}

function formatCLP(amount: number): string {
  return `$${amount.toLocaleString('es-CL')}`;
}

function PaidStatusIcon({ status }: { status: string }) {
  switch (status) {
    case 'success':
      return <CheckCircleIcon fontSize="small" color="success" />;
    case 'pending':
      return <HourglassEmptyIcon fontSize="small" color="action" />;
    default:
      return <ErrorOutlineIcon fontSize="small" color="error" />;
  }
}

function PaymentDetailPanel({ paid }: { paid: PaykuPaidCycle[] }) {
  if (!paid || paid.length === 0) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Sin historial de cobros
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle2" gutterBottom>
        Historial de Cobros
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Ciclo</TableCell>
            <TableCell>Fecha Pago</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell align="right">Monto</TableCell>
            <TableCell>Intentos</TableCell>
            <TableCell>Autorizacion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paid.map((cycle) => {
            const tx = cycle.transactions?.[0];
            return (
              <TableRow key={cycle.paid_number}>
                <TableCell>{cycle.paid_number}</TableCell>
                <TableCell>{formatDate(cycle.payment_cycle_day)}</TableCell>
                <TableCell>{formatDate(cycle.pay_day)}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <PaidStatusIcon status={cycle.status} />
                    <Typography variant="body2">
                      {PAID_STATUS_LABELS[cycle.status] ?? cycle.status}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell align="right">
                  {cycle.amount_paid > 0 ? formatCLP(cycle.amount_paid) : '-'}
                </TableCell>
                <TableCell>{cycle.try_number}</TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                    {tx?.authorization_code ?? '-'}
                  </Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
}

function getPaymentSummary(paid: PaykuPaidCycle[]) {
  if (!paid || paid.length === 0)
    return { successful: 0, total: 0, totalPaid: 0, nextCycle: null as string | null };
  const successful = paid.filter((p) => p.status === 'success').length;
  const totalPaid = paid.reduce((sum, p) => sum + p.amount_paid, 0);
  const nextPending = paid.find((p) => p.status === 'pending');
  return {
    successful,
    total: paid.length,
    totalPaid,
    nextCycle: nextPending?.payment_cycle_day ?? null,
  };
}

function SubscriptionsTable({
  subscriptions,
  loading,
  onRenewCard,
  onDelete,
}: SubscriptionsTableProps) {
  const columns: GridColDef<PaykuSubscriptionV3>[] = [
    {
      field: 'clientName',
      headerName: 'Cliente',
      flex: 1,
      minWidth: 140,
      valueGetter: (_value, row) => row.client?.name,
    },
    {
      field: 'clientEmail',
      headerName: 'Email',
      flex: 1,
      minWidth: 180,
      valueGetter: (_value, row) => row.client?.email,
    },
    {
      field: 'planName',
      headerName: 'Plan',
      width: 120,
      valueGetter: (_value, row) => row.plain?.name,
    },
    {
      field: 'status',
      headerName: 'Estado',
      width: 120,
      renderCell: ({ row }) => (
        <Chip
          label={STATUS_LABELS[row.status] ?? row.status}
          size="small"
          color={statusColor(row.status)}
        />
      ),
    },
    {
      field: 'cobros',
      headerName: 'Cobros',
      width: 90,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (_value, row) => {
        const summary = getPaymentSummary(row.paid);
        return summary.successful;
      },
      renderCell: ({ row }) => {
        const summary = getPaymentSummary(row.paid);
        return (
          <Typography variant="body2">
            {summary.successful}/{summary.total}
          </Typography>
        );
      },
    },
    {
      field: 'totalPaid',
      headerName: 'Total Pagado',
      width: 120,
      align: 'right',
      headerAlign: 'right',
      valueGetter: (_value, row) => getPaymentSummary(row.paid).totalPaid,
      renderCell: ({ value }) => {
        if (!value) return '-';
        return formatCLP(value as number);
      },
    },
    {
      field: 'nextCycle',
      headerName: 'Proximo Cobro',
      width: 130,
      valueGetter: (_value, row) => getPaymentSummary(row.paid).nextCycle,
      renderCell: ({ value }) => {
        if (!value) return '-';
        return formatDate(value as string);
      },
    },
    {
      field: 'card',
      headerName: 'Tarjeta',
      width: 140,
      valueGetter: (_value, row) => {
        if (!row.active_card?.card_type) return '';
        const digits = row.active_card.last_4_digits;
        const last4 = digits.length > 4 ? digits.slice(-4) : digits;
        return `${row.active_card.card_type} ****${last4}`;
      },
    },
    {
      field: 'start',
      headerName: 'Inicio',
      width: 110,
      renderCell: ({ row }) => formatDate(row.start),
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 110,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={0.5}>
          <Tooltip title="Renovar tarjeta">
            <IconButton
              size="small"
              color="primary"
              onClick={() => onRenewCard(row.id, row.client.name)}
            >
              <CreditCardIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar suscripcion">
            <IconButton size="small" color="error" onClick={() => onDelete(row.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <DataGrid
      rows={subscriptions}
      columns={columns}
      loading={loading}
      density="compact"
      pageSizeOptions={[25, 50, 100]}
      initialState={{
        pagination: { paginationModel: { pageSize: 25 } },
      }}
      disableRowSelectionOnClick
      autoHeight
      getDetailPanelContent={({ row }) => <PaymentDetailPanel paid={row.paid} />}
      sx={{
        '& .MuiDataGrid-cell': { py: 0.5 },
      }}
      getRowId={(row) => row.id}
    />
  );
}

export default SubscriptionsTable;
