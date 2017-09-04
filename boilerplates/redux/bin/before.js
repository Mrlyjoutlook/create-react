const webpack = require('webpack');
const _ = require('lodash');
const nodemon = require('nodemon');
const debug = require('debug')('app:bin:before');
const open = require('open');
const fs = require('fs-extra');
const path = require('path');
const defaultConfig = require('../config/default.config');
const webpackConfig = require('../config/webpack.config.dll');

const file = path.resolve(__dirname, '../config-manifest.json');

const start = function() {
  nodemon({
    script: 'bin/dev-server.js',
    ignore: ["bin", "dist", "public", "src", "node_modules"]
  })
}

const compile = function() {
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
    fs.writeJsonSync(file, {
      env: process.env.NODE_ENV,
      vendor: defaultConfig.compiler_vendors,
      script: `<script src="./${jsonStats.assetsByChunkName.vendor}"></script>`
    });
    start();
  });
}

fs.pathExists(file)
  .then(exists => {
    if (!exists) {
      debug('Using webpack dllPlugin not found config-manifest.json,so creating config-manifest.json!');
      compile();
    } else {
      debug('Check if vendor config has changed.');
      const json = require('../config-manifest.json');
      if (_.isEqual(json.vendor, defaultConfig.compiler_vendors)) {
        debug('Vendor config result is equal.');
        const content = fs.readFileSync(file);
        if (json.env === process.env.NODE_ENV) {
          start();
        } else {
          debug('The environment for compiling files is inconsistent with the current environment.');
          fs.removeSync(file);
          compile();
        }
      } else {
        debug('Vendor config result is different.');
        fs.removeSync(file);
        compile();
      }
    }
  });

