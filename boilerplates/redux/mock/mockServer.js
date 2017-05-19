const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const defaultConfig = require('../config/default.config');
const chalk = require('chalk');

server.use(middlewares);
server.use(router);
server.listen(defaultConfig.mockServer_prot, () => {
  console.log(chalk.green('Mock Server is running-----------------------------------'));
});