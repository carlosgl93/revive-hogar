import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Chip, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { PaykuPaidCycle, PaykuSubscriptionV3 } from '@/types/payku';

import { isSubscriptionUpToDate } from '../utils/subscriptionStatus';

interface SubscriptionsTableProps {
  subscriptions: PaykuSubscriptionV3[];
  loading: boolean;
  onRenewCard: (subscriptionId: string, clientName: string) => void;
  onDelete: (subscriptionId: string) => void;
  onRowClick: (subscription: PaykuSubscriptionV3) => void;
}

const STATUS_LABELS: Record<string, string> = {
  active: 'Activa',
  register: 'Registro',
  suspended: 'Suspendida',
  cancel: 'Cancelada',
  delete: 'Eliminada',
  finish: 'Finalizada',
};

function formatDate(dateStr: string | null) {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('es-CL');
}

function formatCLP(amount: number): string {
  return `$${amount.toLocaleString('es-CL')}`;
}

type CombinedStatus =
  | 'al_dia'
  | 'atrasado'
  | 'suspended'
  | 'cancel'
  | 'delete'
  | 'register'
  | 'finish';

function getCombinedStatus(row: PaykuSubscriptionV3): CombinedStatus {
  if (row.status === 'active') {
    return isSubscriptionUpToDate(row.paid) ? 'al_dia' : 'atrasado';
  }
  return row.status as CombinedStatus;
}

function combinedStatusLabel(cs: CombinedStatus): string {
  switch (cs) {
    case 'al_dia':
      return 'Al Dia';
    case 'atrasado':
      return 'Atrasado';
    default:
      return STATUS_LABELS[cs] ?? cs;
  }
}

function combinedStatusColor(cs: CombinedStatus) {
  switch (cs) {
    case 'al_dia':
      return 'success' as const;
    case 'atrasado':
      return 'error' as const;
    case 'suspended':
      return 'warning' as const;
    case 'cancel':
    case 'delete':
      return 'default' as const;
    case 'register':
      return 'info' as const;
    default:
      return 'default' as const;
  }
}

function combinedStatusIcon(cs: CombinedStatus) {
  switch (cs) {
    case 'al_dia':
      return <CheckCircleIcon fontSize="small" />;
    case 'atrasado':
      return <WarningAmberIcon fontSize="small" />;
    default:
      return undefined;
  }
}

/** Sort priority: atrasado first, then al_dia, then the rest */
function combinedStatusSortValue(cs: CombinedStatus): number {
  switch (cs) {
    case 'atrasado':
      return 0;
    case 'al_dia':
      return 1;
    case 'suspended':
      return 2;
    case 'register':
      return 3;
    case 'cancel':
      return 4;
    case 'delete':
      return 5;
    default:
      return 6;
  }
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
  onRowClick,
}: SubscriptionsTableProps) {
  const columns: GridColDef<PaykuSubscriptionV3>[] = [
    {
      field: 'clientName',
      headerName: 'Cliente',
      flex: 1,
      minWidth: 160,
      valueGetter: (_value, row) => row.client?.name,
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
      width: 140,
      valueGetter: (_value, row) => combinedStatusSortValue(getCombinedStatus(row)),
      renderCell: ({ row }) => {
        const cs = getCombinedStatus(row);
        return (
          <Chip
            icon={combinedStatusIcon(cs)}
            label={combinedStatusLabel(cs)}
            size="small"
            color={combinedStatusColor(cs)}
            variant={cs === 'atrasado' ? 'filled' : 'outlined'}
          />
        );
      },
    },
    {
      field: 'cobros',
      headerName: 'Cobros',
      width: 90,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (_value, row) => getPaymentSummary(row.paid).successful,
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
        pagination: { paginationModel: { pageSize: 50 } },
        sorting: { sortModel: [{ field: 'status', sort: 'asc' }] },
      }}
      disableRowSelectionOnClick
      autoHeight
      onRowClick={(params) => onRowClick(params.row)}
      sx={{
        '& .MuiDataGrid-cell': { py: 0.5 },
        '& .MuiDataGrid-row': { cursor: 'pointer' },
      }}
      getRowId={(row) => row.id}
    />
  );
}

export default SubscriptionsTable;
