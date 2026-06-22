import { useState } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  MenuItem, Select, Stack, Typography,
} from '@mui/material';
import { getFunctions, httpsCallable } from 'firebase/functions';

import { InboxEntry } from './PendingInbox';

interface Props {
  entry: InboxEntry;
  onClose: () => void;
}

function formatCLP(n: number): string {
  return `$${n.toLocaleString('es-CL')}`;
}

function ResolveDialog({ entry, onClose }: Props) {
  const [clienteId, setClienteId] = useState<string>(
    entry.candidates[0]?.clienteId ?? '',
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApply = async () => {
    setLoading(true);
    setError(null);
    try {
      const fns = getFunctions();
      const resolve = httpsCallable(fns, 'resolveTransferenciaInbox');
      const result = await resolve({
        inboxId: entry.id,
        action: 'manual_apply',
        clienteId,
      });
      alert(`Aplicado: ${(result.data as any).mesesAplicados?.join(', ')}`);
      onClose();
      window.location.reload();
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Aplicar transferencia</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Typography variant="body2">
            Monto: <strong>{entry.parse ? formatCLP(entry.parse.monto) : 'N/A'}</strong>
          </Typography>
          {entry.parse?.comentario && (
            <Typography variant="body2">Comentario: {entry.parse.comentario}</Typography>
          )}

          <Select
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
            fullWidth
          >
            {entry.candidates.map((c) => (
              <MenuItem key={c.clienteId} value={c.clienteId}>
                {c.nombre} (score: {c.score})
              </MenuItem>
            ))}
          </Select>

          {error && <Typography color="error">{error}</Typography>}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancelar</Button>
        <Button onClick={handleApply} variant="contained" disabled={loading || !clienteId}>
          {loading ? 'Aplicando...' : 'Confirmar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ResolveDialog;
