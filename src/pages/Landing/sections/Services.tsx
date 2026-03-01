import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Box, Card, CardContent, Container, Grid2, Stack, Typography } from '@mui/material';

const services = [
  {
    icon: <ScheduleIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
    title: 'Agenda tu dia',
    description:
      'Elige el dia de la semana que prefieras para el retiro. Nosotros pasamos por tu hogar.',
  },
  {
    icon: <LocalShippingIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
    title: 'Retiro a domicilio',
    description:
      'Nuestro equipo retira tu reciclaje y/o residuos organicos directamente en la puerta de tu casa.',
  },
  {
    icon: <EnergySavingsLeafIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
    title: 'Impacto real',
    description:
      'Tu reciclaje es procesado correctamente. Contribuyes a reducir la contaminacion y generar economia circular.',
  },
];

function Services() {
  return (
    <Box id="servicios" sx={{ py: { xs: 6, md: 10 }, bgcolor: '#f9f9f9' }}>
      <Container maxWidth="lg">
        <Stack spacing={2} alignItems="center" mb={6}>
          <Typography
            variant="h3"
            fontWeight={700}
            textAlign="center"
            sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' } }}
          >
            Como funciona
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center" maxWidth={600}>
            Hacemos que reciclar sea facil. Solo necesitas separar tus residuos y nosotros nos
            encargamos del resto.
          </Typography>
        </Stack>

        <Grid2 container spacing={4}>
          {services.map((service) => (
            <Grid2 key={service.title} size={{ xs: 12, md: 4 }}>
              <Card sx={{ height: '100%', textAlign: 'center', p: 2 }} elevation={0}>
                <CardContent>
                  <Stack spacing={2} alignItems="center">
                    {service.icon}
                    <Typography variant="h5" fontWeight={600}>
                      {service.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {service.description}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Box>
  );
}

export default Services;
