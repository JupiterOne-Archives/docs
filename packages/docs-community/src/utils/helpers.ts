import { VanillaKnowledgeCategory } from "./";

export const createKnowledgeCategoryMock = (
  overrides: Partial<VanillaKnowledgeCategory>
): VanillaKnowledgeCategory => {
  return {
    parentID: 1,
    knowledgeBaseID: 1,
    name: "JupiterOne Query Language (J1QL)",
    fileName: "jupiterOne-query-language_(J1QL)",
    description: "",
    knowledgeCategoryID: 923,
    path: "jupiterOne-query-language_(J1QL)",
    childrenPath:
      "jupiterOne-query-language_(J1QL)/adv-j1ql-tips-and-tricks.md",
    procedureType: "Category",
    sortChildren: null,
    sort: 5,
    insertUserID: 12,
    dateInserted: "2022-01-14T15:58:56+00:00",
    updateUserID: 12,
    dateUpdated: "2022-01-19T17:18:46+00:00",
    lastUpdatedArticleID: null,
    lastUpdatedUserID: null,
    articleCount: 24,
    articleCountRecursive: 24,
    childCategoryCount: 0,
    url: "https://jupiterone.vanillastaging.com/kb/categories/923-jupiterone-query-language-j1ql",
    foreignID: null,
    ...overrides,
  } as VanillaKnowledgeCategory;
};
