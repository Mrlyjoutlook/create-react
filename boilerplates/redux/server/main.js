const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config');
const defaultConfig = require('../config/default.config');
const compress = require('compression');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const proxy = require('http-proxy-middleware');
// const Dashboard = require('webpack-dashboard');
// const DashboardPlugin = require('webpack-dashboard/plugin');

// const dashboard = new Dashboard({
//   color: 'magenta',
// });

const app = express();
app.use(compress());

if (defaultConfig.env === 'development') {
  const compiler = webpack(webpackConfig);

  // compiler.apply(new DashboardPlugin(dashboard.setData));

  app.use(devMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: defaultConfig.paths.client(),
    hot: true,
    quiet: false,
    historyApiFallback: true,
    noInfo: false,
    lazy: false,
    stats: {
      chunks: false,
      chunkModules: false,
      colors: true,
    },
  }));
  app.use(hotMiddleware(compiler, {
    path: '/__webpack_hmr',
  }));

  // proxy 代理功能
  app.use('/api', proxy({ target: 'http://localhost:80', changeOrigin: true }));

  app.use(express.static(defaultConfig.paths.public()));
} else {
  app.use(express.static(defaultConfig.paths.dist()));
}

module.exports = app;
