import {
  getArticleNameFromReference,
  modifyBodyLinkForImageForReturnedArticles,
} from "../linksAndMediaHandlers";
import {
  isArticleType,
  VanillaArticle,
  VanillaKnowledgeCategory,
} from "../utils";

export const updateArticleInternalMarkdownLinks = async (
  completedProcedures: (VanillaArticle | VanillaKnowledgeCategory)[],
  articlesFromVanilla: VanillaArticle[]
): Promise<VanillaArticle[]> => {
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
      for (let r = 0; r < references.length; r++) {
        const articleName = await getArticleNameFromReference(references[r]);

        if (articleName) {
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
              references[r],
              articleUrl
            );

            articleUndergoingChanges.body = changes;
          }
        }
      }
    }
    proceduresWithUpdatedBodies.push(articleUndergoingChanges);
  }

  return proceduresWithUpdatedBodies;
};
