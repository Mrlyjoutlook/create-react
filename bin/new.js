#!/usr/bin/env node

const mkdirpSync = require('fs-extra').mkdirpSync;
const existsSync = require('fs').existsSync;
const vfs = require('vinyl-fs');
const path = require('path');
const chalk = require('chalk');
const copyfiles = require('copyfiles')

const arg = process.argv[2]
if (!arg) {
    console.log(chalk.red('peak: 缺少项目工程名称'))
} else {
    const dest = path.join(process.cwd(), arg);
    const cwd = path.join(__dirname, '../boilerplates/redux');
    if (existsSync(dest)) {
        console.error(chalk.red('peak: 文件夹已经存在，请勿命名相同'));
        process.exit(1);
    }
    console.log(chalk.green('peak: building...'))
    mkdirpSync(dest);
    const file = '../boilerplates/redux/**'//path.join(__dirname, '../boilerplates/redux/**')
    // copyfiles([file, dest], '-a', function(){
    //    console.error(chalk.green('peak: building ok')); 
    // });
    vfs.src(['**/*', '!node_modules/**/*'], {cwd: cwd, cwdbase: true, dot: true})
    .pipe(dest)
    .pipe(vfs.dest(dest))
    // .on('end', function() {
    // //   info('rename', 'gitignore -> .gitignore');
    // //   renameSync(join(dest, 'gitignore'), join(dest, '.gitignore'));

    // })
    // .resume();
} 

// program
//   .usage('[options] appName')
//   .option('--demo', 'Generate a dead simple project for quick prototype')
//   .option('--no-install', 'Disable npm install after files created')
//   .parse(process.argv);

// if (!program.args[0]) {
//   program.help();
// } else {
//   const dest = join(process.cwd(), program.args[0]);
//   if (existsSync(dest)) {
//     console.error(error('Existing directory here, please run new command for an empty folder!'));
//     process.exit(1);
//   }
//   mkdirpSync(dest);
//   process.chdir(dest);
//   require('../lib/init')(program);
// }