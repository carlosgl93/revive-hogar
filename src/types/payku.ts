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

// ─── Customer types (from /suclient/customers endpoint) ───

export interface PaykuCustomerTransaction {
  created_at: string;
  date_payment: string;
  amount: number;
  transaction: string | number;
  authorization_code: string | null;
  order: string;
  description: string;
  status: string;
}

export interface PaykuCustomerCard {
  identifier: string | null;
  last_4_digits: string;
  card_type: string;
  register: string;
}

export interface PaykuCustomerSubscription {
  id: string;
  created_at: string;
  status: PaykuSubscriptionStatus;
  amount: string;
  plan: {
    id: string;
    name: string;
    currency: string;
  };
  cards: PaykuCardInfo;
  active_cards: PaykuCustomerCard[];
  transactions: PaykuCustomerTransaction[];
  logs: {
    status: Array<{
      change_date: string;
      initial_status: string;
      final_status: string;
    }>;
  };
}

export interface PaykuCustomer {
  id: string;
  rut: string | null;
  name: string;
  first_name: string | null;
  last_name: string | null;
  phone: string;
  email: string;
  address: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
  postal_code: string | null;
  status: string;
  created_at: string;
  updated_at: string | null;
  additional_parameters: Record<string, string | null>;
  subscriptions: PaykuCustomerSubscription[];
}

export interface PaykuCustomersResponse {
  status: string;
  customers: PaykuCustomer[];
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

// ─── Historic Payments (from /transaction endpoint) ───

export type HistoricPaymentType = 'subscription' | 'boton_de_pago';

export interface HistoricPayment {
  amount: number;
  createdAt: string;
  subject: string;
  order: string;
  type: HistoricPaymentType;
  subscriptionId: string | null;
  depositDate: string;
  media: string;
  email: string;
}

export interface UserHistoricPayments {
  direccion: string;
  email: string;
  fullName: string | null;
  phone: string | null;
  lastPaymentDate: string;
  totalPayments: number;
  syncedYears: number[];
  payments: Record<string, HistoricPayment>;
  manuallySettled?: boolean;
  settledAt?: string | null;
  settledBy?: string | null;
}

export interface SyncHistoricPaymentsResponse {
  customersUpdated: number;
  transactionsProcessed: number;
  year: number;
}
