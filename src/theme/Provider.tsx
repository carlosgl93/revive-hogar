import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { es } from 'date-fns/locale/es';

import { useThemeMode } from './hooks';
import themes from './themes';
import type { CustomThemeProviderProps } from './types';

function CustomThemeProvider({ children }: CustomThemeProviderProps) {
  const { themeMode } = useThemeMode();

  return (
    <ThemeProvider theme={createTheme(themes[themeMode])}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
        {children}
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default CustomThemeProvider;
