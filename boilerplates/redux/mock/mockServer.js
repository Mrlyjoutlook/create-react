const jsonServer = require('json-server');
const defaultConfig = require('../config/default.config');
const chalk = require('chalk');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

server.listen(defaultConfig.mockServer_prot, () => {
  console.log(chalk.green(`\n==> 🌎  Mock Listening on port ${defaultConfig.mockServer_prot}. Open up http://localhost:${defaultConfig.mockServer_prot}/ in your browser.\n`));
});
