export interface PaykuSubscription {
  id: string;
  status: string;
  email: string;
  amount: number;
  plan: string;
  created_at: string;
  next_payment_date: string;
}

export interface PaykuSubscriptionResponse {
  data: PaykuSubscription[];
}

export interface PaykuSubscriptionDetailResponse {
  id: string;
  status: string;
  email: string;
  amount: number;
  plan: string;
  payments: PaykuPayment[];
}

export interface PaykuPayment {
  id: string;
  status: string;
  amount: number;
  date: string;
}
