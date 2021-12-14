import { default as fs, default as fsSync } from "fs";
import path from "path";
import {
  createDisplayName,
  isArticleType,
  isKnowledgeCategoryType,
  VanillaArticle,
  VanillaKnowledgeCategory,
} from "../utils";
import {
  FLAG_FOR_DELETE,
  PATH_OF_DIRECTORY_TO_WATCH,
  SUPPORTED_FILE_TYPE_EXTENTIONS,
} from "../utils/constants";

export const markdownToString = async (filePath?: string): Promise<string> => {
  // we also want to use this to see if the file got deleted! the git diff wont differenitate
  const fileLocation = path.join(
    __dirname,
    `../../../../${PATH_OF_DIRECTORY_TO_WATCH}`,
    `/${filePath}`
  );

  let supportedTypeOfFile = false;
  SUPPORTED_FILE_TYPE_EXTENTIONS.forEach((extention) => {
    if (fileLocation.endsWith(extention)) {
      supportedTypeOfFile = true;
    }
  });
  if (!supportedTypeOfFile) {
    return FLAG_FOR_DELETE;
  }
  try {
    const blockingReadOfFile = await fs.promises.readFile(fileLocation);
    if (blockingReadOfFile) {
      return blockingReadOfFile.toString();
    }
  } catch (error) {
    return FLAG_FOR_DELETE;
  }

  return FLAG_FOR_DELETE;
};

export const directoryExists = (filePath?: string): boolean => {
  // we also want to use this to see if the file got deleted! the git diff wont differenitate
  if (!filePath) {
    return false;
  }

  const fileLocation = path.join(
    __dirname,
    `../../../../${PATH_OF_DIRECTORY_TO_WATCH}`,
    `/${filePath}`
  );
  try {
    return fsSync.existsSync(fileLocation);
  } catch (e) {
    return false;
  }
};

export const kCategoriesByPathSize = (
  deletedKCategories: VanillaKnowledgeCategory[]
) => {
  if (!deletedKCategories.length) {
    return deletedKCategories;
  }

  return deletedKCategories.sort((a, b) => {
    const aPath = a.path?.split("/");
    const bPath = b.path?.split("/");
    if (!aPath) {
      return 0;
    }
    if (!bPath) {
      return 0;
    }
    if (aPath.length > bPath.length) {
      return -1;
    }
    if (bPath.length > aPath.length) {
      return 1;
    }
    return 0;
  });
};

export const getPreviousKnowledgeID = (
  completedProcedures: (VanillaArticle | VanillaKnowledgeCategory)[],
  procedureBeingWorkedOn: VanillaArticle | VanillaKnowledgeCategory,
  existingknowledgeCategoryInfo: VanillaKnowledgeCategory[]
): number | null => {
  const tempExistingknowledgeCategoryInfo =
    existingknowledgeCategoryInfo && existingknowledgeCategoryInfo.length
      ? [...existingknowledgeCategoryInfo]
      : [];
  console.log(completedProcedures, "completedp");
  console.log(procedureBeingWorkedOn, "procedureBeingWorkedOnww");
  console.log(existingknowledgeCategoryInfo, "existingknowledgeCategoryInfoss");
  const pathSplit = procedureBeingWorkedOn?.path?.split("/");

  if (pathSplit && procedureBeingWorkedOn?.fileName) {
    const indexInPath = pathSplit?.indexOf(procedureBeingWorkedOn?.fileName);

    if (indexInPath !== -1) {
      if (pathSplit[indexInPath - 1]) {
        const targetCategory = pathSplit[indexInPath - 1];
        const nameToLookFor = createDisplayName(targetCategory);

        const matches = tempExistingknowledgeCategoryInfo.filter(
          (c) =>
            c.name.trim().toLowerCase() === nameToLookFor.trim().toLowerCase()
        );

        if (matches && matches.length) {
          return matches[0].knowledgeCategoryID;
        }
      }
      if (indexInPath === 0) {
        const targetCategory = pathSplit[indexInPath];
        const nameToLookFor = createDisplayName(targetCategory);

        const matches = tempExistingknowledgeCategoryInfo.filter(
          (c) =>
            c.name.trim().toLowerCase() === nameToLookFor.trim().toLowerCase()
        );

        if (matches && matches.length) {
          return matches[0].knowledgeCategoryID;
        }
      }
    }
  }

  const tempCompletedProcedures = [...completedProcedures];
  const categoryOnlyProcedures: VanillaKnowledgeCategory[] =
    tempCompletedProcedures.filter(isKnowledgeCategoryType) || [];
  if (!categoryOnlyProcedures.length) {
    return null;
  }
  const lastCategoryInArray = categoryOnlyProcedures.pop();
  if (isArticleType(procedureBeingWorkedOn)) {
    return lastCategoryInArray?.knowledgeCategoryID || null;
  }
  if (
    lastCategoryInArray &&
    procedureBeingWorkedOn.fileName &&
    lastCategoryInArray.fileName
  ) {
    const indexOfLastCatFileName = procedureBeingWorkedOn.childrenPath.indexOf(
      lastCategoryInArray.fileName
    );

    if (indexOfLastCatFileName === -1) {
      return getPreviousKnowledgeID(
        categoryOnlyProcedures,
        procedureBeingWorkedOn,
        existingknowledgeCategoryInfo
      );
    }
    return lastCategoryInArray.knowledgeCategoryID;
  }

  return null;
};
