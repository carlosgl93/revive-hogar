import { useState } from 'react';

import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

import { Cliente, Parada } from '@/types/models';

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (parada: Parada) => void;
  availableClients: Cliente[];
}

function AddClienteDialog({ open, onClose, onAdd, availableClients }: Props) {
  const [selected, setSelected] = useState<Cliente | null>(null);

  function handleAdd() {
    if (!selected?.id) return;
    const parada: Parada = {
      clienteId: selected.id,
      orden: 0,
      nombre: selected.nombre,
      direccion: selected.direccion,
      comuna: selected.comuna,
      telefono: selected.telefono,
    };
    onAdd(parada);
    setSelected(null);
  }

  function handleClose() {
    setSelected(null);
    onClose();
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Agregar cliente a la ruta</DialogTitle>
      <DialogContent>
        <Autocomplete
          sx={{ mt: 1 }}
          options={availableClients}
          getOptionLabel={(option) => `${option.nombre} — ${option.direccion}, ${option.comuna}`}
          value={selected}
          onChange={(_, value) => setSelected(value)}
          renderInput={(params) => (
            <TextField {...params} label="Buscar cliente" fullWidth autoFocus />
          )}
          isOptionEqualToValue={(option, value) => option.id === value.id}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleAdd} disabled={!selected}>
          Agregar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddClienteDialog;
