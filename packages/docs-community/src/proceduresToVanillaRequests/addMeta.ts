import { logger } from "../loggingUtil";
import {
  isArticleType,
  VanillaArticle,
  VanillaKnowledgeCategory,
} from "../utils";

export const addVanillaArticleInfoToProcedure = (
  procedure: VanillaArticle,
  vanillaArticles: VanillaArticle[]
): VanillaArticle => {
  let procedureTarget = procedure;

  const match = vanillaArticles.filter(
    (v) => v.name?.toLowerCase() === procedureTarget.name?.toLowerCase()
  );

  if (match.length) {
    procedureTarget = {
      ...procedure,
      name: procedure.name,
      path: procedure.path,
      knowledgeCategoryID: match[0].knowledgeCategoryID,
      articleID: match[0].articleID,
      locale: "en",
      format: "markdown",
    };
  }

  return procedureTarget;
};

export const addVanillaArticlesToProcedures = (
  procedures: (VanillaArticle | VanillaKnowledgeCategory)[],
  vanillaArticles: VanillaArticle[]
) => {
  logger.info(`Adding vanilla article information to procedures`);

  return procedures.map((p) => {
    if (isArticleType(p)) {
      const articleWithVanilla = addVanillaArticleInfoToProcedure(
        p,
        vanillaArticles
      );

      return articleWithVanilla;
    } else {
      return p;
    }
  });
};

export const addVanillaCategoryToProcedure = (
  procedure: VanillaKnowledgeCategory,
  vanillaReturn: VanillaKnowledgeCategory[]
) => {
  const tempVanillaReturn: VanillaKnowledgeCategory[] = vanillaReturn || [];
  let procedureTarget: VanillaKnowledgeCategory = procedure;

  const match = tempVanillaReturn.filter(
    (v) => v.name.toLowerCase() === procedureTarget.name.toLowerCase()
  );

  if (match.length) {
    procedureTarget = {
      ...procedureTarget,
      ...match[0],
      name: procedureTarget.name,
    };
  }

  return procedureTarget;
};
