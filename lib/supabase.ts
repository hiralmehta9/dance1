import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export type ApiKeyRow = {
  id: string;
  name: string;
  key: string;
  type: "dev" | "prod";
  usage: number;
  monthly_limit: number | null;
  description: string | null;
  created_at: string;
};
