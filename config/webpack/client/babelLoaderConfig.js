const packageJson = require('../../../package');
const browserslist = packageJson.browserslist;

module.exports = {
    babelrc: false,
    cacheDirectory: '.tmp/babel/client',
    presets: [
        [
            '@babel/preset-env',
            {
                loose: true,
                debug: true,
                modules: false, // to properly work HMR https://github.com/webpack/webpack-dev-server/issues/100
                useBuiltIns: 'usage',
                targets: {
                    // в разработке использовать только последние версии а в продакшене - нужные
                    browsers:
                        process.env.NODE_ENV === 'development'
                            ? ['last 1 Chrome versions']
                            : 'last 1 version, ' + browserslist, // @babel/preset-env has own list of browsers other than others
                },
            },
        ],
        '@babel/preset-react',
        '@babel/preset-typescript',
    ],
    plugins: [
        './config/babel/myplugin.js',
        'react-hot-loader/babel',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        ['babel-plugin-lodash', { id: ['lodash', 'recompose'] }],
        '@babel/plugin-transform-runtime',
    ],
    env: {
        production: {
            plugins: [
                '@babel/plugin-transform-react-inline-elements',
                '@babel/plugin-transform-react-constant-elements',
                'babel-plugin-transform-react-class-to-function',
                'babel-plugin-closure-elimination',
            ],
            ignore: ['__snapshots__', '__tests__', 'node_modules'],
        },
        development: {
            plugins: ['@babel/plugin-transform-react-jsx-self', '@babel/plugin-transform-react-jsx-source'],
            ignore: ['__snapshots__', '__tests__', 'node_modules'],
        },
        test: {
            plugins: ['@babel/plugin-transform-react-jsx-self', '@babel/plugin-transform-react-jsx-source'],
            ignore: ['__snapshots__', '__tests__', 'node_modules'],
        },
    },
};
