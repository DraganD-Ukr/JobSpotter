import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables based on the current mode (dev or prod)
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: {
      proxy: {
        '/api': env.VITE_API_URL,
      },
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),  // You can use this to inject the environment into your code
    },
  }
})