import updateCommunityDocs from '../packages/community-docs/src/index';
// import './toolInit';
// import {
//   buildAppContext,
//   createLogger,
// } from '@jupiterone/community-docs/src/util';
import http from 'http';

/* istanbul ignore file
 *
 * Only used for development and testing the app code
 */
require('require-self-ref');
// const context = getAppContext();
// const logger = createLogger(module);



export interface RunOptions {
  port: number;
}

export function start(options: RunOptions) {
  return updateCommunityDocs()
}
