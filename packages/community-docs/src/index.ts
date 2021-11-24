import glob from "glob";
import path from "path";
import { diffToProcedures } from "./diffToProcedures";
import { getDiffFromHead } from "./gitDifference";
import { Logger } from "./Logging";
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
  `${PATH_OF_DIRECTORY_TO_WATCH}/after-getting-started/rock_and-roll.md`,
];

const getDirectories = (src: string, cb: (err: any, res: any) => any) => {
  glob(src + "/**/*", cb);
};

export const replaceVanillaWithDirectoryToWatch = async () => {
  const directoryLocation = path.join(
    __dirname,
    `../../../${PATH_OF_DIRECTORY_TO_WATCH}/`
  );
  const directoryPromise = new Promise<string[]>((resolve, reject) => {
    return getDirectories(directoryLocation, (err, matches) => {
      if (err) {
        reject(err);
      } else {
        resolve(matches as string[]);
      }
    });
  });
  const fullArrayOfAllItems: string[] = await directoryPromise;
  if (fullArrayOfAllItems) {
    const trimmedDirectories = fullArrayOfAllItems.map((result) =>
      result.substring(result.indexOf(PATH_OF_DIRECTORY_TO_WATCH))
    );
    const procedures = diffToProcedures(trimmedDirectories);
    if (procedures && procedures.length > 0) {
      return await proceduresToVanillaRequests(procedures);
    }
  }
};

export const addFullSubFolderManually = async (folderName: string) => {
  const directoryLocation = path.join(
    __dirname,
    `../../../${PATH_OF_DIRECTORY_TO_WATCH}/`,
    folderName
  );

  const directoryPromise = new Promise<string[]>((resolve, reject) => {
    return getDirectories(directoryLocation, (err, matches) => {
      if (err) {
        reject(err);
      } else {
        resolve(matches as string[]);
      }
    });
  });
  const fullArrayOfAllItems: string[] = await directoryPromise;
  if (fullArrayOfAllItems) {
    const trimmedDirectories = fullArrayOfAllItems.map((result) =>
      result.substring(result.indexOf(PATH_OF_DIRECTORY_TO_WATCH))
    );
    const procedures = diffToProcedures(trimmedDirectories);
    Logger.info(`Path of changes: ${fullArrayOfAllItems}`);
    Logger.info(`list of procedures: ${procedures}`);
    if (procedures && procedures.length > 0) {
      return await proceduresToVanillaRequests(procedures);
    }
  }
};

export const updateCommunityDocsWithPathOverride = async (
  relativePath = ex
) => {
  if (relativePath && relativePath.length) {
    const trimmedDirectories = relativePath.map((result) =>
      result.substring(result.indexOf(PATH_OF_DIRECTORY_TO_WATCH))
    );
    const procedures = diffToProcedures(trimmedDirectories);
    Logger.info(`Path of changes: ${relativePath}`);
    Logger.info(`list of procedures: ${procedures}`);
    if (procedures && procedures.length > 0) {
      return await proceduresToVanillaRequests(procedures);
    }
  }
};

export default addFullSubFolderManually("asset-management");
