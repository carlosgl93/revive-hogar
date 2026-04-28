import { useCallback, useMemo, useState } from 'react';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {
  Alert,
  Box,
  Button,
  Chip,
  LinearProgress,
  Stack,
  Tab,
  Tabs,
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

const CHILE_TZ = 'America/Santiago';

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

function getHoy(): string {
  return new Date().toLocaleDateString('sv-SE', { timeZone: CHILE_TZ });
}

function getDiaNombre(): string {
  const day = new Intl.DateTimeFormat('en-US', {
    timeZone: CHILE_TZ,
    weekday: 'short',
  }).format(new Date());
  const map: Record<string, string> = {
    Mon: 'Lunes',
    Tue: 'Martes',
    Wed: 'Miercoles',
    Thu: 'Jueves',
    Fri: 'Viernes',
    Sat: 'Sabado',
    Sun: 'Domingo',
  };
  return map[day] ?? '';
}

function getMesKey(): string {
  const now = new Date();
  const month = parseInt(
    new Intl.DateTimeFormat('en-US', { timeZone: CHILE_TZ, month: 'numeric' }).format(now),
  );
  const year = new Intl.DateTimeFormat('en-US', {
    timeZone: CHILE_TZ,
    year: 'numeric',
  }).format(now);
  return `${MESES[month - 1]} ${year}`;
}

type RetiroTab = 'pendientes' | 'completadas' | 'problemas';

export interface ClientePaymentInfo {
  paymentStatus: PaymentStatus;
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

  const [tab, setTab] = useState<RetiroTab>('pendientes');

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

  const subsByEmail = useMemo(() => {
    const map = new Map<string, (typeof subscriptions)[number]>();
    for (const sub of subscriptions) {
      if (sub.status === 'active') {
        const email = sub.client.email.toLowerCase();
        if (!map.has(email)) {
          map.set(email, sub);
        }
      }
    }
    return map;
  }, [subscriptions]);

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

  const clientMap = useMemo(() => {
    const map = new Map<string, Cliente>();
    for (const c of clients) {
      if (c.id) map.set(c.id, c);
    }
    return map;
  }, [clients]);

  const completados = retiros.filter((r) => r.estado === 'completado').length;
  const problemas = retiros.filter((r) => r.estado === 'problema').length;
  const pendientes = retiros.filter((r) => r.estado === 'pendiente').length;
  const total = retiros.length;
  const progreso = total > 0 ? ((completados + problemas) / total) * 100 : 0;

  const retirosFiltered = useMemo(() => {
    if (tab === 'completadas') return retiros.filter((r) => r.estado === 'completado');
    if (tab === 'problemas') return retiros.filter((r) => r.estado === 'problema');
    return retiros.filter((r) => r.estado === 'pendiente');
  }, [retiros, tab]);

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

  if (!rutaHoy) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="info">
          No tienes una ruta asignada para hoy ({diaNombre}). Contacta al administrador.
        </Alert>
      </Box>
    );
  }

  return (
    <>
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6" fontWeight={600}>
              {diaNombre} - En Ruta
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {new Date().toLocaleDateString('es-CL', {
                timeZone: CHILE_TZ,
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
          <>
            <Tabs value={tab} onChange={(_, v) => setTab(v as RetiroTab)} variant="fullWidth">
              <Tab label={`Pendientes (${pendientes})`} value="pendientes" />
              <Tab label={`Realizadas (${completados})`} value="completadas" />
              <Tab label={`Problemas (${problemas})`} value="problemas" />
            </Tabs>

            <Stack spacing={1.5}>
              {retirosFiltered.length === 0 ? (
                <Typography color="text.secondary" sx={{ py: 3, textAlign: 'center' }}>
                  No hay paradas en esta categoría.
                </Typography>
              ) : (
                retirosFiltered.map((retiro) => (
                  <ParadaCard
                    key={retiro.id}
                    retiro={retiro}
                    paymentInfo={clientPaymentMap.get(retiro.clienteId)}
                    onComplete={handleComplete}
                    onReportProblem={(id) => setReportRetiroId(id)}
                    onClick={setSelectedRetiro}
                  />
                ))
              )}
            </Stack>
          </>
        )}

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
