# Notice
The project has been update and moved to [new address](https://github.com/Mrlyjoutlook/generator-react-app-cli)  

项目已经升级和迁移[新地址](https://github.com/Mrlyjoutlook/generator-react-app-cli)

# Create-React
create react project engineer

# Use

```
# Install
$ npm i create-react-generator -g

# Create app
$ peak new myapp

# Start app
$ cd myapp
$ npm i
$ npm start
```

# Features
- React-Router 4
- Boilerplates
- - Redux
- - Dva
- - Mobox
- Webpack 3.x

# Mock
use `json-server`
```
# ./mock
$ node mockServer
```

*if need proxy*
use `http-proxy-middleware`
```
# ./server
app.use('/api', proxy({ target: 'http://localhost:80', changeOrigin: true }));
```

# First
