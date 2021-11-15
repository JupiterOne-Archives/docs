#!/usr/bin/env node

require('ts-node/register/transpile-only');
require('require-self-ref');

const prepareEnv = require('~/tools/prepareEnv');
const printEnv = require('~/tools/printEnv');

// prepare environment variables before starting/loading server module
prepareEnv();
printEnv();

const server = require('~/tools/server');
console.log('DING')
// start local server
return await server()
