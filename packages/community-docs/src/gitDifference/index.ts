import simpleGit, { SimpleGit } from 'simple-git';

export const getDiffFromHead: () => Promise<string> = async () => {
  let diff = '';
  try {
    const git: SimpleGit = simpleGit();
    const resolvedDiff = await git.diff(['--name-only', 'HEAD~1']);
    diff = resolvedDiff;
  } catch (e) {
    console.error(`failure on simplegit,`, e);
    throw new Error('failure on simplegit');
  }
  return diff;
};
