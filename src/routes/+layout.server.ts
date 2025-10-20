import type { LayoutServerData } from './$types';

export const load = async ({ locals }): Promise<LayoutServerData> => {
    return {
        session: locals.session
    };
};


