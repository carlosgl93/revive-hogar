import { useCallback, useEffect, useState } from 'react';

import { format, subMonths } from 'date-fns';

import { paykuSubscriptionsApi } from '@/api';
import { PaykuSubscriptionV3 } from '@/types/payku';

export interface SubscriptionFiltersState {
  dateInit: Date;
  dateEnd: Date;
  statusFilters: {
    register: boolean;
    active: boolean;
    finish: boolean;
    delete: boolean;
    cancel: boolean;
    suspended: boolean;
  };
  page: number;
  pageSize: number;
}

const DEFAULT_FILTERS: SubscriptionFiltersState = {
  dateInit: subMonths(new Date(), 6),
  dateEnd: new Date(),
  statusFilters: {
    register: true,
    active: true,
    finish: false,
    delete: false,
    cancel: false,
    suspended: true,
  },
  page: 0,
  pageSize: 50,
};

export function usePaykuSubscriptionsV3() {
  const [subscriptions, setSubscriptions] = useState<PaykuSubscriptionV3[]>([]);
  const [filters, setFilters] = useState<SubscriptionFiltersState>(DEFAULT_FILTERS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchSubscriptions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        date_init: format(filters.dateInit, 'yyyy-MM-dd'),
        date_end: format(filters.dateEnd, 'yyyy-MM-dd'),
        page: filters.page + 1,
        per_page: filters.pageSize,
        ...Object.fromEntries(Object.entries(filters.statusFilters).filter(([, v]) => v)),
      };
      const { data } = await paykuSubscriptionsApi.listV3(params);
      // V3 response shape: [{ subscriptions: [...] }]
      const subs: PaykuSubscriptionV3[] = Array.isArray(data)
        ? (data[0]?.subscriptions ?? [])
        : (data.subscriptions ?? []);
      setSubscriptions(subs);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  const updateFilter = <K extends keyof SubscriptionFiltersState>(
    key: K,
    value: SubscriptionFiltersState[K],
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const updateStatusFilter = (
    status: keyof SubscriptionFiltersState['statusFilters'],
    value: boolean,
  ) => {
    setFilters((prev) => ({
      ...prev,
      statusFilters: { ...prev.statusFilters, [status]: value },
    }));
  };

  return {
    subscriptions,
    loading,
    error,
    filters,
    updateFilter,
    updateStatusFilter,
    refetch: fetchSubscriptions,
  };
}
