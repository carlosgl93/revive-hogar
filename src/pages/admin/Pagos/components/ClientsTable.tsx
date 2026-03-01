import {
  Chip,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { Cliente } from '@/types/models';
import { getPaymentStatusLabel } from '@/utils/cutDate';

import WhatsAppButton from './WhatsAppButton';

interface ClientsTableProps {
  clients: Cliente[];
  loading: boolean;
}

function getStatusChip(client: Cliente) {
  if (!client.fechaCorte) {
    return <Chip label="Sin fecha" size="small" color="warning" />;
  }
  const status = getPaymentStatusLabel(client.fechaCorte);
  return status === 'al_dia' ? (
    <Chip label="Al dia" size="small" color="success" />
  ) : (
    <Chip label="Deudor" size="small" color="error" />
  );
}

function formatPaymentType(tipo: string) {
  switch (tipo) {
    case 'Suscripcion':
      return 'Suscripcion';
    case 'Particular':
      return 'Transferencia';
    case 'Efectivo':
      return 'Efectivo';
    default:
      return tipo;
  }
}

function ClientsTable({ clients, loading }: ClientsTableProps) {
  if (loading) {
    return (
      <Stack alignItems="center" py={4}>
        <CircularProgress />
      </Stack>
    );
  }

  if (clients.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary" textAlign="center" py={4}>
        No se encontraron clientes con los filtros seleccionados.
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Comuna</TableCell>
            <TableCell>Dia</TableCell>
            <TableCell align="right">Monto</TableCell>
            <TableCell>Tipo pago</TableCell>
            <TableCell>Fecha corte</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell align="center">Accion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client, idx) => (
            <TableRow key={client.id ?? idx} hover>
              <TableCell>{client.nombre}</TableCell>
              <TableCell>{client.comuna}</TableCell>
              <TableCell>{client.dia}</TableCell>
              <TableCell align="right">${client.monto?.toLocaleString('es-CL')}</TableCell>
              <TableCell>{formatPaymentType(client.tipoPago)}</TableCell>
              <TableCell>
                {client.fechaCorte ? new Date(client.fechaCorte).toLocaleDateString('es-CL') : '-'}
              </TableCell>
              <TableCell>{getStatusChip(client)}</TableCell>
              <TableCell align="center">
                <WhatsAppButton client={client} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ClientsTable;
