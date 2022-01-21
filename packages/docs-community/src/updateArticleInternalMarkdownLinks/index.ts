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
  processedProcedures: (VanillaArticle | VanillaKnowledgeCategory)[],
  articlesFromVanilla: VanillaArticle[]
): Promise<VanillaArticle[]> => {
  const articlesToUseForSlugs: VanillaArticle[] = articlesFromVanilla || [];

  const articleProcedures: VanillaArticle[] = processedProcedures
    .filter(isArticleType)
    .filter((a) => a.bodyReferencesNeedingUpdates?.length)
    .filter((a) => a.status !== "deleted");

  const proceduresWithUpdatedBodies: VanillaArticle[] = [];
  for (let i = 0; i < articleProcedures.length; i++) {
    const articleUndergoingChanges = articleProcedures[i];
    const retryReferences = [];
    if (
      articleUndergoingChanges?.bodyReferencesNeedingUpdates?.length &&
      articleUndergoingChanges.body !== null
    ) {
      let references: string[] =
        articleUndergoingChanges?.bodyReferencesNeedingUpdates || [];

      // if two articles are being created and the first one references the second.. the first time this runs it will fail
      const secondTime =
        articleUndergoingChanges.referencesToTryAgain &&
        articleUndergoingChanges.referencesToTryAgain.length
          ? true
          : false;

      if (secondTime && articleUndergoingChanges?.referencesToTryAgain) {
        references = articleUndergoingChanges?.referencesToTryAgain;
        articleUndergoingChanges.referencesToTryAgain = false;
      }

      for (let r = 0; r < references.length; r++) {
        const articleName = await getArticleNameFromReference(
          references[r],
          articleUndergoingChanges.path
        );

        if (articleName) {
          const existingArticleMatches = [...articlesToUseForSlugs]
            .filter((article) => {
              return article.name === articleName;
            })
            .filter((a) => a.status !== "deleted");

          const articleUrl: string =
            existingArticleMatches[0]?.url || "doesNotExist";

          if (articleUndergoingChanges.body !== null && articleUrl) {
            const { bodyAlterations, existingMatches } =
              modifyBodyLinkForImageForReturnedArticles(
                articleUndergoingChanges.body || "",
                references[r],
                articleUrl,
                secondTime
              );

            if (existingMatches) {
              if (articleUndergoingChanges.referencesToTryAgain) {
                articleUndergoingChanges.referencesToTryAgain.push(
                  existingMatches
                );
              } else {
                articleUndergoingChanges.referencesToTryAgain = [
                  existingMatches,
                ];
              }
            } else {
              articleUndergoingChanges.referencesToTryAgain = false;
            }

            articleUndergoingChanges.body = bodyAlterations;
          }
        } else {
          retryReferences.push(references[r]);
        }
      }
    }
    if (retryReferences.length) {
      if (
        articleUndergoingChanges.referencesToTryAgain !== (false || undefined)
      ) {
        articleUndergoingChanges.referencesToTryAgain = retryReferences;
      } else {
        articleUndergoingChanges.referencesToTryAgain = false;
      }
    }
    proceduresWithUpdatedBodies.push(articleUndergoingChanges);
  }

  return proceduresWithUpdatedBodies;
};
