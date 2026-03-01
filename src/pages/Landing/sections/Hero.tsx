import RecyclingIcon from '@mui/icons-material/Recycling';
import { Box, Button, Container, Stack, Typography } from '@mui/material';

function Hero() {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #4caf50 100%)',
        color: '#fff',
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg">
        <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" spacing={4}>
          <Stack spacing={3} flex={1}>
            <Typography variant="h2" fontWeight={800} sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
              Reciclaje a domicilio en Santiago
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 400 }}>
              Retiramos tu reciclaje y residuos organicos directamente en tu hogar. Simple, comodo y
              sustentable.
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                size="large"
                href="#planes"
                sx={{
                  bgcolor: '#fff',
                  color: 'primary.dark',
                  '&:hover': { bgcolor: '#e8f5e9' },
                  fontWeight: 700,
                  px: 4,
                }}
              >
                Ver planes
              </Button>
              <Button
                variant="outlined"
                size="large"
                href="#contacto"
                sx={{
                  borderColor: '#fff',
                  color: '#fff',
                  '&:hover': { borderColor: '#e8f5e9', bgcolor: 'rgba(255,255,255,0.1)' },
                  px: 4,
                }}
              >
                Contacto
              </Button>
            </Stack>
          </Stack>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}
          >
            <RecyclingIcon sx={{ fontSize: 200, opacity: 0.3 }} />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default Hero;
