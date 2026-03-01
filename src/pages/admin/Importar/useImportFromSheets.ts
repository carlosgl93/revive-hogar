import { useState } from 'react';

import { getIdToken } from 'firebase/auth';

import { auth } from '@/firebase/config';

export interface ImportResult {
  created: number;
  updated: number;
  skipped: number;
  errors: string[];
}

const FUNCTIONS_URL = import.meta.env.VITE_FIREBASE_FUNCTIONS_URL as string;

export function useImportFromSheets() {
  const [result, setResult] = useState<ImportResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function runImport() {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated');

      const token = await getIdToken(user);

      const response = await fetch(`${FUNCTIONS_URL}/importFromSheets`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? `HTTP ${response.status}`);
      }

      setResult(data as ImportResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  return { runImport, result, loading, error };
}
