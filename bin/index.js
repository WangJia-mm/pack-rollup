#!/usr/bin/env node

console.log(222);
// let program = require('commander');
// let package = require('../package.json');
//
// // 定义版本和参数选项
// program
//     .version(package.version,'-v,--version')
//     .option('-i, --name<path>','pack-rollup','pack-rollup')
//     .command('init <name>')
//     .action()
//
//
// // 必须在.parse()之前，因为node的emit()是即时的
// // 用于解析process.argv，设置options以及触发commands
// program.parse(process.argv);