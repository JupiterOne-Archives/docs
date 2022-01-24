import {
  FLAG_FOR_DELETE,
  ProcedureTypeEnum,
  VanillaArticle,
  VanillaKnowledgeCategory,
} from "../utils";

export const matchingVanillaKnowledgeArticle = {
  name: "Soc2 With Jupiterone Copy",
  knowledgeCategoryID: 22,
  articleID: 43, // used in path
} as VanillaArticle;

export const vanillaKnowledgeArticle = {
  name: "Soc2 With Jupiterone",
  knowledgeCategoryID: 33,
  articleID: 2, // used in path
} as VanillaArticle;
export const vanillaArticleWithInfo = {
  knowledgeCategoryID: 22,
  articleID: 11,
  fileName: "jupiterOne-query-language_(J1QL)-copy.md",
  name: "Jupiterone Query Language Copy",
  body: "",
  path: "getting-started_and-admin/jupiterOne-query-language_(J1QL)-copy.md",
  format: "markdown",
  locale: "en",
  procedureType: ProcedureTypeEnum.Article,
} as VanillaArticle;

export const procedureArticle = {
  knowledgeCategoryID: null,
  articleID: null,
  fileName: "soc2-with-jupiterone-copy.md",
  name: "Soc2 With Jupiterone Copy",
  body: "",
  path: "getting-started_and-admin/compliance-reporting/soc2-with-jupiterone-copy.md",
  format: "markdown",
  locale: "en",
  procedureType: ProcedureTypeEnum.Article,
} as VanillaArticle;
export const vanillaKnowledgeCategory = {
  parentID: 8,
  knowledgeBaseID: 1,
  name: "Compliance Reporting",
  fileName: "compliance-reporting",
  description: "",
  knowledgeCategoryID: 23,
  path: "getting-started_and-admin/compliance-reporting",
  childrenPath:
    "getting-started_and-admin/compliance-reporting/soc2-with-jupiterone-copy.md",
  procedureType: ProcedureTypeEnum.Category,
} as VanillaKnowledgeCategory;

export const childVanillaKnowledgeCategory = {
  parentID: 23,
  knowledgeBaseID: 1,
  name: "Other",
  fileName: "other",
  description: "",
  knowledgeCategoryID: 283,
  path: "getting-started_and-admin/compliance-reporting/other",
  childrenPath:
    "getting-started_and-admin/compliance-reporting/other/soc2-with-jupiterone-copy.md",
  procedureType: ProcedureTypeEnum.Category,
} as VanillaKnowledgeCategory;

export const procedureKnowledgeCategory = {
  parentID: null,
  knowledgeBaseID: 1,
  name: "Soc2 Reporting",
  fileName: "soc2-reporting",
  description: "",
  knowledgeCategoryID: null,
  path: "getting-started_and-admin/soc2-reporting",
  childrenPath:
    "getting-started_and-admin/soc2-reporting/soc2-with-jupiterone-copy.md",
  procedureType: ProcedureTypeEnum.Category,
};
export const procedureKnowledgeCategoryReleaseNotes = {
  parentID: null,
  knowledgeBaseID: 2,
  name: "2020-20-99",
  fileName: "2020-20-99",
  description: "",
  knowledgeCategoryID: null,
  path: "release-notes/2020-20-99.md",
  childrenPath: "release-notes/2020-20-99.md",
  procedureType: ProcedureTypeEnum.Category,
};
export const matchingProcedureKnowledgeCategory = {
  parentID: null,
  knowledgeBaseID: 1,
  name: "Compliance Reporting",
  fileName: "compliance-reporting",
  description: "",
  knowledgeCategoryID: null,
  path: "getting-started_and-admin/compliance-reporting/soc2-with-jupiterone-copy.md",
  childrenPath: "compliance-reporting",
  procedureType: ProcedureTypeEnum.Category,
};

