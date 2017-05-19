/**
 * 默认配置（建议不许直接修改，建议在自定义文件修改custom.config.js）
 */
const path = require('path');
const argv = require('yargs').argv;
const ip = require('ip');
const pkg = require('../package.json');
const chalk = require('chalk');

const config = {
  /**
   * 应用环境
   */
  env: process.env.NODE_ENV || 'development',
  /**
   * 配置环境
   * globals 会配置到webpack.DefinePlugin中
   */
  globals: {
    'process.env.NODE_ENV': JSON.stringify(this.env),
    'NODE_ENV': this.env,
    '__DEV__': this.env === 'development',
    '__PROD__': this.env === 'production',
    '__TEST__': this.env === 'test',
  },
  /**
   * dir目录
   */
  path_base: path.resolve(__dirname, '..'),
  dir_client: 'src',
  dir_dist: 'dist',
  dir_public: 'public',
  dir_server: 'server',
  dir_mock: 'mock',
  /**
   * ip和端口设置
   */
  server_host: ip.address(),
  server_port: process.env.PORT || 3000,
  mockServer_prot: 3001,
  /**
   * webpack通用配置
   */
  externals: {},
  plugins_lodashModule: {},
  /**
   * webpack开发环境配置
   */
  dev_devtool: 'cheap-module-eval-source-map',
  /**
   * webpack生产环境配置
   */
  compiler_devtool: 'source-map',
  compiler_resolve_alias: {},
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
};

/**
 * 应用开发路径
 */
function base(arg) {
  return path.resolve(config.path_base, arg);
}

config.paths = {
  base: base(),
  client: base(config.dir_client),
  public: base(config.dir_public),
  dist: base(config.dir_dist),
};

/**
 * 应用
 */
config.extractTextPlugin = {
  disable: false,
  config: {
    publicPath: config.path.dist,
    filename: 'app.css',
  },
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
