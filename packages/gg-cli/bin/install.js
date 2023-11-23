const { exec } = require('child_process');
const ora = require("ora");

const dependenciesMap = {

}
const command = 'pnpm install';

function install(cmdPath, argv) {
    const {name} = argv;
    const spinner = ora();
    spinner.start('doing dependencies install'); 
    return new Promise((resolve, reject) => {
        exec(
            command,
            {
              cwd: cmdPath,
            },
            function (error) {
              if (error) {
                reject(false);
                spinner.fail(`error dependencies install`);
                return;
              }
              spinner.succeed(`done dependencies install`);
              spinner.info('\n\n project init complete, you can: \n\n');
              spinner.info(`cd ${name}`);
              spinner.info(`pnpm run dev`);
              resolve(true);
            }
          )
    })
}

exports.install = install;