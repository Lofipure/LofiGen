const path = require('path');
const chalk = require('chalk');
const fse = require('fs-extra');
const Inquirer = require('inquirer');
const { loading } = require('./utils');

const createKoaTs = async (projectName, cmd) => {
  const cwd = process.cwd();
  let targetDirectory = path.join(cwd, projectName);

  if (fse.existsSync(targetDirectory)) {
    const { isOverwrite } = await new Inquirer.prompt([
      {
        name: 'isOverwrite',
        type: 'list',
        message: '[🤦] Target directory exists, Please choose an action',
        choices: [
          { name: 'Overwrite', value: true },
          { name: 'Cancel', value: false },
        ],
      },
    ]);
    if (isOverwrite) {
      await fse.remove(targetDirectory);
    } else {
      targetDirectory += '__koa-temp';
    }
  }

  await fse.mkdir(targetDirectory);
  await fse.copy(
    path.resolve(__dirname, '../template/koa-ts'),
    targetDirectory,
  );

  const configFilePath = targetDirectory + '/config/index.json';
  await fse.createFile(configFilePath);
  fse.writeFile(
    configFilePath,
    JSON.stringify({
      name: 'wangziheng',
      age: 23,
    }),
  );

  // await loading(
  //   `🦄️ Project 「${projectName}」 init......`,
  //   new Promise((resolve) => {
  //     setTimeout(resolve, 5000);
  //   }),
  // );
  console.log(
    chalk.blue(
      '\n\n[🎉] Koa(TypeScript) Project init ready, Enjoy coding... \n',
    ),
  );
};

module.exports = {
  createKoaTs,
};
