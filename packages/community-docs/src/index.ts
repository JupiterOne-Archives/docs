import { diffToProcedures } from './diffToProcedures';
import { getDiffFromHead } from './gitDifference';
import { proceduresToVanillaRequests } from './proceduresToVanillaRequests';

const updateCommunityDocs = async () => {
  const diff = await getDiffFromHead();

  if (diff && diff.length) {
    const diffArray = diff.trim().split('\n');
    const procedures = diffToProcedures(diffArray);
    if (procedures && procedures.length > 0) {
    return await proceduresToVanillaRequests(procedures);
    }
  }
};

export default updateCommunityDocs();
