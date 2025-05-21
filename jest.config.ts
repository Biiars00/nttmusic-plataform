import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  moduleFileExtensions: ["ts", "js", "json"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testMatch: ["**/*.test.ts"],
  collectCoverage: true,
  collectCoverageFrom: ["src/services/**/*.ts"],
  clearMocks: true,
  coverageDirectory: "coverage",
};

export default config;