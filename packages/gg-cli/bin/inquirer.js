const inquirer = require('inquirer');


function inquirerPrompt(argv) {
    const {name} = argv;
    return new Promise((resolve, reject) => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: '项目名称',
                default: name,
                validate:  function(val) {
                    if (!/^[a-zA-Z]+$/.test(val)) {
                        return "项目名称只能含有英文";
                    }

                    return true
                }
            },
            {
                type: 'list',
                name: 'lang',
                message: '开发语言',
                default: 'vue3',
                choices: ['vue2', 'vue3'],
                filter: function(val) {
                    return {
                        'vue2': 'v2',
                        'vue3': 'v3'
                    }[val]
                }
            }
        ]).then(answers => {
            resolve(answers)
        }).catch(error => {
            reject(error)
        })
    })

}

exports.inquirerPrompt = inquirerPrompt;