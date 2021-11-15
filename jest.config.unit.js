// config for running unit tests only across all packages
module.exports = {
  ...require('@jupiterone/typescript-tools/config/jest-monorepo'),
  resetMocks: true,
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testMatch: [
    '<rootDir>/packages/*/src/*/**/*.test.ts',
  ],
};

