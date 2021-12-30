import glob from "glob";
import path from "path";
import { diffToProcedures } from "./diffToProcedures";
import { getDiffFromHead } from "./gitDifference";
import HttpClient from "./httpClient";
import { logger } from "./loggingUtil";
import { proceduresToVanillaRequests } from "./proceduresToVanillaRequests";
import { PATH_OF_DIRECTORY_TO_WATCH } from "./utils/constants";
import {
  deleteArticle,
  deleteKnowledgeCategory,
  getAllArticles,
  getKnowedgeCategories,
} from "./VanillaAPI";

export const getAllSubChanges = async (gitChange: string) => {
  if (gitChange.indexOf(".") != -1) {
    return [gitChange];
  }
  const directoryLocation = path.join(__dirname, `../../../`, gitChange);

  const directoryPromise = new Promise<string[]>((resolve, reject) => {
    return getDirectories(directoryLocation, (err, matches) => {
      if (err) {
        reject(err);
      } else {
        resolve(matches as string[]);
      }
    });
  });
  return await directoryPromise;
};

// what is used to chop up folder aditions/removals

const getDirectories = (src: string, cb: (err: any, res: any) => any) => {
  glob(src + "/**/*", cb);
};

// Main function to be used to use changes to markdown files merged to github to be converted
// to procedures that alter Vanillia forums
export const updateCommunityDocs = async () => {
  const diff = await getDiffFromHead();

  logger.info(`Diffs: ${diff}`);

  if (diff && diff.length) {
    const diffChanges = diff.trim().split("\n");
    const nested: string[] = [];

    for (let i = 0; i < diffChanges.length; i++) {
      const fullArrayOfAllItems: string[] = await getAllSubChanges(
        diffChanges[i]
      );

      fullArrayOfAllItems.forEach((item) => {
        nested.push(item);
      });
    }
    const nestedMergedWithOriginal = [...diffChanges, ...nested];
    const nestedWithRemovedPath = nestedMergedWithOriginal.map((path) =>
      path.substring(path.indexOf(PATH_OF_DIRECTORY_TO_WATCH))
    );
    const procedures = await diffToProcedures(nestedWithRemovedPath);
    logger.info(`list of procedures: ${JSON.stringify(procedures, null, " ")}`);
    if (procedures && procedures.length > 0) {
      const completedProcedures = await proceduresToVanillaRequests(procedures);

      logger.info(`Completed: ${completedProcedures}`);
      return completedProcedures;
    } else {
      logger.info(`Completed - no procedures generated`);
    }
  }
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
    const procedures = await diffToProcedures(trimmedDirectories);
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
    const procedures = await diffToProcedures(trimmedDirectories);
    logger.info(`Path of changes: ${fullArrayOfAllItems}`);
    logger.info(`list of procedures: ${procedures}`);
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

  logger.info(`Getting Articles for DELETION`);
  const articles = await getAllArticles(httpClient, knowledgeCategories);
  for (let articleIndex = 0; articleIndex < articles.length; articleIndex++) {
    try {
      logger.info(`deleting Article:${articles[articleIndex]?.name}`);

      await deleteArticle(httpClient, articles[articleIndex].articleID);
    } catch (articleDeleteError) {
      logger.error(`DELETE ALL ARTICLE ERROR: \n ${articleDeleteError}`);
    }
  }

  for (
    let knowledgeCategoryIndex = 0;
    knowledgeCategoryIndex < knowledgeCategories.length;
    knowledgeCategoryIndex++
  ) {
    try {
      logger.info(
        `deleting item:${knowledgeCategories[knowledgeCategoryIndex].name}`
      );
      await deleteKnowledgeCategory(
        httpClient,
        knowledgeCategories[knowledgeCategoryIndex]
      );
    } catch (categoryDeleteError) {
      logger.error(`DELETE ALL Categories ERROR: \n ${categoryDeleteError}`);
    }
  }
};

const exampleOfPathsOfChangesX = [
  `${PATH_OF_DIRECTORY_TO_WATCH}/asset-management/`,
];

// Handy for debugging - runs as if everything is new
export const updateCommunityDocsWithPathOverride = async (
  relativePath = exampleOfPathsOfChangesX
) => {
  if (relativePath && relativePath.length) {
    const trimmedDirectories = relativePath.map((result) =>
      result.substring(result.indexOf(PATH_OF_DIRECTORY_TO_WATCH))
    );
    const procedures = await diffToProcedures(trimmedDirectories);
    logger.info(`Path of changes: ${relativePath}`);
    logger.info(`list of procedures: ${procedures}`);
    if (procedures && procedures.length > 0) {
      return await proceduresToVanillaRequests(procedures);
    }
  }
};

export default updateCommunityDocs;
