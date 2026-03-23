import { useState } from 'react';

import CallIcon from '@mui/icons-material/Call';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import PaymentIcon from '@mui/icons-material/Payment';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';

import { useNotifications } from '@toolpad/core/useNotifications';

import { createPaykuTransaction } from '@/api/payku';
import { Cliente, Retiro } from '@/types/models';

interface Props {
  open: boolean;
  retiro: Retiro | null;
  cliente: Cliente | null;
  onClose: () => void;
  onComplete: (id: string) => void;
  onReportProblem: (id: string) => void;
}

const MESES = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];

function getMesKey(): string {
  const now = new Date();
  return `${MESES[now.getMonth()]} ${now.getFullYear()}`;
}

function buildWhatsAppUrl(phone: string, message: string): string {
  const normalized = phone.replace(/[\s+()-]/g, '').replace(/^0/, '56');
  const withCountry = normalized.startsWith('56') ? normalized : `56${normalized}`;
  return `https://wa.me/${withCountry}?text=${encodeURIComponent(message)}`;
}

function buildTelUrl(phone: string): string {
  const normalized = phone.replace(/[\s+()-]/g, '').replace(/^0/, '56');
  const withCountry = normalized.startsWith('56') ? normalized : `56${normalized}`;
  return `tel:+${withCountry}`;
}

