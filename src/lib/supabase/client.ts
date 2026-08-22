import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://nvpwhchchyfubbxdtgzl.supabase.co";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52cHdoY2hjaHlmdWJieGR0Z3psIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc0MDE1NDAsImV4cCI6MjEwMjk3NzU0MH0.9uGSaUtQV2Gl_RLXkTpZC42axXvZkN7G2_C3inQOkdE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: typeof window !== "undefined",
    autoRefreshToken: typeof window !== "undefined",
  },
});
