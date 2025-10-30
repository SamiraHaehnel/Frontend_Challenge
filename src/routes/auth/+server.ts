import { json } from "@sveltejs/kit";
import { createSupabaseServerClient } from "@supabase/auth-helpers-sveltekit";
import {
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY,
} from "$env/static/public";

export const POST = async (event) => {
  const { request } = event;
  const { email, password } = await request.json();

  // ❗️Wichtig: Hier das event direkt übergeben
  const supabase = createSupabaseServerClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event,
  });

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Supabase login error:", error.message);
    return json({ error: error.message }, { status: 401 });
  }

  // Supabase setzt automatisch die Cookies über event
  return json({ user: data.user });
};
