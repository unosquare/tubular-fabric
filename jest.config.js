module.exports = {
    testEnvironment: 'jsdom',
    preset: 'ts-jest/presets/js-with-babel',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    testMatch: ['<rootDir>/test/**/*.spec.(ts|tsx)'],
    collectCoverageFrom: ['./src/**/*.{ts,tsx}', '!**/node_modules/**', '!./test/**'],
    collectCoverage: false,
    coverageThreshold: {
        global: {
            branches: 50,
            functions: 15,
            lines: 50,
            statements: -520,
        },
    },
    transformIgnorePatterns: ['/node_maodules/(?!tubular-common)'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
        '^.+\\.(js)$': 'babel-jest',
    },
    automock: false,
    setupFilesAfterEnv: ['./jest-setup.ts'],
    setupFiles: ['@testing-library/react/dont-cleanup-after-each'],
};
