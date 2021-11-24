import HttpClient from "../httpClient";
import {
  getMarkdownImageSrcs,
  isSupportedMediaType,
  modifyBodyImageLink,
} from "../linksAndMediaHandlers";
import { Logger } from "../Logging";
import { isArticleType, isKnowledgeCategoryType } from "../utils";
import {
  FLAG_FOR_DELETE,
  KNOWN_CATEGORY_BEEN_DELETED,
} from "../utils/constants";
import { VanillaArticle, VanillaKnowledgeCategory } from "../utils/types";
import {
  createArticle,
  createKnowledgeCategory,
  deleteAllFlaggedCategories,
  deleteArticle,
  editArticle,
  getAllArticles,
  getKnowedgeCategories,
} from "../VanillaAPI";
import {
  directoryExists,
  kCategoriesByPathSize,
  markdownToString,
} from "./utils";

export const addVanillaCategoryToProcedure = (
  procedure: VanillaKnowledgeCategory,
  vanillaReturn: VanillaKnowledgeCategory[]
) => {
  const tempVanillaReturn: VanillaKnowledgeCategory[] = vanillaReturn || [];
  let procedureTarget: VanillaKnowledgeCategory = procedure;
  const match = tempVanillaReturn.filter(
    (v) => v.name === procedureTarget.name
  );
  if (match.length) {
    procedureTarget = {
      ...procedureTarget,
      knowledgeCategoryID: match[0].knowledgeCategoryID,
      parentID: match[0].parentID || 1,
      knowledgeBaseID: match[0].knowledgeBaseID,
      sortChildren: match[0].sortChildren,
      sort: match[0].sort,
      url: match[0].url,
      foreignID: match[0].foreignID,
    };
  }
  return procedureTarget;
};

export const addVanillaArticleInfoToProcedure = (
  procedure: VanillaArticle,
  vanillaArticles: VanillaArticle[]
) => {
  let procedureTarget = procedure;
  const match = vanillaArticles.filter((v) => v.name === procedureTarget.name);

  if (match.length) {
    procedureTarget = {
      ...procedureTarget,
      knowledgeCategoryID: match[0].knowledgeCategoryID,
      articleID: match[0].articleID, // used in path
      locale: "en",
      format: "markdown",
    };
  }

  return procedureTarget;
};

export const addVanillaArticlesToProcedures = (
  procedures: (VanillaArticle | VanillaKnowledgeCategory)[],
  vanillaArticles: VanillaArticle[]
) => {
  Logger.info(`Adding vanilla article information to procedures`);
  const proceduresWithVanillaCategoryInfo: (
    | VanillaArticle
    | VanillaKnowledgeCategory
  )[] = [];
  procedures.forEach((p) => {
    if (isArticleType(p)) {
      proceduresWithVanillaCategoryInfo.push(
        addVanillaArticleInfoToProcedure(p, vanillaArticles)
      );
    } else {
      proceduresWithVanillaCategoryInfo.push(p);
    }
  });
  return proceduresWithVanillaCategoryInfo;
};

export const uploadImagesAndAddToMarkdown = async (
  imageSrcArray: string[],
  markdownAsString: string
) => {
  Logger.info(`Uploading and adding images: ${imageSrcArray}`);
  let markdownTarget = markdownAsString;
  const supportedImages = imageSrcArray.filter((m) => isSupportedMediaType(m));
  for (let i = 0; i < supportedImages.length; i++) {
    const newLocation = "na, lets go faster"; //await uploadImageAndReturnUrl(supportedImages[i]);
    markdownTarget = modifyBodyImageLink(
      markdownTarget,
      supportedImages[i],
      newLocation
    );
  }

  return markdownTarget;
};

export const addImagesToArticleMarkdown = async (markdownAsString: string) => {
  if (!markdownAsString || !markdownAsString.length) {
    return "";
  }
  const alteredMarkdown = markdownAsString;
  const imageSrcArray = getMarkdownImageSrcs(alteredMarkdown);
  if (!imageSrcArray.length) {
    return alteredMarkdown;
  } else {
    return await uploadImagesAndAddToMarkdown(imageSrcArray, markdownAsString);
  }
};

