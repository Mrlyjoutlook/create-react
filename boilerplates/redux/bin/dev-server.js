const defaultConfig = require('../config/default.config');
const server = require('../server/main');
const chalk = require('chalk');
const open = require('open');

server.listen(defaultConfig.server_port, function () {
  console.log(chalk.green(`\n==> 🌎  Development Listening on port ${defaultConfig.server_port}. Open up http://localhost:${defaultConfig.server_port}/ in your browser.\n`));
  open('http://localhost:' + defaultConfig.server_port );
});

