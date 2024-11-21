import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.js'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      exclude: ['**/node_modules/**'],
      setupFiles: 'src/testSetup.js',
      coverage: {
        provider: 'v8',
      },
    },
  }),
)
