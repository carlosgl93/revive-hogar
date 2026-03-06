import { useState } from 'react';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  Alert,
  Autocomplete,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { paykuSubscriptionsApi } from '@/api';
import { plans } from '@/config/plans';
import { Cliente } from '@/types/models';

interface CreateSubscriptionDialogProps {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
  clients: Cliente[];
}

function CreateSubscriptionDialog({
  open,
  onClose,
  onCreated,
  clients,
}: CreateSubscriptionDialogProps) {
  const [selectedClient, setSelectedClient] = useState<Cliente | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ id: string; url: string } | null>(null);

  const handleCreate = async () => {
    if (!selectedClient?.paykuSubscriptionId && !selectedClient?.correo) return;
    if (!selectedPlanId) return;

    setLoading(true);
    setError(null);
    try {
      // Here we need the Payku client ID, not Firestore ID.
      // The client field expects a Payku client ID (clXXX...).
      // For now, we use the email to look them up, but ideally
      // the client should already exist in Payku.
      const { data } = await paykuSubscriptionsApi.create({
        plan: selectedPlanId,
        client: selectedClient.paykuSubscriptionId ?? selectedClient.correo,
      });
      setResult(data);
      onCreated();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear suscripcion');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedClient(null);
    setSelectedPlanId('');
    setResult(null);
    setError(null);
    onClose();
  };

  const handleCopyUrl = () => {
    if (result?.url) {
      navigator.clipboard.writeText(result.url);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Nueva Suscripcion</DialogTitle>
      <DialogContent>
        {!result ? (
          <Stack spacing={3} sx={{ mt: 1 }}>
            <Autocomplete
              options={clients}
              getOptionLabel={(c) => `${c.nombre} (${c.correo})`}
              value={selectedClient}
              onChange={(_, value) => setSelectedClient(value)}
              renderInput={(params) => (
                <TextField {...params} label="Seleccionar Cliente" size="small" />
              )}
            />

            <Typography variant="subtitle2">Seleccionar Plan</Typography>
            <Stack direction="row" spacing={2}>
              {plans
                .filter((p) => p.paykuPlanId !== 'plXXXXXXXXXXXXXXXXXXXX')
                .map((plan) => (
                  <Card
                    key={plan.id}
                    variant={selectedPlanId === plan.paykuPlanId ? 'elevation' : 'outlined'}
                    sx={{
                      flex: 1,
                      border: selectedPlanId === plan.paykuPlanId ? 2 : 1,
                      borderColor: selectedPlanId === plan.paykuPlanId ? 'primary.main' : 'divider',
                    }}
                  >
                    <CardActionArea onClick={() => setSelectedPlanId(plan.paykuPlanId)}>
                      <CardContent>
                        <Typography variant="subtitle1" fontWeight={700}>
                          {plan.name}
                        </Typography>
                        <Typography variant="h6" color="primary">
                          {plan.priceFormatted}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
            </Stack>

            {error && <Alert severity="error">{error}</Alert>}
          </Stack>
        ) : (
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Alert severity="success">Suscripcion creada exitosamente (ID: {result.id})</Alert>
            <Typography variant="body2">
              Envie este enlace al cliente para que registre su tarjeta:
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                startIcon={<OpenInNewIcon />}
                href={result.url}
                target="_blank"
                rel="noopener"
              >
                Abrir enlace
              </Button>
              <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={handleCopyUrl}>
                Copiar enlace
              </Button>
            </Stack>
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        {!result ? (
          <>
            <Button onClick={handleClose} disabled={loading}>
              Cancelar
            </Button>
            <Button
              onClick={handleCreate}
              variant="contained"
              disabled={loading || !selectedClient || !selectedPlanId}
              startIcon={loading ? <CircularProgress size={16} /> : undefined}
            >
              Crear Suscripcion
            </Button>
          </>
        ) : (
          <Button onClick={handleClose}>Cerrar</Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default CreateSubscriptionDialog;
