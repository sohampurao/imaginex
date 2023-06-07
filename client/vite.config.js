import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sass from 'sass';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api/': 'http://localhost:5000/',
    },
  },
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    },
  },
});
