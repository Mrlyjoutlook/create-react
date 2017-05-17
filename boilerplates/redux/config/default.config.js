/**
 * 默认配置（建议不许直接修改，建议在自定义文件修改custom.config.js）
 */
const path = require('path');
const argv = require('yargs').argv;
const ip = require('ip');

const config = {
  env: process.env.NODE_ENV || 'development',
  path_base: path.resolve(__dirname, '..'),
  dir_client: 'src',
  dir_dist: 'dist',
  dir_public: 'public',
  dir_server: 'server',
  dir_test: 'tests',
  server_host: ip.address(), // use string 'localhost' to prevent exposure on local network
  server_port: process.env.PORT || 3000,
  compiler_babel: {
    cacheDirectory: true,
    plugins: ['transform-runtime'],
    presets: ['es2015', 'react', 'stage-0'],
  },
  compiler_devtool: 'cheap-module-eval-source-map',
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

module.exports = config;
