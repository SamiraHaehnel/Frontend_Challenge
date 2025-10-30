import { createSupabaseServerClient } from "@supabase/auth-helpers-sveltekit";
import {
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY,
} from "$env/static/public";
import type { Handle } from "@sveltejs/kit";
export const handle: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createSupabaseServerClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event,
  });

  const {
    data: { session },
  } = await event.locals.supabase.auth.getSession();

  event.locals.session = session;

  return resolve(event);
};
