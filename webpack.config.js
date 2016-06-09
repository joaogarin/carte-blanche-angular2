/* eslint-disable no-var */
var path = require('path');
const MATCH_ALL_NON_RELATIVE_IMPORTS = /^\w.*$/i;

module.exports = {
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    library: 'carte-blanche-angular2',
    path: path.join(__dirname, 'dist'), // where to place webpack files
  },
  entry: {
    'frontend/index': './frontend/index.ts',
  },
  module: {
    loaders: [
      // Support for .ts files.
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        exclude: [/\.(spec|e2e)\.ts$/]
      },
    ],
  },
  externals: [MATCH_ALL_NON_RELATIVE_IMPORTS],
  target: 'web',
};