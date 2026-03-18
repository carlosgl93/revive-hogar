import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid2,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { PaykuCustomer, PaykuCustomerSubscription, PaykuCustomerTransaction } from '@/types/payku';

interface CustomerDetailModalProps {
  customer: PaykuCustomer | null;
  open: boolean;
  onClose: () => void;
}

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('es-CL');
}

function formatCLP(amount: number): string {
  return `$${amount.toLocaleString('es-CL')}`;
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

const TX_STATUS_LABELS: Record<string, string> = {
  success: 'Pagado',
  pending: 'Pendiente',
  failed: 'Fallido',
  rejected: 'Rechazado',
};

function TxStatusIcon({ status }: { status: string }) {
  switch (status) {
    case 'success':
      return <CheckCircleIcon fontSize="small" color="success" />;
    case 'pending':
      return <HourglassEmptyIcon fontSize="small" color="action" />;
    default:
      return <ErrorOutlineIcon fontSize="small" color="error" />;
  }
}

function SubscriptionSection({ sub }: { sub: PaykuCustomerSubscription }) {
  const successTx = sub.transactions.filter((t) => t.status === 'success');
  const totalPaid = successTx.reduce((sum, t) => sum + t.amount, 0);
  const lastCard = sub.active_cards?.[sub.active_cards.length - 1];

  return (
    <Box sx={{ mb: 3 }}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          {sub.plan.name}
        </Typography>
        <Chip
          label={STATUS_LABELS[sub.status] ?? sub.status}
          size="small"
          color={STATUS_COLORS[sub.status] ?? 'default'}
        />
        <Typography variant="body2" color="text.secondary">
          {formatCLP(Number(sub.amount))}/mes
        </Typography>
      </Stack>

      <Grid2 container spacing={2} sx={{ mb: 1.5 }}>
        <Grid2 size={{ xs: 6, sm: 3 }}>
          <Typography variant="caption" color="text.secondary">
            ID Suscripcion
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
            {sub.id}
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 6, sm: 3 }}>
          <Typography variant="caption" color="text.secondary">
            Creada
          </Typography>
          <Typography variant="body2">{formatDate(sub.created_at)}</Typography>
        </Grid2>
        <Grid2 size={{ xs: 6, sm: 3 }}>
          <Typography variant="caption" color="text.secondary">
            Cobros exitosos
          </Typography>
          <Typography variant="body2">
            {successTx.length} / {sub.transactions.length}
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 6, sm: 3 }}>
          <Typography variant="caption" color="text.secondary">
            Total pagado
          </Typography>
          <Typography variant="body2" fontWeight={600}>
            {formatCLP(totalPaid)}
          </Typography>
        </Grid2>
      </Grid2>

      {lastCard && (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
          <CreditCardIcon fontSize="small" color="action" />
          <Typography variant="body2">
            {lastCard.card_type} ****{lastCard.last_4_digits.slice(-4)}
          </Typography>
        </Stack>
      )}

      {sub.transactions.length > 0 && (
        <TableContainer sx={{ maxHeight: 300 }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Fecha Cobro</TableCell>
                <TableCell>Fecha Pago</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell align="right">Monto</TableCell>
                <TableCell>Autorizacion</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sub.transactions.map((tx: PaykuCustomerTransaction, idx: number) => (
                <TableRow key={`${tx.transaction}-${idx}`}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{formatDate(tx.created_at)}</TableCell>
                  <TableCell>{formatDate(tx.date_payment)}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <TxStatusIcon status={tx.status} />
                      <Typography variant="body2">
                        {TX_STATUS_LABELS[tx.status] ?? tx.status}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">{tx.amount > 0 ? formatCLP(tx.amount) : '-'}</TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{ fontFamily: 'monospace', fontSize: '0.7rem' }}
                    >
                      {tx.authorization_code ?? '-'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {sub.transactions.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          Sin transacciones registradas
        </Typography>
      )}
    </Box>
  );
}

function CustomerDetailModal({ customer, open, onClose }: CustomerDetailModalProps) {
  if (!customer) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth scroll="paper">
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={700}>
            {customer.name}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        {/* Customer info */}
        <Grid2 container spacing={2} sx={{ mb: 3 }}>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Typography variant="caption" color="text.secondary">
              Email
            </Typography>
            <Typography variant="body2">{customer.email}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 3 }}>
            <Typography variant="caption" color="text.secondary">
              Telefono
            </Typography>
            <Typography variant="body2">{customer.phone || '-'}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 3 }}>
            <Typography variant="caption" color="text.secondary">
              Estado
            </Typography>
            <Typography variant="body2">
              <Chip
                label={customer.status === 'active' ? 'Activo' : customer.status}
                size="small"
                color={customer.status === 'active' ? 'success' : 'default'}
              />
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Typography variant="caption" color="text.secondary">
              Direccion
            </Typography>
            <Typography variant="body2">{customer.address || '-'}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 3 }}>
            <Typography variant="caption" color="text.secondary">
              Creado
            </Typography>
            <Typography variant="body2">{formatDate(customer.created_at)}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 3 }}>
            <Typography variant="caption" color="text.secondary">
              Suscripciones
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {customer.subscriptions.length}
            </Typography>
          </Grid2>
        </Grid2>

        <Divider sx={{ mb: 2 }} />

        {/* Subscriptions */}
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          Suscripciones ({customer.subscriptions.length})
        </Typography>

        {customer.subscriptions.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Este cliente no tiene suscripciones
          </Typography>
        ) : (
          customer.subscriptions.map((sub) => (
            <Box key={sub.id}>
              <SubscriptionSection sub={sub} />
              <Divider sx={{ mb: 2 }} />
            </Box>
          ))
        )}
      </DialogContent>
    </Dialog>
  );
}

export default CustomerDetailModal;
