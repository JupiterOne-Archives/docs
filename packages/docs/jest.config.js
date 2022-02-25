const {
  buildJestConfig,
} = require("@jupiterone/typescript-tools/config/jest-util");
module.exports = {
  ...buildJestConfig({ packageDir: __dirname }),
  setupFilesAfterEnv: ["../../jest.setup.ts"],
  globalSetup: "../../jest.globalSetup.ts",
  coveragePathIgnorePatterns: [
    "./src/utils/index.ts",
    "./src/loggingUtil.ts",
    "./src/utils/types.ts",
  ],
};
