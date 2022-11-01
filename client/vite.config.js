import { sveltekit } from '@sveltejs/kit/vite';

const config = {
	plugins: [sveltekit()],
	server: {
		port: 3000,
		proxy: {
			"/api": {
				target: "http://localhost:3001/",
				secure: false,
				changeOrigin: false,
			}
		}
	},
	preview: {
        port: 3001
    }
};

export default config;
