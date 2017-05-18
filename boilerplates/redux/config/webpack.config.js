'use strict';

const argv = require('yargs').argv;
const webpack = require('webpack');
const cssnano = require('cssnano');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const defaultConfing = require('./default.config');

const __DEV__ = defaultConfing.globals.__DEV__;
const __PROD__ = defaultConfing.globals.__PROD__;
const __TEST__ = defaultConfing.globals.__TEST__;


const webpackConfig = {
  name    : 'client',
  target  : 'web',
  resolve : {
    root: defaultConfing.paths.client(),
    extensions : ['.js', '.jsx', '.json'],
    alias: defaultConfing.compiler_resolve_alias
  },
  module : {}
}
/**
 * devtool
 */
webpackConfig.devtool = __DEV__ ? defaultConfing.dev_devtool : defaultConfing.compiler_devtool
/**
 * entry
 */
const APP_ENTRY = defaultConfing.paths.client('main.js')

webpackConfig.entry = {
  app : __DEV__
    ? [APP_ENTRY].concat(`webpack-hot-middleware/client?path=$ defaultConfing.compiler_public_path}__webpack_hmr`)
    : [APP_ENTRY],
  vendor : defaultConfing.compiler_vendors
}
/**
 * output
 */
webpackConfig.output = {
  filename   : `[name].[$ defaultConfing.compiler_hash_type}].js`,
  path       : defaultConfing.paths.dist(),
  publicPath : defaultConfing.compiler_public_path
}
/**
 * externals
 */
webpackConfig.externals = defaultConfing.externals
webpackConfig.externals['react/lib/ExecutionEnvironment'] = true
webpackConfig.externals['react/lib/ReactContext'] = true
webpackConfig.externals['react/addons'] = true
/**
 * plugins
 */
webpackConfig.plugins = [
  new webpack.DefinePlugin defaultConfing.globals),
  new HtmlWebpackPlugin({
    template : defaultConfing.paths.client('index.html'),
    hash     : false,
    favicon  : defaultConfing.paths.public('favicon.ico'),
    filename : 'index.html',
    inject   : 'body',
    minify   : {
      collapseWhitespace : true
    }
  })
]

// Ensure that the compiler exits on errors during testing so that
// they do not get skipped and misreported.
if (__TEST__ && !argv.watch) {
  webpackConfig.plugins.push(function () {
    this.plugin('done', function (stats) {
      if (stats.compilation.errors.length) {
        // Pretend no assets were generated. This prevents the tests
        // from running making it clear that there were warnings.
        throw new Error(
          stats.compilation.errors.map(err => err.message || err)
        )
      }
    })
  })
}

if (__DEV__) {
  webpackConfig.plugins.push(
    // 开启全局的模块热替换(HMR)
    new webpack.HotModuleReplacementPlugin(),
    // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息
    new webpack.NamedModulesPlugin(),
    new webpack.NoErrorsPlugin()
  )
} else if (__PROD__) {
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress : {
        unused    : true,
        dead_code : true,
        warnings  : false
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  )
}

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
  webpackConfig.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      names : ['vendor']
    })
  )
}

// ------------------------------------
// Loaders
// ------------------------------------
// JavaScript / JSON
webpackConfig.module.loaders = [{
  test    : /\.(js|jsx)$/,
  exclude : /node_modules/,
  loader  : 'babel',
  query   : defaultConfing.compiler_babel
}, {
  test   : /\.json$/,
  loader : 'json'
}]

// ------------------------------------
// Style Loaders
// ------------------------------------
// We use cssnano with the postcss loader, so we tell
// css-loader not to duplicate minimization.
const BASE_CSS_LOADER = 'css?sourceMap&-minimize'

webpackConfig.module.loaders.push({
  test    : /\.scss$/,
  exclude : null,
  loaders : [
    'style',
    BASE_CSS_LOADER,
    'postcss',
    'sass?sourceMap'
  ]
})
webpackConfig.module.loaders.push({
  test    : /\.css$/,
  exclude : null,
  loaders : [
    'style',
    BASE_CSS_LOADER,
    'postcss'
  ]
})

webpackConfig.sassLoader = {
  includePaths : defaultConfing.paths.client('styles')
}

webpackConfig.postcss = [
  cssnano({
    autoprefixer : {
      add      : true,
      remove   : true,
      browsers : ['last 2 versions']
    },
    discardComments : {
      removeAll : true
    },
    discardUnused : false,
    mergeIdents   : false,
    reduceIdents  : false,
    safe          : true,
    sourcemap     : true
  })
]

// File loaders
/* eslint-disable */
webpackConfig.module.loaders.push(
  { test: /\.woff(\?.*)?$/,  loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
  { test: /\.woff2(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
  { test: /\.otf(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
  { test: /\.ttf(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
  { test: /\.eot(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]' },
  { test: /\.svg(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
  { test: /\.(png|jpg)$/,    loader: 'url?limit=8192' }
)
/* eslint-enable */

// ------------------------------------
// Finalize Configuration
// ------------------------------------
// when we don't know the public path (we know it only when HMR is enabled [in development]) we
// need to use the extractTextPlugin to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
if (!__DEV__) {
  debug('Applying ExtractTextPlugin to CSS loaders.')
  webpackConfig.module.loaders.filter((loader) =>
    loader.loaders && loader.loaders.find((name) => /css/.test(name.split('?')[0]))
  ).forEach((loader) => {
    const first = loader.loaders[0]
    const rest = loader.loaders.slice(1)
    loader.loader = ExtractTextPlugin.extract(first, rest.join('!'))
    delete loader.loaders
  })

  webpackConfig.plugins.push(
    new ExtractTextPlugin('[name].[contenthash].css', {
      allChunks : true
    })
  )
}

module.exports = webpackConfig
