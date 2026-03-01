import { Navigate, Route, Routes } from 'react-router';

import AuthGuard from '@/components/AuthGuard';
import AdminLayout from '@/layouts/AdminLayout';
import asyncComponentLoader from '@/utils/loader';

const LoginPage = asyncComponentLoader(() => import('@/pages/admin/Login'));
const PagosPage = asyncComponentLoader(() => import('@/pages/admin/Pagos'));
const ImportarPage = asyncComponentLoader(() => import('@/pages/admin/Importar'));
const NotFound = asyncComponentLoader(() => import('@/pages/NotFound'));

function AdminRoutes() {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route element={<AuthGuard />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="pagos" replace />} />
          <Route path="pagos" element={<PagosPage />} />
          <Route path="importar" element={<ImportarPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AdminRoutes;
