# Create-React/redux
a redux boilerplates!

# Use
`npm i` / `yarn install` 安装所需依赖  
`npm start` or `npm run dev` / `yarn start` or `yarn run dev` 启动程序，其中`npm run dev`修改除`/src`外的文件会重启
`npm run deploy:prod` / `yarn add deploy:prod` 打包代码，生成`/dist`

# Features
- React
- React-Router 4
- Redux
- Webpack 3.x
- babel
- eslint

# babel
配置说明

## presets
- es2015 `{"modules": false}` webpack2.x以上需关闭es2015 modules配置
- stage-0
- react

## plugins
- transform-runtime 语法转义
- transform-react-remove-prop-types 去除生产环境`react propTypes`代码.

# eslint
配置说明

## extends
继承使用的是airbnb config

