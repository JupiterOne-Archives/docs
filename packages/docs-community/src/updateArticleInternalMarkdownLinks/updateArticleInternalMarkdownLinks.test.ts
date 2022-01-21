/* eslint-disable no-useless-escape */
import * as mockLinksAndMediaHandlers from "../linksAndMediaHandlers";
import {
  ProcedureTypeEnum,
  VanillaArticle,
  VanillaKnowledgeCategory,
} from "../utils";
import { updateArticleInternalMarkdownLinks } from "./";

describe("updateArticleInternalMarkdownLinks", () => {
  const getArticleNameFromReferenceSpy = jest.spyOn(
    mockLinksAndMediaHandlers,
    "getArticleNameFromReference"
  );

  beforeAll(() => {
    getArticleNameFromReferenceSpy.mockResolvedValue(
      "Article Name from Markdown"
    );
  });
  it("returns Vanilla Articles with body adjusted when Article exists", async () => {
    const procedure: VanillaArticle = {
      articleID: 537,
      body: `<a rel=\"nofollow\" href=\"../alink/toLocal/markdownfile.md">Github</a>.</p>`, // "i have a link to [xyx](localMarkdown)",
      format: "markdown",
      fileName: "",
      knowledgeCategoryID: 304,
      knowledgeBaseID: 1,
      name: "Api Key Access",
      breadcrumbs: [
        {
          name: "JupiterOne Product Documentation",
          url: "https://jupiterone.vanillastaging.com/kb/docs",
        },
        {
          name: "API Key Access",
          url: "https://jupiterone.vanillastaging.com/kb/categories/304-api-key-access",
        },
      ],
      seoDescription: null,
      slug: "537-api-key-access",
      sort: 0,
      score: 0,
      views: 0,
      url: "https://jupiterone.vanillastaging.com/kb/articles/537-api-key-access",
      insertUserID: 12,
      dateInserted: "2021-12-09T23:00:24+00:00",
      updateUserID: 12,
      dateUpdated: "2021-12-09T23:00:24+00:00",
      referencesNeedingUpdatesInMarkdown: ["../alink/toLocal/markdownfile.md"],
      status: "published",
      locale: "en",
      featured: false,
      translationStatus: "up-to-date",
      foreignID: null,
      procedureType: ProcedureTypeEnum.Article,
    };
    const processedProcedures: (VanillaArticle | VanillaKnowledgeCategory)[] = [
      procedure,
    ];
    const vanillaArticle: VanillaArticle = {
      name: "Article Name from Markdown",
      status: "published",
      url: "NewUrl",
    } as VanillaArticle;
    const articlesFromVanilla: VanillaArticle[] = [vanillaArticle];
    const actual = await updateArticleInternalMarkdownLinks(
      processedProcedures,
      articlesFromVanilla
    );

    const [updatedProcedure] = actual;

    expect(updatedProcedure.body).toContain(vanillaArticle.url);
  });

  it("returns Vanilla Articles with markdown returned when Article does NOT exist", async () => {
    const expectedBody = "i have a link to [xyx](localMarkdown)";
    const procedure: VanillaArticle = {
      articleID: 537,
      body: expectedBody,
      format: "markdown",
      fileName: "",
      knowledgeCategoryID: 304,
      knowledgeBaseID: 1,
      name: "Api Key Access",
      breadcrumbs: [
        {
          name: "JupiterOne Product Documentation",
          url: "https://jupiterone.vanillastaging.com/kb/docs",
        },
        {
          name: "API Key Access",
          url: "https://jupiterone.vanillastaging.com/kb/categories/304-api-key-access",
        },
      ],
      seoDescription: null,
      slug: "537-api-key-access",
      sort: 0,
      score: 0,
      views: 0,
      url: "https://jupiterone.vanillastaging.com/kb/articles/537-api-key-access",
      insertUserID: 12,
      dateInserted: "2021-12-09T23:00:24+00:00",
      updateUserID: 12,
      dateUpdated: "2021-12-09T23:00:24+00:00",
      referencesNeedingUpdatesInMarkdown: ["../alink/toLocal/markdownfile.md"],
      status: "published",
      locale: "en",
      featured: false,
      translationStatus: "up-to-date",
      foreignID: null,
      procedureType: ProcedureTypeEnum.Article,
    };
    const processedProcedures: (VanillaArticle | VanillaKnowledgeCategory)[] = [
      procedure,
    ];
    const vanillaArticle: VanillaArticle = {
      name: "Totally different",
      status: "published",
      url: "NewUrl",
    } as VanillaArticle;
    const articlesFromVanilla: VanillaArticle[] = [vanillaArticle];
    const actual = await updateArticleInternalMarkdownLinks(
      processedProcedures,
      articlesFromVanilla
    );

    const [updatedProcedure] = actual;
    expect(updatedProcedure.body).toEqual(expectedBody);
  });
});
