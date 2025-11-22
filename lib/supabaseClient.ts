import { createClient } from '@supabase/supabase-js';

// Note: In a real environment, these would be process.env.NEXT_PUBLIC_SUPABASE_URL 
// and process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.
// For this generated app, we will use placeholders. 
// The service layer handles falling back to mock data if these are invalid.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export const isSupabaseConfigured = (): boolean => {
  return !!supabase;
};