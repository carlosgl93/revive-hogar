import { useMemo, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Switch,
  Tooltip,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { useNotifications } from '@toolpad/core/useNotifications';
import { doc, updateDoc } from 'firebase/firestore';

import { deleteUsuario } from '@/api/usuarios';
import Loading from '@/components/Loading';
import { db } from '@/firebase/config';
import { useRutas } from '@/firebase/useRutas';
import { useUsuarios } from '@/firebase/useUsuarios';
import { UserRole, Usuario } from '@/types/models';

import CreateUsuarioDialog from './components/CreateUsuarioDialog';

function Usuarios() {
  const { usuarios, loading, error } = useUsuarios();
  const { rutas } = useRutas();
  const notifications = useNotifications();

  const [createOpen, setCreateOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Usuario | null>(null);
  const [deleting, setDeleting] = useState(false);

  const routeDaysByUid = useMemo(() => {
    const map: Record<string, string[]> = {};
    for (const ruta of rutas) {
      if (ruta.choferUid) {
        if (!map[ruta.choferUid]) map[ruta.choferUid] = [];
        map[ruta.choferUid].push(ruta.dia);
      }
    }
    return map;
  }, [rutas]);

  async function handleToggleActivo(usuario: Usuario) {
    try {
      await updateDoc(doc(db, 'usuarios', usuario.id!), { activo: !usuario.activo });
      notifications.show(`${usuario.nombre} ${!usuario.activo ? 'activado' : 'desactivado'}`, {
        severity: 'success',
        autoHideDuration: 3000,
      });
    } catch {
      notifications.show('Error al actualizar usuario', { severity: 'error' });
    }
  }

  async function handleChangeRole(usuario: Usuario, role: UserRole) {
    try {
      await updateDoc(doc(db, 'usuarios', usuario.id!), { role });
      notifications.show(`Rol de ${usuario.nombre} cambiado a ${role}`, {
        severity: 'success',
        autoHideDuration: 3000,
      });
    } catch {
      notifications.show('Error al actualizar rol', { severity: 'error' });
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteUsuario(deleteTarget.uid);
      notifications.show(`${deleteTarget.nombre} eliminado`, {
        severity: 'success',
        autoHideDuration: 3000,
      });
      setDeleteTarget(null);
    } catch {
      notifications.show('Error al eliminar usuario', { severity: 'error' });
    } finally {
      setDeleting(false);
    }
  }

  if (loading) return <Loading />;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;

  const columns: GridColDef<Usuario>[] = [
    { field: 'nombre', headerName: 'Nombre', flex: 1, minWidth: 150 },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 200 },
    {
      field: 'role',
      headerName: 'Rol',
      width: 140,
      renderCell: ({ row }) => (
        <Select
          size="small"
          value={row.role}
          onChange={(e) => handleChangeRole(row, e.target.value as UserRole)}
          variant="standard"
          sx={{ minWidth: 100 }}
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="chofer">Chofer</MenuItem>
        </Select>
      ),
    },
    {
      field: 'rutaDias',
      headerName: 'Rutas asignadas',
      width: 200,
      sortable: false,
      renderCell: ({ row }) => {
        const dias = routeDaysByUid[row.uid] ?? [];
        return dias.length > 0 ? (
          <Stack direction="row" gap={0.5} flexWrap="wrap">
            {dias.map((d) => (
              <Chip key={d} label={d} size="small" color="primary" variant="outlined" />
            ))}
          </Stack>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Sin ruta
          </Typography>
        );
      },
    },
    {
      field: 'activo',
      headerName: 'Activo',
      width: 100,
      renderCell: ({ row }) => (
        <Switch checked={row.activo} onChange={() => handleToggleActivo(row)} size="small" />
      ),
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Tooltip title="Eliminar usuario" arrow>
          <IconButton color="error" size="small" onClick={() => setDeleteTarget(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <Stack spacing={3} sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight={600}>
          Usuarios
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setCreateOpen(true)}>
          Nuevo usuario
        </Button>
      </Stack>

      <DataGrid
        rows={usuarios}
        columns={columns}
        loading={loading}
        density="compact"
        pageSizeOptions={[25, 50]}
        initialState={{ pagination: { paginationModel: { pageSize: 25 } } }}
        disableRowSelectionOnClick
        autoHeight
        getRowId={(row) => row.id ?? row.uid}
      />

      <CreateUsuarioDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={() => setCreateOpen(false)}
      />

      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Eliminar usuario</DialogTitle>
        <DialogContent>
          <Typography>
            Estas seguro de eliminar a <strong>{deleteTarget?.nombre}</strong> (
            {deleteTarget?.email}
            )?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)} disabled={deleting}>
            Cancelar
          </Button>
          <Button color="error" variant="contained" onClick={handleDelete} disabled={deleting}>
            {deleting ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

export default Usuarios;
