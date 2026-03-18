import HistoryIcon from '@mui/icons-material/History';
import PaymentIcon from '@mui/icons-material/Payment';
import UploadIcon from '@mui/icons-material/Upload';

import { AdminNavItem } from './types';

const adminNavItems: AdminNavItem[] = [
  {
    path: '/admin/pagos',
    title: 'Pagos',
    icon: PaymentIcon,
  },
  {
    path: '/admin/historial',
    title: 'Historial',
    icon: HistoryIcon,
  },
  {
    path: '/admin/importar',
    title: 'Importar',
    icon: UploadIcon,
  },
];

export default adminNavItems;
