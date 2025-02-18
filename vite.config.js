import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
dotenv.config();


export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: "http://intubevideo.azurewebsites.net",
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
