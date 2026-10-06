import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// o proxy abaixo só vale para "npm run dev" (fora do docker)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3005',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
