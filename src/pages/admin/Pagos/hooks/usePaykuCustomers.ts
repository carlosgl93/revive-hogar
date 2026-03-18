import { useCallback, useEffect, useState } from 'react';

import { paykuClientsApi } from '@/api';
import { PaykuCustomer } from '@/types/payku';

const PAGE_SIZE = 20;

export interface CustomerFiltersState {
  searchEmail: string;
  page: number;
}

const DEFAULT_FILTERS: CustomerFiltersState = {
  searchEmail: '',
  page: 1,
};

export function usePaykuCustomers() {
  const [customers, setCustomers] = useState<PaykuCustomer[]>([]);
  const [filters, setFilters] = useState<CustomerFiltersState>(DEFAULT_FILTERS);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchCustomers = useCallback(
    async (page: number, append: boolean) => {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      setError(null);

      try {
        // If searching by email, use the single-customer endpoint
        if (filters.searchEmail.trim()) {
          const { data } = await paykuClientsApi.searchByEmail(filters.searchEmail.trim());
          // The response for a single lookup is the customer object directly
          const customer: PaykuCustomer = data as PaykuCustomer;
          setCustomers(customer ? [customer] : []);
          setHasMore(false);
        } else {
          const { data } = await paykuClientsApi.listCustomers({
            page,
            per_page: PAGE_SIZE,
          });
          const fetched = data?.customers ?? [];
          if (append) {
            setCustomers((prev) => [...prev, ...fetched]);
          } else {
            setCustomers(fetched);
          }
          // Assume there are more pages if we got a full page of results
          setHasMore(fetched.length >= PAGE_SIZE);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [filters.searchEmail],
  );

  // Initial fetch and whenever search changes
  useEffect(() => {
    setFilters((prev) => ({ ...prev, page: 1 }));
    setHasMore(true);
    fetchCustomers(1, false);
  }, [fetchCustomers]);

  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;
    const nextPage = filters.page + 1;
    setFilters((prev) => ({ ...prev, page: nextPage }));
    fetchCustomers(nextPage, true);
  }, [filters.page, loadingMore, hasMore, fetchCustomers]);

  const setSearchEmail = useCallback((email: string) => {
    setFilters((prev) => ({ ...prev, searchEmail: email, page: 1 }));
  }, []);

  const refetch = useCallback(() => {
    fetchCustomers(1, false);
  }, [fetchCustomers]);

  return {
    customers,
    loading,
    loadingMore,
    error,
    hasMore,
    filters,
    setSearchEmail,
    loadMore,
    refetch,
  };
}
