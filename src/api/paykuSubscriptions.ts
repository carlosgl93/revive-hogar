import api from './axiosInstance';

export interface CreateSubscriptionData {
  plan: string;
  client: string;
}

export const paykuSubscriptionsApi = {
  listV3: (params?: Record<string, string | number | boolean>) =>
    api.get('/listPaykuSubscriptionsV3', { params }),

  get: (subscriptionId: string) => api.get('/getPaykuSubscription', { params: { subscriptionId } }),

  create: (data: CreateSubscriptionData) => api.post('/createPaykuSubscription', data),

  delete: (subscriptionId: string) =>
    api.delete('/deletePaykuSubscription', { params: { subscriptionId } }),

  affiliateCard: (subscriptionId: string) => api.post('/affiliatePaykuCard', { subscriptionId }),
};
