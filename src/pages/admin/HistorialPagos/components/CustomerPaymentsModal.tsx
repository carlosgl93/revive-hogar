import { useCallback, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
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

import { paykuSubscriptionsApi } from '@/api/paykuSubscriptions';
import { HistoricPayment, UserHistoricPayments } from '@/types/payku';

type HistoricRow = UserHistoricPayments & { id: string; isPending: boolean };

interface CustomerPaymentsModalProps {
  customer: HistoricRow | null;
  open: boolean;
  onClose: () => void;
  onToggleSettled: (docId: string, currentlySettled: boolean) => void;
}

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('es-CL');
}

function formatCLP(amount: number): string {
  return `$${amount.toLocaleString('es-CL')}`;
}

function CustomerPaymentsModal({
  customer,
  open,
  onClose,
  onToggleSettled,
}: CustomerPaymentsModalProps) {
  const [subscriptionDetail, setSubscriptionDetail] = useState<Record<string, unknown> | null>(
    null,
  );
  const [subLoading, setSubLoading] = useState(false);
  const [subError, setSubError] = useState<string | null>(null);

  const handleViewSubscription = useCallback(async (subscriptionId: string) => {
    setSubLoading(true);
    setSubError(null);
    setSubscriptionDetail(null);
    try {
      const res = await paykuSubscriptionsApi.get(subscriptionId);
      setSubscriptionDetail(res.data as Record<string, unknown>);
    } catch {
      setSubError('Error al cargar datos de la suscripcion');
    } finally {
      setSubLoading(false);
    }
  }, []);

  const handleClose = useCallback(() => {
    setSubscriptionDetail(null);
    setSubError(null);
    onClose();
  }, [onClose]);

  if (!customer) return null;

  const payments = Object.entries(customer.payments).sort(
    ([, a], [, b]) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const totalPaid = payments.reduce((sum, [, p]) => sum + p.amount, 0);
  const subscriptionPayments = payments.filter(([, p]) => p.type === 'subscription');
  const botonPayments = payments.filter(([, p]) => p.type === 'boton_de_pago');

  // Collect unique subscription IDs
  const subscriptionIds = [
    ...new Set(subscriptionPayments.map(([, p]) => p.subscriptionId).filter(Boolean) as string[]),
  ];

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth scroll="paper">
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={700}>
            {customer.direccion}
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        {/* Customer summary */}
        <Grid2 container spacing={2} sx={{ mb: 3 }}>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Typography variant="caption" color="text.secondary">
              Email
            </Typography>
            <Typography variant="body2">{customer.email || '-'}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 3 }}>
            <Typography variant="caption" color="text.secondary">
              Nombre
            </Typography>
            <Typography variant="body2">{customer.fullName || '-'}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 3 }}>
            <Typography variant="caption" color="text.secondary">
              Telefono
            </Typography>
            <Typography variant="body2">{customer.phone || '-'}</Typography>
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 3 }}>
            <Typography variant="caption" color="text.secondary">
              Total pagado
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {formatCLP(totalPaid)}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 3 }}>
            <Typography variant="caption" color="text.secondary">
              Total cobros
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {customer.totalPayments}
            </Typography>
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 3 }}>
            <Typography variant="caption" color="text.secondary">
              Estado
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Chip
                label={
                  customer.manuallySettled ? 'Saldado' : customer.isPending ? 'Pendiente' : 'Al dia'
                }
                size="small"
                color={customer.manuallySettled ? 'info' : customer.isPending ? 'error' : 'success'}
                variant={customer.manuallySettled ? 'outlined' : 'filled'}
              />
              {(customer.isPending || customer.manuallySettled) && (
                <Button
                  size="small"
                  variant="outlined"
                  color={customer.manuallySettled ? 'warning' : 'success'}
                  onClick={() => onToggleSettled(customer.id, !!customer.manuallySettled)}
                >
                  {customer.manuallySettled ? 'Desmarcar' : 'Marcar saldado'}
                </Button>
              )}
            </Stack>
            {customer.manuallySettled && customer.settledAt && (
              <Typography variant="caption" color="text.secondary">
                Saldado el {formatDate(customer.settledAt)}
                {customer.settledBy ? ` por ${customer.settledBy}` : ''}
              </Typography>
            )}
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 3 }}>
            <Typography variant="caption" color="text.secondary">
              Anos sincronizados
            </Typography>
            <Typography variant="body2">{customer.syncedYears.join(', ')}</Typography>
          </Grid2>
        </Grid2>

        {/* Subscription IDs with fetch button */}
        {subscriptionIds.length > 0 && (
          <>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
              Suscripciones ({subscriptionIds.length})
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
              {subscriptionIds.map((subId) => (
                <Button
                  key={subId}
                  variant="outlined"
                  size="small"
                  endIcon={<OpenInNewIcon />}
                  onClick={() => handleViewSubscription(subId)}
                  disabled={subLoading}
                  sx={{ mb: 1 }}
                >
                  {subId}
                </Button>
              ))}
            </Stack>

            {subLoading && (
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <CircularProgress size={24} />
              </Box>
            )}
            {subError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {subError}
              </Alert>
            )}
            {subscriptionDetail && (
              <Box
                sx={{
                  mb: 2,
                  p: 2,
                  bgcolor: 'grey.50',
                  borderRadius: 1,
                  maxHeight: 300,
                  overflow: 'auto',
                }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mb: 1, display: 'block' }}
                >
                  Datos de suscripcion (Payku)
                </Typography>
                <pre style={{ fontSize: '0.75rem', margin: 0, whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(subscriptionDetail, null, 2)}
                </pre>
              </Box>
            )}
          </>
        )}

        <Divider sx={{ mb: 2 }} />

        {/* Payments table */}
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
          Historial de pagos ({payments.length})
        </Typography>

        {payments.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Sin pagos registrados
          </Typography>
        ) : (
          <TableContainer sx={{ maxHeight: 400 }}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Deposito</TableCell>
                  <TableCell align="right">Monto</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Asunto</TableCell>
                  <TableCell>Medio</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payments.map(([txId, payment]: [string, HistoricPayment], idx: number) => (
                  <TableRow key={txId}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{formatDate(payment.createdAt)}</TableCell>
                    <TableCell>{formatDate(payment.depositDate)}</TableCell>
                    <TableCell align="right">{formatCLP(payment.amount)}</TableCell>
                    <TableCell>
                      <Chip
                        label={payment.type === 'subscription' ? 'Sub' : 'Boton'}
                        size="small"
                        color={payment.type === 'subscription' ? 'info' : 'default'}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{
                          maxWidth: 200,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                        title={payment.subject}
                      >
                        {payment.subject}
                      </Typography>
                    </TableCell>
                    <TableCell>{payment.media}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Summary by type */}
        {subscriptionPayments.length > 0 && botonPayments.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="caption" color="text.secondary">
              Resumen: {subscriptionPayments.length} pagos por suscripcion, {botonPayments.length}{' '}
              pagos por boton de pago
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default CustomerPaymentsModal;
