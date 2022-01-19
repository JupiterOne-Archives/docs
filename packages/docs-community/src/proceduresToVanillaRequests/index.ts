import HttpClient from "../httpClient";
import {
  getMarkdownImageSrcs,
  isSupportedMediaType,
  modifyBodyLinkForImage,
} from "../linksAndMediaHandlers";
import { logger } from "../loggingUtil";
import { updateArticleInternalMarkdownLinks } from "../updateArticleInternalMarkdownLinks";
import { isArticleType, isKnowledgeCategoryType } from "../utils";
import {
  FLAG_FOR_DELETE,
  KNOWN_CATEGORY_BEEN_DELETED,
  SHOULD_REALLY_UPLOAD_IMAGES,
} from "../utils/constants";
import { VanillaArticle, VanillaKnowledgeCategory } from "../utils/types";
import {
  createArticle,
  createKnowledgeCategory,
  deleteAllFlaggedCategories,
  deleteArticle,
  deleteEmptyCategories,
  editArticle,
  editKnowledgeCategory,
  getAllArticles,
  getKnowedgeCategories,
  makeRequestsToChangeMarkdownReferences,
  removeSoloChildedCategories,
  uploadImageAndReturnUrl,
} from "../VanillaAPI";
import {
  directoryExists,
  getPreviousKnowledgeID,
  hasKnowledgeCategoryBeenMoved,
} from "./utils";

export const addVanillaCategoryToProcedure = (
  procedure: VanillaKnowledgeCategory,
  vanillaReturn: VanillaKnowledgeCategory[]
) => {
  const tempVanillaReturn: VanillaKnowledgeCategory[] = vanillaReturn || [];
  let procedureTarget: VanillaKnowledgeCategory = procedure;

  const match = tempVanillaReturn.filter(
    (v) => v.name.toLowerCase() === procedureTarget.name.toLowerCase()
  );

  if (match.length) {
    procedureTarget = {
      ...procedureTarget,
      ...match[0],
      name: procedureTarget.name,
    };
  }

  return procedureTarget;
};

