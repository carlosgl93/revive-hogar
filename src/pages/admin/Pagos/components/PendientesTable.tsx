import PaymentIcon from '@mui/icons-material/Payment';
import { Button, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { Cliente } from '@/types/models';

interface PendientesTableProps {
  clients: Cliente[];
  loading: boolean;
  onCreateSubscription: (client: Cliente) => void;
  onCreateTransaction: (client: Cliente) => void;
}

function formatCLP(amount: number): string {
  return `$${amount.toLocaleString('es-CL')}`;
}

function PendientesTable({
  clients,
  loading,
  onCreateSubscription,
  onCreateTransaction,
}: PendientesTableProps) {
  const pendientes = clients.filter((c) => c.activo && (c.montoPendiente ?? 0) > 0);

  const columns: GridColDef<Cliente>[] = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'correo',
      headerName: 'Correo',
      width: 200,
    },
    {
      field: 'direccion',
      headerName: 'Direccion',
      width: 200,
    },
    {
      field: 'dia',
      headerName: 'Dia',
      width: 100,
    },
    {
      field: 'monto',
      headerName: 'Monto Mensual',
      width: 130,
      align: 'right',
      headerAlign: 'right',
      renderCell: ({ value }) => formatCLP(value as number),
    },
    {
      field: 'montoPendiente',
      headerName: 'Monto Pendiente',
      width: 140,
      align: 'right',
      headerAlign: 'right',
      renderCell: ({ value }) => (
        <Typography variant="body2" fontWeight={700} color="error.main">
          {formatCLP((value as number) ?? 0)}
        </Typography>
      ),
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 280,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1} alignItems="center">
          <Button
            size="small"
            variant="outlined"
            startIcon={<PaymentIcon />}
            onClick={() => onCreateSubscription(row)}
          >
            Suscripcion
          </Button>
          <Button
            size="small"
            variant="contained"
            color="warning"
            startIcon={<PaymentIcon />}
            onClick={() => onCreateTransaction(row)}
          >
            Cobro unico
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <DataGrid
      rows={pendientes}
      columns={columns}
      loading={loading}
      density="compact"
      pageSizeOptions={[25, 50, 100]}
      initialState={{
        pagination: { paginationModel: { pageSize: 25 } },
        sorting: { sortModel: [{ field: 'montoPendiente', sort: 'desc' }] },
      }}
      disableRowSelectionOnClick
      autoHeight
      getRowId={(row) => row.id ?? row.correo}
      sx={{ '& .MuiDataGrid-cell': { py: 0.5 } }}
    />
  );
}

export default PendientesTable;
