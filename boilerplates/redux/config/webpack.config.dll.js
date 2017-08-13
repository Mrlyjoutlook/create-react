'use strict';

const webpack = require('webpack');
const path = require('path');
const defaultConfig = require('./default.config');

module.exports = {
  target: 'web',
  entry: {
    vendor: defaultConfig.compiler_vendors,
  },
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: '[name]_[chunkhash:8].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      context: path.resolve(__dirname, "../"),
      name: '[name]_library',
      path: path.join(__dirname, '../', '[name]-manifest.json')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
  ]
};
