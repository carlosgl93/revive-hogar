import { useState } from 'react';

import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';

import { Parada } from '@/types/models';

const DIAS = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

interface Props {
  open: boolean;
  onClose: () => void;
  parada: Parada | null;
  currentDia: string;
  onConfirm: (targetDia: string) => void;
  saving: boolean;
}

function CambiarDiaDialog({ open, onClose, parada, currentDia, onConfirm, saving }: Props) {
  const [targetDia, setTargetDia] = useState('');

  const availableDias = DIAS.filter((d) => d !== currentDia);

  function handleClose() {
    setTargetDia('');
    onClose();
  }

  function handleConfirm() {
    if (!targetDia) return;
    onConfirm(targetDia);
    setTargetDia('');
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Cambiar dia de parada</DialogTitle>
      <DialogContent>
        {parada && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {parada.nombre} — actualmente en <strong>{currentDia}</strong>
          </Typography>
        )}
        <FormControl fullWidth sx={{ mt: 1 }}>
          <InputLabel>Nuevo dia</InputLabel>
          <Select
            value={targetDia}
            onChange={(e) => setTargetDia(e.target.value)}
            label="Nuevo dia"
          >
            {availableDias.map((d) => (
              <MenuItem key={d} value={d}>
                {d}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={saving}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={handleConfirm}
          disabled={!targetDia || saving}
          startIcon={saving ? <CircularProgress size={18} color="inherit" /> : undefined}
        >
          {saving ? 'Moviendo...' : 'Confirmar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CambiarDiaDialog;
