#!/usr/bin/env node
const yargs = require('yargs');
const path = require('path');
const fs = require('fs');
const {inquirerPrompt} = require('./inquirer');
const {cloneTemplate} = require('./clone');
const {install} = require('./install');

// 项目名称
const projectName = process.argv[3]

yargs.command(
    ['create', 'c'],
    '新建项目',
    function(yargs) {
        return yargs.option('name', {
            alias: 'n',
            demand: true,
            describe: '项目名称',
            type: 'string',
            default: projectName
        })
    },
    async function(argv) {
        // 获取提问参数
        const answers = await inquirerPrompt(argv);
        const {name} = answers;
        const projectDir = path.resolve(path.join('.', name))
        const isExistsDir = fs.existsSync(projectDir);
        if(isExistsDir) {
            console.error(`创建失败，${name}目录已存在！`)
            return
        }

        // 下载对应项目模板
        const isClone = await cloneTemplate(projectDir, answers);

        // 下载依赖
        const isInstall = isClone && await install(projectDir, answers);

    }
).argv;
