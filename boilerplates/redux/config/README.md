# create-app webpack配置文件

# update logs
- 2017.06.25 完善配置文档
- 2017.06.24 升级webpack 3.x

## table

|Name|Description|Type|Default|
|----|-----------|----|-------|
|env|环境变量,根据开发node环境。|String|'development'|
|path_base|项目的根目录路径|String|当前项目所在系统的路径|
|dir_client|项目中程序开发的目录|String|'./src/'|
|dir_dist|项目中打包的目录|String|'./dist'|
|server_host|开发时应用的地址|String|默认当前ip地址|
|server_port|开发时应用的端口|String|默认3000端口|
|mockServer_prot|开发是应用的模拟数据的端口|String|默认3001端口|
