import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import UndoIcon from '@mui/icons-material/Undo';
import { Chip, IconButton, Stack, Tooltip } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { HistoricPayment, UserHistoricPayments } from '@/types/payku';

type HistoricRow = UserHistoricPayments & { id: string; isPending: boolean };

interface HistoricCustomersTableProps {
  customers: HistoricRow[];
  loading: boolean;
  onViewDetail: (customer: HistoricRow) => void;
  onToggleSettled: (docId: string, currentlySettled: boolean) => void;
}

function formatCLP(amount: number): string {
  return `$${amount.toLocaleString('es-CL')}`;
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('es-CL');
}

function getMainType(payments: Record<string, HistoricPayment>): string {
  const values = Object.values(payments);
  const subCount = values.filter((p) => p.type === 'subscription').length;
  const btnCount = values.filter((p) => p.type === 'boton_de_pago').length;
  if (subCount > 0 && btnCount > 0) return 'Mixto';
  if (subCount > 0) return 'Suscripcion';
  return 'Boton de pago';
}

function getLastAmount(payments: Record<string, HistoricPayment>): number {
  const sorted = Object.values(payments).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  return sorted[0]?.amount ?? 0;
}

function HistoricCustomersTable({
  customers,
  loading,
  onViewDetail,
  onToggleSettled,
}: HistoricCustomersTableProps) {
  const columns: GridColDef<HistoricRow>[] = [
    {
      field: 'direccion',
      headerName: 'Direccion',
      flex: 1.5,
      minWidth: 200,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      minWidth: 180,
    },
    {
      field: 'fullName',
      headerName: 'Nombre',
      flex: 1,
      minWidth: 140,
      renderCell: ({ value }) => (value as string) || '-',
    },
    {
      field: 'lastPaymentDate',
      headerName: 'Ultimo Pago',
      width: 120,
      renderCell: ({ value }) => formatDate(value as string),
    },
    {
      field: 'totalPayments',
      headerName: 'Total Pagos',
      width: 100,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'lastAmount',
      headerName: 'Ultimo Monto',
      width: 120,
      align: 'right',
      headerAlign: 'right',
      valueGetter: (_value, row) => getLastAmount(row.payments),
      renderCell: ({ value }) => ((value as number) > 0 ? formatCLP(value as number) : '-'),
    },
    {
      field: 'tipo',
      headerName: 'Tipo',
      width: 120,
      valueGetter: (_value, row) => getMainType(row.payments),
      renderCell: ({ value }) => {
        const color = value === 'Suscripcion' ? 'info' : value === 'Mixto' ? 'warning' : 'default';
        return <Chip label={value as string} size="small" color={color} />;
      },
    },
    {
      field: 'estado',
      headerName: 'Estado',
      width: 140,
      valueGetter: (_value, row) => {
        if (row.manuallySettled) return 'Saldado';
        return row.isPending ? 'Pendiente' : 'Al dia';
      },
      renderCell: ({ row }) => {
        if (row.manuallySettled) {
          return <Chip label="Saldado" size="small" color="info" variant="outlined" />;
        }
        return (
          <Chip
            label={row.isPending ? 'Pendiente' : 'Al dia'}
            size="small"
            color={row.isPending ? 'error' : 'success'}
          />
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 110,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={0}>
          <Tooltip title="Ver pagos del cliente" arrow>
            <IconButton size="small" color="primary" onClick={() => onViewDetail(row)}>
              <InfoOutlinedIcon />
            </IconButton>
          </Tooltip>
          {row.isPending ? (
            <Tooltip title="Marcar como saldado" arrow>
              <IconButton
                size="small"
                color="success"
                onClick={() => onToggleSettled(row.id, false)}
              >
                <CheckCircleOutlineIcon />
              </IconButton>
            </Tooltip>
          ) : row.manuallySettled ? (
            <Tooltip title="Desmarcar saldado" arrow>
              <IconButton
                size="small"
                color="warning"
                onClick={() => onToggleSettled(row.id, true)}
              >
                <UndoIcon />
              </IconButton>
            </Tooltip>
          ) : null}
        </Stack>
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

export default HistoricCustomersTable;
