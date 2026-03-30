import HistoryIcon from '@mui/icons-material/History';
import PaymentIcon from '@mui/icons-material/Payment';
import PeopleIcon from '@mui/icons-material/People';
import RouteIcon from '@mui/icons-material/Route';
import ScaleIcon from '@mui/icons-material/Scale';
import UploadIcon from '@mui/icons-material/Upload';

import { AdminNavItem } from './types';

const adminNavItems: AdminNavItem[] = [
  {
    path: '/admin/pagos',
    title: 'Pagos',
    icon: PaymentIcon,
    roles: ['admin'],
  },
  {
    path: '/admin/historial',
    title: 'Historial',
    icon: HistoryIcon,
    roles: ['admin'],
  },
  {
    path: '/admin/rutas',
    title: 'Rutas',
    icon: RouteIcon,
  },
  {
    path: '/admin/usuarios',
    title: 'Usuarios',
    icon: PeopleIcon,
    roles: ['admin'],
  },
  {
    path: '/admin/pesaje',
    title: 'Pesaje',
    icon: ScaleIcon,
    roles: ['admin'],
  },
  {
    path: '/admin/importar',
    title: 'Importar',
    icon: UploadIcon,
    roles: ['admin'],
  },
];

export default adminNavItems;
