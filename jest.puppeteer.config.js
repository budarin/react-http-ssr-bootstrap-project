module.exports = {
    rootDir: 'src',
    name: 'puppeteer-tests',
    displayName: 'puppeteer-tests',
    preset: 'jest-puppeteer',
    cacheDirectory: '../.tmp/jest/puppeteer-tests',
    transform: {
        '^.+\\.(js|ts|jsx|tsx)$': '../config/jest/transformer.js',
    },
    testMatch: ['**/?(*.)+(test).pptr.js?(x)'],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '../../config/jest/mocks/fileMock.js',
        '\\.(css)$': 'identity-obj-proxy',
    },
    testPathIgnorePatterns: ['/node_modules/'],
    globalSetup: '../config/jest/globalSetup.js',
    globalTeardown: '../config/jest/globalTearDown.js',
    testEnvironment: '../config/jest/puppeteer_environment.js',
    notify: true,
    notifyMode: 'failure',
    globals: {
        'process.env.__DEV__': true,
        'process.env.__PROD__': false,
        'process.env.__BROWSER__': false,
        'process.env.__SERVER__': false,
    },
};
