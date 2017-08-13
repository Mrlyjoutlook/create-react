const webpack = require('webpack');
const debug = require('debug')('app:bin:compile');
const webpackConfig = require('../config/webpack.config');
const chalk = require('chalk');
const compile = webpack(webpackConfig);

compile.run((err, stats) => {
  if (err) {
    debug('Webpack compiler encountered a fatal error.', err)
    return false;
  }
  const jsonStats = stats.toJson();
  if (jsonStats.errors.length > 0) {
    debug('Webpack compiler encountered errors.')
    debug(jsonStats.errors.join('\n'))
  } else if (jsonStats.warnings.length > 0) {
    debug('Webpack compiler encountered warnings.')
    debug(jsonStats.warnings.join('\n'))
  } else {
    debug('No errors or warnings encountered.')
  }
});
