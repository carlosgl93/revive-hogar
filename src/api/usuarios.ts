import api from './axiosInstance';

interface CreateUsuarioParams {
  email: string;
  password: string;
  nombre: string;
  role: 'admin' | 'chofer';
}

export async function createUsuario(params: CreateUsuarioParams) {
  const { data } = await api.post('/createUsuario', params);
  return data as { uid: string; email: string; nombre: string; role: string };
}

export async function deleteUsuario(uid: string) {
  const { data } = await api.delete('/deleteUsuario', { params: { uid } });
  return data;
}
