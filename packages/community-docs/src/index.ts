import glob from "glob";
import path from "path";
import { diffToProcedures } from "./diffToProcedures";
import { getDiffFromHead } from "./gitDifference";
import HttpClient from "./httpClient";
import { Logger } from "./Logging";
import { proceduresToVanillaRequests } from "./proceduresToVanillaRequests";
import { PATH_OF_DIRECTORY_TO_WATCH } from "./utils/constants";
import {
  deleteArticle,
  deleteKnowledgeCategory,
  getAllArticles,
  getKnowedgeCategories,
} from "./VanillaAPI";

// Main function to be used to use changes to markdown files merged to github to be converted
// to procedures that alter Vanillia forums
export const updateCommunityDocs = async () => {
  const diff = await getDiffFromHead();

  Logger.info(`Diffs: ${diff}`);

  if (diff && diff.length) {
    const diffArray = diff.trim().split("\n");
    const procedures = diffToProcedures(diffArray);

    Logger.info(`list of procedures: ${procedures}`);
    if (procedures && procedures.length > 0) {
      const completedProcedures = await proceduresToVanillaRequests(procedures);
      Logger.info(`Completed: ${completedProcedures}`);
      return completedProcedures;
    } else {
      Logger.info(`Completed - no procedures generated`);
    }
  }
};

const getDirectories = (src: string, cb: (err: any, res: any) => any) => {
  glob(src + "/**/*", cb);
};
// converts all items in the PATH_OF_DIRECTORY_TO_WATCH into Vanilla forum items
export const updateVanillaWithDirectoryToWatch = async () => {
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

// Useful for when you need a clean slate.
// Removes Articles and Categories from Vanilla rather than having to click through their UI
export const deleteAllThingsCurrentlyOnVanillaForum = async () => {
  const httpClient = new HttpClient();
  const knowledgeCategories = await getKnowedgeCategories(httpClient);

  Logger.info(`Getting Articles for DELETION`);
  const articles = await getAllArticles(httpClient, knowledgeCategories);
  for (let articleIndex = 0; articleIndex < articles.length; articleIndex++) {
    try {
      Logger.info(`deleting Article:${articles[articleIndex]?.name}`);

      await deleteArticle(httpClient, articles[articleIndex].articleID);
    } catch (articleDeleteError) {
      Logger.error(`DELETE ALL ARTICLE ERROR: \n ${articleDeleteError}`);
    }
  }

  for (
    let knowledgeCategoryIndex = 0;
    knowledgeCategoryIndex < knowledgeCategories.length;
    knowledgeCategoryIndex++
  ) {
    try {
      Logger.info(
        `deleting item:${knowledgeCategories[knowledgeCategoryIndex].name}`
      );
      await deleteKnowledgeCategory(
        httpClient,
        knowledgeCategories[knowledgeCategoryIndex]
      );
    } catch (categoryDeleteError) {
      Logger.error(`DELETE ALL Categories ERROR: \n ${categoryDeleteError}`);
    }
  }
};

const exampleOfPathsOfChanges = [
  `${PATH_OF_DIRECTORY_TO_WATCH}/getting-started-admin/compliance-reporting/soc2-with-jupiterone-copy.md`,
  `${PATH_OF_DIRECTORY_TO_WATCH}/getting-started-admin/compliance-reporting/soc2-with-jupiterone.md`,
  `${PATH_OF_DIRECTORY_TO_WATCH}/getting-started-admin/jupiterone-query-language-copy.md`,
  `${PATH_OF_DIRECTORY_TO_WATCH}/getting-started-admin/jupiterone-query-language.md`,
  `${PATH_OF_DIRECTORY_TO_WATCH}/after-getting-started/rock_and-roll.md`,
];

// Handy for debugging
export const updateCommunityDocsWithPathOverride = async (
  relativePath = exampleOfPathsOfChanges
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

export default updateCommunityDocs;
