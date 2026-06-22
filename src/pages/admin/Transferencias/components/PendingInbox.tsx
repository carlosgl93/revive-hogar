import { useState } from 'react';
import { collection, query, where, orderBy, limit } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import {
  Accordion, AccordionDetails, AccordionSummary,
  Box, Button, Chip, CircularProgress, Stack, Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getFunctions, httpsCallable } from 'firebase/functions';

import { db } from '@/firebase/config';
import ResolveDialog from './ResolveDialog';

export interface InboxEntry {
  id: string;
  emailId: string;
  receivedAt: any;
  reason: string;
  parse: {
    monto: number;
    rut: string | null;
    fecha: string | null;
    comentario: string | null;
    nombre: string | null;
  } | null;
  candidates: Array<{ clienteId: string; nombre: string; score: number; reason: string }>;
  email: { from: string; subject: string; bodyPlain: string };
  status: 'pending' | 'confirmed' | 'rejected' | 'expired';
}

function formatCLP(n: number): string {
  return `$${n.toLocaleString('es-CL')}`;
}

function PendingInbox() {
  const [selected, setSelected] = useState<InboxEntry | null>(null);

  const q = query(
    collection(db, 'transferenciasSinMatch'),
    where('status', '==', 'pending'),
    orderBy('receivedAt', 'desc'),
    limit(50),
  );
  const [snapshot, loading] = useCollection(q);

  if (loading) return <CircularProgress />;
  if (!snapshot || snapshot.empty) {
    return <Typography color="text.secondary">No hay transferencias pendientes de revisión.</Typography>;
  }

  const entries = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as InboxEntry));

  const handleDismiss = async (entry: InboxEntry) => {
    if (!confirm('¿Descartar esta entrada?')) return;
    const fns = getFunctions();
    const resolve = httpsCallable(fns, 'resolveTransferenciaInbox');
    await resolve({ inboxId: entry.id, action: 'dismiss' });
    window.location.reload();
  };

  return (
    <Stack spacing={2}>
      {entries.map((entry) => (
        <Accordion key={entry.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ flexGrow: 1 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="body1" fontWeight={600}>
                  {entry.parse?.nombre ?? 'Sin nombre'}
                </Typography>
                <Chip label={entry.reason} color="warning" size="small" />
                {entry.parse && (
                  <Typography variant="body2" color="text.secondary">
                    {formatCLP(entry.parse.monto)} · {entry.parse.fecha ?? 'sin fecha'}
                  </Typography>
                )}
              </Stack>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2">Email original:</Typography>
              <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', bgcolor: 'grey.100', p: 1, mt: 1 }}>
                {entry.email.bodyPlain}
              </Typography>
            </Box>

            {entry.candidates.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2">Candidatos ({entry.candidates.length}):</Typography>
                <Stack spacing={1} sx={{ mt: 1 }}>
                  {entry.candidates.slice(0, 5).map((c) => (
                    <Box key={c.clienteId} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" sx={{ flexGrow: 1 }}>
                        {c.nombre} (score: {c.score}, {c.reason})
                      </Typography>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => setSelected(entry)}
                      >
                        Aplicar a este
                      </Button>
                    </Box>
                  ))}
                </Stack>
              </Box>
            )}

            <Stack direction="row" spacing={1}>
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={() => handleDismiss(entry)}
              >
                Descartar
              </Button>
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}

      {selected && (
        <ResolveDialog
          entry={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </Stack>
  );
}

export default PendingInbox;
