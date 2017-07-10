# create-app webpack配置文件

# update logs
- 2017.07.10 完善插件配置和相关文档
- 2017.06.25 完善配置文档
- 2017.06.24 升级webpack 3.x

## config table

|Name|Description|Type|Default|
|----|-----------|----|-------|
|env|环境变量,根据开发node环境。|String|'development'|
|path_base|项目的根目录路径|String|当前项目所在系统的路径|
|dir_client|项目中程序开发的目录|String|'./src/'|
|dir_dist|项目中打包的目录|String|'./dist'|
|server_host|开发时应用的地址|String|默认当前ip地址|
|server_port|开发时应用的端口|String|默认3000端口|
|mockServer_prot|开发是应用的模拟数据的端口|String|默认3001端口|
|externals|未整理|||
|resolve_extensions|解析文件后缀|Array|`['.js', '.ts', '.jsx', '.json']`|
|resolve_alias|解析模块|Object||
|dev_devtool|开发环境的编译模式|String|`'cheap-module-eval-source-map'`|
|compiler_devtool|生产环境编译模式|String|`'source-map'`|
|compiler_public_path|生产环境编译后的相对路径|String|`'/'`|
|compiler_entry|||
|compiler_vendors|生产环境公共代码提取配置|Array|['react', 'react-redux', 'react-dom', 'react-router-dom', 'redux', 'redux-thunk', 'lazilyload',]|
|globals|全局变量，会配置到webpack.DefinePlugin中|Object|请查看default.config.js|
|extractTextPlugin|extract-text-webpack-plugin插件，disable: 是否启用，config: 插件的配置|Objec[Boolben, Object]|{disable：false, config: {}}|
|htmlWebpackPlugin|html-webpack-plugin插件，disable: 是否启用，config: 插件的配置|Objec[Boolben, Object || Array ]|{disable：false, config: {} || [] }|
|lodashModuleReplacementPlugin|lodash 工具库按需使用插件，disable: 是否启用，config: 插件的配置|Objec[Boolben, Object]|{disable：false, config: {} }|
|vConsolePlugin|移动开发log工具，disable: 是否启用|Boolben|false|

## config details

### htmlWebpackPlugin
*disable*  

默认值为false，表示该插件自定义的配置不启用，但webpack在编译的过程中同样会使用该插件，且该默认配置的template值为`/src/index.html`

*config*  

-   object  
    详细配置请查看[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)
-   array
    多页面的配置（多个html），该数组中的每个元素为`html-webpack-plugin`插件配置。备注：在开发多页面过程中记得处理好相对应的js依赖，可以利用`html-webpack-plugin`中`excludeChunks`和`includeChunks`处理那些是所需要的依赖。
