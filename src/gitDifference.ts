import simpleGit, { SimpleGit } from 'simple-git';

export const getDiffFromHead: () => Promise<string> = async () => {
  try {
    const git: SimpleGit = await simpleGit();
    const resolvedDiff = await git.diff(['--name-only', 'HEAD~1']);
    return resolvedDiff;
  } catch (e) {
    console.error(`failure on simplegit,`, e);
    throw new Error('failure on simplegit');
  }
};
