import axios, { AxiosInstance } from 'axios';
import { createHash } from 'crypto';

export function createPaykuClient(
  publicToken: string,
  privateToken: string,
  baseUrl?: string,
): AxiosInstance {
  const base = baseUrl || 'https://app.payku.cl/api';

  const client = axios.create({
    baseURL: base,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${publicToken}`,
    },
  });

  client.interceptors.request.use((config) => {
    const requestPath = config.url || '';
    const body = config.data ? JSON.stringify(config.data) : '';
    const sign = createHash('sha256')
      .update(requestPath + body + privateToken)
      .digest('hex');
    config.headers.set('Sign', sign);
    return config;
  });

  return client;
}
