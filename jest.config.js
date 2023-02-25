// jest.config.js

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
    preset: 'ts-jest',
    testEnvironment: 'node',

    // Add more setup options before each test is run
    // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
    moduleDirectories: ['node_modules', '<rootDir>/'],

    moduleNameMapper: {
        '@app/(.*)$': '<rootDir>/src/$1',
        '@test/(.*)$': '<rootDir>/__tests__/$1',
    },
    "collectCoverageFrom": [
        "src/**/*.tsx",
        "src/**/*.ts",
    ],
    coverageThreshold: {
        global: {
            statements: 1,
            branches: 1,
            functions: 1,
            lines: 1
        }
    },

    coverageReporters: ['clover', 'json', 'lcov', ['text', { skipFull: true }]],

    testPathIgnorePatterns: ['/__fixtures__/', '/__utils__/'],
}

module.exports = customJestConfig
