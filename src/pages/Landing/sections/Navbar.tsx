import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import RecyclingIcon from '@mui/icons-material/Recycling';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';

const navItems = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Planes', href: '#planes' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: '#fff', color: '#333' }} elevation={1}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Stack direction="row" alignItems="center" gap={1} sx={{ flexGrow: 1 }}>
              <RecyclingIcon sx={{ color: 'primary.main', fontSize: 32 }} />
              <Typography variant="h6" fontWeight={700} color="primary.main">
                Revive Hogar
              </Typography>
            </Stack>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              {navItems.map((item) => (
                <Button key={item.href} href={item.href} sx={{ color: '#555' }}>
                  {item.label}
                </Button>
              ))}
              <Button variant="contained" href="#planes" sx={{ ml: 1 }}>
                Contratar
              </Button>
            </Box>

            <IconButton sx={{ display: { md: 'none' } }} onClick={() => setMobileOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: 250, pt: 2 }}>
          <Stack direction="row" justifyContent="flex-end" px={2}>
            <IconButton onClick={() => setMobileOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.href} disablePadding>
                <ListItemButton component="a" href={item.href} onClick={() => setMobileOpen(false)}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Toolbar spacer */}
      <Toolbar />
    </>
  );
}

export default Navbar;
