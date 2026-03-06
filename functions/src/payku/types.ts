// --- Request Types ---

export interface PaykuClientCreateRequest {
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

export interface PaykuSubscriptionCreateRequest {
  plan: string;
  client: string;
}

export interface PaykuCardAffiliationRequest {
  suscription: string;
}

// --- Common nested types ---

export interface PaykuCardInfo {
  last_4_digits: string;
  card_type: string;
}

export interface PaykuTransactionItem {
  created_at: string;
  amount: number;
  transaction: number;
  payment_key?: string | null;
  transaction_key?: string | null;
  authorization_code: string;
  order: string;
  description: string;
  status: string;
}

// --- Client Response ---

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

// --- Subscription V2 response (from GET /sususcription) ---

export interface PaykuSubscriptionV2 {
  id: string;
  status: string;
  last_status_current_payment: string;
  start: string;
  end: string | null;
  client: {
    id: string;
    name: string;
    email: string;
    rut: string | null;
    phone: string;
    additional_parameters: string | Record<string, string | null>;
  };
  plan: {
    id: string;
    name: string;
    currency: string;
  };
  cards: PaykuCardInfo;
  transactions: PaykuTransactionItem[];
  logs: {
    status: Array<{
      change_date: string;
      initial_status: string;
      final_status: string;
    }>;
  };
}

// --- Subscription V3 response (from GET /sususcriptionv3) ---
// V3 uses "estatus" not "status", "active_cards" not "cards", "paid[]" not "transactions[]"

export interface PaykuSubscriptionV3 {
  id: string;
  estatus: string;
  start: string;
  end: string | null;
  client: {
    id: string;
    name: string;
    email: string;
    rut: string | null;
    phone: string;
    additional_parameters: string | Record<string, string | null>;
  };
  plan: {
    id: string;
    name: string;
    currency: string;
  };
  active_cards: PaykuCardInfo;
  paid: Array<{
    payment_cycle_day: string;
    payment_day: string;
    status: string;
    amount_paid: number;
    try_number: number;
    paid_number: number;
    transactions: PaykuTransactionItem[];
  }>;
  logs: {
    status: Array<{
      change_date: string;
      initial_status: string;
      final_status: string;
    }>;
  };
}

// --- Subscription creation response ---

export interface PaykuSubscriptionCreateResponse {
  status: string;
  id: string;
  url: string;
}

// --- Card affiliation response ---

export interface PaykuCardAffiliationResponse {
  status: string;
  id: string;
  url: string;
}

// --- Webhook payloads ---

export interface PaykuSubscriptionWebhook {
  id: string;
  status: string;
}

export interface PaykuPaymentWebhook {
  transaction_id: number;
  verification_key: string;
  order: number;
  status: string;
  subscriptions: {
    id: string;
    client: string;
  };
}
