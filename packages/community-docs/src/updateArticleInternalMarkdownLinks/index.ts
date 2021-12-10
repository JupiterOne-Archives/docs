import {
  getArticleNameFromReference,
  modifyBodyLink,
} from "../linksAndMediaHandlers";
import {
  ArticleBreadCrumbs,
  isArticleType,
  VanillaArticle,
  VanillaKnowledgeCategory,
} from "../utils";

export const updateArticleInternalMarkdownLinks = (
  proceduresActedUpon: (VanillaArticle | VanillaKnowledgeCategory)[],
  articlesFromVanilla: VanillaArticle[]
): VanillaArticle[] => {
  const articlesToUseForSlugs: VanillaArticle[] = articlesFromVanilla || [];

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
        const articleBreadcrumbs: ArticleBreadCrumbs[] =
          existingArticleMatches[0]?.breadcrumbs || [];
        const breadCrumbUrl = articleBreadcrumbs.length
          ? articleBreadcrumbs[articleBreadcrumbs.length - 1].url
          : "";

        if (
          existingArticleMatches.length &&
          articleUndergoingChanges.body !== null &&
          breadCrumbUrl
        ) {
          articleUndergoingChanges.body = modifyBodyLink(
            articleUndergoingChanges.body || "",
            ref,
            breadCrumbUrl
          );
        }
      });
    }
    proceduresWithUpdatedBodies.push(articleUndergoingChanges);
  }

  return proceduresWithUpdatedBodies;
};
