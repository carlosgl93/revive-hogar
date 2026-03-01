import NatureIcon from '@mui/icons-material/Nature';
import { Box, Container, Grid2, Stack, Typography } from '@mui/material';

function About() {
  return (
    <Box id="nosotros" sx={{ py: { xs: 6, md: 10 }, bgcolor: '#f9f9f9' }}>
      <Container maxWidth="lg">
        <Grid2 container spacing={6} alignItems="center">
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Stack spacing={3}>
              <Typography
                variant="h3"
                fontWeight={700}
                sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' } }}
              >
                Sobre Revive Hogar
              </Typography>
              <Typography variant="body1" color="text.secondary" lineHeight={1.8}>
                Somos una empresa dedicada al retiro de reciclaje y residuos organicos a domicilio
                en Santiago. Creemos que reciclar debe ser facil y accesible para todos.
              </Typography>
              <Typography variant="body1" color="text.secondary" lineHeight={1.8}>
                Nuestro objetivo es reducir la cantidad de residuos que llegan a los vertederos,
                fomentando la economia circular y generando un impacto positivo en el medio
                ambiente.
              </Typography>
              <Typography variant="body1" color="text.secondary" lineHeight={1.8}>
                Trabajamos con rutas optimizadas para minimizar nuestra huella de carbono y asegurar
                un servicio puntual y confiable para nuestros clientes.
              </Typography>
            </Stack>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 300 }}>
              <NatureIcon sx={{ fontSize: 180, color: 'primary.light', opacity: 0.5 }} />
            </Stack>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}

export default About;
