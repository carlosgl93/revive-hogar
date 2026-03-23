import { useNavigate } from 'react-router';

import ThemeIcon from '@mui/icons-material/InvertColors';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Divider, IconButton, Stack, Toolbar, Tooltip, Typography } from '@mui/material';

import { signOut } from 'firebase/auth';

import { auth } from '@/firebase/config';
import { useSidebar } from '@/sections/AdminSidebar/hooks';
import { useThemeMode } from '@/theme';

function AdminHeader() {
  const { themeMode, toggle: toggleThemeMode } = useThemeMode();
  const { open: openSidebar } = useSidebar();
  const navigate = useNavigate();

  async function handleLogout() {
    await signOut(auth);
    navigate('/login');
  }

  return (
    <AppBar
      position="static"
      color="primary"
      elevation={2}
      data-pw={`theme-${themeMode}`}
      enableColorOnDark
    >
      <Toolbar>
        <Stack direction="row" justifyContent="space-between" alignItems="center" flex={1}>
          <Stack direction="row" gap={1} alignItems="center">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={openSidebar}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Revive Hogar - Admin
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Tooltip title="Cambiar tema" arrow>
              <IconButton
                color="inherit"
                size="large"
                onClick={toggleThemeMode}
                data-pw="theme-toggle"
              >
                <ThemeIcon />
              </IconButton>
            </Tooltip>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ mx: 1, borderColor: 'rgba(255,255,255,0.3)' }}
            />
            <Tooltip title="Cerrar sesion" arrow>
              <IconButton color="inherit" edge="end" size="large" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default AdminHeader;
