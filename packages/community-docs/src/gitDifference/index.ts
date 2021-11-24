import simpleGit, { SimpleGit } from "simple-git";
import { Logger } from "../Logging";
export const getDiffFromHead: () => Promise<string> = async () => {
  let diff = "";
  try {
    const git: SimpleGit = simpleGit();
    const resolvedDiff = await git.diff(["--name-only", "HEAD~1"]);
    diff = resolvedDiff;
  } catch (e) {
    Logger.error(`failure on simplegit,\n ${JSON.stringify(e)}`);
    throw new Error("failure on simplegit");
  }
  return diff;
};
