import api from './axiosInstance';

export interface ListPaykuClientsParams {
  page?: number;
  per_page?: number;
}

export interface CreatePaykuClientData {
  email: string;
  name: string;
  rut?: string;
  phone?: string;
  address?: string;
  country?: string;
  region?: string;
  city?: string;
  postal_code?: string;
  additional_parameters?: Record<string, string>;
}

export const paykuClientsApi = {
  list: (params?: ListPaykuClientsParams) => api.get('/listPaykuClients', { params }),

  get: (identifier: string) => api.get('/getPaykuClient', { params: { identifier } }),

  create: (data: CreatePaykuClientData) => api.post('/createPaykuClientFn', data),

  update: (identifier: string, data: Partial<CreatePaykuClientData>) =>
    api.put('/updatePaykuClient', data, { params: { identifier } }),

  delete: (identifier: string) => api.delete('/deletePaykuClient', { params: { identifier } }),
};