function buildMapsEmbedUrl(address: string, comuna: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(`${address}, ${comuna}, Chile`)}&output=embed`;
}

function buildMapsUrl(address: string, comuna: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${address}, ${comuna}, Chile`)}`;
}

const PAYMENT_LABELS: Record<string, string> = {
  ok: 'Al dia',
  pendiente: 'Pendiente',
  atrasado: 'Atrasado',
};

const PAYMENT_COLORS: Record<string, 'success' | 'warning' | 'error' | 'default'> = {
  ok: 'success',
  pendiente: 'warning',
  atrasado: 'error',
};

function ParadaDetailDialog({
  open,
  retiro,
  cliente,
  onClose,
  onComplete,
  onReportProblem,
}: Props) {
  const [payMenuAnchor, setPayMenuAnchor] = useState<HTMLElement | null>(null);
  const [creatingPayLink, setCreatingPayLink] = useState(false);
  const notifications = useNotifications();

  if (!retiro) return null;

  const mesKey = getMesKey();
  const paymentStatus = cliente?.pagos?.[mesKey] || '';
  const isDone = retiro.estado !== 'pendiente';
  const isOverdue = paymentStatus === 'atrasado' || paymentStatus === 'pendiente';

  const vamosEnCaminoUrl = buildWhatsAppUrl(
    retiro.telefono,
    `Hola ${retiro.clienteNombre}, somos de Revive Hogar. Vamos en camino a tu domicilio a retirar tu reciclaje`,
  );
  const telUrl = buildTelUrl(retiro.telefono);
  const mapsEmbedUrl = buildMapsEmbedUrl(retiro.direccion, retiro.comuna);
  const mapsUrl = buildMapsUrl(retiro.direccion, retiro.comuna);

  async function handleSendPayLink(type: 'transaction' | 'subscription') {
    if (!retiro) return;
    setPayMenuAnchor(null);
    const planStr = cliente?.plan ? ` (plan ${cliente.plan})` : '';

    if (type === 'subscription' && cliente?.paykuSubscriptionUrl) {
      const msg = `Hola ${retiro.clienteNombre}, para regularizar tu pago${planStr} y seguir con el retiro de reciclaje, puedes suscribirte aqui: ${cliente.paykuSubscriptionUrl}`;
      window.open(buildWhatsAppUrl(retiro.telefono, msg), '_blank');
      return;
    }

    setCreatingPayLink(true);
    try {
      const amount = cliente?.monto || 0;
      const result = await createPaykuTransaction({
        clienteId: retiro.clienteId,
        email: cliente?.correo || '',
        amount,
        subject: `Retiro reciclaje${planStr} - ${retiro.clienteNombre}`,
      });

      const montoStr = amount ? `$${amount.toLocaleString('es-CL')}` : '';
      const msg = `Hola ${retiro.clienteNombre}, para regularizar tu pago${montoStr ? ` de ${montoStr}` : ''}${planStr} y seguir con el retiro de reciclaje, realiza tu pago aqui: ${result.url}`;
      window.open(buildWhatsAppUrl(retiro.telefono, msg), '_blank');
      notifications.show('Link de pago creado', { severity: 'success', autoHideDuration: 3000 });
    } catch (err) {
      console.error('Failed to create payment link:', err);
      notifications.show('Error al crear link de pago', { severity: 'error' });
    } finally {
      setCreatingPayLink(false);
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ pr: 6 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={600}>
            {retiro.clienteNombre}
          </Typography>
          <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          {/* Customer details */}
          <Box>
            <Typography variant="body2" color="text.secondary">
              Direccion
            </Typography>
            <Typography>
              {retiro.direccion}, {retiro.comuna}
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary">
              Telefono
            </Typography>
            <Typography>{retiro.telefono}</Typography>
          </Box>

          {cliente?.correo && (
            <Box>
              <Typography variant="body2" color="text.secondary">
                Email
              </Typography>
              <Typography>{cliente.correo}</Typography>
            </Box>
          )}

          {/* Payment status */}
          <Box>
            <Typography variant="body2" color="text.secondary">
              Estado de pago ({mesKey})
            </Typography>
            <Chip
              label={PAYMENT_LABELS[paymentStatus] || 'Sin info'}
              color={PAYMENT_COLORS[paymentStatus] || 'default'}
              size="small"
              sx={{ mt: 0.5 }}
            />
          </Box>

          {cliente?.plan && (
            <Box>
              <Typography variant="body2" color="text.secondary">
                Plan
              </Typography>
              <Typography>{cliente.plan}</Typography>
            </Box>
          )}

          {cliente?.notas && (
            <Box>
              <Typography variant="body2" color="text.secondary">
                Notas
              </Typography>
              <Typography variant="body2">{cliente.notas}</Typography>
            </Box>
          )}

          {/* Google Maps - large */}
          <Box sx={{ borderRadius: 1, overflow: 'hidden' }}>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block' }}
            >
              <Box
                component="iframe"
                src={mapsEmbedUrl}
                sx={{
                  width: '100%',
                  height: 250,
                  border: 0,
                  borderRadius: 1,
                  pointerEvents: 'none',
                }}
                loading="lazy"
                title={`Mapa ${retiro.direccion}`}
              />
            </a>
          </Box>

          <Divider />

          {/* Actions */}
          <Stack spacing={1.5}>
            <Button
              variant="outlined"
              color="success"
              startIcon={<WhatsAppIcon />}
              component="a"
              href={vamosEnCaminoUrl}
              target="_blank"
              rel="noopener"
              fullWidth
            >
              Enviar &quot;Vamos en camino&quot;
            </Button>

            {!isDone && (
              <Button
                variant="contained"
                color="success"
                startIcon={<CheckCircleIcon />}
                onClick={() => {
                  onComplete(retiro.id!);
                  onClose();
                }}
                fullWidth
              >
                Marcar como Retirado
              </Button>
            )}

            {!isDone && (
              <Button
                variant="outlined"
                color="warning"
                startIcon={<ReportProblemIcon />}
                onClick={() => {
                  onReportProblem(retiro.id!);
                }}
                fullWidth
              >
                Reportar problema
              </Button>
            )}

            {isOverdue && (
              <Button
                variant="contained"
                color="error"
                startIcon={
                  creatingPayLink ? <CircularProgress size={20} color="inherit" /> : <PaymentIcon />
                }
                onClick={(e) => setPayMenuAnchor(e.currentTarget)}
                disabled={creatingPayLink}
                fullWidth
              >
                {creatingPayLink ? 'Creando link...' : 'Enviar link de pago'}
              </Button>
            )}

            <Button
              variant="outlined"
              color="primary"
              startIcon={<CallIcon />}
              component="a"
              href={telUrl}
              fullWidth
            >
              Llamar al cliente
            </Button>
          </Stack>
        </Stack>
      </DialogContent>

      {/* Payment type selector */}
      <Menu anchorEl={payMenuAnchor} open={!!payMenuAnchor} onClose={() => setPayMenuAnchor(null)}>
        <MenuItem onClick={() => handleSendPayLink('transaction')}>
          <ListItemIcon>
            <PaymentIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Cobro unico (transaccion)</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleSendPayLink('subscription')}>
          <ListItemIcon>
            <PaymentIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText>Suscripcion mensual</ListItemText>
        </MenuItem>
      </Menu>
    </Dialog>
  );
}

export default ParadaDetailDialog;
