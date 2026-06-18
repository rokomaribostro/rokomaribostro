
CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  product_name text NOT NULL,
  product_id text,
  quantity integer NOT NULL DEFAULT 1,
  size text,
  color text,
  payment_method text NOT NULL DEFAULT 'cash_on_delivery',
  total_price numeric(10,2),
  status text NOT NULL DEFAULT 'pending',
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "insert_orders" ON orders FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "select_orders" ON orders FOR SELECT TO anon USING (true);
