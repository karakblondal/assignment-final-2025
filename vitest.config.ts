import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    // Exclude e2e tests and node_modules so Vitest won’t pick them up
    exclude: ['e2e/**/*', '**/node_modules/**']
  },
});
