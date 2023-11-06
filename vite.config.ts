import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import baseSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
	plugins: [sveltekit(), baseSsl()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
