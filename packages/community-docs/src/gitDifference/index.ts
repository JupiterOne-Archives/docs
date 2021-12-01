import simpleGit, { SimpleGit } from "simple-git/promise";
import { Logger } from "../Logging";
export const getDiffFromHead: () => Promise<string> = async () => {
  let diff = "";
  try {
    const git: SimpleGit = simpleGit();

    if (git?.diff) {
      const resolvedDiff = await git.diff(["--name-only", "HEAD~1"]);
      diff = resolvedDiff;
    }
  } catch (e) {
    console.log(e);
    Logger.error(`failure on simplegit,\n ${JSON.stringify(e)}`);
    throw new Error("failure on simplegit");
  }
  return diff;
};
