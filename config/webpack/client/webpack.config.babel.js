import fs from 'fs';
import path from 'path';
import webpack from 'webpack';

import env from '../../../src/utils/getEnv';
import babelConfig from './babelLoaderConfig';

const { STATIC_HOST, STATIC_PORT, STATIC_URL } = env;

const config = {
    cache: true,
    target: 'web',
    profile: false,
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: {
        client: ['./src/client/index.tsx'],
    },
    output: {
        publicPath: STATIC_URL,
        filename: '[name].js',
        chunkFilename: '[name].js',
        path: path.resolve('./dist'),
        hotUpdateChunkFilename: '[id].[hash].hot-update.js',
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
                test: /\.(svg|png|jpg|gif)$/,
                include: path.resolve('./src'),
                exclude: path.resolve('node_modules'),
                use: {
                    loader: 'image-size-loader',
                    options: {
                        name: 'img/[name].[hash:8].[ext]',
                        context: path.resolve(__dirname, 'src'),
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader/useable',
                        options: {
                            hmr: true,
                        },
                    },
                    {
                        loader: 'typings-for-css-modules-loader',
                        options: {
                            namedExport: false,
                            modules: true,
                            importLoaders: 1,
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
        modules: ['node_modules', 'src'],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            __DEV__: true,
            __PROD__: false,
            __BROWSER__: true,
            __SERVER__: false,
            'process.env.__BROWSER__': true, // for components
            'process.env.__SERVER__': false,
        }),
        new webpack.WatchIgnorePlugin([/css\.d\.ts$/]), // due to slow building ignore changes
    ],
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },
    devServer: {
        port: STATIC_PORT,
        host: STATIC_HOST,
        hot: true,
        inline: true,
        overlay: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        https: {
            ca: fs.readFileSync('certs/cacert.crt'),
            key: fs.readFileSync('certs/server.key'),
            cert: fs.readFileSync('certs/server.crt'),
        },
    },
};

export default config;
