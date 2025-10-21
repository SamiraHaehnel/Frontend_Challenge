import type { LayoutServerData } from './$types';

export const load: import('./$types').LayoutServerLoad = async ({ locals }) => {
    const session = locals.session;

    return {
        session,
        user: session?.user ?? null
    };
};


