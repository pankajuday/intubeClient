import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
import dotenv from 'dotenv';
import path from "path"
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
  plugins: [react(), tailwindcss()],
  resolve:
    {
      alias: { "@": path.resolve(__dirname, "src") },
    }
  
});