export const proceduresMock = [
  {
    parentID: null,
    knowledgeBaseID: 1,
    name: "Getting Started Admin",
    fileName: "getting-started_and-admin",
    description: "",
    knowledgeCategoryID: null,
    path: "getting-started_and-admin/jupiterOne-query-language_(J1QL)-copy.md",
    childrenPath: "getting-started_and-admin",
    procedureType: "Category",
  },
  {
    knowledgeCategoryID: null,
    articleID: null,
    fileName: "jupiterOne-query-language_(J1QL)-copy.md",
    name: "Jupiterone Query Language Copy",
    body: "",
    path: "getting-started_and-admin/jupiterOne-query-language_(J1QL)-copy.md",
    format: "markdown",
    locale: "en",
    procedureType: ProcedureTypeEnum.Article,
  },
  {
    knowledgeCategoryID: null,
    articleID: null,
    fileName: "jupiterOne-query-language.md",
    name: "Jupiterone Query Language",
    body: "",
    path: "getting-started_and-admin/jupiterOne-query-language.md",
    format: "markdown",
    locale: "en",
    procedureType: ProcedureTypeEnum.Article,
  },
  {
    parentID: null,
    knowledgeBaseID: 1,
    name: "Compliance Reporting",
    fileName: "compliance-reporting",
    description: "",
    knowledgeCategoryID: null,
    path: "getting-started_and-admin/compliance-reporting/soc2-with-jupiterone-copy.md",
    childrenPath: "compliance-reporting",
    procedureType: "Category",
  },
  {
    knowledgeCategoryID: null,
    articleID: null,
    fileName: "soc2-with-jupiterone-copy.md",
    name: "Soc2 With Jupiterone Copy",
    body: "",
    path: "getting-started_and-admin/compliance-reporting/soc2-with-jupiterone-copy.md",
    format: "markdown",
    locale: "en",
    procedureType: ProcedureTypeEnum.Article,
  },
  {
    knowledgeCategoryID: null,
    articleID: null,
    fileName: "soc2-with-jupiterone.md",
    name: "Soc2 With Jupiterone",
    body: "",
    path: "getting-started_and-admin/compliance-reporting/soc2-with-jupiterone.md",
    format: "markdown",
    locale: "en",
    procedureType: ProcedureTypeEnum.Article,
  },
] as (VanillaArticle | VanillaKnowledgeCategory)[];
// for all new
export const PROCEDURES = [
  {
    //post
    parentID: null,
    knowledgeBaseID: 1,
    name: "Getting Started Admin",
    fileName: "getting-started_and-admin",
    description: "",
    knowledgeCategoryID: null,
    path: "getting-started_and-admin/jupiterOne-query-language_(J1QL)-copy.md",
    childrenPath: "getting-started_and-admin",
    procedureType: "Category",
  },
  {
    knowledgeCategoryID: null,
    articleID: null,
    fileName: "jupiterOne-query-language_(J1QL)-copy.md",
    name: "Jupiterone Query Language Copy",
    body: "",
    path: "getting-started_and-admin/jupiterOne-query-language_(J1QL)-copy.md",
    format: "markdown",
    locale: "en",
    procedureType: ProcedureTypeEnum.Article,
  },
  {
    knowledgeCategoryID: null,
    articleID: null,
    fileName: "jupiterOne-query-language.md",
    name: "Jupiterone Query Language",
    body: "",
    path: "getting-started_and-admin/jupiterOne-query-language.md",
    format: "markdown",
    locale: "en",
    procedureType: ProcedureTypeEnum.Article,
  },
  {
    parentID: null,
    knowledgeBaseID: 1,
    name: "Compliance Reporting",
    fileName: "compliance-reporting",
    description: "",
    knowledgeCategoryID: null,
    path: "getting-started_and-admin/compliance-reporting/soc2-with-jupiterone-copy.md",
    childrenPath: "compliance-reporting",
    procedureType: "Category",
  },
  {
    knowledgeCategoryID: null,
    articleID: null,
    fileName: "soc2-with-jupiterone-copy.md",
    name: "Soc2 With Jupiterone Copy",
    body: "",
    path: "getting-started_and-admin/compliance-reporting/soc2-with-jupiterone-copy.md",
    format: "markdown",
    locale: "en",
    procedureType: ProcedureTypeEnum.Article,
  },
  {
    knowledgeCategoryID: null,
    articleID: null,
    fileName: "soc2-with-jupiterone.md",
    name: "Soc2 With Jupiterone",
    body: "",
    path: "getting-started_and-admin/compliance-reporting/soc2-with-jupiterone.md",
    format: "markdown",
    locale: "en",
    procedureType: ProcedureTypeEnum.Article,
  },
] as (VanillaArticle | VanillaKnowledgeCategory)[];
//knowledgeCategoies and articles with correct parents - for all new
export const SHAPEWEWANT = [
  {
    childrenPath:
      "getting-started_and-admin/compliance-reporting/soc2-with-jupiterone-copy.md",
    description: "",
    fileName: "compliance-reporting",
    knowledgeBaseID: 1,
    knowledgeCategoryID: 33,
    name: "Compliance Reporting",
    parentID: 22,
    path: "getting-started_and-admin/compliance-reporting",
    procedureType: "Category",
  },
  {
    articleID: 11,
    body: "",
    fileName: "jupiterOne-query-language_(J1QL)-copy.md",
    format: "markdown",
    knowledgeCategoryID: 22,
    locale: "en",
    name: "Jupiterone Query Language Copy",
    path: "getting-started_and-admin/jupiterOne-query-language_(J1QL)-copy.md",
    procedureType: "Article",
  },
  {
    articleID: 12,
    body: "",
    fileName: "jupiterOne-query-language_(J1QL)-copy.md",
    format: "markdown",
    knowledgeCategoryID: 22,
    locale: "en",
    name: "Jupiterone Query Language",
    path: "getting-started_and-admin/jupiterOne-query-language_(J1QL)-copy.md",
    procedureType: "Article",
  },
  {
    childrenPath: "compliance-reporting",
    description: "",
    fileName: "compliance-reporting",
    knowledgeBaseID: 1,
    knowledgeCategoryID: null,
    name: "Compliance Reporting",
    parentID: null,
    path: "getting-started_and-admin/compliance-reporting/soc2-with-jupiterone-copy.md",
    procedureType: "Category",
  },
  {
    articleID: 21,
    body: "",
    fileName: "jupiterOne-query-language_(J1QL)-copy.md",
    format: "markdown",
    knowledgeCategoryID: 33,
    locale: "en",
    name: "Soc2 With Jupiterone Copy",
    path: "getting-started_and-admin/jupiterOne-query-language_(J1QL)-copy.md",
    procedureType: "Article",
  },
  {
    articleID: 22,
    body: "",
    fileName: "jupiterOne-query-language_(J1QL)-copy.md",
    format: "markdown",
    knowledgeCategoryID: 33,
    locale: "en",
    name: "Soc2 With Jupiterone",
    path: "getting-started_and-admin/jupiterOne-query-language_(J1QL)-copy.md",
    procedureType: "Article",
  },
];

