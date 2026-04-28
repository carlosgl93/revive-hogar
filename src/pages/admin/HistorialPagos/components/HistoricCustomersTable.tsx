import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import UndoIcon from '@mui/icons-material/Undo';
import { Chip, IconButton, Stack, Tooltip } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { MergedClientRow } from '../hooks/useHistoricPayments';

interface HistoricCustomersTableProps {
  customers: MergedClientRow[];
  loading: boolean;
  onViewDetail: (customer: MergedClientRow) => void;
  onToggleSettled: (docId: string, currentlySettled: boolean) => void;
}

function formatCLP(amount: number): string {
  return `$${amount.toLocaleString('es-CL')}`;
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('es-CL');
}

function HistoricCustomersTable({
  customers,
  loading,
  onViewDetail,
  onToggleSettled,
}: HistoricCustomersTableProps) {
  const columns: GridColDef<MergedClientRow>[] = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      flex: 1,
      minWidth: 140,
    },
    {
      field: 'direccion',
      headerName: 'Direccion',
      flex: 1.5,
      minWidth: 180,
    },
    {
      field: 'correo',
      headerName: 'Email',
      flex: 1,
      minWidth: 180,
    },
    {
      field: 'monto',
      headerName: 'Monto',
      width: 110,
      align: 'right',
      headerAlign: 'right',
      renderCell: ({ value }) => ((value as number) > 0 ? formatCLP(value as number) : '-'),
    },
    {
      field: 'montoPendiente',
      headerName: 'Pendiente',
      width: 110,
      align: 'right',
      headerAlign: 'right',
      renderCell: ({ value }) =>
        (value as number) > 0 ? (
          <Chip label={formatCLP(value as number)} size="small" color="error" variant="outlined" />
        ) : (
          '-'
        ),
    },
    {
      field: 'lastPaymentDate',
      headerName: 'Ultimo Pago',
      width: 120,
      renderCell: ({ value }) => formatDate(value as string | null),
    },
    {
      field: 'totalPayments',
      headerName: 'N° Pagos',
      width: 90,
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ value }) => ((value as number) > 0 ? value : '-'),
    },
    {
      field: 'estado',
      headerName: 'Estado',
      width: 130,
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
      width: 100,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={0}>
          {row.hasHistoric && (
            <Tooltip title="Ver pagos del cliente" arrow>
              <IconButton size="small" color="primary" onClick={() => onViewDetail(row)}>
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
          )}
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
