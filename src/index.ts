import { getDiffFromHead } from './gitDifference';

const showDiff = async () => {
  try {
    const x = await getDiffFromHead();
    console.log(x?.split(/\n/), 'x'); // trim out non docs directories
  } catch (e) {
    console.log('ERRR', e);
  }
};

showDiff();
