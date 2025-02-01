import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import Typia from '@ryoppippi/unplugin-typia/vite'
 
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    Typia({cache: false}),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
