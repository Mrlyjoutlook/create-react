const debug = require('debug')('app:bin:dev-server');
const open = require('open');
const defaultConfig = require('../config/default.config');
const server = require('../server/main');

debug('Opening server');
server.listen(defaultConfig.server_port, function () {
  debug(`==> 🌎  Development Listening on port ${defaultConfig.server_port}. Open up http://localhost:${defaultConfig.server_port}/ in your browser.\n`);
  open('http://localhost:' + defaultConfig.server_port );
});
