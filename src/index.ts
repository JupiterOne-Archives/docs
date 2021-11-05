import { diffToProcedures } from './diffToProcedures';
import { getDiffFromHead } from './gitDifference';
import { fetchWrapper } from './proceduresToVanillaRequests';

const showDiff = async () => {
  let x = null;
  try {
    x = await getDiffFromHead();
  } catch (e) {
    console.log('ERRR', e);
  }

  if (x) {
    const diffArray = x.trim().split('\n');

    const procedures = diffToProcedures(diffArray);
    if (procedures && procedures.length > 0) {
      fetchWrapper(procedures);
    }
  }
};

showDiff();
