/* istanbul ignore file */
require('dotenv').config();

module.exports = () => {
  process.env.USING_LOCAL_STACK = process.env.USING_LOCAL_STACK ?? 'true';


  if (process.env.USING_LOCAL_STACK === 'true') {
    process.env.LOCALSTACK_HOSTNAME = 'localhost';

    // Setup environment for using localstack
    process.env.VANILLA_AUTH_TOKEN = process.env.AUTH_TOKEN ?? 'Bearer va.7YJcKgRxs_CwgHcfyUxxVPj0-9zPBNLl.NQlIdA.L_L1KFi';

  } else {
    const awsProfile =
      process.env.AWS_DEFAULT_PROFILE ??
      process.env.AWS_PROFILE ??
      'jupiterone-dev';
    process.env.AWS_DEFAULT_PROFILE = process.env.AWS_PROFILE = awsProfile;
    process.env.AWS_SDK_LOAD_CONFIG = 'true';
  }
};
