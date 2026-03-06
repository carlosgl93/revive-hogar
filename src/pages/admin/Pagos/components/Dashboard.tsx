import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ErrorIcon from '@mui/icons-material/Error';
import GroupIcon from '@mui/icons-material/Group';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PaymentIcon from '@mui/icons-material/Payment';
import PercentIcon from '@mui/icons-material/Percent';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Box, Card, CardContent, Grid2, Skeleton, Stack, Tooltip, Typography } from '@mui/material';

import { DashboardKPIs } from '../utils/kpis';

interface DashboardProps {
  kpis: DashboardKPIs | null;
  loading: boolean;
}

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  loading: boolean;
}

function KpiCard({ title, value, icon, color, loading }: KpiCardProps) {
  return (
    <Card variant="outlined">
      <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
        {loading ? (
          <Skeleton variant="rectangular" height={48} />
        ) : (
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box sx={{ color }}>{icon}</Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                {title}
              </Typography>
              <Typography variant="h6" fontWeight={700} color={color}>
                {value}
              </Typography>
            </Box>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}

function formatCLP(amount: number): string {
  return `$${amount.toLocaleString('es-CL')}`;
}

function Dashboard({ kpis, loading }: DashboardProps) {
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
        <KpiCard
          title="Suscripciones Activas"
          value={kpis?.activeSubscriptions ?? 0}
          icon={<CheckCircleIcon />}
          color="success.main"
          loading={loading}
        />
      </Grid2>
      <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
        <KpiCard
          title="Suspendidas"
          value={kpis?.suspendedSubscriptions ?? 0}
          icon={<PauseCircleIcon />}
          color="warning.main"
          loading={loading}
        />
      </Grid2>
      <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
        <KpiCard
          title="En Registro"
          value={kpis?.registeredSubscriptions ?? 0}
          icon={<HourglassEmptyIcon />}
          color="info.main"
          loading={loading}
        />
      </Grid2>
      <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
        <KpiCard
          title="Canceladas"
          value={kpis?.cancelledSubscriptions ?? 0}
          icon={<ErrorIcon />}
          color="error.main"
          loading={loading}
        />
      </Grid2>
      <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
        <Tooltip
          title={
            kpis
              ? `Suscripciones: ${formatCLP(kpis.subscriptionMonthlyIncome)} · Transferencias: ${formatCLP(kpis.transferMonthlyIncome)} · Boton de pago: ${formatCLP(kpis.botonDePagoMonthlyIncome)}`
              : ''
          }
          arrow
        >
          <div>
            <KpiCard
              title="Ingreso Mensual Esperado"
              value={kpis ? formatCLP(kpis.expectedMonthlyIncome) : '$0'}
              icon={<TrendingUpIcon />}
              color="text.secondary"
              loading={loading}
            />
          </div>
        </Tooltip>
      </Grid2>
      <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
        <KpiCard
          title="Ingreso Mensual Actual"
          value={kpis ? formatCLP(kpis.actualMonthlyIncome) : '$0'}
          icon={<TrendingUpIcon />}
          color="success.main"
          loading={loading}
        />
      </Grid2>
      <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
        <KpiCard
          title="Ingreso Anual Est."
          value={kpis ? formatCLP(kpis.expectedYearlyIncome) : '$0'}
          icon={<TrendingUpIcon />}
          color="success.main"
          loading={loading}
        />
      </Grid2>
      <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
        <KpiCard
          title="Suscripciones"
          value={kpis ? formatCLP(kpis.subscriptionMonthlyIncome) : '$0'}
          icon={<CreditCardIcon />}
          color="info.main"
          loading={loading}
        />
      </Grid2>
      <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
        <KpiCard
          title="Transferencias"
          value={kpis ? formatCLP(kpis.transferMonthlyIncome) : '$0'}
          icon={<AccountBalanceIcon />}
          color="info.main"
          loading={loading}
        />
      </Grid2>
      <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
        <KpiCard
          title="Boton de pago"
          value={kpis ? formatCLP(kpis.botonDePagoMonthlyIncome) : '$0'}
          icon={<PaymentIcon />}
          color="info.main"
          loading={loading}
        />
      </Grid2>
      <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
        <KpiCard
          title="Clientes (Al dia / Deudor)"
          value={kpis ? `${kpis.clientsAlDia} / ${kpis.clientsDeudor}` : '0 / 0'}
          icon={<GroupIcon />}
          color="text.primary"
          loading={loading}
        />
      </Grid2>
      <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
        <KpiCard
          title="Tasa de Cobranza"
          value={kpis ? `${kpis.collectionRate.toFixed(1)}%` : '0%'}
          icon={<PercentIcon />}
          color={kpis && kpis.collectionRate >= 80 ? 'success.main' : 'warning.main'}
          loading={loading}
        />
      </Grid2>
    </Grid2>
  );
}

export default Dashboard;
