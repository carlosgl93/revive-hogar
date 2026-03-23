import { Navigate, Route, Routes } from 'react-router';

import AuthGuard from '@/components/AuthGuard';
import ChoferLayout from '@/layouts/ChoferLayout';
import asyncComponentLoader from '@/utils/loader';

const EnRutaPage = asyncComponentLoader(() => import('@/pages/chofer/EnRuta'));

function ChoferRoutes() {
  return (
    <Routes>
      <Route element={<AuthGuard />}>
        <Route element={<ChoferLayout />}>
          <Route index element={<Navigate to="en-ruta" replace />} />
          <Route path="en-ruta" element={<EnRutaPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default ChoferRoutes;
