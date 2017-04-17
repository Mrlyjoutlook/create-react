#!/usr/bin/env node
'use strict';

const program = require('commander'),
    packConf = require('../package'),
    spawn = require('win-spawn'),
    path = require('path'),
    exists = require('fs').existsSync,
    chalk = require('chalk');

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

        if(exists(env)){
            console.log(chalk.red('peak: project name is exist!'))
        }else{
            
        }

    });

program.parse(process.argv);