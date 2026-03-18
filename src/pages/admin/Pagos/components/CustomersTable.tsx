import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Chip, IconButton, Tooltip, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { PaykuCustomer, PaykuSubscriptionStatus } from '@/types/payku';

interface CustomersTableProps {
  customers: PaykuCustomer[];
  loading: boolean;
  onViewDetail: (customer: PaykuCustomer) => void;
}

const STATUS_COLORS: Record<string, 'success' | 'info' | 'warning' | 'error' | 'default'> = {
  active: 'success',
  register: 'info',
  suspended: 'warning',
  cancel: 'error',
  delete: 'error',
  finish: 'default',
};

const STATUS_LABELS: Record<string, string> = {
  active: 'Activa',
  register: 'Registro',
  suspended: 'Suspendida',
  cancel: 'Cancelada',
  delete: 'Eliminada',
  finish: 'Finalizada',
};

function formatCLP(amount: number): string {
  return `$${amount.toLocaleString('es-CL')}`;
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('es-CL');
}

/** Get the "best" subscription status — prioritize active, then suspended, etc. */
function getBestSubscription(customer: PaykuCustomer) {
  const priority: PaykuSubscriptionStatus[] = [
    'active',
    'suspended',
    'register',
    'finish',
    'cancel',
    'delete',
  ];
  for (const status of priority) {
    const sub = customer.subscriptions.find((s) => s.status === status);
    if (sub) return sub;
  }
  return customer.subscriptions[0] ?? null;
}

function CustomersTable({ customers, loading, onViewDetail }: CustomersTableProps) {
  const columns: GridColDef<PaykuCustomer>[] = [
    {
      field: 'name',
      headerName: 'Nombre',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'phone',
      headerName: 'Telefono',
      width: 120,
    },
    {
      field: 'plan',
      headerName: 'Plan',
      width: 130,
      valueGetter: (_value, row) => {
        const sub = getBestSubscription(row);
        return sub?.plan?.name ?? '-';
      },
    },
    {
      field: 'subStatus',
      headerName: 'Estado Sub.',
      width: 120,
      valueGetter: (_value, row) => {
        const sub = getBestSubscription(row);
        return sub?.status ?? '-';
      },
      renderCell: ({ value }) => {
        if (!value || value === '-') return '-';
        return (
          <Chip
            label={STATUS_LABELS[value as string] ?? value}
            size="small"
            color={STATUS_COLORS[value as string] ?? 'default'}
          />
        );
      },
    },
    {
      field: 'amount',
      headerName: 'Monto',
      width: 100,
      align: 'right',
      headerAlign: 'right',
      valueGetter: (_value, row) => {
        const sub = getBestSubscription(row);
        return sub ? Number(sub.amount) : 0;
      },
      renderCell: ({ value }) => ((value as number) > 0 ? formatCLP(value as number) : '-'),
    },
    {
      field: 'totalTx',
      headerName: 'Cobros',
      width: 80,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (_value, row) => {
        const sub = getBestSubscription(row);
        if (!sub) return 0;
        return sub.transactions.filter((t) => t.status === 'success').length;
      },
      renderCell: ({ value, row }) => {
        const sub = getBestSubscription(row);
        const total = sub?.transactions.length ?? 0;
        return (
          <Typography variant="body2">
            {value as number}/{total}
          </Typography>
        );
      },
    },
    {
      field: 'subscriptions',
      headerName: 'Subs.',
      width: 60,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (_value, row) => row.subscriptions.length,
    },
    {
      field: 'created_at',
      headerName: 'Creado',
      width: 110,
      renderCell: ({ value }) => formatDate(value as string),
    },
    {
      field: 'actions',
      headerName: 'Detalle',
      width: 70,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Tooltip title="Ver detalle del cliente" arrow>
          <IconButton size="small" color="primary" onClick={() => onViewDetail(row)}>
            <InfoOutlinedIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <DataGrid
      rows={customers}
      columns={columns}
      loading={loading}
      density="compact"
      pageSizeOptions={[25, 50, 100]}
      initialState={{
        pagination: { paginationModel: { pageSize: 25 } },
      }}
      disableRowSelectionOnClick
      autoHeight
      getRowId={(row) => row.id}
      sx={{
        '& .MuiDataGrid-cell': { py: 0.5 },
      }}
    />
  );
}

export default CustomersTable;
