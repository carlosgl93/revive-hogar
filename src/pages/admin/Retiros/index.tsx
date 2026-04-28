import { useMemo, useState } from 'react';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  Alert,
  Box,
  Chip,
  Container,
  IconButton,
  Stack,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { useRetiros } from '@/firebase/useRetiros';
import { EstadoRetiro, Retiro } from '@/types/models';

const CHILE_TZ = 'America/Santiago';

function getTodayChile(): string {
  return new Date().toLocaleDateString('sv-SE', { timeZone: CHILE_TZ });
}

function formatFecha(dateStr: string): string {
  const [y, m, d] = dateStr.split('-');
  return `${d}-${m}-${y}`;
}

function formatHora(isoStr?: string): string {
  if (!isoStr) return '-';
  return new Date(isoStr).toLocaleTimeString('es-CL', {
    timeZone: CHILE_TZ,
    hour: '2-digit',
    minute: '2-digit',
  });
}

const ESTADO_LABELS: Record<EstadoRetiro, string> = {
  pendiente: 'Pendiente',
  completado: 'Completado',
  problema: 'Problema',
};

const ESTADO_COLORS: Record<EstadoRetiro, 'default' | 'success' | 'error'> = {
  pendiente: 'default',
  completado: 'success',
  problema: 'error',
};

type TabEstado = 'todos' | EstadoRetiro;

function Retiros() {
  const [fecha, setFecha] = useState(getTodayChile());
  const [tabEstado, setTabEstado] = useState<TabEstado>('todos');

  const { retiros, loading, error } = useRetiros(fecha);

  const retirosFiltrados = useMemo(() => {
    if (tabEstado === 'todos') return retiros;
    return retiros.filter((r) => r.estado === tabEstado);
  }, [retiros, tabEstado]);

  const counts = useMemo(
    () => ({
      todos: retiros.length,
      pendiente: retiros.filter((r) => r.estado === 'pendiente').length,
      completado: retiros.filter((r) => r.estado === 'completado').length,
      problema: retiros.filter((r) => r.estado === 'problema').length,
    }),
    [retiros],
  );

  const columns: GridColDef<Retiro>[] = [
    {
      field: 'orden',
      headerName: '#',
      width: 50,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'clienteNombre',
      headerName: 'Cliente',
      flex: 1,
      minWidth: 140,
    },
    {
      field: 'direccion',
      headerName: 'Direccion',
      flex: 1.5,
      minWidth: 180,
    },
    {
      field: 'estado',
      headerName: 'Estado',
      width: 120,
      renderCell: ({ value }) => {
        const estado = value as EstadoRetiro;
        return <Chip label={ESTADO_LABELS[estado]} size="small" color={ESTADO_COLORS[estado]} />;
      },
    },
    {
      field: 'completadoAt',
      headerName: 'Hora',
      width: 80,
      renderCell: ({ value }) => formatHora(value as string | undefined),
    },
    {
      field: 'tipoProblema',
      headerName: 'Tipo problema',
      width: 160,
      renderCell: ({ value }) => {
        if (!value) return '-';
        const labels: Record<string, string> = {
          no_pudieron_retirar: 'No pudieron retirar',
          mucho_material: 'Mucho material',
          mezclado: 'Material mezclado',
          otro: 'Otro',
        };
        return labels[value as string] ?? (value as string);
      },
    },
    {
      field: 'descripcionProblema',
      headerName: 'Descripcion',
      flex: 1,
      minWidth: 160,
      renderCell: ({ value }) => (value as string) || '-',
    },
    {
      field: 'fotoUrl',
      headerName: 'Foto',
      width: 70,
      align: 'center',
      sortable: false,
      renderCell: ({ value }) =>
        value ? (
          <Tooltip title="Ver foto">
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
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" fontWeight={700}>
            Retiros
          </Typography>
          <TextField
            type="date"
            size="small"
            label="Fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Stack>

        <Typography variant="body2" color="text.secondary">
          {formatFecha(fecha)} — {counts.todos} retiro{counts.todos !== 1 ? 's' : ''}
        </Typography>

        <Tabs value={tabEstado} onChange={(_, v) => setTabEstado(v as TabEstado)}>
          <Tab label={`Todos (${counts.todos})`} value="todos" />
          <Tab label={`Pendientes (${counts.pendiente})`} value="pendiente" />
          <Tab label={`Completados (${counts.completado})`} value="completado" />
          <Tab label={`Con problemas (${counts.problema})`} value="problema" />
        </Tabs>

        {error && <Alert severity="error">{error.message}</Alert>}

        <Box>
          <DataGrid
            rows={retirosFiltrados}
            columns={columns}
            loading={loading}
            density="compact"
            pageSizeOptions={[25, 50, 100]}
            initialState={{
              pagination: { paginationModel: { pageSize: 25 } },
              sorting: { sortModel: [{ field: 'orden', sort: 'asc' }] },
            }}
            disableRowSelectionOnClick
            autoHeight
            getRowId={(row) => row.id!}
            sx={{ '& .MuiDataGrid-cell': { py: 0.5 } }}
          />
        </Box>
      </Stack>
    </Container>
  );
}

export default Retiros;
