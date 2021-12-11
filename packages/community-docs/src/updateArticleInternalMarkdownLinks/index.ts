import {
  getArticleNameFromReference,
  modifyBodyLink,
} from "../linksAndMediaHandlers";
import {
  isArticleType,
  VanillaArticle,
  VanillaKnowledgeCategory,
} from "../utils";

export const updateArticleInternalMarkdownLinks = (
  proceduresActedUpon: (VanillaArticle | VanillaKnowledgeCategory)[],
  articlesFromVanilla: VanillaArticle[]
): VanillaArticle[] => {
  const articlesToUseForSlugs: VanillaArticle[] = articlesFromVanilla || [];
  console.log(JSON.stringify(proceduresActedUpon, null, 2), "ACTEDON");
  console.log(
    "resSrcStart",
    JSON.stringify(articlesFromVanilla, null, 2),
    "resources"
  );
  const articleProcedures: VanillaArticle[] = proceduresActedUpon
    .filter(isArticleType)
    .filter((a) => a.referencesNeedingUpdatesInMarkdown?.length);

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
        const existingArticleMatches = [...articlesToUseForSlugs].filter(
          (article) => {
            return article.name === articleName;
          }
        );
        const articleUrl: string =
          existingArticleMatches[0]?.url || "doesNotExist";
        console.log("MMMATCH", existingArticleMatches);

        if (articleUndergoingChanges.body !== null && articleUrl) {
          const changes = modifyBodyLink(
            articleUndergoingChanges.body || "",
            ref,
            articleUrl
          );
          console.log("CHANGES", changes);
          articleUndergoingChanges.body = changes;
        }
      });
    }
    proceduresWithUpdatedBodies.push(articleUndergoingChanges);
  }
  console.log(proceduresWithUpdatedBodies, "proceduresWithUpdatedBodies");
  return proceduresWithUpdatedBodies;
};
