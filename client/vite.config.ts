import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	server: {
		port: 3000,
		proxy: {
			"/api": {
				target: "http://localhost:3001/",
				secure: false,
				changeOrigin: false,
				rewrite: (path) => {
					return path.replace("/api", "");
				}
			}
		}
	},
	preview: {
        port: 3001
    }
};

export default config;
