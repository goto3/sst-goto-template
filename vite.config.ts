import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    testTimeout: 30000,
    restoreMocks: true,
    globals: true,
    coverage: {
      reporter: ['cobertura', 'text', 'json', 'html'],
      include: [
        'backend/**',
      ],
      exclude: [
        '**/node_modules/**',
        '**/test/**',
        '**/index.ts',
        '**/*.input.ts',
        '**/infra',
        '**/*.output.ts',
        '**/*.schema.ts',
        '**/*.type.ts',
        '**/coverage',
        '**/vite.config.ts',
        '.build',
        '.cache',
        '.git',
        '.idea',
        '.log',
        '.sst',
        'apps',
        'dist',
      ],
      all: true
    }
  },
});