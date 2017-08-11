'use strict';

const webpack = require('webpack');
const path = require('path');
const defaultConfig = require('./default.config');

const webpackConfig = {
  target: 'web',
  entry: defaultConfig.compiler_vendors,
  output: {
    path: path.resolve(__dirname, '../public'), // 打包后文件输出的位置
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../', '[name]-manifest.json'),
      name: '[name]_library',
      context: path.resolve(__dirname, "../"),
    }),
    // 压缩打包的文件，与该文章主线无关
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};

webpack(webpackConfig);
