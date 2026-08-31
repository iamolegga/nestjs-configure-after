import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  // esbuild, which vitest uses by default, cannot emit `design:paramtypes`.
  // NestJS resolves constructor dependencies from it, so swc handles the
  // transform instead.
  plugins: [
    swc.vite({
      module: { type: 'es6' },
      jsc: {
        target: 'es2022',
        parser: { syntax: 'typescript', decorators: true },
        transform: { legacyDecorator: true, decoratorMetadata: true },
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'node',
    include: ['__tests__/**/*.spec.ts'],
    // The specs boot real HTTP servers and share the module-level ordering
    // state that `After` synchronises on, so they must not run concurrently.
    fileParallelism: false,
    coverage: {
      enabled: true,
      provider: 'v8',
      include: ['src/**/*.ts'],
      reporter: ['text', 'lcov'],
      reportsDirectory: './coverage',
    },
  },
});
