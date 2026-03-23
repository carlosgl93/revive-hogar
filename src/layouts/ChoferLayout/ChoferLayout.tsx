import { useNavigate } from 'react-router';
import { Outlet } from 'react-router';

import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, Box, IconButton, Stack, Toolbar, Tooltip, Typography } from '@mui/material';

import { signOut } from 'firebase/auth';

import { auth } from '@/firebase/config';
import { useUserRole } from '@/firebase/useUserRole';

function ChoferLayout() {
  const { usuario } = useUserRole();
  const navigate = useNavigate();

  async function handleLogout() {
    await signOut(auth);
    navigate('/login');
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" color="primary" elevation={2} enableColorOnDark>
        <Toolbar>
          <Stack direction="row" justifyContent="space-between" alignItems="center" flex={1}>
            <Typography variant="h6" color="inherit" noWrap>
              Revive Hogar
            </Typography>
            <Stack direction="row" alignItems="center" gap={1}>
              {usuario && (
                <Typography variant="body2" color="inherit" noWrap>
                  {usuario.nombre}
                </Typography>
              )}
              <Tooltip title="Cerrar sesion" arrow>
                <IconButton color="inherit" edge="end" size="large" onClick={handleLogout}>
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default ChoferLayout;
