import { useState } from 'react';

import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  TextField,
} from '@mui/material';

import type { CreatePaykuClientData } from '@/api';

interface ClientFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreatePaykuClientData) => Promise<void>;
  loading: boolean;
}

function ClientFormDialog({ open, onClose, onSubmit, loading }: ClientFormDialogProps) {
  const [form, setForm] = useState<CreatePaykuClientData>({
    email: '',
    name: '',
    rut: '',
    phone: '',
    address: '',
    country: 'Chile',
    region: 'Metropolitana',
    city: 'Santiago',
    postal_code: '',
  });

  const handleChange =
    (field: keyof CreatePaykuClientData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async () => {
    await onSubmit(form);
    setForm({
      email: '',
      name: '',
      rut: '',
      phone: '',
      address: '',
      country: 'Chile',
      region: 'Metropolitana',
      city: 'Santiago',
      postal_code: '',
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Crear Cliente Payku</DialogTitle>
      <DialogContent>
        <Grid2 container spacing={2} sx={{ mt: 0.5 }}>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Nombre"
              value={form.name}
              onChange={handleChange('name')}
              fullWidth
              required
              size="small"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Email"
              value={form.email}
              onChange={handleChange('email')}
              fullWidth
              required
              size="small"
              type="email"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <TextField
              label="RUT"
              value={form.rut}
              onChange={handleChange('rut')}
              fullWidth
              size="small"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Telefono"
              value={form.phone}
              onChange={handleChange('phone')}
              fullWidth
              size="small"
            />
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <TextField
              label="Direccion"
              value={form.address}
              onChange={handleChange('address')}
              fullWidth
              size="small"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Pais"
              value={form.country}
              onChange={handleChange('country')}
              fullWidth
              size="small"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Region"
              value={form.region}
              onChange={handleChange('region')}
              fullWidth
              size="small"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Ciudad"
              value={form.city}
              onChange={handleChange('city')}
              fullWidth
              size="small"
            />
          </Grid2>
        </Grid2>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading || !form.email || !form.name}
          startIcon={loading ? <CircularProgress size={16} /> : undefined}
        >
          Crear
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ClientFormDialog;
