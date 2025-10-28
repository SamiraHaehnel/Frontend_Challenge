import { createClient } from "@supabase/supabase-js";
import { env } from "$env/dynamic/public";

const supabaseUrl = env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = env.PUBLIC_SUPABASE_ANON_KEY;

const publicUrl = env.PUBLIC_SUPABASE_IMAGE_BUCKET_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing PUBLIC_SUPABASE_URL or PUBLIC_SUPABASE_ANON_KEY");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
