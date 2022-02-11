import { getAllItemsAsDiff } from "../";
import { diffToProcedures } from "../diffToProcedures";
import HttpClient from "../httpClient";
import { readDocsConfig } from "../integrationHandling";
import { logger } from "../loggingUtil";
import { ProcedureTypeEnum } from "../utils";
import {
  deleteArticle,
  getAllArticles,
  getKnowedgeCategories,
} from "../VanillaAPI";

export type RemoveDeletedArticlesProps = {
  httpClient: HttpClient;
};

export const removeDeletedArticles = async ({
  httpClient,
}: RemoveDeletedArticlesProps) => {
  let namesOfIntegrations: string[] = [];
  try {
    const { integrations } = await readDocsConfig();

    if (integrations) {
      namesOfIntegrations = integrations.map(
        (i) => `${i.displayName} Integration with JupiterOne`
      );
    }
  } catch (e) {
    logger.error("error reading integration config");
  }

  const allKnowledgeBaseAsADiff = await getAllItemsAsDiff();
  if (!allKnowledgeBaseAsADiff.length) {
    throw new Error("Fail in getting local resources");
  }
  const existingknowledgeCategoryInfo = await getKnowedgeCategories(httpClient);
  const articles = await getAllArticles(
    httpClient,
    existingknowledgeCategoryInfo
  );

  const procedures = await diffToProcedures(allKnowledgeBaseAsADiff);
  if (!procedures) {
    throw new Error("Fail in getting local resources");
  }
  const onlyProceduresThatAreArticles = procedures
    ? procedures.filter((p) => p.procedureType === ProcedureTypeEnum.Article)
    : [];
  const articleNamesThatShouldExist = onlyProceduresThatAreArticles.map(
    (a) => a.name
  );

  const articlesToKeep = [
    ...namesOfIntegrations,
    ...articleNamesThatShouldExist,
  ];
  const articlesNeedingDeleting = articles.filter(
    (article) => articlesToKeep.indexOf(article.name) === -1
  );

  const deleted = [];
  for (
    let articleIndex = 0;
    articleIndex < articlesNeedingDeleting.length;
    articleIndex++
  ) {
    try {
      await deleteArticle(
        httpClient,
        articlesNeedingDeleting[articleIndex].articleID
      );
      deleted.push(articlesNeedingDeleting[articleIndex].name);
    } catch (articleDeleteError) {
      logger.error(`DELETE ALL ARTICLE ERROR: \n ${articleDeleteError}`);
    }
  }
  logger.info(`${deleted}`);
};
