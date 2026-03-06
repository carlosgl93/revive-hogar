import axios from 'axios';
import { getIdToken } from 'firebase/auth';

import { auth } from '@/firebase/config';

const FUNCTIONS_URL = import.meta.env.VITE_FIREBASE_FUNCTIONS_URL as string;

const api = axios.create({
  baseURL: FUNCTIONS_URL,
  timeout: 30000,
});

api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await getIdToken(user);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