export const procedureToArticle = async (
  httpClient: HttpClient,
  procedureWorkedOn: VanillaArticle,
  previousknowledgeCategoryID: null | number
): Promise<VanillaArticle> => {
  let tempProcedureWorkedOn = { ...procedureWorkedOn };
  const bodyOfArticle = await markdownToString(tempProcedureWorkedOn?.path);
  tempProcedureWorkedOn.body = await addImagesToArticleMarkdown(bodyOfArticle);

  if (
    tempProcedureWorkedOn.articleID === null &&
    previousknowledgeCategoryID !== null
  ) {
    if (!previousknowledgeCategoryID) {
      return tempProcedureWorkedOn;
    }

    tempProcedureWorkedOn.knowledgeCategoryID = previousknowledgeCategoryID;

    if (tempProcedureWorkedOn.body != FLAG_FOR_DELETE) {
      const articleRequest: Partial<VanillaArticle> = {
        body: tempProcedureWorkedOn.body,
        format: "markdown",
        knowledgeCategoryID: previousknowledgeCategoryID,
        locale: "en",
        name: tempProcedureWorkedOn.name,
        sort: 0,
      };
      const createdArticle = await createArticle(httpClient, articleRequest);

      if (createdArticle?.articleID) {
        tempProcedureWorkedOn = addVanillaArticleInfoToProcedure(
          tempProcedureWorkedOn,
          [createdArticle]
        );
      }
    }
  } else {
    if (
      tempProcedureWorkedOn.body !== FLAG_FOR_DELETE &&
      tempProcedureWorkedOn.articleID
    ) {
      const articleRequest: Partial<VanillaArticle> = {
        body: tempProcedureWorkedOn.body,
        format: "markdown",
        knowledgeCategoryID: previousknowledgeCategoryID,
        locale: "en",
        name: tempProcedureWorkedOn.name,
        sort: 0,
      };

      const editedArticle = await editArticle(
        httpClient,
        tempProcedureWorkedOn.articleID,
        articleRequest
      );

      if (editedArticle?.articleID) {
        procedureWorkedOn = addVanillaArticleInfoToProcedure(
          tempProcedureWorkedOn,
          [editedArticle]
        );
      }
    }
    if (
      tempProcedureWorkedOn.body === FLAG_FOR_DELETE &&
      tempProcedureWorkedOn.articleID
    ) {
      const deletedArticle = await deleteArticle(
        httpClient,
        tempProcedureWorkedOn.articleID
      );

      if (deletedArticle) {
        tempProcedureWorkedOn = addVanillaArticleInfoToProcedure(
          tempProcedureWorkedOn,
          [deletedArticle]
        );
      }
    }
  }

  return tempProcedureWorkedOn;
};

export const procedureToKnowledgeCategory = async (
  httpClient: HttpClient,
  procedureWorkedOn: VanillaKnowledgeCategory,
  previousknowledgeCategoryID: null | number
): Promise<VanillaKnowledgeCategory> => {
  let tempProcedureWorkedOn = { ...procedureWorkedOn };
  const directoryExistsResult = directoryExists(tempProcedureWorkedOn?.path);

  if (tempProcedureWorkedOn.knowledgeCategoryID !== null) {
    if (directoryExistsResult) {
      return tempProcedureWorkedOn;
    } else {
      // kCategories get handled for delete later
      tempProcedureWorkedOn = {
        ...tempProcedureWorkedOn,
        description: FLAG_FOR_DELETE,
      };
    }
  } else {
    if (directoryExistsResult) {
      const reqData = {
        name: tempProcedureWorkedOn.name,
        parentID: previousknowledgeCategoryID ? previousknowledgeCategoryID : 1,
      };
      const createdKnowledgeCategory = await createKnowledgeCategory(
        httpClient,
        reqData
      );

      if (createdKnowledgeCategory) {
        tempProcedureWorkedOn = addVanillaCategoryToProcedure(
          tempProcedureWorkedOn,
          [createdKnowledgeCategory]
        );
      }
    } else {
      tempProcedureWorkedOn.description = KNOWN_CATEGORY_BEEN_DELETED;
    }
  }

  return tempProcedureWorkedOn;
};

