const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config');
const defaultConfig = require('../config/default.config');
const compress = require('compression');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const proxy = require('http-proxy-middleware');

const app = express();
app.use(compress());

if (defaultConfig.env === 'development') {
  const compiler = webpack(webpackConfig);

  app.use(devMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: defaultConfig.paths.client(),
    hot: true,
    quiet: defaultConfig.compiler_quiet,
    noInfo: defaultConfig.compiler_quiet,
    lazy: false,
    stats: defaultConfig.compiler_stats
  }));
  app.use(hotMiddleware(compiler, {
    path: '/__webpack_hmr',
  }));

  // proxy 代理功能
  app.use('/api', proxy({ target: 'http://localhost:9000', changeOrigin: true }));

  app.use(express.static(defaultConfig.paths.public()));
} else {
  app.use(express.static(defaultConfig.paths.dist()));
}

module.exports = app;
