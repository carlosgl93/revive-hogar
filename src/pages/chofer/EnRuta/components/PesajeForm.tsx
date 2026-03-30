import { useState } from 'react';

import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ScaleIcon from '@mui/icons-material/Scale';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { useNotifications } from '@toolpad/core/useNotifications';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { db, storage } from '@/firebase/config';
import { Pesaje } from '@/types/models';

interface Props {
  fecha: string;
  choferUid: string;
  choferNombre: string;
  rutaId: string;
  onSaved: () => void;
}

function PesajeForm({ fecha, choferUid, choferNombre, rutaId, onSaved }: Props) {
  const notifications = useNotifications();
  const [vidrio, setVidrio] = useState('');
  const [cartonPapel, setCartonPapel] = useState('');
  const [pet, setPet] = useState('');
  const [latas, setLatas] = useState('');
  const [foto, setFoto] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function handleFoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setFoto(file);
      setFotoPreview(URL.createObjectURL(file));
    }
  }

  async function handleSubmit() {
    const v = parseFloat(vidrio) || 0;
    const cp = parseFloat(cartonPapel) || 0;
    const p = parseFloat(pet) || 0;
    const l = parseFloat(latas) || 0;
    const totalKg = v + cp + p + l;

    if (totalKg <= 0) {
      notifications.show('Ingresa al menos un peso', { severity: 'warning' });
      return;
    }

    setSaving(true);
    try {
      let fotoUrl: string | undefined;
      if (foto) {
        const path = `pesajes/${fecha}/${choferUid}-${Date.now()}.${foto.name.split('.').pop()}`;
        const storageRef = ref(storage, path);
        await uploadBytes(storageRef, foto);
        fotoUrl = await getDownloadURL(storageRef);
      }

      const pesaje: Omit<Pesaje, 'id'> = {
        fecha,
        choferUid,
        choferNombre,
        rutaId,
        vidrio: v,
        cartonPapel: cp,
        pet: p,
        latas: l,
        totalKg,
        fotoUrl,
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, 'pesajes'), pesaje);
      notifications.show('Pesaje registrado', { severity: 'success', autoHideDuration: 3000 });
      onSaved();
    } catch (err) {
      console.error('Error saving pesaje:', err);
      notifications.show('Error al guardar pesaje', { severity: 'error' });
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <ScaleIcon color="primary" />
            <Typography variant="h6" fontWeight={600}>
              Registro de Pesaje
            </Typography>
          </Stack>

          <Alert severity="info" variant="outlined">
            Ingresa el peso en kg de cada material retirado hoy.
          </Alert>

          <Stack direction="row" spacing={2}>
            <TextField
              label="Vidrio (kg)"
              type="number"
              size="small"
              value={vidrio}
              onChange={(e) => setVidrio(e.target.value)}
              inputProps={{ min: 0, step: 0.1 }}
              fullWidth
            />
            <TextField
              label="Carton + Papel (kg)"
              type="number"
              size="small"
              value={cartonPapel}
              onChange={(e) => setCartonPapel(e.target.value)}
              inputProps={{ min: 0, step: 0.1 }}
              fullWidth
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField
              label="PET (kg)"
              type="number"
              size="small"
              value={pet}
              onChange={(e) => setPet(e.target.value)}
              inputProps={{ min: 0, step: 0.1 }}
              fullWidth
            />
            <TextField
              label="Latas (kg)"
              type="number"
              size="small"
              value={latas}
              onChange={(e) => setLatas(e.target.value)}
              inputProps={{ min: 0, step: 0.1 }}
              fullWidth
            />
          </Stack>

          {/* Photo upload */}
          <Button variant="outlined" component="label" startIcon={<PhotoCameraIcon />}>
            {foto ? 'Cambiar foto voucher' : 'Subir foto voucher'}
            <input
              type="file"
              accept="image/*"
              capture="environment"
              hidden
              onChange={handleFoto}
            />
          </Button>

          {fotoPreview && (
            <Box
              component="img"
              src={fotoPreview}
              alt="Preview voucher"
              sx={{ maxHeight: 200, borderRadius: 1, objectFit: 'contain' }}
            />
          )}

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={saving || !foto}
            startIcon={saving ? <CircularProgress size={18} color="inherit" /> : <ScaleIcon />}
            fullWidth
          >
            {saving ? 'Guardando...' : 'Registrar Pesaje'}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default PesajeForm;
