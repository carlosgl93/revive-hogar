import RecyclingIcon from '@mui/icons-material/Recycling';
import { Box, Container, Link, Stack, Typography } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ bgcolor: '#1b5e20', color: '#fff', py: 4 }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Stack direction="row" alignItems="center" gap={1}>
            <RecyclingIcon />
            <Typography variant="h6" fontWeight={700}>
              Revive Hogar
            </Typography>
          </Stack>
          <Stack direction="row" spacing={3}>
            <Link href="#servicios" color="inherit" underline="hover">
              Servicios
            </Link>
            <Link href="#planes" color="inherit" underline="hover">
              Planes
            </Link>
            <Link href="#nosotros" color="inherit" underline="hover">
              Nosotros
            </Link>
            <Link href="#contacto" color="inherit" underline="hover">
              Contacto
            </Link>
          </Stack>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            {new Date().getFullYear()} Revive Hogar. Todos los derechos reservados.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;
