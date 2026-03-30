import { useMemo, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ScaleIcon from '@mui/icons-material/Scale';
import {
  Alert,
  Box,
  Card,
  CardContent,
  Container,
  Grid2,
  IconButton,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { collection, orderBy, query, where } from 'firebase/firestore';

import { db } from '@/firebase/config';
import { Pesaje } from '@/types/models';

type Period = 'dia' | 'semana' | 'mes';

function getDateRange(period: Period): { start: string; end: string; label: string } {
  const now = new Date();
  const end = now.toISOString().split('T')[0];

  if (period === 'dia') {
    return { start: end, end, label: 'Hoy' };
  }
  if (period === 'semana') {
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay() + 1); // Monday
    return { start: weekStart.toISOString().split('T')[0], end, label: 'Esta semana' };
  }
  // mes
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  return { start: monthStart.toISOString().split('T')[0], end, label: 'Este mes' };
}

function formatKg(kg: number): string {
  return `${kg.toFixed(1)} kg`;
}

interface KpiProps {
  title: string;
  value: string;
  loading: boolean;
}

function KpiCard({ title, value, loading }: KpiProps) {
  return (
    <Card variant="outlined">
      <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
        {loading ? (
          <Skeleton variant="rectangular" height={48} />
        ) : (
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box sx={{ color: 'primary.main' }}>
              <ScaleIcon />
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                {title}
              </Typography>
              <Typography variant="h6" fontWeight={700}>
                {value}
              </Typography>
            </Box>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}

function Pesajes() {
  const [period, setPeriod] = useState<Period>('dia');
  const { start, end, label } = getDateRange(period);

  const q = query(
    collection(db, 'pesajes'),
    where('fecha', '>=', start),
    where('fecha', '<=', end),
    orderBy('fecha', 'desc'),
  );

  const [snapshot, loading, error] = useCollection(q);

  const pesajes = useMemo<Pesaje[]>(
    () =>
      snapshot?.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Pesaje, 'id'>),
      })) ?? [],
    [snapshot],
  );

  const totals = useMemo(() => {
    return pesajes.reduce(
      (acc, p) => ({
        vidrio: acc.vidrio + p.vidrio,
        cartonPapel: acc.cartonPapel + p.cartonPapel,
        pet: acc.pet + p.pet,
        latas: acc.latas + p.latas,
        totalKg: acc.totalKg + p.totalKg,
      }),
      { vidrio: 0, cartonPapel: 0, pet: 0, latas: 0, totalKg: 0 },
    );
  }, [pesajes]);

  const columns: GridColDef<Pesaje>[] = [
    { field: 'fecha', headerName: 'Fecha', width: 110 },
    { field: 'choferNombre', headerName: 'Chofer', flex: 1, minWidth: 120 },
    {
      field: 'vidrio',
      headerName: 'Vidrio',
      width: 90,
      align: 'right',
      headerAlign: 'right',
      renderCell: ({ value }) => formatKg(value as number),
    },
    {
      field: 'cartonPapel',
      headerName: 'Carton+Papel',
      width: 120,
      align: 'right',
      headerAlign: 'right',
      renderCell: ({ value }) => formatKg(value as number),
    },
    {
      field: 'pet',
      headerName: 'PET',
      width: 90,
      align: 'right',
      headerAlign: 'right',
      renderCell: ({ value }) => formatKg(value as number),
    },
    {
      field: 'latas',
      headerName: 'Latas',
      width: 90,
      align: 'right',
      headerAlign: 'right',
      renderCell: ({ value }) => formatKg(value as number),
    },
    {
      field: 'totalKg',
      headerName: 'Total',
      width: 100,
      align: 'right',
      headerAlign: 'right',
      renderCell: ({ value }) => (
        <Typography variant="body2" fontWeight={700}>
          {formatKg(value as number)}
        </Typography>
      ),
    },
    {
      field: 'fotoUrl',
      headerName: 'Voucher',
      width: 80,
      align: 'center',
      sortable: false,
      renderCell: ({ value }) =>
        value ? (
          <Tooltip title="Ver voucher">
            <IconButton
              size="small"
              component="a"
              href={value as string}
              target="_blank"
              rel="noopener"
            >
              <OpenInNewIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        ) : (
          '-'
        ),
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Stack spacing={3}>
        <Typography variant="h4" fontWeight={700}>
          Pesaje
        </Typography>

        <Tabs value={period} onChange={(_, v) => setPeriod(v as Period)}>
          <Tab label="Hoy" value="dia" />
          <Tab label="Semana" value="semana" />
          <Tab label="Mes" value="mes" />
        </Tabs>

        {/* KPI summary */}
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 6, sm: 4, md: 2.4 }}>
            <KpiCard title="Total" value={formatKg(totals.totalKg)} loading={loading} />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 4, md: 2.4 }}>
            <KpiCard title="Vidrio" value={formatKg(totals.vidrio)} loading={loading} />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 4, md: 2.4 }}>
            <KpiCard title="Carton+Papel" value={formatKg(totals.cartonPapel)} loading={loading} />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 4, md: 2.4 }}>
            <KpiCard title="PET" value={formatKg(totals.pet)} loading={loading} />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 4, md: 2.4 }}>
            <KpiCard title="Latas" value={formatKg(totals.latas)} loading={loading} />
          </Grid2>
        </Grid2>

        <Typography variant="subtitle2" color="text.secondary">
          {label} — {pesajes.length} registro{pesajes.length !== 1 ? 's' : ''}
        </Typography>

        {error && <Alert severity="error">{error.message}</Alert>}

        <DataGrid
          rows={pesajes}
          columns={columns}
          loading={loading}
          density="compact"
          pageSizeOptions={[25, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 25 } },
          }}
          disableRowSelectionOnClick
          autoHeight
          getRowId={(row) => row.id!}
          sx={{ '& .MuiDataGrid-cell': { py: 0.5 } }}
        />

        {/* Voucher images gallery */}
        {pesajes.some((p) => p.fotoUrl) && (
          <>
            <Typography variant="h6" fontWeight={600}>
              Vouchers
            </Typography>
            <Grid2 container spacing={2}>
              {pesajes
                .filter((p) => p.fotoUrl)
                .map((p) => (
                  <Grid2 key={p.id} size={{ xs: 6, sm: 4, md: 3 }}>
                    <Card variant="outlined">
                      <Box
                        component="a"
                        href={p.fotoUrl}
                        target="_blank"
                        rel="noopener"
                        sx={{ display: 'block' }}
                      >
                        <Box
                          component="img"
                          src={p.fotoUrl}
                          alt={`Voucher ${p.fecha} - ${p.choferNombre}`}
                          sx={{
                            width: '100%',
                            height: 200,
                            objectFit: 'cover',
                          }}
                        />
                      </Box>
                      <CardContent sx={{ py: 1, '&:last-child': { pb: 1 } }}>
                        <Typography variant="caption" color="text.secondary">
                          {p.fecha} — {p.choferNombre}
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                          {formatKg(p.totalKg)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid2>
                ))}
            </Grid2>
          </>
        )}
      </Stack>
    </Container>
  );
}

export default Pesajes;
