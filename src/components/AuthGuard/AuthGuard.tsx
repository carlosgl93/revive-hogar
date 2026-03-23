import { Navigate, Outlet, useLocation } from 'react-router';

import Loading from '@/components/Loading';
import { useAuth } from '@/firebase/useAuth';
import { useUserRole } from '@/firebase/useUserRole';

function AuthGuard() {
  const { user, loading: authLoading } = useAuth();
  const { role, loading: roleLoading } = useUserRole();
  const location = useLocation();

  if (authLoading || roleLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const isAdminRoute = location.pathname.startsWith('/admin');
  const isChoferRoute = location.pathname.startsWith('/chofer');

  // Choferes should only access /chofer/* routes
  if (isAdminRoute && role === 'chofer') {
    return <Navigate to="/chofer/en-ruta" replace />;
  }

  if (isChoferRoute && role === 'admin') {
    return <Navigate to="/admin/pagos" replace />;
  }

  return <Outlet />;
}

export default AuthGuard;
