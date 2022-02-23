const {
  buildBabelConfig,
} = require('@jupiterone/typescript-tools/config/babel-util');
module.exports = buildBabelConfig({ packageDir: __dirname });
