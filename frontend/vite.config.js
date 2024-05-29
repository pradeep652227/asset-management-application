import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy:{
      '/api/signup-server':'http://localhost:3000',
      '/api/login-server':'http://localhost:3000',
      '/api/create-asset-server':'http://localhost:3000',
      '/api/assets-data':'http://localhost:3000',
      '/api/delete-asset/':'http://localhost:3000',
      '/api/update-asset':'http://localhost:3000',
    }
  },
});
