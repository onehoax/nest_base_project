import { Config } from "jest";
import baseConfig from "test/config/jest.base.config";

const e2eConfig: Config = {
  ...baseConfig,
  testMatch: ["<rootDir>/test/src/e2e/**/*.spec.e2e.ts"],
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageDirectory: "<rootDir>/test/coverage/e2e",
  coverageThreshold: {
    global: {
      functions: 80,
      lines: 80,
    },
  },
};

export default e2eConfig;
