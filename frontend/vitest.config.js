import { defineConfig } from 'vitest/config';
import viteConfig from './vite.config';

/** @type {import('vitest/config').UserConfig} */
export default defineConfig({
  plugins: [...viteConfig.plugins],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './jest.setup.js',
    exclude: ['node_modules'],
    reporters: ['verbose'],
    coverage: {
      all: true,
      reporter: ['text', 'html', 'lcov'],
      include: ['**/src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        '**/src/main.{js,jsx,ts,tsx}',
        '**/src/@types/**/*.d.ts',
        '**/*.test.{js,jsx,ts,tsx}',
        '**/src/vite-env*',
      ],
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0,
    },
  },
});