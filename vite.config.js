import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [react()],
  base: '/projeto-frontend-appmasters',
  build: {
    chunkSizeWarningLimit: 1000,
  }
}));
