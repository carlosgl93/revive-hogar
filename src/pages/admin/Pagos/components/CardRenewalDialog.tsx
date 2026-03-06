import { useState } from 'react';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';

import { paykuSubscriptionsApi } from '@/api';

interface CardRenewalDialogProps {
  open: boolean;
  onClose: () => void;
  subscriptionId: string;
  clientName: string;
}

function CardRenewalDialog({ open, onClose, subscriptionId, clientName }: CardRenewalDialogProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ url: string } | null>(null);

  const handleRenew = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await paykuSubscriptionsApi.affiliateCard(subscriptionId);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al generar enlace');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
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
      <DialogTitle>Renovar Tarjeta</DialogTitle>
      <DialogContent>
        {!result ? (
          <Stack spacing={2}>
            <Typography>
              Se generara un enlace para que <strong>{clientName}</strong> registre una nueva
              tarjeta para la suscripcion <strong>{subscriptionId}</strong>.
            </Typography>
            <Alert severity="info">
              Si la suscripcion esta suspendida, al registrar la nueva tarjeta se cobraran los pagos
              pendientes automaticamente y se reactivara.
            </Alert>
            {error && <Alert severity="error">{error}</Alert>}
          </Stack>
        ) : (
          <Stack spacing={2}>
            <Alert severity="success">Enlace generado exitosamente</Alert>
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
              onClick={handleRenew}
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={16} /> : undefined}
            >
              Generar Enlace
            </Button>
          </>
        ) : (
          <Button onClick={handleClose}>Cerrar</Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default CardRenewalDialog;
