import type { Handle } from '@sveltejs/kit';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import { env } from '$env/dynamic/public';

export const handle: Handle = async ({ event, resolve }) => {
    const supabaseUrl = env.PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = env.PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing PUBLIC_SUPABASE_URL or PUBLIC_SUPABASE_ANON_KEY');
    }

    event.locals.supabase = createSupabaseServerClient({
        supabaseUrl,
        supabaseKey: supabaseAnonKey,
        event
    });

    const {
        data: { session }
    } = await event.locals.supabase.auth.getSession();

    event.locals.session = session;

    return resolve(event);
};


