// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: ReturnType<typeof import('@supabase/auth-helpers-sveltekit').createSupabaseServerClient>;
			session: import('@supabase/supabase-js').Session | null;
		}
		interface PageData {
			session: import('@supabase/supabase-js').Session | null;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
