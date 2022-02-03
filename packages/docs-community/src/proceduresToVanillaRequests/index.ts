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
  deleteEmptyCategories,
  getAllArticles,
  getKnowedgeCategories,
  makeRequestsToChangeMarkdownReferences,
} from "../VanillaAPI";
import {
  addVanillaArticlesToProcedures,
  addVanillaCategoryToProcedure,
} from "./actions/addMeta";
import {
  procedureToArticle,
  procedureToKnowledgeCategory,
  removeDeletedCategories,
} from "./actions/conversion";
import { createChangesContentForStaging } from "./actions/stagingUpdateArticle";
import {
  getPreviousKnowledgeID,
  handleKnowledgeCategoryChangedParentCreate,
  hasKnowledgeCategoryBeenMoved,
} from "./utils";

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
  let tempExistingKnowledgeCategoryInfo = [...existingknowledgeCategoryInfo];
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
      const parentCreation = await handleKnowledgeCategoryChangedParentCreate({
        procedure: procedureWorkedOn,
        newName: hasChangedParent,
        previousknowledgeCategoryID,
        httpClient,
        existingknowledgeCategoryInfo,
      });
      if (parentCreation) {
        tempExistingKnowledgeCategoryInfo =
          parentCreation.existingknowledgeCategoryInfo;
        previousknowledgeCategoryID =
          parentCreation.updatedPreviousKnowledgeCategoryID ||
          previousknowledgeCategoryID;
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

    const existingknowledgeCategoryInfo = await getKnowedgeCategories(
      httpClient
    );

    logger.info(`Getting Articles`);
    console.log(existingknowledgeCategoryInfo,'existingknowledgeCategoryInfoexistingknowledgeCategoryInfo')
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
