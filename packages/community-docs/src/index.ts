import { diffToProcedures } from "./diffToProcedures";
import { getDiffFromHead } from "./gitDifference";
import { proceduresToVanillaRequests } from "./proceduresToVanillaRequests";

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
  "docs/getting-started-admin/compliance-reporting/soc2-with-jupiterone-copy.md",
  "docs/getting-started-admin/compliance-reporting/soc2-with-jupiterone.md",
  "docs/getting-started-admin/jupiterone-query-language-copy.md",
  "docs/getting-started-admin/jupiterone-query-language.md",
];

export const updateCommunityDocsWithPathOverride = async (
  relativePathAtDoc = ex
) => {
  const procedures = diffToProcedures(ex);
  if (procedures && procedures.length > 0) {
    return await proceduresToVanillaRequests(procedures);
  }
};

export default updateCommunityDocsWithPathOverride();
