'use strict';

const argv = require('yargs').argv;
const webpack = require('webpack');
const cssnano = require('cssnano');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const defaultConfing = require('./default.config');

const __DEV__ = defaultConfing.globals.__DEV__;
const __PROD__ = defaultConfing.globals.__PROD__;
const __TEST__ = defaultConfing.globals.__TEST__;

const webpackConfig = {
  name: 'client',
  target: 'web',
  resolve: {
    root: defaultConfing.paths.client(),
    extensions: ['.js', '.jsx', '.json'],
    alias: defaultConfing.compiler_resolve_alias,
  },
  module: {},
};
/**
 * devtool
 */
webpackConfig.devtool = __DEV__ ? defaultConfing.dev_devtool : defaultConfing.compiler_devtool;
/**
 * entry
 */
const APP_ENTRY = defaultConfing.paths.client('main.js');

webpackConfig.entry = {
  app: __DEV__
    ? [APP_ENTRY].concat(`webpack-hot-middleware/client?path=${defaultConfing.compiler_public_path}__webpack_hmr`)
    : [APP_ENTRY],
  vendor: defaultConfing.compiler_vendors,
};
/**
 * output
 */
webpackConfig.output = {
  filename: '[name].[chunkhash:8].js',
  path: defaultConfing.paths.dist,
  publicPath: defaultConfing.compiler_public_path,
};
/**
 * externals
 */
webpackConfig.externals = defaultConfing.externals;
webpackConfig.externals['react/lib/ExecutionEnvironment'] = true;
webpackConfig.externals['react/lib/ReactContext'] = true;
webpackConfig.externals['react/addons'] = true;
/**
 * plugins
 */
webpackConfig.plugins = [
  new webpack.DefinePlugin(defaultConfing.globals),
  new HtmlWebpackPlugin({
    template: defaultConfing.paths.client('index.html'),
    hash: false,
    favicon: defaultConfing.paths.public('favicon.ico'),
    filename: 'index.html',
    inject: 'body',
    minify: {
      collapseWhitespace: true,
    },
  }),
];

if (__DEV__) {
  webpackConfig.plugins.push(
    // 更换终端输出模板
    new DashboardPlugin(),
    // 开启全局的模块热替换(HMR)
    new webpack.HotModuleReplacementPlugin(),
    // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息
    new webpack.NamedModulesPlugin(),
    // 跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误
    new webpack.NoErrorsPlugin(),

  );
} else if (__PROD__) {
  webpackConfig.plugins.push(
    // lodash 工具库按需使用插件
    new LodashModuleReplacementPlugin(defaultConfing.plugins_lodashModule),
    // webpack 2.x 默认配置 为组件和模块分配ID
    // new webpack.optimize.OccurenceOrderPlugin();
    // webpack 2.x 移除 查找相等或近似的模块，去除生成的文件中出现重复的模块
    // new webpack.optimize.DedupePlugin(),
    // js 代码压缩
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true, // uglifyjs 的警告能够对应到正确的代码行
      compress: {
        screw_ie8: true, // React doesn't support IE8
        unused: true,
        dead_code: true,
        warnings: true,  // uglifyjs 的警告信息
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        comments: false,
        screw_ie8: true,
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    // 提取共享的依赖
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: Infinity,
    }),
    // 设置模块的命名方式为无序的ID命名方式，防止无相关的模块ID发生了改变而修改hash
    new webpack.HashedModuleIdsPlugin(),
    // 生产资源映射表
    new ManifestPlugin({
      fileName: 'manifest.json',
      basePath: defaultConfing.path.dist,
    }),
  );
}

webpackConfig.plugins.push(
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: function () {
        return [
          cssnano({
            autoprefixer: {
              add: true,
              remove: true,
              browsers: ['last 2 versions'],
            },
            discardComments: {
              removeAll: true,
            },
            discardUnused: false,
            mergeIdents: false,
            reduceIdents: false,
            safe: true,
            sourcemap: true,
          }),
        ];
      },
    },
  }),
);
/**
 * module.rules
 */
// javascript loaders
webpackConfig.module.rules = [{
  test: /\.(js|jsx)$/,
  use: ['babel-loader'],
  exclude: /node_modules/,
}];
// eslint loaders
webpackConfig.module.rules.push({
  test: /\.js$/,
  enforce: 'pre',
  use: 'eslint-loader',
});
// style-css loaders
webpackConfig.module.rules.push({
  test: /\.css$/,
  exclude: null,
  use: [{
    loader: 'style-loader',
  }, {
    loader: 'css-loader',
    options: {
      sourceMap: true,
      minimize: true,
      importLoaders: 1,
    },
  }, {
    loader: 'postcss-loader',
  }],
});
// style-less loaders
webpackConfig.module.rules.push({
  test: /\.less$/,
  exclude: null,
  use: [{
    loader: 'style-loader',
  }, {
    loader: 'css-loader',
    options: {
      sourceMap: true,
      minimize: true,
      importLoaders: 1,
    },
  }, {
    loader: 'less-loader',
    options: {
      noIeCompat: true,
    },
  }],
});
// style-sass loaders
webpackConfig.module.rules.push({
  test: /\.scss$/,
  exclude: null,
  use: [{
    loader: 'style-loader',
  }, {
    loader: 'css-loader',
    options: {
      sourceMap: true,
      minimize: true,
      importLoaders: 1,
    },
  }, {
    loader: 'postcss-loader',
  }],
});
// file loaders
webpackConfig.module.loaders.push(
  { test: /\.woff(\?.*)?$/, loader: ['url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff'] },
  { test: /\.woff2(\?.*)?$/, loader: ['url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2'] },
  { test: /\.otf(\?.*)?$/, loader: ['file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype'] },
  { test: /\.ttf(\?.*)?$/, loader: ['url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream'] },
  { test: /\.eot(\?.*)?$/, loader: ['file?prefix=fonts/&name=[path][name].[ext]'] },
  { test: /\.svg(\?.*)?$/, loader: ['url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml'] },
  { test: /\.(png|jpg|gif)$/, use: ['url-loader?limit=8192'] },
  { test: /\.(flv|mp4)$/, use: ['file-loader'] },
);

// ExtractTextPlugin
if (defaultConfing.extractTextPlugin.disable) {
  webpackConfig.module.loaders.filter((loader) =>
    loader.loaders && loader.loaders.find((name) => /css/.test(name.split('?')[0]))
  ).forEach((loader) => {
    const first = loader.loaders[0]
    const rest = loader.loaders.slice(1)
    loader.loader = ExtractTextPlugin.extract(first, rest.join('!'))
    delete loader.loaders
  });

  webpackConfig.plugins.push(
    new ExtractTextPlugin({
      filename: webpackConfig.extractTextPlugin.config.filename,
      disable: false,
      allChunks: true,
    }),
  );
}

// ExtractTextPlugin.extract({
// +        fallback: "style-loader",
// +        use: "css-loader",
// +        publicPath: "/dist"
// +      })

module.exports = webpackConfig;
