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
      console.log(articleUndergoingChanges,'articleUndergoingChangesarticleUndergoingChanges')
      
      const references =
        articleUndergoingChanges?.referencesNeedingUpdatesInMarkdown || [];
      for (let r = 0; r < references.length; r++) {
        const articleName = await getArticleNameFromReference(references[r],articleUndergoingChanges.path);
console.log(articleName,'TESTTTTT');
console.log(references[r],'references[r]references[r]')
        if (articleName) {
          const existingArticleMatches = [...articlesToUseForSlugs]
            .filter((article) => {
              return article.name === articleName;
            })
            .filter((a) => a.status !== "deleted");
            console.log(existingArticleMatches,'existingArticleMatchesexistingArticleMatches')
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
