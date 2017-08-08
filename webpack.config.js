'use strict';
const path = require('path');
const configResolver = require('./config/configResolver');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = configResolver.loadConfig('dev');

module.exports = {
    context: path.join(__dirname, 'client'),
    entry: [
        'react-hot-loader/patch',
        './main.jsx',
    ],
    output: {
        path: path.join(__dirname, 'static'),
        filename: 'bundle.js',
        publicPath: config.publicPath,
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    configFile: '.eslintrc',
                    emitWarning: true,
                    failOnWarning: false,
                    failOnError: false,
                }
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                  'babel-loader',
                ]
            },
            {
                test: /\.scss$|\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!sass-loader',
                })
            },
            {
                test: /\.(otf|eot|svg|ttf|woff|woff2).*$/,
                loader: 'url-loader?limit=10000'
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            inject: 'body',
        }),
        new ExtractTextPlugin({
            filename: 'style.css',
            disable: false,
            allChunks: true
        }),
    ],

    resolve: {
        modules: [
            path.join(__dirname, 'node_modules'),
            path.join(__dirname, 'client')
        ],
        extensions: ['.js', '.jsx'],
    }
};
