import { useCallback, useEffect, useMemo, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SaveIcon from '@mui/icons-material/Save';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
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
  InputAdornment,
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

import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useNotifications } from '@toolpad/core/useNotifications';
import { doc, setDoc, writeBatch } from 'firebase/firestore';

import { createUsuario, deleteUsuario } from '@/api/usuarios';
import Loading from '@/components/Loading';
import { db } from '@/firebase/config';
import { useClients } from '@/firebase/useClients';
import { useRutas } from '@/firebase/useRutas';
import { useUsuarios } from '@/firebase/useUsuarios';
import { Parada, Ruta } from '@/types/models';

import AddClienteDialog from './components/AddClienteDialog';
import CambiarDiaDialog from './components/CambiarDiaDialog';

const DIAS = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

interface SortableParadaItemProps {
  parada: Parada;
  index: number;
  onCambiarDia: (parada: Parada) => void;
  onRemove: (index: number) => void;
}

function SortableParadaItem({ parada, index, onCambiarDia, onRemove }: SortableParadaItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: parada.clienteId,
  });

  return (
    <ListItem
      ref={setNodeRef}
      divider
      sx={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        bgcolor: isDragging ? 'action.hover' : 'background.paper',
        zIndex: isDragging ? 1 : 'auto',
      }}
      secondaryAction={
        <Stack direction="row" spacing={0.5}>
          <Tooltip title="Cambiar dia" arrow>
            <IconButton size="small" color="primary" onClick={() => onCambiarDia(parada)}>
              <SwapHorizIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Quitar" arrow>
            <IconButton size="small" color="error" onClick={() => onRemove(index)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      }
    >
      <IconButton
        size="small"
        sx={{ cursor: 'grab', mr: 1, color: 'text.disabled' }}
        {...attributes}
        {...listeners}
      >
        <DragIndicatorIcon fontSize="small" />
      </IconButton>
      <ListItemText
        primary={`${parada.orden}. ${parada.nombre}`}
        secondary={`${parada.direccion}, ${parada.comuna} — ${parada.telefono}`}
      />
    </ListItem>
  );
}

