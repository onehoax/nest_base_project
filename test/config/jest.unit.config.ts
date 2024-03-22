import { Config } from "jest";
import baseConfig from "test/config/jest.base.config";

const unitConfig: Config = {
  ...baseConfig,
  testMatch: ["<rootDir>/test/src/unit/**/*.spec.ts"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/main.ts",
    "!<rootDir>/src/**/*.module.ts",
    "!<rootDir>/src/**/*.schema.ts",
    "!<rootDir>/src/app/**/*",
    "!<rootDir>/src/**/enum/**/*",
    "!<rootDir>/src/**/dto/**/*",
    "!<rootDir>/src/**/model/**/*",
    "!<rootDir>/src/**/interface/**/*",
    "!<rootDir>/src/**/decorator/**/*",
    "!<rootDir>/src/**/doc/**/*",
    "!<rootDir>/src/**/env/**/*",
  ],
  coverageDirectory: "<rootDir>/test/coverage/unit",
  coverageThreshold: {
    global: {
      functions: 40,
      lines: 40,
    },
  },
};

export default unitConfig;
