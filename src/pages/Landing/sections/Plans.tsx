import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  Grid2,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';

import { plans } from '@/config/plans';

function Plans() {
  return (
    <Box id="planes" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Stack spacing={2} alignItems="center" mb={6}>
          <Typography
            variant="h3"
            fontWeight={700}
            textAlign="center"
            sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' } }}
          >
            Nuestros planes
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center" maxWidth={600}>
            Elige el plan que mejor se adapte a tus necesidades. Todos incluyen retiro semanal a
            domicilio.
          </Typography>
        </Stack>

        <Grid2 container spacing={4} justifyContent="center">
          {plans.map((plan) => (
            <Grid2 key={plan.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: plan.highlighted ? '2px solid' : '1px solid',
                  borderColor: plan.highlighted ? 'primary.main' : 'divider',
                  position: 'relative',
                }}
                elevation={plan.highlighted ? 8 : 1}
              >
                {plan.highlighted && (
                  <Chip
                    icon={<StarIcon />}
                    label="Mas popular"
                    color="primary"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: -12,
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1, pt: plan.highlighted ? 4 : 3 }}>
                  <Stack spacing={2} alignItems="center">
                    <Typography variant="h5" fontWeight={600}>
                      {plan.name}
                    </Typography>
                    <Typography variant="h3" fontWeight={800} color="primary.main">
                      {plan.priceFormatted}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      al mes
                    </Typography>
                  </Stack>
                  <List dense sx={{ mt: 2 }}>
                    {plan.features.map((feature) => (
                      <ListItem key={feature} disablePadding sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckCircleIcon color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    variant={plan.highlighted ? 'contained' : 'outlined'}
                    fullWidth
                    size="large"
                    href="#contacto"
                  >
                    Contratar
                  </Button>
                </CardActions>
              </Card>
            </Grid2>
          ))}
        </Grid2>

        <Typography variant="body2" color="text.secondary" textAlign="center" mt={4}>
          Pago mensual anticipado. El servicio se renueva desde la fecha de tu pago. Si la ruta cae
          en feriado, no se recupera el dia.
        </Typography>
      </Container>
    </Box>
  );
}

export default Plans;
