module.exports = {
  hooks: {
    'pre-commit': 'yarn verify-types-versions',
    'pre-push': 'yarn verify-types-versions',
  },
};
