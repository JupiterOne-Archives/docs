#!/usr/bin/env node

require('ts-node/register/transpile-only');
require('require-self-ref');

const prepareEnv = require('~/tools/prepareEnv');
const printEnv = require('~/tools/printEnv');

// prepare environment variables before starting/loading server module
prepareEnv();
printEnv();

const server = require('~/tools/server');

// start local server
server.start({
  port: 8080,
});