export const PROCEDURESWithOneDeleteArticleAndCreates = [
  //exist already
  {
    childrenPath: "getting-started_and-admin",
    description: "",
    fileName: "getting-started_and-admin",
    knowledgeBaseID: 1,
    knowledgeCategoryID: 22,
    name: "Getting Started Admin",
    parentID: 1,
    path: "getting-started_and-admin/jupiterOne-query-language_(J1QL)-copy.md",
    procedureType: "Category",
  },
  //deleting this one
  {
    articleID: 11,
    body: "FILE_DOES_NOT_EXIST",
    fileName: "jupiterOne-query-language_(J1QL)-copy.md",
    format: "markdown",
    knowledgeCategoryID: 22,
    locale: "en",
    name: "Jupiterone Query Language Copy",
    path: "getting-started_and-admin/jupiterOne-query-language_(J1QL)-copy.md",
    procedureType: "Article",
  },
  // editing this one
  {
    articleID: 12,
    body: "some body",
    fileName: "jupiterOne-query-language.md",
    format: "markdown",
    knowledgeCategoryID: 22,
    locale: "en",
    name: "Jupiterone Query Language",
    path: "getting-started_and-admin/jupiterOne-query-language.md",
    procedureType: "Article",
  },
  //created
  {
    childrenPath: "compliance-reporting",
    description: "",
    fileName: "compliance-reporting",
    knowledgeBaseID: 1,
    knowledgeCategoryID: null,
    name: "Compliance Reporting",
    parentID: null,
    path: "getting-started_and-admin/compliance-reporting/compliance-with-jupiterone.md",
    procedureType: "Category",
  },
  //created
  {
    articleID: null,
    body: "",
    fileName: "jupiterOne-query-language_(J1QL)-copy.md",
    format: "markdown",
    knowledgeCategoryID: null,
    locale: "en",
    name: "Soc2 With Jupiterone Copy",
    path: "getting-started_and-admin/jupiterOne-query-language_(J1QL)-copy.md",
    procedureType: "Article",
  },
  // created
  {
    articleID: null,
    body: "",
    fileName: "compliance-with-jupiterone.md",
    format: "markdown",
    knowledgeCategoryID: null,
    locale: "en",
    name: "Compliance With Jupiterone",
    path: "getting-started_and-admin/compliance-reporting/compliance-with-jupiterone.md",
    procedureType: "Article",
  },
] as (VanillaArticle | VanillaKnowledgeCategory)[];

