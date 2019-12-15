"use strict";


const path = require('path');
const chalk = require('chalk');
const Webpack = require('webpack');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');

module.exports = () => {
    return {
        context: path.resolve(''),
        entry: {
            bundle: './src/boot/index.tsx',
            services: './services/index.ts',
            "service-worker": './services/service-worker/index.ts'
        },
        module: {
            rules: [
                {
                    test: /\.(tsx|ts|js|jsx)?$/,
                    use: [{
                        loader: 'awesome-typescript-loader',
                        options: {silent: true}
                    }],
                    exclude: /node_modules/
                },
                {
                    test: /\.(css|scss)$/,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                    exclude: /node_modules/
                },
                {
                    test: /\.(jpe?g|png|gif)(\?[a-z0-9=.]+)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 5000,
                        fallback: 'file-loader',
                        name: '[path][name].[ext]'
                    },
                    exclude: /node_modules/
                },
                {
                    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    use: 'file-loader?name=[path][name].[ext]',
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: ['*', '.js', '.jsx', '.tsx', '.ts']
        },
        output: {
            path: path.join(__dirname, './public'),
            filename: '[name].js',
            globalObject: 'this'
        },
        plugins: [
            new Webpack.HotModuleReplacementPlugin(),
            new ProgressBarWebpackPlugin({
                format: `→  build ${chalk.yellow.bold(':percent')} (${chalk.green.bold(':elapsed seconds')})`,
            })
        ],
        devServer: {
            contentBase: './public',
            hot: true,
            inline: true,
            port: 7000,
            host: '0.0.0.0',
            historyApiFallback: true
        },
        devtool: 'inline-source-map',
        stats: {
            all: false,
            modules: true,
            maxModules: 0,
            errors: true,
            warnings: true,
            moduleTrace: true,
            errorDetails: true
        }
    };
};