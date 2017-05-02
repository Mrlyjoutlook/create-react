#!/usr/bin/env node
'use strict';

const program = require('commander'),
    packConf = require('../package'),
    spawn = require('win-spawn'),
    path = require('path'),
    exists = require('fs').existsSync,
    chalk = require('chalk');

function wrap(sp) {
  sp.on('close', function(code) {
    process.exit(code);
  });
}

function executable(subcmd) {
  var file = path.join(__dirname, 'command/' + subcmd+'.js');
  if (exists(file)) {
    return file;
  }
}

program
  .version(packConf.version)
  .option('-C, --chdir <path>', 'change the working directory')
  .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
  .option('-T, --no-tests', 'ignore test hook')


program
    .command('new')
    .description('build project')
    .action(function (env, options) {
        console.log(chalk.green('peak: build project'));
        /**
         * 判断是否存在文件
         * 是 -> 提示
         * 否 -> 执行命令
         */
        if(exists(env)){
            console.log(chalk.red('peak: project name is exist!'))
        }else{
            console.log(chalk.green('peak: executing command (new...)'))
            const args = process.argv.slice(3)
            const subcmd = program.args[0]
            const runPath = executable(process.argv.slice(2,3))
            console.log(runPath)
            wrap(spawn(runPath, args, {stdio: 'inherit'}))
        }
    });

program.parse(process.argv);