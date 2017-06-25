'use strict';

const argv = require('yargs').argv;
const webpack = require('webpack');
const cssnano = require('cssnano');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const CompressionPlugin = require("compression-webpack-plugin");
const defaultConfig = require('./default.config');

const __DEV__ = defaultConfig.globals.__DEV__;
const __PROD__ = defaultConfig.globals.__PROD__;
const ENCODE = __PROD__ ? 'chunkhash:8' : 'hash:8';

/**
 * base 基础配置
 */
const webpackConfig = {
  target: 'web',
  devtool: __DEV__ ? defaultConfig.dev_devtool : defaultConfig.compiler_devtool,
  module: {},
};
/**
 * entry 入口配置
 */
const APP_ENTRY = defaultConfig.paths.client('index.js');

webpackConfig.entry = {
  app: __DEV__
    ? [APP_ENTRY].concat(`webpack-hot-middleware/client?path=${defaultConfig.compiler_public_path}__webpack_hmr`)
    : [APP_ENTRY],
  vendor: defaultConfig.compiler_vendors,
};
/**
 * output 输出配置
 */
webpackConfig.output = {
  chunkFilename: `[name].[${ENCODE}].chunk.js`,
  filename: `[name].[${ENCODE}].js`,
  path: defaultConfig.paths.dist(),
  publicPath: defaultConfig.compiler_public_path,
};
/**
 * resolve 解析
 */
webpackConfig.resolve = {
  extensions: defaultConfig.resolve_extensions,
  alias: ((obj) => {
    let result = {};
    const keys = object.keys(obj);
    keys.map((item, i) => {
      result[item] = path.resolve(__dirname, obj[item]);
    })
    return result;
  })(defaultConfig.compiler_resolve_alias),
};
  /**
   * externals 外部扩展
   */
  webpackConfig.externals = defaultConfig.externals;
webpackConfig.externals['react/lib/ExecutionEnvironment'] = true;
webpackConfig.externals['react/lib/ReactContext'] = true;
webpackConfig.externals['react/addons'] = true;
/**
 * plugins 插件
 */
webpackConfig.plugins = [
  new webpack.DefinePlugin(defaultConfig.globals),
  // 多线程加速代码构建
  new HappyPack({
    id: 'js',
    loaders: ['babel-loader'],
    threadPool: happyThreadPool,
    cache: true,
    verbose: true
  })
];

if (__DEV__) {
  webpackConfig.plugins.push(
    // 开启全局的模块热替换(HMR)
    new webpack.HotModuleReplacementPlugin(),
    // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息
    new webpack.NamedModulesPlugin(),
    // 跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误
    new webpack.NoEmitOnErrorsPlugin()
  );
} else if (__PROD__) {
  webpackConfig.plugins.push(
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
      basePath: defaultConfig.paths.dist(),
    }),
    // webpack 3.0.0 范围提升（Scope Hoisting）
    new webpack.optimize.ModuleConcatenationPlugin()
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
  })
);
/**
 * module 模块
 */

// javascript loaders
webpackConfig.module.rules = [{
  test: /\.(js|jsx)$/,
  use: ['happypack/loader?id=js'],
  exclude: /node_modules/,
}];

// eslint loaders
// webpackConfig.module.rules.push({
//   test: /\.(js|jsx)$/,
//   enforce: 'pre',
//   use: 'eslint-loader',
// });

// style-css loaders
webpackConfig.module.rules.push({
  test: /\.css$/,
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
webpackConfig.module.rules.push(
  { test: /\.woff(\?.*)?$/, loader: ['url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff'] },
  { test: /\.woff2(\?.*)?$/, loader: ['url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2'] },
  { test: /\.otf(\?.*)?$/, loader: ['file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype'] },
  { test: /\.ttf(\?.*)?$/, loader: ['url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream'] },
  { test: /\.eot(\?.*)?$/, loader: ['file?prefix=fonts/&name=[path][name].[ext]'] },
  { test: /\.svg(\?.*)?$/, loader: ['url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml'] },
  { test: /\.(png|jpg|gif)$/, use: ['url-loader?limit=8192'] },
  { test: /\.(flv|mp4)$/, use: ['file-loader'] }
);

// gizp （需在生产环境才能启动）
if (__PROD__ && defaultConfig.gizp.disable) {
  webpackConfig.plugins.push(
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.(js|html)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  );
}

// extractTextPlugin （需在生产环境才能启动）
if (__PROD__ && defaultConfig.extractTextPlugin.disable) {
  webpackConfig.module.loaders.filter(loader => loader.test.toString.indexOf('ss') !== -1)
    .forEach((rule) => {
      const first = rule.use[0];
      const rest = rule.use.slice(1);
      rule.user = ExtractTextPlugin.extract({
        fallback: first,
        use: rest,
        publicPath: webpackConfig.paths.dist(),
      });
    });

  webpackConfig.plugins.push(
    new ExtractTextPlugin({
      filename: webpackConfig.extractTextPlugin.config.filename,
      disable: false,
      allChunks: true,
    })
  );
}

// htmlWebpackPlugin （需在生产环境才能启动）
if (__PROD__ && defaultConfig.htmlWebpackPlugin.disable) {
  if (typeof defaultConfig.htmlWebpackPlugin.config === 'Object') {
    webpackConfig.plugins.push(
      new HtmlWebpackPlugin(defaultConfig.htmlWebpackPlugin.config)
    );
  }
  if (typeof defaultConfig.htmlWebpackPlugin.config === 'Array') {
    for (let i = 0, n = defaultConfig.htmlWebpackPlugin.config.length; i < n; i++) {
      webpackConfig.plugins.push(
        new HtmlWebpackPlugin(defaultConfig.htmlWebpackPlugin.config[i])
      );
    }
  }
} else {
  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      template: defaultConfig.paths.client('index.html'),
      hash: false,
      favicon: defaultConfig.paths.public('favicon.ico'),
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true,
      },
    })
  );
}

// lodashModuleReplacementPlugin
if (defaultConfig.lodashModuleReplacementPlugin.disable) {
  webpackConfig.plugins.push(
    // lodash 工具库按需使用插件
    new LodashModuleReplacementPlugin(defaultConfig.LodashModuleReplacementPlugin.config)
  );
}

// vConsolePlugin
if (defaultConfig.vConsolePlugin.disable) {
  webpackConfig.plugins.psuh(
    // 移动开发log工具
    new vConsolePlugin({ enable: __DEV__ })
  );
}

module.exports = webpackConfig;
