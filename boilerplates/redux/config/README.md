# create-app webpack配置文件

# update logs
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
|compiler_vendors|生产环境公共代码提取配置|Array||
|globals|全局变量，会配置到webpack.DefinePlugin中|Object|请查看default.config.js|
|extractTextPlugin|extract-text-webpack-plugin插件，disable: 是否启用，config: 插件的配置|Objec[Boolben, Object]|{disable：false, config: {}}|
|htmlWebpackPlugin|html-webpack-plugin插件，disable: 是否启用，config: 插件的配置|Objec[Boolben, Object || Array ]|{disable：false, config: {} || [] }|

## config details
