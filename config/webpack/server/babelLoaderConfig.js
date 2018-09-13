module.exports = {
    babelrc: false,
    cacheDirectory: '.tmp/babel/server',
    presets: [
        [
            '@babel/preset-env',
            {
                loose: true,
                debug: true,
                modules: false,
                useBuiltIns: 'usage',
                targets: {
                    node: 'current',
                },
            },
        ],
        '@babel/preset-react',
        '@babel/preset-typescript',
    ],
    plugins: [
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
    },
};
