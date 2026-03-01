import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { PaykuSubscription } from '../hooks/usePaykuSubscriptions';

interface SubscriptionsTableProps {
  subscriptions: PaykuSubscription[];
}

function statusColor(status: string) {
  switch (status) {
    case 'active':
      return 'success';
    case 'register':
      return 'info';
    case 'paused':
    case 'pending':
      return 'warning';
    case 'cancelled':
    case 'failed':
      return 'error';
    default:
      return 'default';
  }
}

function paymentStatusColor(status: string) {
  switch (status) {
    case 'success':
      return 'success';
    case 'pending':
      return 'warning';
    default:
      return 'error';
  }
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('es-CL');
}

function SubscriptionsTable({ subscriptions }: SubscriptionsTableProps) {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Cliente</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Telefono</TableCell>
            <TableCell>Plan</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Ultimo pago</TableCell>
            <TableCell align="right">Monto</TableCell>
            <TableCell>Tarjeta</TableCell>
            <TableCell>Inicio</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subscriptions.map((sub) => {
            const lastTx = sub.transactions?.[sub.transactions.length - 1];
            return (
              <TableRow key={sub.id} hover>
                <TableCell>{sub.client.name}</TableCell>
                <TableCell>{sub.client.email}</TableCell>
                <TableCell>{sub.client.phone}</TableCell>
                <TableCell>{sub.plan.name}</TableCell>
                <TableCell>
                  <Chip label={sub.status} size="small" color={statusColor(sub.status)} />
                </TableCell>
                <TableCell>
                  {lastTx ? (
                    <Chip
                      label={lastTx.status}
                      size="small"
                      color={paymentStatusColor(lastTx.status)}
                    />
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell align="right">
                  {lastTx ? `$${lastTx.amount.toLocaleString('es-CL')}` : '-'}
                </TableCell>
                <TableCell>
                  {sub.cards.card_type} {sub.cards.last_4_digits}
                </TableCell>
                <TableCell>{formatDate(sub.start)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SubscriptionsTable;
