import api from './axiosInstance';

export interface ListSubscriptionsV3Params {
  date_init?: string;
  date_end?: string;
  page?: number;
  per_page?: number;
  active?: boolean;
  suspended?: boolean;
  register?: boolean;
  finish?: boolean;
  cancel?: boolean;
}

export interface CreateSubscriptionData {
  plan: string;
  client: string;
}

export const paykuSubscriptionsApi = {
  listV3: (params?: ListSubscriptionsV3Params) => api.get('/listPaykuSubscriptionsV3', { params }),

  get: (subscriptionId: string) => api.get('/getPaykuSubscription', { params: { subscriptionId } }),

  create: (data: CreateSubscriptionData) => api.post('/createPaykuSubscription', data),

  delete: (subscriptionId: string) =>
    api.delete('/deletePaykuSubscription', { params: { subscriptionId } }),

  affiliateCard: (subscriptionId: string) => api.post('/affiliatePaykuCard', { subscriptionId }),
};
