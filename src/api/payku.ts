import api from './axiosInstance';

interface CreateTransactionParams {
  clienteId: string;
  email: string;
  amount: number;
  subject: string;
}

interface CreateTransactionResult {
  status: string;
  id: string;
  url: string;
}

export async function createPaykuTransaction(
  params: CreateTransactionParams,
): Promise<CreateTransactionResult> {
  const { data } = await api.post<CreateTransactionResult>(
    '/createPaykuTransactionForClient',
    params,
  );
  return data;
}
