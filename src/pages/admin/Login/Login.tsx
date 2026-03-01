import { FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

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

import { auth } from '@/firebase/config';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin/pagos';

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(from, { replace: true });
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
                Acceso administrador
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
