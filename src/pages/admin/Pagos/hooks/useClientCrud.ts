import { useState } from 'react';

import { paykuClientsApi } from '@/api';
import type { CreatePaykuClientData } from '@/api';

export function useClientCrud() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createClient = async (data: CreatePaykuClientData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await paykuClientsApi.create(data);
      return response.data;
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err));
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const updateClient = async (identifier: string, data: Partial<CreatePaykuClientData>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await paykuClientsApi.update(identifier, data);
      return response.data;
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err));
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const deleteClient = async (identifier: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await paykuClientsApi.delete(identifier);
      return response.data;
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err));
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { createClient, updateClient, deleteClient, loading, error };
}
