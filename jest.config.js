/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    preset: "ts-jest",
    transform: {
        "^.+.tsx?$": ["ts-jest", {}],
    },
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
    transformIgnorePatterns: [
        '<rootDir>/node_modules/',
    ],
};