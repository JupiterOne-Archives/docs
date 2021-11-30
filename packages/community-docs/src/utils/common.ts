import { VanillaArticle, VanillaKnowledgeCategory } from "./types";

export const isKnowledgeCategoryType = (
  procedure: VanillaArticle | VanillaKnowledgeCategory
): procedure is VanillaKnowledgeCategory => {
  return Boolean(
    (procedure as VanillaKnowledgeCategory).procedureType === "Category"
  );
};

export const isArticleType = (
  procedure: VanillaArticle | VanillaKnowledgeCategory
): procedure is VanillaArticle => {
  return Boolean((procedure as VanillaArticle).procedureType === "Article");
};

export const createDisplayName = (name: string) => {
  return name
    .split(/-|_/g)
    .map((item) => `${item[0].toUpperCase()}${item.substring(1)}`)
    .join(" ");
};
