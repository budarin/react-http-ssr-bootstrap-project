import path from 'path';
import webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import OptimizeJsPlugin from 'optimize-js-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import EntrypointsPlugin from '../webpackEntrypointPlugin';
import CompressionPlugin from 'compression-webpack-plugin';

import babelConfig from './babelLoaderConfig.js';

const config = {
    watch: false,
    // cache: false,
    target: 'web',
    profile: true,
    devtool: 'none',
    mode: 'production',
    entry: {
        main: ['./src/client/index.tsx'],
    },
    output: {
        publicPath: '/',
        filename: '[contenthash].js',
        chunkFilename: '[contenthash].js',
        path: path.resolve('./dist'),
    },
    optimization: {
        occurrenceOrder: true,
        minimizer: [new OptimizeJsPlugin({ sourceMap: false }), new TerserPlugin()],
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        // получает имя, то есть node_modules/packageName/not/this/part.js
                        // или node_modules/packageName
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                        // имена npm-пакетов можно, не опасаясь проблем, использовать
                        // в URL, но некоторые серверы не любят символы наподобие @
                        return `npm.${packageName.replace('@', '')}`;
                    },
                },
            },
        },
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
                        loader: '@budarin/ts-css-loader',
                        options: {
                            EOL: 'LF',
                            modules: true,
                            browser: true,
                            server: true,
                            camelCase: true,
                            importLoaders: 1,
                            localIdentName: '[hash:base64:8]',
                            sourceMap: false,
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
        extensions: ['.ts', '.tsx', '.js', 'jsx', '.json'],
        modules: ['node_modules', 'src'],
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: './.env.production' },

            { from: './src/common/robots.txt' },
            { from: './src/common/manifest.json', to: '[hash].[ext]' }, // TODO:
            { from: './src/common/favicon.ico', to: '[hash].[ext]' }, // TODO:
            { from: './src/common/android-chrome-192x192.png' },
            { from: './src/common/android-chrome-512x512.png' },
        ]),
        new ManifestPlugin({
            fileName: 'assets-manifest.json',
            writeToFileEmit: true,
        }),
        new webpack.HashedModuleIdsPlugin(), // в результате хэши не будут неожиданно менят
        new webpack.DefinePlugin({
            __DEV__: false,
            __PROD__: true,
            __BROWSER__: true,
            __SERVER__: false,
            'process.env.__BROWSER__': true, // for components
            'process.env.__SERVER__': false,
        }),
        new webpack.WatchIgnorePlugin([/css\.d\.ts$/]),
        new webpack.SourceMapDevToolPlugin({
            columns: false,
            filename: '[file].map',
            // @ts-ignore
            publicPath: 'https://localhost:4430/',
            append: false,
        }),
        new CompressionPlugin({
            cache: '.tmp/gzip',
            filename: '[path].gz[query]',
            test: /\.js(\?.*)?$/i,
            compressionOptions: { level: 9, numiterations: 15 },
            algorithm: 'gzip',
            threshold: 1024,
            minRatio: 0.8,
        }),
        new EntrypointsPlugin({
            filename: 'entrypoints.json',
            space: 2,
        }),
    ],
};

export default config;
