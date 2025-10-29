import { createSupabaseServerClient } from "@supabase/auth-helpers-sveltekit";
import type { Handle } from "@sveltejs/kit";
import { env } from "$env/dynamic/public";

export const handle: Handle = async ({ event, resolve }) => {
  const supabase = createSupabaseServerClient({
    supabaseUrl: env.PUBLIC_SUPABASE_URL,
    supabaseKey: env.PUBLIC_SUPABASE_ANON_KEY,
    event,
  });

  event.locals.supabase = supabase;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  event.locals.session = session;

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === "set-cookie";
    },
  });
};
