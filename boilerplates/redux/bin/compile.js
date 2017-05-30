const fs = require('fs-extra');
const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config');
const defaultConfig = require('../config/default.config');
const chalk = require('chalk');

const webpackCompiler = (config) =>
  new Promise((resolve, reject) => {
    const compiler = webpack(config);

    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }
      const jsonStats = stats.toJson();
      resolve(jsonStats);
    });
  });

const compile = () => {
  return Promise.resolve()
    .then(() => webpackCompiler(webpackConfig))
    .then(() => {
      console.log(chalk.green('Compiler cpoy file'));
      fs.copySync(defaultConfig.paths.public(), defaultConfig.paths.dist());
    })
    .catch((err) => {
      console.log(chalk.red('Compiler encountered an error.', err));
      process.exit(1);
    });
};

compile();
