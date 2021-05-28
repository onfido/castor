// https://jestjs.io/docs/en/configuration.html

export default {
  collectCoverageFrom: [
    '**/*.ts',
    '!**/*.stories.ts', // stories
    '!**/dist/**/*', // distribution files
    '!**/integrated/**/*', // integrated files
    '!**/index.ts', // index files
  ],
  coverageDirectory: '../coverage/unit',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  moduleNameMapper: {
    '^@onfido/castor$': '<rootDir>/core/src',
    '^@onfido/castor-(.*)$': '<rootDir>/$1/src',
  },
  preset: 'ts-jest',
  rootDir: 'packages',
  testEnvironment: 'jsdom',
  testMatch: ['**/*.spec.ts'],
  verbose: true,
};
