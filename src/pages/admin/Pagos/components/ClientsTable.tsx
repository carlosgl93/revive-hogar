import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Chip, CircularProgress, IconButton, Tooltip } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { Cliente, PaymentType } from '@/types/models';
import { getPaymentStatusLabel } from '@/utils/cutDate';

import { getCurrentMonthKey } from '../utils/kpis';
import { buildPaymentReminderMessage, buildWhatsAppUrl } from '../utils/whatsapp';

interface ClientsTableProps {
  clients: Cliente[];
  loading: boolean;
  onMarkPaid?: (clientId: string) => void;
  markPaidLoading?: boolean;
}

function formatPaymentType(tipo: string) {
  switch (tipo) {
    case 'Suscripcion':
      return 'Suscripcion';
    case 'Transferencia':
      return 'Transferencia';
    case 'Particular':
      return 'Transferencia';
    case 'Boton de pago':
      return 'Boton de pago';
    case 'Suspendida':
      return 'Suspendida';
    case 'NA':
      return 'NA';
    case 'Recuperar':
      return 'Recuperar';
    default:
      return tipo;
  }
}

const MARK_PAID_TYPES: string[] = [PaymentType.TRANSFER, PaymentType.BOTON_DE_PAGO];

function ClientsTable({ clients, loading, onMarkPaid, markPaidLoading }: ClientsTableProps) {
  const monthKey = getCurrentMonthKey();
  const columns: GridColDef<Cliente>[] = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'comuna',
      headerName: 'Comuna',
      width: 130,
    },
    {
      field: 'dia',
      headerName: 'Dia',
      width: 90,
    },
    {
      field: 'monto',
      headerName: 'Monto',
      width: 110,
      align: 'right',
      headerAlign: 'right',
      renderCell: ({ value }) =>
        value != null ? `$${(value as number).toLocaleString('es-CL')}` : '-',
    },
    {
      field: 'tipoPago',
      headerName: 'Tipo pago',
      width: 120,
      valueGetter: (value) => formatPaymentType(value as string),
    },
    {
      field: 'fechaCorte',
      headerName: 'Fecha corte',
      width: 120,
      renderCell: ({ value }) =>
        value ? new Date(value as string).toLocaleDateString('es-CL') : '-',
    },
    {
      field: 'estado',
      headerName: 'Estado',
      width: 110,
      valueGetter: (_value, row) => {
        if (!row.fechaCorte) return 'sin_fecha';
        return getPaymentStatusLabel(row.fechaCorte);
      },
      renderCell: ({ value }) => {
        if (value === 'sin_fecha') {
          return <Chip label="Sin fecha" size="small" color="warning" />;
        }
        return value === 'al_dia' ? (
          <Chip label="Al dia" size="small" color="success" />
        ) : (
          <Chip label="Deudor" size="small" color="error" />
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 120,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => {
        const message = buildPaymentReminderMessage(row.nombre, row.paykuSubscriptionUrl);
        const url = buildWhatsAppUrl(row.telefono, message);
        const canMarkPaid =
          onMarkPaid && MARK_PAID_TYPES.includes(row.tipoPago) && row.pagos?.[monthKey] !== 'ok';
        const alreadyPaid =
          MARK_PAID_TYPES.includes(row.tipoPago) && row.pagos?.[monthKey] === 'ok';
        return (
          <>
            {canMarkPaid && (
              <Tooltip title="Marcar como pagado este mes" arrow>
                <IconButton
                  color="primary"
                  size="small"
                  disabled={markPaidLoading}
                  onClick={() => onMarkPaid(row.id ?? row.correo)}
                >
                  {markPaidLoading ? <CircularProgress size={18} /> : <CheckCircleOutlineIcon />}
                </IconButton>
              </Tooltip>
            )}
            {alreadyPaid && (
              <Tooltip title="Pagado este mes" arrow>
                <CheckCircleOutlineIcon color="success" fontSize="small" sx={{ mx: 0.5 }} />
              </Tooltip>
            )}
            <Tooltip title="Enviar mensaje por WhatsApp" arrow>
              <IconButton
                color="success"
                component="a"
                href={url}
                target="_blank"
                rel="noopener"
                size="small"
              >
                <WhatsAppIcon />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
  ];

  return (
    <DataGrid
      rows={clients}
      columns={columns}
      loading={loading}
      density="compact"
      pageSizeOptions={[25, 50, 100]}
      initialState={{
        pagination: { paginationModel: { pageSize: 25 } },
      }}
      disableRowSelectionOnClick
      autoHeight
      getRowId={(row) => row.id ?? row.correo}
      sx={{
        '& .MuiDataGrid-cell': { py: 0.5 },
      }}
    />
  );
}

export default ClientsTable;
