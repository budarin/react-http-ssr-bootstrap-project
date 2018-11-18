import path from 'path';
import webpack from 'webpack';

import env from '../../';
import babelConfig from './babelLoaderConfig';

const { STATIC_URL } = env;
const config = {
    watch: true,
    cache: true,
    target: 'node',
    profile: false,
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: ['./src/server/index.ts'],
    output: {
        publicPath: '/',
        filename: 'server.js',
        libraryTarget: 'commonjs2',
        path: path.resolve('./dist'),
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)$/,
                include: path.resolve('./src'),
                exclude: path.resolve('node_modules'),
                use: {
                    loader: 'babel-loader',
                    options: babelConfig,
                },
            },
            {
                test: /\.svg$/,
                include: [path.resolve('./src'), path.resolve('node_modules')],
                use: {
                    loader: 'raw-loader',
                },
            },
            {
                test: /\.(png|jpg|gif)$/,
                include: [path.resolve('./src'), path.resolve('node_modules')],
                // exclude: path.resolve('node_modules'),
                use: {
                    loader: 'image-size-loader',
                    options: {
                        digest: 'hex',
                        hash: 'sha512',
                        publicPath: STATIC_URL,
                        name: 'img/[name].[hash:8].[ext]',
                        context: path.resolve(__dirname, 'src'),
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'fake-style-loader',
                    },
                    {
                        loader: '@budarin/ts-css-loader',
                        options: {
                            modules: true,
                            browser: true,
                            server: true,
                            camelCase: true,
                            importLoaders: 1,
                            minimize: false,
                            localIdentName: '[name].[local]_[hash:7]',
                        },
                    },
                    {
                        loader: 'postcss-loader',
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', 'jsx', '.json'],
        modules: ['node_modules'],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            __DEV__: true,
            __PROD__: false,
            __SERVER__: true,
            __BROWSER__: false,
            'process.env.__SERVER__': true, // for components
            'process.env.__BROWSER__': false,
        }),
        new webpack.WatchIgnorePlugin([/css\.d\.ts$/]), // due to slow building ignore changes
    ],
};

export default config;
