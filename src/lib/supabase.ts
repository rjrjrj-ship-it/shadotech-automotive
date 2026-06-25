import { createClient } from "@supabase/supabase-js";

const url    = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!url || !anonKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars");
}

export const supabase = createClient(url, anonKey);
