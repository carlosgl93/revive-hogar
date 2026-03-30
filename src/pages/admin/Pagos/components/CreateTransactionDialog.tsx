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
  TextField,
  Typography,
} from '@mui/material';

import { createPaykuTransaction } from '@/api/payku';
import { Cliente } from '@/types/models';

interface Props {
  open: boolean;
  client: Cliente | null;
  onClose: () => void;
}

function CreateTransactionDialog({ open, client, onClose }: Props) {
  const [amount, setAmount] = useState('');
  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ id: string; url: string } | null>(null);

  // Reset state when client changes
  const handleEnter = () => {
    if (client) {
      setAmount(String(client.montoPendiente ?? client.monto ?? 0));
      setSubject(`Pago pendiente - ${client.nombre}`);
    }
    setError(null);
    setResult(null);
  };

  const handleCreate = async () => {
    if (!client?.id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await createPaykuTransaction({
        clienteId: client.id,
        email: client.correo,
        amount: Number(amount),
        subject,
      });
      setResult(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear transaccion');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setResult(null);
    setError(null);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      TransitionProps={{ onEnter: handleEnter }}
    >
      <DialogTitle>Cobro Unico — {client?.nombre}</DialogTitle>
      <DialogContent>
        {!result ? (
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {client?.correo} — {client?.direccion}, {client?.comuna}
            </Typography>
            <TextField
              label="Monto (CLP)"
              type="number"
              size="small"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
            />
            <TextField
              label="Descripcion"
              size="small"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              fullWidth
            />
            {error && <Alert severity="error">{error}</Alert>}
          </Stack>
        ) : (
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Alert severity="success">Transaccion creada (ID: {result.id})</Alert>
            <Typography variant="body2">
              Envie este enlace al cliente para que realice el pago:
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
              <Button
                variant="outlined"
                startIcon={<ContentCopyIcon />}
                onClick={() => navigator.clipboard.writeText(result.url)}
              >
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
              variant="contained"
              onClick={handleCreate}
              disabled={loading || !amount || Number(amount) <= 0}
              startIcon={loading ? <CircularProgress size={16} /> : undefined}
            >
              Crear Cobro
            </Button>
          </>
        ) : (
          <Button onClick={handleClose}>Cerrar</Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default CreateTransactionDialog;
