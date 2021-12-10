import HttpClient from "../httpClient";
import { Logger } from "../Logging";
import { getAllArticles, getKnowedgeCategories } from "../VanillaAPI";

export const updateArticleInternalMarkdownLinks = async () => {
  const httpClient = new HttpClient();
  const knowledgeCategories = await getKnowedgeCategories(httpClient);

  Logger.info(`Getting Articles for body check`);
  const articles = await getAllArticles(httpClient, knowledgeCategories);

  //createdArticles in first so match returns created over existing

  //   const articlesUpdated = await updateArticleMarkdownReferences(
  //     createdArticles,
  //     articles,
  //     httpClient
  //   );

  // articles need to be created so we can reference them.

  Logger.info(`Updated Articles: ${JSON.stringify(articles, null, 2)}`);
  return articles;
};
