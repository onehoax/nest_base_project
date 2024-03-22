import type { Config } from "jest";

const baseConfig: Config = {
  verbose: true,
  preset: "ts-jest",
  rootDir: "./../../",
  moduleNameMapper: {
    "^@app/(.*)$": "<rootDir>/src/$1",
    "^@testApp/(.*)$": "<rootDir>/test/src/$1",
  },
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverage: true,
  coverageReporters: ["clover", "json", "lcov", "text", "html"],
  moduleFileExtensions: ["js", "json", "ts"],
  moduleDirectories: ["node_modules", "src"],
};

export default baseConfig;
