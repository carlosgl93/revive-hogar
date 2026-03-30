import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
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

import { PaykuPaidCycle, PaykuSubscriptionV3 } from '@/types/payku';

import { isSubscriptionUpToDate } from '../utils/subscriptionStatus';

interface SubscriptionDetailDialogProps {
  subscription: PaykuSubscriptionV3 | null;
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

const STATUS_LABELS: Record<string, string> = {
  active: 'Activa',
  register: 'Registro',
  suspended: 'Suspendida',
  cancel: 'Cancelada',
  delete: 'Eliminada',
  finish: 'Finalizada',
};

const STATUS_COLORS: Record<string, 'success' | 'info' | 'warning' | 'error' | 'default'> = {
  active: 'success',
  register: 'info',
  suspended: 'warning',
  cancel: 'error',
  delete: 'error',
  finish: 'default',
};

const PAID_STATUS_LABELS: Record<string, string> = {
  success: 'Pagado',
  pending: 'Pendiente',
  failed: 'Fallido',
  rejected: 'Rechazado',
};

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

function getNextPaymentDate(paid: PaykuPaidCycle[]): string | null {
  if (!paid || paid.length === 0) return null;
  const pending = paid.find((p) => p.status === 'pending');
  return pending?.payment_cycle_day ?? null;
}

function SubscriptionDetailDialog({ subscription, open, onClose }: SubscriptionDetailDialogProps) {
  if (!subscription) return null;

  const sub = subscription;
  const upToDate = isSubscriptionUpToDate(sub.paid);
  const successfulCycles = (sub.paid ?? []).filter((p) => p.status === 'success');
  const totalPaid = successfulCycles.reduce((sum, p) => sum + p.amount_paid, 0);
  const nextPayment = getNextPaymentDate(sub.paid);
  const lastCard = sub.active_card;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth scroll="paper">
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={700}>
            {sub.client.name}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        {/* Client info */}
        <Grid2 container spacing={2} sx={{ mb: 3 }}>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Typography variant="caption" color="text.secondary">
              Email
            </Typography>
            <Typography variant="body2">{sub.client.email}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 3 }}>
            <Typography variant="caption" color="text.secondary">
              Telefono
            </Typography>
            <Typography variant="body2">{sub.client.phone || '-'}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 3 }}>
            <Typography variant="caption" color="text.secondary">
              Direccion
            </Typography>
            <Typography variant="body2">{sub.client.address || '-'}</Typography>
          </Grid2>
        </Grid2>

        <Divider sx={{ mb: 2 }} />

        {/* Subscription info */}
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          Suscripcion
        </Typography>

        <Grid2 container spacing={2} sx={{ mb: 2 }}>
          <Grid2 size={{ xs: 6, sm: 3 }}>
            <Typography variant="caption" color="text.secondary">
              Plan
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {sub.plain?.name ?? '-'}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 3 }}>
            <Typography variant="caption" color="text.secondary">
              Estado Suscripcion
            </Typography>
            <Box sx={{ mt: 0.5 }}>
              <Chip
                label={STATUS_LABELS[sub.status] ?? sub.status}
                size="small"
                color={STATUS_COLORS[sub.status] ?? 'default'}
              />
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 3 }}>
            <Typography variant="caption" color="text.secondary">
              Estado de Pago
            </Typography>
            <Box sx={{ mt: 0.5 }}>
              {sub.status === 'active' ? (
                <Chip
                  icon={upToDate ? <CheckCircleIcon /> : <WarningAmberIcon />}
                  label={upToDate ? 'Al Dia' : 'Atrasado'}
                  size="small"
                  color={upToDate ? 'success' : 'error'}
                  variant={upToDate ? 'outlined' : 'filled'}
                />
              ) : (
                <Typography variant="body2" color="text.secondary">
                  -
                </Typography>
              )}
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 3 }}>
            <Typography variant="caption" color="text.secondary">
              Proximo Cobro
            </Typography>
            <Typography
              variant="body2"
              fontWeight={600}
              color={nextPayment ? 'text.primary' : 'text.secondary'}
            >
              {nextPayment ? formatDate(nextPayment) : '-'}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 3 }}>
            <Typography variant="caption" color="text.secondary">
              Inicio
            </Typography>
            <Typography variant="body2">{formatDate(sub.start)}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 3 }}>
            <Typography variant="caption" color="text.secondary">
              Cobros Exitosos
            </Typography>
            <Typography variant="body2">
              {successfulCycles.length} / {(sub.paid ?? []).length}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 3 }}>
            <Typography variant="caption" color="text.secondary">
              Total Pagado
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {formatCLP(totalPaid)}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 3 }}>
            <Typography variant="caption" color="text.secondary">
              ID Suscripcion
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
              {sub.id}
            </Typography>
          </Grid2>
        </Grid2>

        {lastCard?.card_type && (
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
            <CreditCardIcon fontSize="small" color="action" />
            <Typography variant="body2">
              {lastCard.card_type} ****{lastCard.last_4_digits?.slice(-4)}
            </Typography>
          </Stack>
        )}

        <Divider sx={{ mb: 2 }} />

        {/* Payment cycles */}
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          Historial de Cobros ({(sub.paid ?? []).length})
        </Typography>

        {!sub.paid || sub.paid.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Sin historial de cobros
          </Typography>
        ) : (
          <TableContainer sx={{ maxHeight: 400 }}>
            <Table size="small" stickyHeader>
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
                {sub.paid.map((cycle) => {
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
                        <Typography
                          variant="body2"
                          sx={{ fontFamily: 'monospace', fontSize: '0.7rem' }}
                        >
                          {tx?.authorization_code ?? '-'}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default SubscriptionDetailDialog;
