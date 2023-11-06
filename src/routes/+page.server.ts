import type { Actions } from './$types';

export const prerender = false;

export const actions = {
	default: async () => {
		console.log('Received default');
	}
} satisfies Actions;
