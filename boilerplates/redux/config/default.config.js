/**
 * 默认配置（建议不许直接修改，建议在自定义文件修改custom.config.js）
 */
const path = require('path');
const argv = require('yargs').argv;
const ip = require('ip');
const pkg = require('../package.json');
const chalk = require('chalk');

const config = {
  env: process.env.NODE_ENV || 'development',
  path_base: path.resolve(__dirname, '..'),
  dir_client: 'src',
  dir_dist: 'dist',
  dir_public: 'public',
  dir_server: 'server',
  dir_test: 'tests',
  /**
   * ip和端口设置
   */
  server_host: ip.address(), // use string 'localhost' to prevent exposure on local network
  server_port: process.env.PORT || 3000,
  /**
   * webpack通用配置
   */
  externals: {},
  /**
   * webpack开发环境配置
   */
  dev_devtool: 'cheap-module-eval-source-map',
  /**
   * webpack生产环境配置
   */
  compiler_devtool: 'source-map',
  compiler_resolve_alias: {},
  compiler_hash_type: 'hash',
  compiler_fail_on_warning: false,
  compiler_quiet: false,
  compiler_public_path: '/',
  compiler_stats: {
    chunks: false,
    chunkModules: false,
    colors: true,
  },
  compiler_entry: [

  ],
  compiler_vendors: [
    'react',
    'react-redux',
    'react-router',
    'redux',
  ],
  compiler_babel: {
    cacheDirectory: true,
    plugins: ['transform-runtime'],
    presets: ['es2015', 'react', 'stage-0'],
  },
};

config.globals = {
  'process.env': {
    'NODE_ENV': JSON.stringify(config.env),
  },
  'NODE_ENV': config.env,
  '__DEV__': config.env === 'development',
  '__PROD__': config.env === 'production',
  '__TEST__': config.env === 'test',
};

function base() {
  const args = [config.path_base].concat([].slice.call(arguments));
  return path.resolve.apply(path, args);
}

config.paths = {
  base,
  client: base.bind(null, config.dir_client),
  public: base.bind(null, config.dir_public),
  dist: base.bind(null, config.dir_dist),
};

/**
 * 校验默认配置中所需要的依赖是否存在
 */
config.compiler_vendors = config.compiler_vendors.filter((dep) => {
  if (pkg.dependencies[dep]) {
    return true;
  } else {
    console.log(chalk.yellow('waring：默认配置中的compiler_vendors所需的依赖缺失！'));
  }
});

module.exports = Object.assign(config, require('./custom.config'));