export const expectedDeleteANDCreatesPROCEDURES = [
  {
    childrenPath: "compliance-reporting",
    description: "",
    fileName: "compliance-reporting",
    knowledgeBaseID: 1,
    knowledgeCategoryID: 23,
    name: "Compliance Reporting",
    parentID: 22,
    path: "getting-started_and-admin/compliance-reporting/compliance-with-jupiterone.md",
    procedureType: "Category",
  },
  {
    articleID: 11,
    body: "FILE_DOES_NOT_EXIST",
    fileName: "jupiterOne-query-language_(J1QL)-copy.md",
    format: "markdown",
    knowledgeCategoryID: 22,
    locale: "en",
    name: "Jupiterone Query Language Copy",
    path: "getting-started_and-admin/jupiterOne-query-language_(J1QL)-copy.md",
    procedureType: "Article",
    status: "deleted",
  },
  {
    articleID: 12,
    body: "some body",
    fileName: "jupiterOne-query-language.md",
    format: "markdown",
    knowledgeCategoryID: 22,
    locale: "en",
    name: "Jupiterone Query Language",
    path: "getting-started_and-admin/jupiterOne-query-language.md",
    procedureType: "Article",
  },
  {
    childrenPath: "compliance-reporting",
    description: "",
    fileName: "compliance-reporting",
    knowledgeBaseID: 1,
    knowledgeCategoryID: null,
    name: "Compliance Reporting",
    parentID: null,
    path: "getting-started_and-admin/compliance-reporting/compliance-with-jupiterone.md",
    procedureType: "Category",
  },
  {
    articleID: null,
    body: "",
    fileName: "jupiterOne-query-language_(J1QL)-copy.md",
    format: "markdown",
    knowledgeCategoryID: null,
    locale: "en",
    name: "Soc2 With Jupiterone Copy",
    path: "getting-started_and-admin/jupiterOne-query-language_(J1QL)-copy.md",
    procedureType: "Article",
  },
  {
    articleID: 21,
    body: "",
    fileName: "jupiterOne-query-language_(J1QL)-copy.md",
    format: "markdown",
    knowledgeCategoryID: 22,
    locale: "en",
    name: "Soc2 With Jupiterone Copy",
    path: "getting-started_and-admin/jupiterOne-query-language_(J1QL)-copy.md",
    procedureType: "Article",
  },
] as (VanillaArticle | VanillaKnowledgeCategory)[];

