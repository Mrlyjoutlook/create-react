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
