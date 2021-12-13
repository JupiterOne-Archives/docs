import updateCommunityDocs from "../packages/community-docs/src/index";

/* istanbul ignore file
 *
 * Only used for development and testing the app code
 */
require("require-self-ref");
// const context = getAppContext();
// const logger = createlogger(module);

export interface RunOptions {
  port: number;
}

export function start(options: RunOptions) {
  return updateCommunityDocs();
}
