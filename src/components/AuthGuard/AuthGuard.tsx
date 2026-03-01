import { Navigate, Outlet, useLocation } from 'react-router';

import Loading from '@/components/Loading';
import { useAuth } from '@/firebase/useAuth';

function AuthGuard() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default AuthGuard;
