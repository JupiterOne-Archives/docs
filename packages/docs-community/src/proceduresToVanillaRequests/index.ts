import HttpClient from "../httpClient";
import { replaceArticleBodyWithIntegration } from "../integrationHandling";
import { logger } from "../loggingUtil";
import { updateArticleInternalMarkdownLinks } from "../updateArticleInternalMarkdownLinks";
import {
  FLAG_FOR_DELETE,
  isArticleType,
  isKnowledgeCategoryType,
  VanillaArticle,
  VanillaKnowledgeCategory,
} from "../utils";
import {
  createKnowledgeCategory,
  deleteAllFlaggedCategories,
  deleteEmptyCategories,
  getAllArticles,
  getKnowedgeCategories,
  makeRequestsToChangeMarkdownReferences,
} from "../VanillaAPI";
import { procedureToArticle, procedureToKnowledgeCategory } from "./creation";
import { createChangesContentForStaging } from "./stagingUpdateArticle";
import { getPreviousKnowledgeID, hasKnowledgeCategoryBeenMoved } from "./utils";

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

    if (typeof hasChangedParent === "string") {
      let isReleaseNotes = false;
      if (
        procedureWorkedOn.path &&
        procedureWorkedOn.path.toLowerCase().indexOf("release-notes") !== -1
      ) {
        isReleaseNotes = true;
      }

      const newReqData = {
        name: hasChangedParent,
        parentID: previousknowledgeCategoryID,
        knowledgeBaseID: isReleaseNotes ? 2 : 1,
      };
      try {
        const createdKnowledgeCategory = await createKnowledgeCategory(
          httpClient,
          newReqData
        );

        if (createdKnowledgeCategory) {
          tempExistingKnowledgeCategoryInfo.push({
            ...createdKnowledgeCategory,
            childCategoryCount: createdKnowledgeCategory.childCategoryCount
              ? createdKnowledgeCategory.childCategoryCount
              : 1,
          });
          previousknowledgeCategoryID =
            createdKnowledgeCategory.knowledgeCategoryID;
        }
      } catch (e) {
        logger.error(`CREATE ERROR Already exists- \n ${e}`);
      }
    }

    if (typeof hasChangedParent === "number") {
      procedureWorkedOn = await procedureToKnowledgeCategory(
        httpClient,
        procedureWorkedOn,
        hasChangedParent
      );
      tempExistingKnowledgeCategoryInfo.push(procedureWorkedOn);
    } else {
      procedureWorkedOn = await procedureToKnowledgeCategory(
        httpClient,
        procedureWorkedOn,
        previousknowledgeCategoryID
      );
      tempExistingKnowledgeCategoryInfo.push(procedureWorkedOn);
    }
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

export interface ProceduresToVanillaRequestProps {
  procedures: (VanillaArticle | VanillaKnowledgeCategory)[];
  integrationsOnly?: boolean;
}

export const proceduresToVanillaRequests = async ({
  procedures,
  integrationsOnly,
}: ProceduresToVanillaRequestProps): Promise<
  (VanillaArticle | VanillaKnowledgeCategory)[]
> => {
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
    // add body to article before links and images get added

    const proceduresWithArticleInfo = addVanillaArticlesToProcedures(
      proceduresWithVanillaCategories,
      articles
    );

    let alteredProceduresWithArticleInfo = proceduresWithArticleInfo;

    if (integrationsOnly) {
      const { alteredProcedures } = await replaceArticleBodyWithIntegration({
        procedures: [...proceduresWithArticleInfo],
        httpClient,
      });

      alteredProceduresWithArticleInfo = alteredProcedures;
    }
    // return procedures;
    const processedProcedures = await useProceduresForVanillaRequests(
      alteredProceduresWithArticleInfo,
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

    await createChangesContentForStaging({
      httpClient,
      procedures: processedProcedures.filter(isArticleType),
      combinationOfArticlesAndProcedures,
    });

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

    await deleteEmptyCategories(httpClient);
    return finishedProcedures;
  }

  return [];
};