export const removeDeletedCategories = async (
  httpClient: HttpClient,
  procedures: (VanillaArticle | VanillaKnowledgeCategory)[]
) => {
  Logger.info(`Removing deleted categories`);
  // at this point all vanillaArticles that need deleting should be deleted.
  const deletedKCategories: VanillaKnowledgeCategory[] = procedures.filter(
    isKnowledgeCategoryType
  );
  const kCategoriesByIncreasingPathSize =
    kCategoriesByPathSize(deletedKCategories);

  const categoriesDelete = await deleteAllFlaggedCategories(
    httpClient,
    kCategoriesByIncreasingPathSize
  );

  if (categoriesDelete) {
    return {
      categoriesDeleted: categoriesDelete,
      procedures,
    };
  }

  return {
    categoriesDeleted: categoriesDelete,
    procedures,
  };
};

export const getPreviousKnowledgeID = (
  completedProcedures: (VanillaArticle | VanillaKnowledgeCategory)[],
  procedureBeingWorkedOn: VanillaArticle | VanillaKnowledgeCategory
): number | null => {
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
        procedureBeingWorkedOn
      );
    }
    return lastCategoryInArray.knowledgeCategoryID;
  }

  return null;
};

export const useProceduresForVanillaRequests = async (
  procedures: (VanillaArticle | VanillaKnowledgeCategory)[],
  completedProcedures?: (VanillaArticle | VanillaKnowledgeCategory)[],
  httpHandling: HttpClient = new HttpClient()
): Promise<(VanillaArticle | VanillaKnowledgeCategory)[]> => {
  const httpClient = httpHandling;
  const tempCompletedProcedures = completedProcedures
    ? [...completedProcedures]
    : [];
  const tempProcedures = [...procedures];
  let previousknowledgeCategoryID = null;

  // this needs to be syncronous, going in order of the procedures.
  // for example - a new folder with a markdown file, we need to make a
  // new knowledgeCategory and use its id to create the new article
  let procedureWorkedOn = tempProcedures.shift();

  if (!procedureWorkedOn) {
    return tempCompletedProcedures;
  }

  previousknowledgeCategoryID = getPreviousKnowledgeID(
    tempCompletedProcedures,
    procedureWorkedOn
  );
  if (isArticleType(procedureWorkedOn)) {
    procedureWorkedOn = await procedureToArticle(
      httpClient,
      procedureWorkedOn,
      previousknowledgeCategoryID
    );
  }
  if (isKnowledgeCategoryType(procedureWorkedOn)) {
    procedureWorkedOn = await procedureToKnowledgeCategory(
      httpClient,
      procedureWorkedOn,
      previousknowledgeCategoryID
    );
  }

  tempCompletedProcedures.push(procedureWorkedOn);

  return await useProceduresForVanillaRequests(
    tempProcedures,
    tempCompletedProcedures,
    httpHandling
  );
};

export const proceduresToVanillaRequests = async (
  procedures: (VanillaArticle | VanillaKnowledgeCategory)[]
) => {
  if (procedures && procedures.length) {
    const httpClient = new HttpClient();
    Logger.info(`Getting knowledgeCategories`);
    const existingknowledgeCategoryInfo = await getKnowedgeCategories(
      httpClient
    );
    Logger.info(`Getting Articles`);
    const articles = await getAllArticles(
      httpClient,
      existingknowledgeCategoryInfo
    );
    Logger.info(`Mapping Vanilla responses to procedures`);
    const proceduresWithVanillaCategories = procedures.map((p) => {
      if (isKnowledgeCategoryType(p)) {
        return addVanillaCategoryToProcedure(p, existingknowledgeCategoryInfo);
      }
      return p;
    });

    const proceduresWithArticleInfo = articles?.length
      ? addVanillaArticlesToProcedures(
          proceduresWithVanillaCategories,
          articles
        )
      : proceduresWithVanillaCategories;

    const proceduresNeedingDeleteCategories =
      await useProceduresForVanillaRequests(proceduresWithArticleInfo);

    const { procedures: finishedProcedures } = await removeDeletedCategories(
      httpClient,
      proceduresNeedingDeleteCategories
    );
    Logger.info(`FINISHED WITH PROCEDURES: ${finishedProcedures}`);
    return finishedProcedures;
  }
};
