const chalk = require('chalk');

module.exports = function () {
  console.log(chalk.gray('\n\nENVIRONMENT:\n'));
  for (const envVariable of [
    'USING_LOCAL_STACK',
    'LOCALSTACK_HOSTNAME',
    'RUNNING_TESTS',
    'AWS_PROFILE',
    'AWS_DEFAULT_PROFILE',
    'AWS_SDK_LOAD_CONFIG',
    'AWS_REGION',
  ]) {
    console.log(`   ${chalk.bold(envVariable)} = ${process.env[envVariable]}`);
  }
  console.log('\n');
};
