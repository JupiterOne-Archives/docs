import { diffToProcedures } from "./diffToProcedures";
import { getDiffFromHead } from "./gitDifference";
import { proceduresToVanillaRequests } from "./proceduresToVanillaRequests";
import { PATH_OF_DIRECTORY_TO_WATCH } from "./utils/constants";
export const updateCommunityDocs = async () => {
  const diff = await getDiffFromHead();

  if (diff && diff.length) {
    const diffArray = diff.trim().split("\n");
    const procedures = diffToProcedures(diffArray);
    if (procedures && procedures.length > 0) {
      return await proceduresToVanillaRequests(procedures);
    }
  }
};
// example
const ex = [
  `${PATH_OF_DIRECTORY_TO_WATCH}/getting-started-admin/compliance-reporting/soc2-with-jupiterone-copy.md`,
  `${PATH_OF_DIRECTORY_TO_WATCH}/getting-started-admin/compliance-reporting/soc2-with-jupiterone.md`,
  `${PATH_OF_DIRECTORY_TO_WATCH}/getting-started-admin/jupiterone-query-language-copy.md`,
  `${PATH_OF_DIRECTORY_TO_WATCH}/getting-started-admin/jupiterone-query-language.md`,
];

export const updateCommunityDocsWithPathOverride = async (
  relativePathAtDoc = ex
) => {
  const procedures = diffToProcedures(ex);
  console.log(procedures, "proceduresprocedures", ex);
  if (procedures && procedures.length > 0) {
    return await proceduresToVanillaRequests(procedures);
  }
};

export default updateCommunityDocsWithPathOverride();
