import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import UploadIcon from '@mui/icons-material/Upload';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';

import { useImportFromSheets } from './useImportFromSheets';

function Importar() {
  const { runImport, result, loading, error } = useImportFromSheets();

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Importar desde Google Sheets
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Importa o sincroniza los clientes del spreadsheet hacia Firestore. Los clientes
            existentes (mismo correo) seran actualizados. Los nuevos seran creados.
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="large"
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <UploadIcon />}
          onClick={runImport}
          disabled={loading}
          sx={{ alignSelf: 'flex-start' }}
        >
          {loading ? 'Importando...' : 'Importar desde Google Sheets'}
        </Button>

        {error && (
          <Alert severity="error" icon={<ErrorOutlineIcon />}>
            {error}
          </Alert>
        )}

        {result && (
          <Stack spacing={2}>
            <Alert severity="success" icon={<CheckCircleOutlineIcon />}>
              Importacion completada
            </Alert>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Box textAlign="center" flex={1}>
                <Typography variant="h3" fontWeight={700} color="success.main">
                  {result.created}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  clientes creados
                </Typography>
              </Box>
              <Box textAlign="center" flex={1}>
                <Typography variant="h3" fontWeight={700} color="primary.main">
                  {result.updated}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  clientes actualizados
                </Typography>
              </Box>
              <Box textAlign="center" flex={1}>
                <Typography variant="h3" fontWeight={700} color="text.disabled">
                  {result.skipped}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  filas omitidas
                </Typography>
              </Box>
            </Stack>

            {result.errors.length > 0 && (
              <Box>
                <Alert severity="warning" sx={{ mb: 1 }}>
                  {result.errors.length} fila(s) con errores — no fueron importadas
                </Alert>
                <List dense disablePadding>
                  {result.errors.map((err, i) => (
                    <ListItem key={i} disableGutters>
                      <ListItemText
                        primary={err}
                        slotProps={{ primary: { variant: 'body2', color: 'error' } }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Stack>
        )}
      </Stack>
    </Container>
  );
}

export default Importar;
