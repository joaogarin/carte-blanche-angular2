/* eslint-disable no-var */
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');

var path = require('path');
const MATCH_ALL_NON_RELATIVE_IMPORTS = /^\w.*$/i;

const helpers = require('./helpers');

var common_config = {
    module: {
        preloaders: [
            /**
             * Tslint loader support for *.ts files
             *
             * See: https://github.com/wbuchwalter/tslint-loader
             */
            {
                test: /\.ts$/,
                loader: 'tslint-loader',
                exclude: [helpers.root('node_modules')]
            },
        ],
        loaders: [
            // Support Angular 2 async routes via .async.ts
            {
                test: /\.async\.ts$/,
                loaders: ['es6-promise-loader', 'ts-loader'],
                exclude: [/\.(spec|e2e)\.ts$/]
            },

            // Support for .ts files.
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                exclude: [/\.(spec|e2e)\.ts$/]
            },
        ],
    },
    plugins: [
        //new webpack.optimize.CommonsChunkPlugin({ name: ['frontend/index', 'frontend/polyfills'], minChunks: Infinity }),
    ],
    // Other module loader config
    tslint: {
        emitErrors: true,
        failOnHint: false,
        resourcePath: 'frontend'
    },
    //externals: [MATCH_ALL_NON_RELATIVE_IMPORTS],
    target: 'web',
    // we need this due to problems with es6-shim
    node: {
        global: 'window',
        progress: false,
        crypto: 'empty',
        module: false,
        clearImmediate: false,
        setImmediate: false
    },
};

var frontend_config = {
    output: {
        filename: '[name].js',
        libraryTarget: 'commonjs2',
        //library: 'carte_blanche_angular2',
        path: path.join(__dirname, 'dist'), // where to place webpack files
        sourceMapFilename: '[name].map',
    },
    entry: {
        'frontend/index': './frontend/index.ts',
    },
};

var polyfill_config = {
    output: {
        filename: '[name].js',
        //library: 'carte_blanche_angular2',
        path: path.join(__dirname, 'dist'), // where to place webpack files
        sourceMapFilename: '[name].map',
    },
    entry: {
        'frontend/polyfills': './frontend/polyfills.ts',
    },
};

module.exports = [
    // Frontend
    webpackMerge({}, common_config, frontend_config),
    // Polyfill
    webpackMerge({}, common_config, polyfill_config),
]