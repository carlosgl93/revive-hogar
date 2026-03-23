import { useCallback, useEffect, useMemo, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SaveIcon from '@mui/icons-material/Save';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';

import { useNotifications } from '@toolpad/core/useNotifications';
import { doc, setDoc } from 'firebase/firestore';

import { createUsuario, deleteUsuario } from '@/api/usuarios';
import Loading from '@/components/Loading';
import { db } from '@/firebase/config';
import { useClients } from '@/firebase/useClients';
import { useRutas } from '@/firebase/useRutas';
import { useUsuarios } from '@/firebase/useUsuarios';
import { Parada, Ruta } from '@/types/models';

import AddClienteDialog from './components/AddClienteDialog';

const DIAS = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

function Rutas() {
  const { rutas, loading: rutasLoading, error: rutasError } = useRutas();
  const { clients, loading: clientsLoading } = useClients();
  const { usuarios } = useUsuarios();
  const notifications = useNotifications();

  const [selectedDia, setSelectedDia] = useState(0);
  const [localParadas, setLocalParadas] = useState<Parada[]>([]);
  const [choferUid, setChoferUid] = useState('');
  const [saving, setSaving] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [dirty, setDirty] = useState(false);

  // Chofer CRUD state
  const [newChoferNombre, setNewChoferNombre] = useState('');
  const [newChoferEmail, setNewChoferEmail] = useState('');
  const [newChoferPassword, setNewChoferPassword] = useState('');
  const [creatingChofer, setCreatingChofer] = useState(false);
  const [deletingUid, setDeletingUid] = useState<string | null>(null);

  const dia = DIAS[selectedDia];

  const choferes = useMemo(
    () => usuarios.filter((u) => u.role === 'chofer' && u.activo),
    [usuarios],
  );

  // Which days each chofer is assigned to
  const choferDias = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const ruta of rutas) {
      if (ruta.choferUid) {
        const existing = map.get(ruta.choferUid) || [];
        existing.push(ruta.dia);
        map.set(ruta.choferUid, existing);
      }
    }
    return map;
  }, [rutas]);

  async function handleCreateChofer() {
    if (!newChoferNombre || !newChoferEmail || !newChoferPassword) return;
    setCreatingChofer(true);
    try {
      await createUsuario({
        email: newChoferEmail,
        password: newChoferPassword,
        nombre: newChoferNombre,
        role: 'chofer',
      });
      setNewChoferNombre('');
      setNewChoferEmail('');
      setNewChoferPassword('');
      notifications.show('Chofer creado', { severity: 'success', autoHideDuration: 3000 });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al crear chofer';
      notifications.show(message, { severity: 'error' });
    } finally {
      setCreatingChofer(false);
    }
  }

  async function handleDeleteChofer(uid: string) {
    setDeletingUid(uid);
    try {
      await deleteUsuario(uid);
      notifications.show('Chofer eliminado', { severity: 'success', autoHideDuration: 3000 });
    } catch {
      notifications.show('Error al eliminar chofer', { severity: 'error' });
    } finally {
      setDeletingUid(null);
    }
  }

  // Reset local state when the selected day changes or rutas load
  useEffect(() => {
    const ruta = rutas.find((r) => r.dia === dia);
    if (ruta) {
      // Deduplicate paradas by clienteId (in case of corrupted data)
      const seen = new Set<string>();
      const deduped = [...ruta.paradas]
        .sort((a, b) => a.orden - b.orden)
        .filter((p) => {
          if (seen.has(p.clienteId)) return false;
          seen.add(p.clienteId);
          return true;
        })
        .map((p, i) => ({ ...p, orden: i + 1 }));
      setLocalParadas(deduped);
      setChoferUid(ruta.choferUid ?? '');
      // Mark dirty if duplicates were removed so user can save the fix
      setDirty(deduped.length < ruta.paradas.length);
    } else {
      setLocalParadas([]);
      setChoferUid('');
      setDirty(false);
    }
  }, [dia, rutasLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  const availableClients = useMemo(() => {
    const usedIds = new Set(localParadas.map((p) => p.clienteId));
    return clients.filter((c) => c.activo && c.id && !usedIds.has(c.id));
  }, [clients, localParadas]);

  const handleAddParada = useCallback((parada: Parada) => {
    setLocalParadas((prev) => [...prev, { ...parada, orden: prev.length + 1 }]);
    setDirty(true);
    setAddOpen(false);
  }, []);

  function handleRemove(index: number) {
    setLocalParadas((prev) => {
      const next = prev.filter((_, i) => i !== index);
      return next.map((p, i) => ({ ...p, orden: i + 1 }));
    });
    setDirty(true);
  }

  function handleMoveUp(index: number) {
    if (index === 0) return;
    setLocalParadas((prev) => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next.map((p, i) => ({ ...p, orden: i + 1 }));
    });
    setDirty(true);
  }

  function handleMoveDown(index: number) {
    if (index === localParadas.length - 1) return;
    setLocalParadas((prev) => {
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next.map((p, i) => ({ ...p, orden: i + 1 }));
    });
    setDirty(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const choferNombre = choferes.find((c) => c.uid === choferUid)?.nombre ?? '';
      const rutaData: Omit<Ruta, 'id'> = {
        dia,
        choferUid: choferUid || undefined,
        choferNombre: choferNombre || undefined,
        paradas: localParadas,
      };

      const existingRuta = rutas.find((r) => r.dia === dia);
      const rutaId = existingRuta?.id ?? dia;
      await setDoc(doc(db, 'rutas', rutaId), rutaData);

      notifications.show(`Ruta del ${dia} guardada`, {
        severity: 'success',
        autoHideDuration: 3000,
      });
      setDirty(false);
    } catch {
      notifications.show('Error al guardar ruta', { severity: 'error' });
    } finally {
      setSaving(false);
    }
  }

  if (rutasLoading || clientsLoading) return <Loading />;
  if (rutasError) return <Alert severity="error">{rutasError.message}</Alert>;

  return (
    <Stack spacing={3} sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={600}>
        Administracion de rutas
      </Typography>

      {/* Chofer management */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography fontWeight={600}>Choferes</Typography>
            <Chip label={choferes.length} size="small" />
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            {/* Existing choferes */}
            {choferes.length > 0 && (
              <List disablePadding>
                {choferes.map((c) => (
                  <ListItem
                    key={c.uid}
                    divider
                    secondaryAction={
                      <Tooltip title="Eliminar chofer" arrow>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteChofer(c.uid)}
                          disabled={deletingUid === c.uid}
                        >
                          {deletingUid === c.uid ? (
                            <CircularProgress size={18} />
                          ) : (
                            <DeleteIcon fontSize="small" />
                          )}
                        </IconButton>
                      </Tooltip>
                    }
                  >
                    <ListItemText
                      primary={c.nombre}
                      secondary={
                        <Stack component="span" direction="row" spacing={0.5} alignItems="center">
                          <span>{c.email}</span>
                          {choferDias.get(c.uid)?.map((d) => (
                            <Chip
                              key={d}
                              label={d}
                              size="small"
                              variant="outlined"
                              sx={{ ml: 0.5 }}
                            />
                          ))}
                        </Stack>
                      }
                      secondaryTypographyProps={{ component: 'div' }}
                    />
                  </ListItem>
                ))}
              </List>
            )}

            {choferes.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                No hay choferes registrados. Crea uno para poder asignarlo a una ruta.
              </Typography>
            )}

            {/* Create new chofer */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems="flex-start">
              <TextField
                label="Nombre"
                size="small"
                value={newChoferNombre}
                onChange={(e) => setNewChoferNombre(e.target.value)}
              />
              <TextField
                label="Email"
                size="small"
                type="email"
                value={newChoferEmail}
                onChange={(e) => setNewChoferEmail(e.target.value)}
              />
              <TextField
                label="Contraseña"
                size="small"
                type="password"
                value={newChoferPassword}
                onChange={(e) => setNewChoferPassword(e.target.value)}
              />
              <Button
                variant="contained"
                startIcon={
                  creatingChofer ? (
                    <CircularProgress size={18} color="inherit" />
                  ) : (
                    <PersonAddIcon />
                  )
                }
                onClick={handleCreateChofer}
                disabled={
                  creatingChofer || !newChoferNombre || !newChoferEmail || !newChoferPassword
                }
                sx={{ whiteSpace: 'nowrap' }}
              >
                Crear chofer
              </Button>
            </Stack>
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Tabs
        value={selectedDia}
        onChange={(_, v) => setSelectedDia(v as number)}
        variant="scrollable"
        scrollButtons="auto"
      >
        {DIAS.map((d) => (
          <Tab key={d} label={d} />
        ))}
      </Tabs>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="flex-start">
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Chofer asignado</InputLabel>
          <Select
            value={choferUid}
            onChange={(e) => {
              setChoferUid(e.target.value);
              setDirty(true);
            }}
            label="Chofer asignado"
          >
            <MenuItem value="">Sin asignar</MenuItem>
            {choferes.map((c) => (
              <MenuItem key={c.uid} value={c.uid}>
                {c.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setAddOpen(true)}>
          Agregar cliente
        </Button>

        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          disabled={saving || !dirty}
        >
          {saving ? 'Guardando...' : 'Guardar'}
        </Button>
      </Stack>

      {localParadas.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="text.secondary">
            No hay paradas definidas para el {dia}. Agrega clientes para armar la ruta.
          </Typography>
        </Paper>
      ) : (
        <Paper>
          <List disablePadding>
            {localParadas.map((parada, index) => (
              <ListItem
                key={parada.clienteId}
                divider={index < localParadas.length - 1}
                secondaryAction={
                  <Stack direction="row" spacing={0.5}>
                    <Tooltip title="Subir" arrow>
                      <span>
                        <IconButton
                          size="small"
                          disabled={index === 0}
                          onClick={() => handleMoveUp(index)}
                        >
                          <ArrowUpwardIcon fontSize="small" />
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title="Bajar" arrow>
                      <span>
                        <IconButton
                          size="small"
                          disabled={index === localParadas.length - 1}
                          onClick={() => handleMoveDown(index)}
                        >
                          <ArrowDownwardIcon fontSize="small" />
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title="Quitar" arrow>
                      <IconButton size="small" color="error" onClick={() => handleRemove(index)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                }
              >
                <ListItemText
                  primary={`${parada.orden}. ${parada.nombre}`}
                  secondary={`${parada.direccion}, ${parada.comuna} — ${parada.telefono}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      <AddClienteDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={handleAddParada}
        availableClients={availableClients}
      />
    </Stack>
  );
}

export default Rutas;
