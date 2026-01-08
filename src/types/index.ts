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

export interface GoogleUser {
  email: string;
  name: string;
  picture: string;
  sub: string;
  given_name?: string;
  family_name?: string;
}
