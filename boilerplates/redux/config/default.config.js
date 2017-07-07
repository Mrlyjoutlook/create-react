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
  dir_mock: 'mock',
  server_host: ip.address(),
  server_port: process.env.PORT || 3000,
  mockServer_prot: 3001,
  externals: {},
  resolve_extensions: ['.js', '.ts', '.jsx', '.json'],
  resolve_alias: {
    lazilyload: '../src/utils/lazilyload',
  },
  dev_devtool: 'cheap-module-eval-source-map',
  compiler_devtool: 'source-map',
  compiler_public_path: '/',
  compiler_stats: {
    chunks: false,
    chunkModules: false,
    colors: true,
  },
  compiler_entry: [],
  compiler_vendors: [
    'react',
    'react-redux',
    'react-dom',
    'react-router-dom',
    'redux',
    'redux-thunk',
    'lazilyload',
  ],
};

/**
 * 应用开发路径
 */
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
 * 配置环境
 * globals 会配置到webpack.DefinePlugin中
 */
config.globals = {
  'process.env.NODE_ENV': JSON.stringify(config.env),
  'NODE_ENV': config.env,
  '__DEV__': config.env === 'development',
  '__PROD__': config.env === 'production',
};
/**
 * 应用功能
 */
config.extractTextPlugin = {
  disable: false,
  config: {
    publicPath: config.paths.dist,
    filename: 'app.css',
  },
};

config.htmlWebpackPlugin = {
  disable: false,
  config: !this.disable ? {
    filename: `${path.join(__dirname, '/../dist/index.html')}`,
    template: `${path.join(__dirname, '/../src/template/index.html')}`,
    inject: true,
    excludeChunks: ['vendor'],
    minify: {
      removeComments: true, // 移除HTML中的注释
      collapseWhitespace: true, // 删除空白符与换行符
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
  } : [],
};

config.lodashModuleReplacementPlugin = {
  disable: false,
  config: {},
};

config.gizp = {
  disable: false,
  config: {},
};

config.vConsolePlugin = {
  disable: false,
};
/**
 * 校验默认配置中所需要的依赖是否存在
 */
config.compiler_vendors = config.compiler_vendors.filter((dep) => {
  if (pkg.dependencies[dep]) {
    return true;
  } else if (Object.keys(config.resolve_alias).indexOf(dep) !== -1) {
    return true;
  } else {
    console.log(chalk.yellow('waring: 默认配置中的compiler_vendors所需的依赖缺失！'));
  }
});

module.exports = Object.assign(config, require('./custom.config'));
