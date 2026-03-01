import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from './config';

export function useAuth() {
  const [user, loading, error] = useAuthState(auth);
  return { user, loading, error, isAuthenticated: !!user };
}
