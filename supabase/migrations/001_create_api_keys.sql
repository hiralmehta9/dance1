-- Create api_keys table for storing API keys
CREATE TABLE IF NOT EXISTS api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  key TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('dev', 'prod')),
  usage INTEGER NOT NULL DEFAULT 0,
  monthly_limit INTEGER,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- Allow all operations for now (adjust for auth when you add user authentication)
-- For production, you'd want: CREATE POLICY "Users can manage own keys" ON api_keys FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Allow all access for api_keys" ON api_keys
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_api_keys_created_at ON api_keys(created_at DESC);
