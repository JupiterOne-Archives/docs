import { diffToProcedures } from './diffToProcedures';
import { getDiffFromHead } from './gitDifference';

const showDiff = async () => {
  let x = null;
  try {
    x = await getDiffFromHead();
  } catch (e) {
    console.log('ERRR', e);
  }

  if (x) {
    const diffArray = x.trim().split('\n');

    diffToProcedures(diffArray);
  }
};

showDiff();
