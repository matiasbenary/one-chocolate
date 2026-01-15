export interface Transaction {
  id: number;
  email: string;
  stripe_id: string;
  transaction_id: string | null;
  status: 'pending' | 'completed' | 'failed';
  amount_cents: number | null;
  product_name: string | null;
  session_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface CryptoTransaction {
  id: number;
  email: string;
  status: 'pending' | 'completed' | 'failed';
  amount_cents: number | null;
  product_name: string | null;
  transacction_id: string;
  near_transaction_hash: string | null;
  created_at: string;
  updated_at: string;
}
