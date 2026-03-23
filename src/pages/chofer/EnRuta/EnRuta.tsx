import { useCallback, useMemo, useState } from 'react';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Alert, Box, Button, Chip, LinearProgress, Stack, Typography } from '@mui/material';

import { useNotifications } from '@toolpad/core/useNotifications';

import Loading from '@/components/Loading';
import { useClients } from '@/firebase/useClients';
import { generarRetirosDiarios, updateRetiroEstado, useRetiros } from '@/firebase/useRetiros';
import { useRutas } from '@/firebase/useRutas';
import { useUserRole } from '@/firebase/useUserRole';
import { Cliente, PaymentStatus } from '@/types/models';

import ParadaCard from './components/ParadaCard';
import ParadaDetailDialog from './components/ParadaDetailDialog';
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

function getHoy() {
  return new Date().toISOString().split('T')[0];
}

function getDiaNombre() {
  return DIAS_MAP[new Date().getDay()] ?? '';
}

function getMesKey(): string {
  const now = new Date();
  return `${MESES[now.getMonth()]} ${now.getFullYear()}`;
}

export interface ClientePaymentInfo {
  paymentStatus: PaymentStatus;
  paykuSubscriptionUrl?: string;
  monto: number;
  plan?: string;
}

function EnRuta() {
  const { usuario, loading: roleLoading } = useUserRole();
  const { rutas, loading: rutasLoading } = useRutas();
  const { clients, loading: clientsLoading } = useClients();
  const notifications = useNotifications();

  const fecha = getHoy();
  const diaNombre = getDiaNombre();

  const choferUid = usuario?.uid;
  const { retiros, loading: retirosLoading } = useRetiros(fecha, choferUid);

  const [iniciando, setIniciando] = useState(false);
  const [reportRetiroId, setReportRetiroId] = useState<string | null>(null);
  const [selectedRetiro, setSelectedRetiro] = useState<(typeof retiros)[number] | null>(null);

  const rutaHoy = useMemo(
    () => rutas.find((r) => r.dia === diaNombre && r.choferUid === choferUid),
    [rutas, diaNombre, choferUid],
  );

  // Build a map of clienteId -> payment info for current month
  const clientPaymentMap = useMemo(() => {
    const mesKey = getMesKey();
    const map = new Map<string, ClientePaymentInfo>();
    for (const c of clients) {
      if (!c.id) continue;
      map.set(c.id, {
        paymentStatus: (c.pagos?.[mesKey] || '') as PaymentStatus,
        paykuSubscriptionUrl: c.paykuSubscriptionUrl,
        monto: c.monto,
        plan: c.plan,
      });
    }
    return map;
  }, [clients]);

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

  if (roleLoading || rutasLoading || retirosLoading || clientsLoading) return <Loading />;

  if (diaNombre === 'Domingo') {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Hoy es domingo. No hay ruta programada.
        </Typography>
      </Box>
    );
  }

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
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h6" fontWeight={600}>
            {diaNombre} - En Ruta
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date().toLocaleDateString('es-CL', {
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

      <LinearProgress variant="determinate" value={progreso} sx={{ height: 8, borderRadius: 4 }} />

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

      <ParadaDetailDialog
        open={!!selectedRetiro}
        retiro={selectedRetiro}
        cliente={selectedRetiro ? (clientMap.get(selectedRetiro.clienteId) ?? null) : null}
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
  );
}

export default EnRuta;
