import { useEffect, useState } from 'react';

import { doc, getDoc } from 'firebase/firestore';

import { UserRole, Usuario } from '@/types/models';

import { db } from './config';
import { useAuth } from './useAuth';

interface UseUserRoleResult {
  role: UserRole | null;
  usuario: Usuario | null;
  loading: boolean;
}

export function useUserRole(): UseUserRoleResult {
  const { user, loading: authLoading } = useAuth();
  const [role, setRole] = useState<UserRole | null>(null);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setRole(null);
      setUsuario(null);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchRole() {
      try {
        const snap = await getDoc(doc(db, 'usuarios', user!.uid));
        if (cancelled) return;

        if (snap.exists()) {
          const data = snap.data() as Omit<Usuario, 'id'>;
          setUsuario({ id: snap.id, ...data });
          setRole(data.role);
        } else {
          // User exists in Firebase Auth but not in usuarios collection → default admin
          setRole('admin');
          setUsuario(null);
        }
      } catch {
        if (!cancelled) {
          setRole('admin');
          setUsuario(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchRole();
    return () => {
      cancelled = true;
    };
  }, [user, authLoading]);

  return { role, usuario, loading: authLoading || loading };
}
