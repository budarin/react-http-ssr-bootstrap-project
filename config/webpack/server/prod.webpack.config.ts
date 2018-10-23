import path from 'path';
import webpack from 'webpack';
import MinifyPlugin from 'babel-minify-webpack-plugin';

import babelConfig from './babelLoaderConfig';

const config = {
    watch: false,
    // cache: false,
    profile: true,
    target: 'node',
    mode: 'production',
    devtool: 'none',
    entry: ['./src/server/index.ts'],
    output: {
        publicPath: '/',
        filename: 'server.js',
        libraryTarget: 'commonjs2',
        path: path.resolve('./dist'),
    },
    optimization: {
        minimizer: [new MinifyPlugin()],
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
                include: path.resolve('./src'),
                exclude: path.resolve('node_modules'),
                use: {
                    loader: 'image-size',
                    options: {
                        digest: 'hex',
                        hash: 'sha512',
                        publicPath: '/',
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
                            localIdentName: '[hash:base64:8]',
                            sourceMap: true,
                            minify: true,
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
        extensions: ['.ts', '.tsx', '.js', 'jsx'],
        modules: ['node_modules', 'src'],
    },
    plugins: [
        new webpack.DefinePlugin({
            __DEV__: false,
            __PROD__: true,
            __SERVER__: true,
            __BROWSER__: false,
            'process.env.__SERVER__': true, // for components
            'process.env.__BROWSER__': false,
        }),
        new webpack.WatchIgnorePlugin([/css\.d\.ts$/]), // due to slow building ignore changes
        new webpack.SourceMapDevToolPlugin({
            columns: false,
            filename: 'server.js.map',
        }),
    ],
};

export default config;
