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
    .filter((a) => a.referencesNeedingUpdatesInMarkdown?.length)
    .filter((a) => a.status !== "deleted");

  const proceduresWithUpdatedBodies: VanillaArticle[] = [];
  for (let i = 0; i < articleProcedures.length; i++) {
    const articleUndergoingChanges = articleProcedures[i];

    if (
      articleUndergoingChanges?.referencesNeedingUpdatesInMarkdown?.length &&
      articleUndergoingChanges.body !== null
    ) {
      let references: string[] =
        articleUndergoingChanges?.referencesNeedingUpdatesInMarkdown || [];
      let secondTime = false;

      if (
        articleUndergoingChanges?.referencesToTryAgain !== undefined &&
        articleUndergoingChanges?.referencesToTryAgain &&
        articleUndergoingChanges?.referencesToTryAgain.length
      ) {
        references = articleUndergoingChanges?.referencesToTryAgain;
        articleUndergoingChanges.referencesToTryAgain = false;
        secondTime = true;
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
          if (
            articleUndergoingChanges.referencesToTryAgain == undefined ||
            []
          ) {
            if (articleUndergoingChanges.referencesToTryAgain == undefined) {
              articleUndergoingChanges.referencesToTryAgain = [];
            }
            if (articleUndergoingChanges.referencesToTryAgain) {
              articleUndergoingChanges.referencesToTryAgain.push(references[r]);
            }
          }
        }
      }
    }
    proceduresWithUpdatedBodies.push(articleUndergoingChanges);
  }

  return proceduresWithUpdatedBodies;
};
