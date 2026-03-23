import { FormEvent, useState } from 'react';

import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';

import { useNotifications } from '@toolpad/core/useNotifications';

import { createUsuario } from '@/api/usuarios';
import { UserRole } from '@/types/models';

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

function CreateUsuarioDialog({ open, onClose, onCreated }: Props) {
  const notifications = useNotifications();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('chofer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function reset() {
    setNombre('');
    setEmail('');
    setPassword('');
    setRole('chofer');
    setError(null);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await createUsuario({ email, password, nombre, role });
      notifications.show(`Usuario ${nombre} creado exitosamente`, {
        severity: 'success',
        autoHideDuration: 3000,
      });
      reset();
      onCreated();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al crear usuario';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    if (!loading) {
      reset();
      onClose();
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Nuevo usuario</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              label="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              fullWidth
              autoFocus
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Contrasena"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              inputProps={{ minLength: 6 }}
              helperText="Minimo 6 caracteres"
            />
            <TextField
              label="Rol"
              select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              fullWidth
            >
              <MenuItem value="chofer">Chofer</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? 'Creando...' : 'Crear'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default CreateUsuarioDialog;
