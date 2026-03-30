import { Navigate, Route, Routes } from 'react-router';

import AuthGuard from '@/components/AuthGuard';
import AdminLayout from '@/layouts/AdminLayout';
import asyncComponentLoader from '@/utils/loader';

const LoginPage = asyncComponentLoader(() => import('@/pages/admin/Login'));
const PagosPage = asyncComponentLoader(() => import('@/pages/admin/Pagos'));
const ImportarPage = asyncComponentLoader(() => import('@/pages/admin/Importar'));
const HistorialPagosPage = asyncComponentLoader(() => import('@/pages/admin/HistorialPagos'));
const UsuariosPage = asyncComponentLoader(() => import('@/pages/admin/Usuarios'));
const RutasPage = asyncComponentLoader(() => import('@/pages/admin/Rutas'));
const PesajePage = asyncComponentLoader(() => import('@/pages/admin/Pesaje'));
const NotFound = asyncComponentLoader(() => import('@/pages/NotFound'));

function AdminRoutes() {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route element={<AuthGuard />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="pagos" replace />} />
          <Route path="pagos" element={<PagosPage />} />
          <Route path="historial" element={<HistorialPagosPage />} />
          <Route path="importar" element={<ImportarPage />} />
          <Route path="usuarios" element={<UsuariosPage />} />
          <Route path="rutas" element={<RutasPage />} />
          <Route path="pesaje" element={<PesajePage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AdminRoutes;
