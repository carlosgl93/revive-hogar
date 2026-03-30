import { useCallback, useMemo, useState } from 'react';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {
  Alert,
  Box,
  Button,
  Chip,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { useNotifications } from '@toolpad/core/useNotifications';

import Loading from '@/components/Loading';
import { useClients } from '@/firebase/useClients';
import { generarRetirosDiarios, updateRetiroEstado, useRetiros } from '@/firebase/useRetiros';
import { useRutas } from '@/firebase/useRutas';
import { useUserRole } from '@/firebase/useUserRole';
import { usePaykuSubscriptionsV3 } from '@/pages/admin/Pagos/hooks/usePaykuSubscriptionsV3';
import { isSubscriptionUpToDate } from '@/pages/admin/Pagos/utils/subscriptionStatus';
import { Cliente, PaymentStatus } from '@/types/models';

import ParadaCard from './components/ParadaCard';
import ParadaDetailDialog from './components/ParadaDetailDialog';
import PesajeForm from './components/PesajeForm';
import ReportarProblemaDialog from './components/ReportarProblemaDialog';

const DIAS_MAP: Record<number, string> = {
  1: 'Lunes',
  2: 'Martes',
  3: 'Miercoles',
  4: 'Jueves',
  5: 'Viernes',
  6: 'Sabado',
  0: 'Domingo',
};

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

// Debug: overrideable current date for testing
let debugDate: Date | null = null;

function getNow() {
  return debugDate ? new Date(debugDate) : new Date();
}

function getHoy() {
  return getNow().toISOString().split('T')[0];
}

function getDiaNombre() {
  return DIAS_MAP[getNow().getDay()] ?? '';
}

function getMesKey(): string {
  const now = getNow();
  return `${MESES[now.getMonth()]} ${now.getFullYear()}`;
}

export interface ClientePaymentInfo {
  paymentStatus: PaymentStatus;
  /** Payku subscription-based status: overrides paymentStatus when available */
  paykuStatus: 'al_dia' | 'atrasado' | 'sin_suscripcion';
  paykuSubscriptionUrl?: string;
  paykuSubscriptionId?: string;
  monto: number;
  plan?: string;
  clientEmail?: string;
}

function EnRuta() {
  const { usuario, loading: roleLoading } = useUserRole();
  const { rutas, loading: rutasLoading } = useRutas();
  const { clients, loading: clientsLoading } = useClients();
  const { subscriptions, loading: subsLoading } = usePaykuSubscriptionsV3();
  const notifications = useNotifications();

  const [debugDateStr, setDebugDateStr] = useState<string>('');

  // Update debug date when user changes it
  const handleDebugDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDebugDateStr(val);
    if (val) {
      debugDate = new Date(val + 'T00:00:00');
    } else {
      debugDate = null;
    }
  };

  const fecha = getHoy();
  const diaNombre = getDiaNombre();

  const choferUid = usuario?.uid;
  const { retiros, loading: retirosLoading } = useRetiros(fecha, choferUid);

  const [iniciando, setIniciando] = useState(false);
  const [reportRetiroId, setReportRetiroId] = useState<string | null>(null);
  const [selectedRetiro, setSelectedRetiro] = useState<(typeof retiros)[number] | null>(null);
  const [pesajeSaved, setPesajeSaved] = useState(false);

  const rutaHoy = useMemo(
    () => rutas.find((r) => r.dia === diaNombre && r.choferUid === choferUid),
    [rutas, diaNombre, choferUid],
  );

  // Build email -> subscription lookup from Payku data
  const subsByEmail = useMemo(() => {
    const map = new Map<string, (typeof subscriptions)[number]>();
    // Only consider active subscriptions for payment status
    for (const sub of subscriptions) {
      if (sub.status === 'active') {
        const email = sub.client.email.toLowerCase();
        // Keep the one with the most recent payment
        if (!map.has(email)) {
          map.set(email, sub);
        }
      }
    }
    return map;
  }, [subscriptions]);

  // Build a map of clienteId -> payment info combining internal + Payku data
  const clientPaymentMap = useMemo(() => {
    const mesKey = getMesKey();
    const map = new Map<string, ClientePaymentInfo>();
    for (const c of clients) {
      if (!c.id) continue;
      const internalStatus = (c.pagos?.[mesKey] || '') as PaymentStatus;
      const paykuSub = c.correo ? subsByEmail.get(c.correo.toLowerCase()) : undefined;

      let paykuStatus: ClientePaymentInfo['paykuStatus'] = 'sin_suscripcion';
      if (paykuSub) {
        paykuStatus = isSubscriptionUpToDate(paykuSub.paid) ? 'al_dia' : 'atrasado';
      }

      // If client has a Payku subscription, use that as source of truth for payment status
      let effectiveStatus = internalStatus;
      if (paykuSub) {
        effectiveStatus = paykuStatus === 'al_dia' ? 'ok' : 'atrasado';
      }

      map.set(c.id, {
        paymentStatus: effectiveStatus,
        paykuStatus,
        paykuSubscriptionUrl: c.paykuSubscriptionUrl,
        paykuSubscriptionId: paykuSub?.id,
        monto: c.monto,
        plan: c.plan ?? paykuSub?.plain?.name,
        clientEmail: c.correo,
      });
    }
    return map;
  }, [clients, subsByEmail]);

  // Build a map of clienteId -> full Cliente for the detail dialog
  const clientMap = useMemo(() => {
    const map = new Map<string, Cliente>();
    for (const c of clients) {
      if (c.id) map.set(c.id, c);
    }
    return map;
  }, [clients]);

  const completados = retiros.filter((r) => r.estado === 'completado').length;
  const problemas = retiros.filter((r) => r.estado === 'problema').length;
  const total = retiros.length;
  const progreso = total > 0 ? ((completados + problemas) / total) * 100 : 0;

  async function handleIniciarRuta() {
    if (!rutaHoy || !choferUid) return;
    setIniciando(true);
    try {
      await generarRetirosDiarios(rutaHoy, fecha, choferUid);
      notifications.show('Ruta iniciada', { severity: 'success', autoHideDuration: 3000 });
    } catch {
      notifications.show('Error al iniciar ruta', { severity: 'error' });
    } finally {
      setIniciando(false);
    }
  }

  const handleComplete = useCallback(
    async (retiroId: string) => {
      try {
        await updateRetiroEstado(retiroId, 'completado');
        notifications.show('Retiro completado', { severity: 'success', autoHideDuration: 2000 });
      } catch {
        notifications.show('Error al marcar como completado', { severity: 'error' });
      }
    },
    [notifications],
  );

  if (roleLoading || rutasLoading || retirosLoading || clientsLoading || subsLoading)
    return <Loading />;

  // if (diaNombre === 'Domingo') {
  //   return (
  //     <Box sx={{ p: 2, textAlign: 'center' }}>
  //       <Typography variant="h6" color="text.secondary">
  //         Hoy es domingo. No hay ruta programada.
  //       </Typography>
  //     </Box>
  //   );
  // }

  if (!rutaHoy) {
    return (
      <Box sx={{ p: 2 }}>
        <Box sx={{ p: 1.5, bgcolor: '#fff3cd', borderRadius: 1, border: '1px solid #ffc107' }}>
          <Typography variant="caption" color="text.secondary">
            🔧 DEBUG: Override date for testing
          </Typography>
          <TextField
            type="date"
            size="small"
            value={debugDateStr}
            onChange={handleDebugDateChange}
            sx={{ mt: 0.5, '& input': { fontSize: '0.875rem' } }}
          />
        </Box>

        <Alert severity="info">
          No tienes una ruta asignada para hoy ({diaNombre}). Contacta al administrador.
        </Alert>
      </Box>
    );
  }

  return (
    <>
      <Stack spacing={2}>
        {/* Debug: Date picker for testing */}
        <Box sx={{ p: 1.5, bgcolor: '#fff3cd', borderRadius: 1, border: '1px solid #ffc107' }}>
          <Typography variant="caption" color="text.secondary">
            🔧 DEBUG: Override date for testing
          </Typography>
          <TextField
            type="date"
            size="small"
            value={debugDateStr}
            onChange={handleDebugDateChange}
            sx={{ mt: 0.5, '& input': { fontSize: '0.875rem' } }}
          />
        </Box>

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6" fontWeight={600}>
              {diaNombre} - En Ruta
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {getNow().toLocaleDateString('es-CL', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Typography>
          </Box>
          <Stack direction="row" gap={1}>
            <Chip label={`${completados}/${total}`} color="success" size="small" />
            {problemas > 0 && <Chip label={`${problemas} prob.`} color="error" size="small" />}
          </Stack>
        </Stack>

        <LinearProgress
          variant="determinate"
          value={progreso}
          sx={{ height: 8, borderRadius: 4 }}
        />

        {retiros.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="text.secondary" gutterBottom>
              La ruta de hoy tiene {rutaHoy.paradas.length} paradas.
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayArrowIcon />}
              onClick={handleIniciarRuta}
              disabled={iniciando}
              sx={{ mt: 2 }}
            >
              {iniciando ? 'Iniciando...' : 'Iniciar ruta'}
            </Button>
          </Box>
        ) : (
          <Stack spacing={1.5}>
            {retiros.map((retiro) => (
              <ParadaCard
                key={retiro.id}
                retiro={retiro}
                paymentInfo={clientPaymentMap.get(retiro.clienteId)}
                onComplete={handleComplete}
                onReportProblem={(id) => setReportRetiroId(id)}
                onClick={setSelectedRetiro}
              />
            ))}
          </Stack>
        )}

        {/* Pesaje form - only show when all retiros are resolved (none pending) */}
        {total > 0 && retiros.every((r) => r.estado !== 'pendiente') && !pesajeSaved && (
          <PesajeForm
            fecha={fecha}
            choferUid={choferUid!}
            choferNombre={usuario?.nombre ?? ''}
            rutaId={rutaHoy.id ?? ''}
            onSaved={() => setPesajeSaved(true)}
          />
        )}

        {pesajeSaved && (
          <Alert severity="success" sx={{ mt: 1 }}>
            Pesaje registrado. Buen trabajo!
          </Alert>
        )}

        <ParadaDetailDialog
          open={!!selectedRetiro}
          retiro={selectedRetiro}
          cliente={selectedRetiro ? (clientMap.get(selectedRetiro.clienteId) ?? null) : null}
          paymentInfo={selectedRetiro ? clientPaymentMap.get(selectedRetiro.clienteId) : undefined}
          onClose={() => setSelectedRetiro(null)}
          onComplete={handleComplete}
          onReportProblem={(id) => {
            setSelectedRetiro(null);
            setReportRetiroId(id);
          }}
        />

        <ReportarProblemaDialog
          open={!!reportRetiroId}
          retiroId={reportRetiroId}
          onClose={() => setReportRetiroId(null)}
        />
      </Stack>
    </>
  );
}

export default EnRuta;
