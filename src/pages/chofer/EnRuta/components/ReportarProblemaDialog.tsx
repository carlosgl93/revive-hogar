import { ChangeEvent, useState } from 'react';

import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import {
  Box,
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
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { useNotifications } from '@toolpad/core/useNotifications';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { storage } from '@/firebase/config';
import { updateRetiroEstado } from '@/firebase/useRetiros';
import { TipoProblema } from '@/types/models';

interface Props {
  open: boolean;
  retiroId: string | null;
  onClose: () => void;
}

const PROBLEMA_OPTIONS: { value: TipoProblema; label: string }[] = [
  { value: 'no_pudieron_retirar', label: 'No pudieron retirar' },
  { value: 'mucho_material', label: 'Mucho material' },
  { value: 'mezclado', label: 'Material mezclado' },
  { value: 'otro', label: 'Otro' },
];

function ReportarProblemaDialog({ open, retiroId, onClose }: Props) {
  const notifications = useNotifications();
  const [tipo, setTipo] = useState<TipoProblema>('no_pudieron_retirar');
  const [descripcion, setDescripcion] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function reset() {
    setTipo('no_pudieron_retirar');
    setDescripcion('');
    setFile(null);
    setPreview(null);
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(selected);
    }
  }

  async function handleSubmit() {
    if (!retiroId) return;
    setLoading(true);
    try {
      let fotoUrl: string | undefined;

      if (file) {
        const ts = Date.now();
        const storageRef = ref(storage, `retiros/${retiroId}/${ts}.jpg`);
        await uploadBytes(storageRef, file);
        fotoUrl = await getDownloadURL(storageRef);
      }

      await updateRetiroEstado(retiroId, 'problema', {
        tipoProblema: tipo,
        descripcionProblema: descripcion || undefined,
        fotoUrl,
      });

      notifications.show('Problema reportado', { severity: 'warning', autoHideDuration: 3000 });
      reset();
      onClose();
    } catch {
      notifications.show('Error al reportar problema', { severity: 'error' });
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
      <DialogTitle>Reportar problema</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <FormControl fullWidth>
            <InputLabel>Tipo de problema</InputLabel>
            <Select
              value={tipo}
              onChange={(e) => setTipo(e.target.value as TipoProblema)}
              label="Tipo de problema"
            >
              {PROBLEMA_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Descripcion"
            multiline
            rows={3}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            fullWidth
            required={tipo === 'otro'}
            placeholder="Describe el problema..."
          />

          <Box>
            <Button
              variant="outlined"
              component="label"
              startIcon={<PhotoCameraIcon />}
              fullWidth
              sx={{ py: 1.5 }}
            >
              {file ? 'Cambiar foto' : 'Tomar foto'}
              <input
                type="file"
                accept="image/*"
                capture="environment"
                hidden
                onChange={handleFileChange}
              />
            </Button>
            {preview && (
              <Box sx={{ mt: 1, textAlign: 'center' }}>
                <img
                  src={preview}
                  alt="Preview"
                  style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }}
                />
                <Typography variant="caption" display="block" color="text.secondary">
                  {file?.name}
                </Typography>
              </Box>
            )}
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={handleSubmit}
          disabled={loading || (tipo === 'otro' && !descripcion)}
        >
          {loading ? <CircularProgress size={20} /> : 'Reportar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ReportarProblemaDialog;
