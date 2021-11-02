import simpleGit, { SimpleGit } from 'simple-git';

export const getDiffFromHead = async () => {
  try {
    const git: SimpleGit = await simpleGit();
    const resolvedDiff = await git.diff(['--name-only', 'HEAD~1']);
    return resolvedDiff;
  } catch (e) {
    throw e;
  }
};
