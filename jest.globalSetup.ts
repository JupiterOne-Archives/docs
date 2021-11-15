

const prepareEnv = require('./tools/prepareEnv');
const printEnv = require('./tools/printEnv');

module.exports = async () => {
  process.env.RUNNING_TESTS = 'true';

  prepareEnv();
  printEnv();

};
