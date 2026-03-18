import { SyncHistoricPaymentsResponse } from '@/types/payku';

import api from './axiosInstance';

export const paykuHistoricApi = {
  sync: (year: number) =>
    api.post<SyncHistoricPaymentsResponse>(`/syncHistoricPayments?year=${year}`),
};
