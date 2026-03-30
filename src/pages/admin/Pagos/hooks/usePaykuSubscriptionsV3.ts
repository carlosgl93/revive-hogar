import { useCallback, useEffect, useState } from 'react';

import { format } from 'date-fns';

import { paykuSubscriptionsApi } from '@/api';
import { PaykuSubscriptionV3 } from '@/types/payku';

export type SubscriptionStatusFilter = 'active' | 'suspended' | 'cancel' | 'delete';

const ALL_STATUSES: SubscriptionStatusFilter[] = ['active', 'suspended', 'cancel', 'delete'];
const DATE_INIT = '2019-01-01';

export interface StatusCounts {
  active: number;
  suspended: number;
  cancel: number;
  delete: number;
}

function parseSubscriptions(data: unknown): PaykuSubscriptionV3[] {
  if (Array.isArray(data)) {
    if (data.length > 0 && data[0]?.subscriptions) {
      return data[0].subscriptions;
    }
    return data;
  }
  if (data && typeof data === 'object' && 'subscriptions' in data) {
    return (data as { subscriptions: PaykuSubscriptionV3[] }).subscriptions ?? [];
  }
  return [];
}

/** Fetch all pages for a single status */
async function fetchAllForStatus(
  status: SubscriptionStatusFilter,
  dateInit: string,
  dateEnd: string,
): Promise<PaykuSubscriptionV3[]> {
  const all: PaykuSubscriptionV3[] = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const params: Record<string, string | number | boolean> = {
      date_init: dateInit,
      date_end: dateEnd,
      page,
      per_page: perPage,
      [status]: true,
    };
    const { data } = await paykuSubscriptionsApi.listV3(params);
    const subs = parseSubscriptions(data);
    if (subs.length === 0) break;
    all.push(...subs);
    if (subs.length < perPage) break;
    page++;
  }

  return all;
}

export function usePaykuSubscriptionsV3() {
  const [allSubscriptions, setAllSubscriptions] = useState<PaykuSubscriptionV3[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [statusCounts, setStatusCounts] = useState<StatusCounts>({
    active: 0,
    suspended: 0,
    cancel: 0,
    delete: 0,
  });

  const dateEnd = format(new Date(), 'yyyy-MM-dd');

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await Promise.all(
        ALL_STATUSES.map((status) => fetchAllForStatus(status, DATE_INIT, dateEnd)),
      );

      const counts: StatusCounts = { active: 0, suspended: 0, cancel: 0, delete: 0 };
      const seen = new Set<string>();
      const merged: PaykuSubscriptionV3[] = [];

      ALL_STATUSES.forEach((status, i) => {
        counts[status] = results[i].length;
        for (const sub of results[i]) {
          if (!seen.has(sub.id)) {
            seen.add(sub.id);
            merged.push(sub);
          }
        }
      });

      setAllSubscriptions(merged);
      setStatusCounts(counts);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [dateEnd]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    subscriptions: allSubscriptions,
    loading,
    error,
    statusCounts,
    refetch: fetchAll,
  };
}
