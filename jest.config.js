// https://jestjs.io/docs/en/configuration.html

export default {
  collectCoverageFrom: [
    '**/*.ts',
    '!**/*.story.ts', // core component story
    '!**/*.stories.ts', // all stories
    '!**/dist/**/*', // distribution files
    '!**/index.ts', // index files
  ],
  coverageDirectory: '../coverage',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  preset: 'ts-jest',
  rootDir: 'packages',
  testEnvironment: 'jsdom',
  testMatch: ['**/*.spec.ts'],
  verbose: true,
};
