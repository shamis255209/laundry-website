-- care_items table for 洗滌須知 admin management
CREATE TABLE IF NOT EXISTS care_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL CHECK (type IN ('fabric', 'mistake')),
  emoji TEXT,
  name TEXT NOT NULL,
  tags TEXT[],
  tips TEXT[],
  caution TEXT,
  wrong_text TEXT,
  right_text TEXT,
  order_number INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE care_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read active care items" ON care_items
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admin full access care items" ON care_items
  FOR ALL USING (true);
