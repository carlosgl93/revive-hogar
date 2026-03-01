import { useEffect, useState } from 'react';

import { getIdToken } from 'firebase/auth';

import { auth } from '@/firebase/config';

export interface PaykuTransaction {
  created_at: string;
  amount: number;
  transaction: string;
  authorization_code: string;
  order: string;
  description: string;
  status: string;
}

export interface PaykuSubscription {
  id: string;
  status: string;
  last_status_current_payment: string;
  start: string;
  end: string | null;
  client: {
    id: string;
    name: string;
    email: string;
    rut: string | null;
    phone: string;
    additional_parameters: Record<string, string | null>;
  };
  plan: {
    id: string;
    name: string;
    currency: string;
  };
  cards: {
    last_4_digits: string;
    card_type: string;
  };
  transactions: PaykuTransaction[];
}

const FUNCTIONS_URL = import.meta.env.VITE_FIREBASE_FUNCTIONS_URL as string;

export function usePaykuSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<PaykuSubscription[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchSubscriptions() {
      setLoading(true);
      setError(null);

      try {
        const user = auth.currentUser;
        if (!user) throw new Error('Not authenticated');

        const token = await getIdToken(user);

        const response = await fetch(`${FUNCTIONS_URL}/listPaykuSubscriptions`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${await response.text()}`);
        }

        const json = await response.json();
        console.log({ json });
        const data: PaykuSubscription[] = Array.isArray(json) ? json : (json.subscriptions ?? []);
        if (!cancelled) setSubscriptions(data);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchSubscriptions();

    return () => {
      cancelled = true;
    };
  }, []);

  return { paykuSubscriptions: subscriptions, loading, error };
}