// singular
export const addVanillaArticleInfoToProcedure = (
  procedure: VanillaArticle,
  vanillaArticles: VanillaArticle[]
): VanillaArticle => {
  let procedureTarget = procedure;

  const match = vanillaArticles.filter(
    (v) => v.name?.toLowerCase() === procedureTarget.name?.toLowerCase()
  );

  if (match.length) {
    procedureTarget = {
      ...procedure,
      name: procedure.name,
      path: procedure.path,
      knowledgeCategoryID: match[0].knowledgeCategoryID,
      articleID: match[0].articleID,
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
  logger.info(`Adding vanilla article information to procedures`);

  return procedures.map((p) => {
    if (isArticleType(p)) {
      const articleWithVanilla = addVanillaArticleInfoToProcedure(
        p,
        vanillaArticles
      );

      return articleWithVanilla;
    } else {
      return p;
    }
  });
};

export const uploadImagesAndAddToMarkdown = async (
  imageSrcArray: string[],
  markdownAsString: string
) => {
  logger.info(`Uploading and adding images: ${imageSrcArray}`);
  let markdownTarget = markdownAsString;
  const supportedImages = imageSrcArray.filter((m) => isSupportedMediaType(m));
  for (let i = 0; i < supportedImages.length; i++) {
    if (SHOULD_REALLY_UPLOAD_IMAGES) {
      const newLocation = await uploadImageAndReturnUrl(supportedImages[i]);
      markdownTarget = modifyBodyLinkForImage(
        markdownTarget,
        supportedImages[i],
        newLocation
      );
    }
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
  const tempProcedureWorkedOn = { ...procedureWorkedOn };

  if (tempProcedureWorkedOn.body) {
    tempProcedureWorkedOn.body = await addImagesToArticleMarkdown(
      tempProcedureWorkedOn.body
    );
  }

  if (tempProcedureWorkedOn.articleID === null) {
    if (!previousknowledgeCategoryID) {
      return tempProcedureWorkedOn;
    }

    tempProcedureWorkedOn.knowledgeCategoryID = previousknowledgeCategoryID;

    if (tempProcedureWorkedOn.body != FLAG_FOR_DELETE) {
      const articleRequest: Partial<VanillaArticle> = {
        body: tempProcedureWorkedOn.body,
        path: tempProcedureWorkedOn.path,
        format: "markdown",
        knowledgeCategoryID: previousknowledgeCategoryID,
        locale: "en",
        name: tempProcedureWorkedOn.name,
        sort: 0,
      };

      const createdArticle = await createArticle(httpClient, articleRequest);

      if (createdArticle?.articleID) {
        return createdArticle;
      } else {
        return tempProcedureWorkedOn;
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
        path: tempProcedureWorkedOn.path,
      };

      const editedArticle = await editArticle(
        httpClient,
        tempProcedureWorkedOn.articleID,
        articleRequest
      );

      if (editedArticle?.articleID) {
        return editedArticle;
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
        return deletedArticle;
      }
    }
  }

  return tempProcedureWorkedOn;
};

export const procedureToKnowledgeCategory = async (
  httpClient: HttpClient,
  procedureWorkedOn: VanillaKnowledgeCategory,
  previousknowledgeCategoryID: null | number,
  hasChangedParent: boolean
): Promise<VanillaKnowledgeCategory> => {
  let tempProcedureWorkedOn = { ...procedureWorkedOn };

  const directoryExistsResult = directoryExists(tempProcedureWorkedOn?.path);
  if (tempProcedureWorkedOn.knowledgeCategoryID !== null) {
    if (directoryExistsResult) {
      if (hasChangedParent && previousknowledgeCategoryID) {
        console.log("STTTARRRRT", tempProcedureWorkedOn, "HHHHHEERRRE");
        const requestForEdit = {
          parentID: previousknowledgeCategoryID,
        };
        const editedCategory = await editKnowledgeCategory(
          httpClient,
          tempProcedureWorkedOn.knowledgeCategoryID,
          requestForEdit
        );
        if (editedCategory) {
          tempProcedureWorkedOn = {
            ...tempProcedureWorkedOn,
            ...editedCategory,
          };
          return tempProcedureWorkedOn;
        }
      }

      return tempProcedureWorkedOn;
    } else {
      // kCategories get handled for delete later
      tempProcedureWorkedOn = {
        ...tempProcedureWorkedOn,
        description: FLAG_FOR_DELETE,
      };
      return tempProcedureWorkedOn;
    }
  } else {
    if (directoryExistsResult) {
      let isReleaseNotes = false;

      if (
        procedureWorkedOn.path &&
        procedureWorkedOn.path.toLowerCase().indexOf("release-notes") !== -1
      ) {
        isReleaseNotes = true;
      }
      let reqData: any = {
        name: tempProcedureWorkedOn.name,
        parentID: 1,
        knowledgeBaseID: isReleaseNotes ? 2 : 1,
      };
      if (previousknowledgeCategoryID !== null) {
        reqData = {
          name: tempProcedureWorkedOn.name,
          parentID: previousknowledgeCategoryID,
          knowledgeBaseID: isReleaseNotes ? 2 : 1,
        };
      }

      const createdKnowledgeCategory = await createKnowledgeCategory(
        httpClient,
        reqData
      );

      if (createdKnowledgeCategory) {
        tempProcedureWorkedOn = createdKnowledgeCategory;
        return tempProcedureWorkedOn;
      }
    } else {
      tempProcedureWorkedOn.description = KNOWN_CATEGORY_BEEN_DELETED;
      return tempProcedureWorkedOn;
    }
  }

  return tempProcedureWorkedOn;
};

export const removeDeletedCategories = async (
  httpClient: HttpClient,
  procedures: (VanillaArticle | VanillaKnowledgeCategory)[]
) => {
  logger.info(
    `Removing deleted categories${JSON.stringify(procedures, null, 2)}`
  );

  // at this point all vanillaArticles that need deleting should be deleted.
  const deletedKCategories: VanillaKnowledgeCategory[] = procedures.filter(
    isKnowledgeCategoryType
  );

  const categoriesDelete = await deleteAllFlaggedCategories(
    httpClient,
    deletedKCategories
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

export const useProceduresForVanillaRequests = async (
  procedures: (VanillaArticle | VanillaKnowledgeCategory)[],
  httpHandling: HttpClient,
  existingknowledgeCategoryInfo: VanillaKnowledgeCategory[],
  completedProcedures?: (VanillaArticle | VanillaKnowledgeCategory)[]
): Promise<(VanillaArticle | VanillaKnowledgeCategory)[]> => {
  const httpClient = httpHandling;
  const tempCompletedProcedures = completedProcedures
    ? [...completedProcedures]
    : [];
  const tempProcedures = [...procedures];
  const tempExistingKnowledgeCategoryInfo = [...existingknowledgeCategoryInfo];
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
    procedureWorkedOn,
    existingknowledgeCategoryInfo
  );

  if (isKnowledgeCategoryType(procedureWorkedOn)) {
    const hasChangedParent = hasKnowledgeCategoryBeenMoved({
      proceduresWithVanillaInfo: existingknowledgeCategoryInfo,
      procedure: procedureWorkedOn,
    });

    procedureWorkedOn = await procedureToKnowledgeCategory(
      httpClient,
      procedureWorkedOn,
      previousknowledgeCategoryID,
      hasChangedParent
    );
    tempExistingKnowledgeCategoryInfo.push(procedureWorkedOn);
  }
  if (isArticleType(procedureWorkedOn)) {
    procedureWorkedOn = await procedureToArticle(
      httpClient,
      procedureWorkedOn,
      previousknowledgeCategoryID
    );
  }

  tempCompletedProcedures.push(procedureWorkedOn);

  return await useProceduresForVanillaRequests(
    tempProcedures,
    httpHandling,
    tempExistingKnowledgeCategoryInfo,
    tempCompletedProcedures
  );
};

export const proceduresToVanillaRequests = async (
  procedures: (VanillaArticle | VanillaKnowledgeCategory)[]
) => {
  if (procedures && procedures.length) {
    const httpClient = new HttpClient();
    logger.info(`Getting knowledgeCategories`);
    const existingknowledgeCategoryInfo = await getKnowedgeCategories(
      httpClient
    );

    logger.info(`Getting Articles`);
    const articles = await getAllArticles(
      httpClient,
      existingknowledgeCategoryInfo
    );

    logger.info(`Mapping Vanilla responses to procedures`);
    const proceduresWithVanillaCategories = procedures.map((p) => {
      if (isKnowledgeCategoryType(p)) {
        return addVanillaCategoryToProcedure(p, existingknowledgeCategoryInfo);
      }
      return p;
    });

    const proceduresWithArticleInfo = addVanillaArticlesToProcedures(
      proceduresWithVanillaCategories,
      articles
    );

    const processedProcedures = await useProceduresForVanillaRequests(
      proceduresWithArticleInfo,
      httpClient,
      existingknowledgeCategoryInfo
    );
    logger.info(
      `processedProcedures: ${JSON.stringify(processedProcedures, null, 2)}`
    );
    const combinationOfArticlesAndProcedures = [
      ...processedProcedures,
      ...articles,
    ].filter(isArticleType);

    const articlesNeedingLinkUpdates = await updateArticleInternalMarkdownLinks(
      [...processedProcedures],
      combinationOfArticlesAndProcedures
    );

    const updatesToInternalLinks = await makeRequestsToChangeMarkdownReferences(
      articlesNeedingLinkUpdates,
      httpClient
    );
    logger.info(
      `UpdatesToInternalLinks processed: ${JSON.stringify(
        updatesToInternalLinks,
        null,
        2
      )}`
    );
    const deletableCategories = processedProcedures
      .filter(isKnowledgeCategoryType)
      .filter((c) => c.description === FLAG_FOR_DELETE);

    const { procedures: finishedProcedures } = await removeDeletedCategories(
      httpClient,
      deletableCategories
    );
    logger.info(
      `PROCEDURES processed: ${JSON.stringify(finishedProcedures, null, 2)}`
    );
    await removeSoloChildedCategories(httpClient);
    await deleteEmptyCategories(httpClient);
    return finishedProcedures;
  }

  return [];
};
