const webpack = require('webpack');
const debug = require('debug')('app:bin:compile');
const fs = require('fs-extra');
const path = require('path');
const webpackConfig = require('../config/webpack.config');
const webpackDllConfig = require('../config/webpack.config.dll');

const file = path.resolve(__dirname, '../config-manifest.json');
const content = require('../config-manifest.json');

function compile() {
  webpack(webpackConfig).run((err, stats) => {
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
}

if (content.env !== process.env.NODE_ENV) {
  debug('The environment for compiling files is inconsistent with the current environment.');
  debug('Restart build!');
  webpack(webpackDllConfig).run((err, stats) => {
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
  fs.writeJsonSync(file, Object.assign({}, content, {env: process.env.NODE_ENV}));
  compile();
}
