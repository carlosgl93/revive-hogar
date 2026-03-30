import { useState } from 'react';

import CallIcon from '@mui/icons-material/Call';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PaymentIcon from '@mui/icons-material/Payment';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { useNotifications } from '@toolpad/core/useNotifications';

import { createPaykuTransaction } from '@/api/payku';
import { Retiro } from '@/types/models';

import type { ClientePaymentInfo } from '../EnRuta';

interface Props {
  retiro: Retiro;
  paymentInfo?: ClientePaymentInfo;
  onComplete: (id: string) => void;
  onReportProblem: (id: string) => void;
  onClick: (retiro: Retiro) => void;
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

function buildMapsUrl(address: string, comuna: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${address}, ${comuna}, Chile`)}`;
}

function buildMapsEmbedUrl(address: string, comuna: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(`${address}, ${comuna}, Chile`)}&output=embed`;
}

const ESTADO_COLOR = {
  pendiente: '#e0e0e0',
  completado: '#4caf50',
  problema: '#f44336',
} as const;

const PROBLEMA_LABELS: Record<string, string> = {
  no_pudieron_retirar: 'No pudieron retirar',
  mucho_material: 'Mucho material',
  mezclado: 'Material mezclado',
  otro: 'Otro problema',
};

const PAYMENT_CHIP: Record<string, { label: string; color: 'success' | 'error' | 'warning' }> = {
  atrasado: { label: 'Pago atrasado', color: 'error' },
  pendiente: { label: 'Pago pendiente', color: 'warning' },
  ok: { label: 'Al dia', color: 'success' },
};

function ParadaCard({ retiro, paymentInfo, onComplete, onReportProblem, onClick }: Props) {
  const isDone = retiro.estado !== 'pendiente';
  const borderColor = ESTADO_COLOR[retiro.estado];
  const isOverdue =
    paymentInfo?.paymentStatus === 'atrasado' || paymentInfo?.paymentStatus === 'pendiente';

  const [payMenuAnchor, setPayMenuAnchor] = useState<HTMLElement | null>(null);
  const [creatingPayLink, setCreatingPayLink] = useState(false);
  const notifications = useNotifications();

  const whatsappMsg = `Hola ${retiro.clienteNombre}, somos de Revive Hogar. Estamos en camino para el retiro en ${retiro.direccion}. Llegaremos pronto!`;
  const whatsappUrl = buildWhatsAppUrl(retiro.telefono, whatsappMsg);
  const telUrl = buildTelUrl(retiro.telefono);
  const mapsUrl = buildMapsUrl(retiro.direccion, retiro.comuna);
  const mapsEmbedUrl = buildMapsEmbedUrl(retiro.direccion, retiro.comuna);

  async function handleSendPayLink(type: 'transaction' | 'subscription') {
    setPayMenuAnchor(null);
    const planStr = paymentInfo?.plan ? ` (plan ${paymentInfo.plan})` : '';

    if (type === 'subscription' && paymentInfo?.paykuSubscriptionUrl) {
      const msg = `Hola ${retiro.clienteNombre}, para regularizar tu pago${planStr} y seguir con el retiro de reciclaje, puedes suscribirte aqui: ${paymentInfo.paykuSubscriptionUrl}`;
      window.open(buildWhatsAppUrl(retiro.telefono, msg), '_blank');
      return;
    }

    // Create a Payku transaction link via Cloud Function
    setCreatingPayLink(true);
    try {
      const amount = paymentInfo?.monto || 0;
      const result = await createPaykuTransaction({
        clienteId: retiro.clienteId,
        email: '', // Cloud Function will look up client email
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
    <Card
      sx={{
        borderLeft: `5px solid ${isOverdue ? '#f44336' : borderColor}`,
        opacity: isDone ? 0.75 : 1,
        cursor: 'pointer',
      }}
      onClick={() => onClick(retiro)}
    >
      <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
        {/* Customer info + status chips on the right */}
        <Stack direction="row" gap={1} alignItems="center" justifyContent="space-between" mb={0.5}>
          <Stack direction="row" gap={1} alignItems="center" sx={{ minWidth: 0 }}>
            <Chip
              label={retiro.orden}
              size="small"
              sx={{ fontWeight: 700, minWidth: 28, flexShrink: 0 }}
            />
            <Typography variant="subtitle1" fontWeight={600} noWrap>
              {retiro.clienteNombre}
            </Typography>
          </Stack>
          <Stack direction="row" gap={0.5} flexShrink={0}>
            {retiro.estado === 'completado' && (
              <Chip label="Completado" color="success" size="small" />
            )}
            {paymentInfo && PAYMENT_CHIP[paymentInfo.paymentStatus] && (
              <Chip
                label={PAYMENT_CHIP[paymentInfo.paymentStatus].label}
                color={PAYMENT_CHIP[paymentInfo.paymentStatus].color}
                size="small"
                variant={paymentInfo.paymentStatus === 'ok' ? 'outlined' : 'filled'}
              />
            )}
            {paymentInfo?.paykuStatus === 'sin_suscripcion' && (
              <Chip label="Sin suscripcion" size="small" variant="outlined" />
            )}
          </Stack>
        </Stack>

        <Typography variant="body2" color="text.secondary">
          {retiro.direccion}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {retiro.comuna}
        </Typography>

        {retiro.estado === 'problema' && retiro.tipoProblema && (
          <Box sx={{ mt: 0.5 }}>
            <Chip
              label={PROBLEMA_LABELS[retiro.tipoProblema] ?? retiro.tipoProblema}
              color="error"
              size="small"
              variant="outlined"
            />
            {retiro.descripcionProblema && (
              <Typography variant="caption" display="block" color="error" sx={{ mt: 0.5 }}>
                {retiro.descripcionProblema}
              </Typography>
            )}
          </Box>
        )}

        {/* Action buttons — own row, evenly spaced */}
        <Stack
          direction="row"
          spacing={0.5}
          sx={{ mt: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}
          onClick={(e) => e.stopPropagation()}
        >
          {!isDone && (
            <>
              <Tooltip title="Marcar completado" arrow>
                <IconButton color="success" onClick={() => onComplete(retiro.id!)} size="small">
                  <CheckCircleIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Reportar problema" arrow>
                <IconButton
                  color="warning"
                  onClick={() => onReportProblem(retiro.id!)}
                  size="small"
                >
                  <ReportProblemIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
          {(isOverdue || paymentInfo?.paykuStatus === 'sin_suscripcion') && (
            <Tooltip title={isOverdue ? 'Enviar link de pago' : 'Crear suscripcion'} arrow>
              <IconButton
                color={isOverdue ? 'error' : 'primary'}
                onClick={(e) => setPayMenuAnchor(e.currentTarget)}
                size="small"
                disabled={creatingPayLink}
              >
                {creatingPayLink ? <CircularProgress size={20} /> : <PaymentIcon />}
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Llamar" arrow>
            <IconButton component="a" href={telUrl} color="primary" size="small">
              <CallIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="WhatsApp" arrow>
            <IconButton
              component="a"
              href={whatsappUrl}
              target="_blank"
              rel="noopener"
              color="success"
              size="small"
            >
              <WhatsAppIcon />
            </IconButton>
          </Tooltip>
        </Stack>

        {/* Small Google Maps embed */}
        <Box
          sx={{ mt: 1.5, borderRadius: 1, overflow: 'hidden', height: 120 }}
          onClick={(e) => e.stopPropagation()}
        >
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
            <Box
              component="iframe"
              src={mapsEmbedUrl}
              sx={{
                width: '100%',
                height: 120,
                border: 0,
                borderRadius: 1,
                pointerEvents: 'none',
              }}
              loading="lazy"
              title={`Mapa ${retiro.direccion}`}
            />
          </a>
        </Box>
      </CardContent>

      {/* Payment link dropdown menu */}
      <Menu
        anchorEl={payMenuAnchor}
        open={!!payMenuAnchor}
        onClose={() => setPayMenuAnchor(null)}
        onClick={(e) => e.stopPropagation()}
      >
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
    </Card>
  );
}

export default ParadaCard;
