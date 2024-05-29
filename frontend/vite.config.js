import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    // proxy:{
    //   '/signup-server':'http://localhost:3000',
    //   '/login-server':'http://localhost:3000',
    //   '/create-asset-server':'http://localhost:3000',
    //   '/api/assets-data':'http://localhost:3000',
    //   '/delete-asset/':'http://localhost:3000',
    //   '/update-asset':'http://localhost:3000',
    // }
  }
})
