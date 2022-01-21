/* eslint-disable no-useless-escape */
import { VanillaArticle, VanillaKnowledgeCategory } from "../utils";
export const references = [
  "../api-key-access.md",
  "./faq-integrations.md",
  "alert-rule.md",
  "../integrations-roadmap.md",
  "configure-sso-integration.md",
  "../docs/configure-sso-integration.md",
  "https://github.com/JupiterOne/docs/blob/main/docs/faqs-aws.md",
  'href="../getting-started_and-admin/catalog.md',
];
export const completedProcedures = [
  {
    parentID: 1,

    knowledgeBaseID: 1,

    name: "Apis Integrations",

    fileName: "apis-integrations",

    description: "",

    knowledgeCategoryID: 304,

    path: "apis-integrations",

    childrenPath: "apis-integrations/alert-rule.md",

    procedureType: "Category",

    sortChildren: null,

    sort: 0,

    insertUserID: 12,

    dateInserted: "2021-12-09T23:00:12+00:00",

    updateUserID: 12,

    dateUpdated: "2021-12-09T23:17:39+00:00",

    lastUpdatedArticleID: null,

    lastUpdatedUserID: null,

    articleCount: 16,

    articleCountRecursive: 27,

    childCategoryCount: 11,

    url: "https://jupiterone.vanillastaging.com/kb/categories/304-apis-integrations",

    foreignID: null,
  },

  {
    articleID: 536,

    articleRevisionID: 1683,

    knowledgeCategoryID: 304,

    breadcrumbs: [
      {
        name: "JupiterOne Product Documentation",

        url: "https://jupiterone.vanillastaging.com/kb/docs",
      },

      {
        name: "Apis Integrations",

        url: "https://jupiterone.vanillastaging.com/kb/categories/304-apis-integrations",
      },
    ],

    knowledgeBaseID: 1,

    name: "Alert Rule",

    body: `he JupiterOne [API client or CLI](../APIs_and-integrations/j1-client-and-cli.md)`,
    outline: [
      {
        ref: "jupiterone-alert-rule-schema",

        level: 1,

        text: "JupiterOne Alert Rule Schema",
      },
    ],

    excerpt:
      "JupiterOne Alert Rule Schema testing change A rule uses the results of one or more queries to execute one or more actions. The basic alert workflows are described here: JupiterOne Alert Rule configuration documentation. You can also directly edit the JSON that defines a rule for more advanced workflow execution.…",

    seoDescription: null,

    seoName: null,

    slug: "536-alert-rule",

    sort: 0,

    score: 0,

    views: 0,

    url: "https://jupiterone.vanillastaging.com/kb/articles/536-alert-rule",

    insertUserID: 12,

    dateInserted: "2021-12-09T23:00:17+00:00",

    updateUserID: 12,

    dateUpdated: "2021-12-10T17:03:45+00:00",

    status: "published",

    featured: false,

    dateFeatured: null,

    locale: "en",

    translationStatus: "up-to-date",

    foreignID: null,

    procedureType: "Article",
    bodyReferencesNeedingUpdates: references,
  },
] as (VanillaArticle | VanillaKnowledgeCategory)[];
