import { diffToProcedures } from './diffToProcedures';
import { getDiffFromHead } from './gitDifference';
import { proceduresToVanillaRequests } from './proceduresToVanillaRequests';

const showDiff = async () => {
  let diff = await getDiffFromHead();

  if (diff && diff.length) {
    const diffArray = diff.trim().split('\n');

    const procedures = diffToProcedures(diffArray);
    if (procedures && procedures.length > 0) {
      proceduresToVanillaRequests(procedures);
    }
  }
};

showDiff();
