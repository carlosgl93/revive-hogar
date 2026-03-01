import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Box, Button, Container, Grid2, Stack, Typography } from '@mui/material';

function Contact() {
  return (
    <Box id="contacto" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Stack spacing={2} alignItems="center" mb={6}>
          <Typography
            variant="h3"
            fontWeight={700}
            textAlign="center"
            sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' } }}
          >
            Contacto
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center" maxWidth={600}>
            Tienes dudas o quieres contratar nuestro servicio? Contactanos por WhatsApp o email.
          </Typography>
        </Stack>

        <Grid2 container spacing={4} justifyContent="center">
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Stack spacing={2} alignItems="center" textAlign="center">
              <WhatsAppIcon sx={{ fontSize: 48, color: '#25d366' }} />
              <Typography variant="h6" fontWeight={600}>
                WhatsApp
              </Typography>
              <Button
                variant="contained"
                startIcon={<WhatsAppIcon />}
                href="https://wa.me/+56944706966"
                target="_blank"
                rel="noopener"
                sx={{
                  bgcolor: '#25d366',
                  '&:hover': { bgcolor: '#128c7e' },
                }}
              >
                Escribenos
              </Button>
            </Stack>
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Stack spacing={2} alignItems="center" textAlign="center">
              <EmailIcon sx={{ fontSize: 48, color: 'primary.main' }} />
              <Typography variant="h6" fontWeight={600}>
                Email
              </Typography>
              <Typography variant="body1" color="text.secondary">
                contacto@revivehogar.cl
              </Typography>
            </Stack>
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Stack spacing={2} alignItems="center" textAlign="center">
              <LocationOnIcon sx={{ fontSize: 48, color: 'primary.main' }} />
              <Typography variant="h6" fontWeight={600}>
                Santiago
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Region Metropolitana, Chile
              </Typography>
            </Stack>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}

export default Contact;