function Rutas() {
  const { rutas, loading: rutasLoading, error: rutasError } = useRutas();
  const { clients, loading: clientsLoading } = useClients();
  const { usuarios } = useUsuarios();
  const notifications = useNotifications();

  const [selectedDia, setSelectedDia] = useState(0);
  const [selectedRutaId, setSelectedRutaId] = useState<string | null>(null);
  const [localParadas, setLocalParadas] = useState<Parada[]>([]);
  const [choferUid, setChoferUid] = useState('');
  const [saving, setSaving] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [cambiarDiaTarget, setCambiarDiaTarget] = useState<Parada | null>(null);
  const [cambiarDiaSaving, setCambiarDiaSaving] = useState(false);

  // Chofer CRUD state
  const [newChoferNombre, setNewChoferNombre] = useState('');
  const [newChoferEmail, setNewChoferEmail] = useState('');
  const [newChoferPassword, setNewChoferPassword] = useState('');
  const [creatingChofer, setCreatingChofer] = useState(false);
  const [deletingUid, setDeletingUid] = useState<string | null>(null);
  const [showChoferPassword, setShowChoferPassword] = useState(false);

  const dia = DIAS[selectedDia];

  const rutasDelDia = useMemo(
    () =>
      rutas
        .filter((r) => r.dia === dia)
        .sort((a, b) => (a.movil ?? '').localeCompare(b.movil ?? '')),
    [rutas, dia],
  );

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

  // Reset selected ruta when day changes
  useEffect(() => {
    setSelectedRutaId(null);
    setLocalParadas([]);
    setChoferUid('');
    setDirty(false);
  }, [dia]);

  // Load local state when a ruta is selected
  useEffect(() => {
    if (!selectedRutaId) return;
    const ruta = rutas.find((r) => r.id === selectedRutaId);
    if (ruta) {
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
      setDirty(deduped.length < ruta.paradas.length);
    }
  }, [selectedRutaId, rutasLoading]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setLocalParadas((prev) => {
      const oldIndex = prev.findIndex((p) => p.clienteId === active.id);
      const newIndex = prev.findIndex((p) => p.clienteId === over.id);
      return arrayMove(prev, oldIndex, newIndex).map((p, i) => ({ ...p, orden: i + 1 }));
    });
    setDirty(true);
  }

  async function handleSave() {
    if (!selectedRutaId) return;
    setSaving(true);
    try {
      const selectedRuta = rutas.find((r) => r.id === selectedRutaId);
      const choferNombre = choferes.find((c) => c.uid === choferUid)?.nombre ?? '';
      const rutaData: Omit<Ruta, 'id'> = {
        dia,
        movil: selectedRuta?.movil,
        choferUid: choferUid || undefined,
        choferNombre: choferNombre || undefined,
        paradas: localParadas,
      };

      await setDoc(doc(db, 'rutas', selectedRutaId), rutaData);

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

  async function handleCambiarDia(targetDia: string) {
    if (!cambiarDiaTarget) return;
    setCambiarDiaSaving(true);
    try {
      const batch = writeBatch(db);

      // Remove parada from source day's route
      const sourceRuta = rutas.find((r) => r.id === selectedRutaId);
      if (sourceRuta?.id) {
        const updatedSource = sourceRuta.paradas
          .filter((p) => p.clienteId !== cambiarDiaTarget.clienteId)
          .map((p, i) => ({ ...p, orden: i + 1 }));
        batch.update(doc(db, 'rutas', sourceRuta.id), { paradas: updatedSource });
      }

      // Add parada to target day's route
      const targetRuta = rutas.find((r) => r.dia === targetDia);
      const targetRutaId = targetRuta?.id ?? targetDia;
      const targetParadas = targetRuta ? [...targetRuta.paradas] : [];
      targetParadas.push({ ...cambiarDiaTarget, orden: targetParadas.length + 1 });

      if (targetRuta) {
        batch.update(doc(db, 'rutas', targetRutaId), { paradas: targetParadas });
      } else {
        batch.set(doc(db, 'rutas', targetRutaId), { dia: targetDia, paradas: targetParadas });
      }

      // Update client's dia field
      batch.update(doc(db, 'clientes', cambiarDiaTarget.clienteId), { dia: targetDia });

      await batch.commit();
      notifications.show(`${cambiarDiaTarget.nombre} movido de ${dia} a ${targetDia}`, {
        severity: 'success',
        autoHideDuration: 3000,
      });
      setCambiarDiaTarget(null);
    } catch {
      notifications.show('Error al cambiar dia de parada', { severity: 'error' });
    } finally {
      setCambiarDiaSaving(false);
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
                type={showChoferPassword ? 'text' : 'password'}
                value={newChoferPassword}
                onChange={(e) => setNewChoferPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => setShowChoferPassword((s) => !s)}
                        edge="end"
                        tabIndex={-1}
                      >
                        {showChoferPassword ? (
                          <VisibilityOffIcon fontSize="small" />
                        ) : (
                          <VisibilityIcon fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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

      {/* Movil selector for the day */}
      {rutasDelDia.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="text.secondary">
            No hay rutas definidas para el {dia}. Importa el Excel para generar rutas.
          </Typography>
        </Paper>
      ) : (
        <>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {rutasDelDia.map((ruta) => (
              <Chip
                key={ruta.id}
                label={`${ruta.movil ?? 'Sin movil'} (${ruta.paradas.length} paradas)`}
                onClick={() => setSelectedRutaId(ruta.id ?? null)}
                color={selectedRutaId === ruta.id ? 'primary' : 'default'}
                variant={selectedRutaId === ruta.id ? 'filled' : 'outlined'}
                sx={{ mb: 1 }}
              />
            ))}
          </Stack>

          {selectedRutaId && (
            <>
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
                  <Typography color="text.secondary">No hay paradas en esta ruta.</Typography>
                </Paper>
              ) : (
                <Paper>
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={localParadas.map((p) => p.clienteId)}
                      strategy={verticalListSortingStrategy}
                    >
                      <List disablePadding>
                        {localParadas.map((parada, index) => (
                          <SortableParadaItem
                            key={parada.clienteId}
                            parada={parada}
                            index={index}
                            onCambiarDia={setCambiarDiaTarget}
                            onRemove={handleRemove}
                          />
                        ))}
                      </List>
                    </SortableContext>
                  </DndContext>
                </Paper>
              )}
            </>
          )}
        </>
      )}

      <AddClienteDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={handleAddParada}
        availableClients={availableClients}
      />
      <CambiarDiaDialog
        open={!!cambiarDiaTarget}
        onClose={() => setCambiarDiaTarget(null)}
        parada={cambiarDiaTarget}
        currentDia={dia}
        onConfirm={handleCambiarDia}
        saving={cambiarDiaSaving}
      />
    </Stack>
  );
}

export default Rutas;
