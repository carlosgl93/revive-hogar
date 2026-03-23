import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { auth, db } from '@/firebase/config';
import { useAuth } from '@/firebase/useAuth';
import { Usuario } from '@/types/models';

function Login() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const redirectByRole = useCallback(
    async (uid: string) => {
      try {
        const snap = await getDoc(doc(db, 'usuarios', uid));
        if (snap.exists()) {
          const data = snap.data() as Omit<Usuario, 'id'>;
          if (data.role === 'chofer') {
            navigate('/chofer/en-ruta', { replace: true });
            return;
          }
        }
        navigate('/admin/pagos', { replace: true });
      } catch {
        navigate('/admin/pagos', { replace: true });
      }
    },
    [navigate],
  );

  useEffect(() => {
    if (authLoading || !user) return;
    redirectByRole(user.uid);
  }, [user, authLoading, redirectByRole]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      await redirectByRole(cred.user.uid);
    } catch {
      setError('Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card sx={{ width: '100%' }}>
          <CardContent>
            <Stack spacing={3} component="form" onSubmit={handleSubmit}>
              <Typography variant="h4" textAlign="center" color="primary" fontWeight={700}>
                Revive Hogar
              </Typography>
              <Typography variant="subtitle1" textAlign="center" color="text.secondary">
                Iniciar sesion
              </Typography>

              {error && <Alert severity="error">{error}</Alert>}

              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                autoFocus
              />
              <TextField
                label="Contrasena"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
              />
              <Button type="submit" variant="contained" size="large" disabled={loading} fullWidth>
                {loading ? 'Ingresando...' : 'Ingresar'}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default Login;
