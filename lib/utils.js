const ora = require('ora');

const loading = async (message, promiseTask) => {
  const spinner = ora(message).start();
  await promiseTask;
  spinner.succeed();
};

module.exports = {
  loading,
};
