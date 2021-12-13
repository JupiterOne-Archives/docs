import {
  getArticleNameFromReference,
  modifyBodyLinkForImageForReturnedArticles,
} from "../linksAndMediaHandlers";
import {
  isArticleType,
  VanillaArticle,
  VanillaKnowledgeCategory,
} from "../utils";

export const updateArticleInternalMarkdownLinks = (
  completedProcedures: (VanillaArticle | VanillaKnowledgeCategory)[],
  articlesFromVanilla: VanillaArticle[]
): VanillaArticle[] => {
  const articlesToUseForSlugs: VanillaArticle[] = articlesFromVanilla || [];

  const articleProcedures: VanillaArticle[] = completedProcedures
    .filter(isArticleType)
    .filter((a) => a.referencesNeedingUpdatesInMarkdown?.length)
    .filter((a) => a.status !== "deleted");

  const proceduresWithUpdatedBodies: VanillaArticle[] = [];
  for (let i = 0; i < articleProcedures.length; i++) {
    const articleUndergoingChanges = articleProcedures[i];

    if (
      articleUndergoingChanges?.referencesNeedingUpdatesInMarkdown?.length &&
      articleUndergoingChanges.body !== null
    ) {
      const references =
        articleUndergoingChanges?.referencesNeedingUpdatesInMarkdown || [];

      references.forEach((ref) => {
        const articleName = getArticleNameFromReference(ref);

        const existingArticleMatches = [...articlesToUseForSlugs]
          .filter((article) => {
            return article.name === articleName;
          })
          .filter((a) => a.status !== "deleted");
        const articleUrl: string =
          existingArticleMatches[0]?.url || "doesNotExist";

        if (articleUndergoingChanges.body !== null && articleUrl) {
          const changes = modifyBodyLinkForImageForReturnedArticles(
            articleUndergoingChanges.body || "",
            ref,
            articleUrl
          );

          articleUndergoingChanges.body = changes;
        }
      });
    }
    proceduresWithUpdatedBodies.push(articleUndergoingChanges);
  }

  return proceduresWithUpdatedBodies;
};