export const PROCEDURESWithKCategoriesToDelete = [
  {
    parentID: 1,
    knowledgeBaseID: 1,
    name: "Getting Started Admin",
    fileName: "getting-started_and-admin",
    description: "",
    knowledgeCategoryID: 22,
    path: "getting-started_and-admin/jupiterOne-query-language_(J1QL)-copy.md",
    childrenPath: "getting-started_and-admin",
    procedureType: "Category",
  },

  {
    knowledgeCategoryID: 22,
    articleID: 12,
    fileName: "jupiterOne-query-language.md",
    name: "Jupiterone Query Language",
    body: "",
    path: "getting-started_and-admin/jupiterOne-query-language.md",
    format: "markdown",
    locale: "en",
    procedureType: ProcedureTypeEnum.Article,
  },
  // kCategory with deleteFlag
  // kCategory IN another Category
  {
    parentID: 22,
    knowledgeBaseID: 1,
    name: "Other Reporting",
    fileName: "other-reporting",
    description: FLAG_FOR_DELETE,
    knowledgeCategoryID: 324,
    path: "getting-started_and-admin/other-reporting/soc2-with-jupiterone-copy.md",
    childrenPath: "other-reporting",
    procedureType: "Category",
  },
  // kCategory with deleteFlag
  // kCategory IN another Category in another
  {
    parentID: 324,
    knowledgeBaseID: 1,
    name: "Other Sub Category Reporting",
    fileName: "other-sub-category-reporting",
    description: FLAG_FOR_DELETE,
    knowledgeCategoryID: 542,
    path: "getting-started_and-admin/other-reporting/other-sub-category-reporting/soc2-with-jupiterone-copy.md",
    childrenPath: "other-sub-category-reporting",
    procedureType: "Category",
  },
  // kCategory with deleteFlag
  // kCategory IN another Category
  {
    parentID: 22,
    knowledgeBaseID: 1,
    name: "Other Other Reporting",
    fileName: "other-other-reporting",
    description: FLAG_FOR_DELETE,
    knowledgeCategoryID: 998,
    path: "getting-started_and-admin/other-other-reporting/soc2-with-jupiterone-copy.md",
    childrenPath: "other-other-reporting",
    procedureType: "Category",
  },
] as (VanillaArticle | VanillaKnowledgeCategory)[];

export const PROCEDURESKCategoriesDELETED = [
  {
    parentID: 1,
    knowledgeBaseID: 1,
    name: "Getting Started Admin",
    fileName: "getting-started_and-admin",
    description: "",
    knowledgeCategoryID: 22,
    path: "getting-started_and-admin/jupiterOne-query-language_(J1QL)-copy.md",
    childrenPath: "getting-started_and-admin",
    procedureType: "Category",
  },
  // kCategory with deleteFlag
  // kCategory IN another Category
  {
    parentID: 22,
    knowledgeBaseID: 1,
    name: "Other Reporting",
    fileName: "other-reporting",
    description: "been deleted",
    knowledgeCategoryID: 324,
    path: "getting-started_and-admin/other-reporting/soc2-with-jupiterone-copy.md",
    childrenPath: "other-reporting",
    procedureType: "Category",
  },
  // kCategory with deleteFlag
  // kCategory IN another Category in another
  {
    parentID: 324,
    knowledgeBaseID: 1,
    name: "Other Sub Category Reporting",
    fileName: "other-sub-category-reporting",
    description: "been deleted",
    knowledgeCategoryID: 542,
    path: "getting-started_and-admin/other-reporting/other-sub-category-reporting/soc2-with-jupiterone-copy.md",
    childrenPath: "other-sub-category-reporting",
    procedureType: "Category",
  },
  // kCategory with deleteFlag
  // kCategory IN another Category
  {
    parentID: 22,
    knowledgeBaseID: 1,
    name: "Other Other Reporting",
    fileName: "other-other-reporting",
    description: "been deleted",
    knowledgeCategoryID: 998,
    path: "getting-started_and-admin/other-other-reporting/soc2-with-jupiterone-copy.md",
    childrenPath: "other-other-reporting",
    procedureType: "Category",
  },
] as VanillaKnowledgeCategory[];

export const createKCategory = ({
  parentID,
  knowledgeBaseID,
  name,
  fileName,
  description,
  knowledgeCategoryID,
  path,
  childrenPath,
}: {
  parentID?: number | null;
  knowledgeBaseID?: number;
  name?: string;
  fileName?: string;
  description?: string;
  knowledgeCategoryID?: number | null;
  path?: string;
  childrenPath?: string;
}): VanillaKnowledgeCategory => ({
  parentID: parentID || null,
  knowledgeBaseID: knowledgeBaseID || 1,
  name: name || "Other Sub Category Reporting",
  fileName: fileName || "other-sub-category-reporting",
  description: description || FLAG_FOR_DELETE,
  knowledgeCategoryID: 542,
  path: "getting-started_and-admin/other-reporting/other-sub-category-reporting/soc2-with-jupiterone-copy.md",
  childrenPath: "other-sub-category-reporting",
  procedureType: ProcedureTypeEnum.Category,
});
