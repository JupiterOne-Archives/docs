// This is a root level jest config for running tests
// across all packages.
module.exports = {
  ...require('@jupiterone/typescript-tools/config/jest-monorepo'),
  resetMocks: true,

  // All packages use the same jest.setup.ts file
  setupFilesAfterEnv: ['./jest.setup.ts'],
  globalSetup: './jest.globalSetup.ts',
  modulePathIgnorePatterns: ["integrations-handling"]
};
