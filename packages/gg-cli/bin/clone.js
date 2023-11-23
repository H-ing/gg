const path = require('path');
const fs = require('fs');
const simpleGit = require('simple-git');
const git = simpleGit();

const ora = require("ora")

// 模板仓库地址
const gitAdress = 'https://github.com/H-ing/project-template.git';
const tmpConfig = new Map();
tmpConfig.set('v2', {
    '--branch': 'v2',
    '--depth': 5,
    '--recursive': true,
    '--checkout': false 
});
tmpConfig.set('v3', {
    '--branch': 'v3',
    '--depth': 5,
    '--recursive': true,
    '--checkout': false 
});

function cloneTemplate(projectDir, argv) {
    const {lang} = argv;
    const gitCloneConfig = tmpConfig.get(lang);
    
    const spinner = ora();
    spinner.start('doing template clone');

    return new Promise((resolve, reject) => {
        // 下载仓库
        git.clone(gitAdress, projectDir, gitCloneConfig).then(() => {
            spinner.succeed('done template clone')
            // 删除模板旧的.git
            fs.rmdirSync(path.join(projectDir, '.git'), {force: true, recursive:true})
            // 初始化项目.git
            const projectGit = simpleGit({
                baseDir: projectDir,
                binary: 'git',
                maxConcurrentProcesses: 6,
                trimmed: false,
             }) 
             projectGit.init().then(() => {
                spinner.succeed('done git init');
                resolve(true);
            }).catch(error => {
                spinner.fail('error git init')
                reject(false)
            })
        }).catch(error => {
            spinner.fail('error git clone')
            reject(false)
        })
    })
    
}

exports.cloneTemplate = cloneTemplate;