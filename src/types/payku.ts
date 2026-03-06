export type PaykuSubscriptionStatus =
  | 'register'
  | 'active'
  | 'finish'
  | 'delete'
  | 'cancel'
  | 'suspended';

export interface PaykuCardInfo {
  last_4_digits: string;
  card_type: string;
}

export interface PaykuTransaction {
  created_at: string;
  amount: number;
  transaction: string;
  payment_key: string | null;
  transaction_key: string | null;
  authorization_code: string;
  order: string;
  description: string;
  status: string;
}

export interface PaykuPaidCycle {
  payment_cycle_day: string;
  pay_day: string;
  status: string;
  amount_paid: number;
  try_number: number;
  paid_number: number;
  transactions: PaykuTransaction[] | null;
}

export interface PaykuSubscriptionV3 {
  id: string;
  status: PaykuSubscriptionStatus;
  start: string;
  end: string | null;
  client: {
    id: string;
    name: string;
    first_name: string | null;
    last_name: string | null;
    email: string;
    rut: string | null;
    phone: string;
    address: string | null;
    city: string | null;
    region: string | null;
    country: string | null;
    postal_code: string | null;
    created_at: string;
    update_at: string | null;
    parametros: string | null;
    additional_parameters: Record<string, string | null>;
  };
  plain: {
    id: string;
    name: string;
    currency: string;
  };
  active_card: PaykuCardInfo;
  paid: PaykuPaidCycle[];
  logs: {
    status: Array<{
      change_date: string;
      initial_status: string;
      end_status: string;
    }>;
  };
}

export interface PaykuClientResponse {
  status: string;
  id: string;
  rut: string | null;
  name: string;
  phone: string;
  email: string;
  address: string;
  country: string;
  region: string;
  city: string;
  postal_code: string;
  created_at: string;
  update_at: string | null;
  additional_parameters: Record<string, string | null>;
}

export interface PaykuSubscriptionCreateResponse {
  status: string;
  id: string;
  url: string;
}

export interface PaykuCardAffiliationResponse {
  status: string;
  id: string;
  url: string;
}
