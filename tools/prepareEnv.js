/* istanbul ignore file */
require('dotenv').config();

module.exports = () => {
  process.env.USING_LOCAL_STACK = process.env.USING_LOCAL_STACK ?? 'true';

  if (process.env.USING_LOCAL_STACK === 'true') {
    process.env.LOCALSTACK_HOSTNAME = 'localhost';
  } else {
    const awsProfile =
      process.env.AWS_DEFAULT_PROFILE ??
      process.env.AWS_PROFILE ??
      'jupiterone-dev';
    process.env.AWS_DEFAULT_PROFILE = process.env.AWS_PROFILE = awsProfile;
    process.env.AWS_SDK_LOAD_CONFIG = 'true';
  }
};
