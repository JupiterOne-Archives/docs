import axios from "axios";
import path from "path";
import {
  ProcedureTypeEnum,
  VanillaArticle,
  VanillaKnowledgeCategory,
} from "../utils";
import * as vanillaAPIMock from "../VanillaAPI";
import { replaceArticleBodyWithIntegration } from "./";
describe("IntegrationHandling", () => {
  let procedures: (VanillaArticle | VanillaKnowledgeCategory)[] = [
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
      procedureType: ProcedureTypeEnum.Category,
    },
    {
      knowledgeCategoryID: null,
      articleID: 87,
      fileName: "jupiterOne-query-language_(J1QL)-copy.md",
      name: "Trend Micro Integration with JupiterOne",
      body: "",
      path: "getting-started_and-admin/jupiterOne-query-language_(J1QL)-copy.md",
      format: "markdown",
      locale: "en",
      procedureType: ProcedureTypeEnum.Article,
    },
  ];

  let editArticle = jest
    .spyOn(vanillaAPIMock, "editArticle")
    .mockResolvedValue(procedures[1] as VanillaArticle);
  let axiosSpy = jest
    .spyOn(axios, "get")
    .mockResolvedValue({ body: { data: "markdown" } });
  beforeAll(() => {
    jest
      .spyOn(path, "join")
      .mockReturnValue(`${path.resolve()}/integrations.config.yaml`); //to execture from jest env
    axiosSpy = jest
      .spyOn(axios, "get")
      .mockResolvedValue({ body: { data: "markdown" } });
  });
  afterAll(() => {
    jest.resetModules();
  });
  beforeEach(() => {
    editArticle = jest
      .spyOn(vanillaAPIMock, "editArticle")
      .mockResolvedValue(procedures[1] as VanillaArticle);
    axiosSpy = jest
      .spyOn(axios, "get")
      .mockResolvedValue({ body: { data: "markdown" } });

    procedures = [
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
        procedureType: ProcedureTypeEnum.Category,
      },
      {
        knowledgeCategoryID: null,
        articleID: 87,
        fileName: "jupiterOne-query-language_(J1QL)-copy.md",
        name: "Trend Micro Integration with JupiterOne",
        body: "",
        path: "getting-started_and-admin/jupiterOne-query-language_(J1QL)-copy.md",
        format: "markdown",
        locale: "en",
        procedureType: ProcedureTypeEnum.Article,
      },
    ];
  });
  describe("replaceArticleBodyWithIntegration", () => {
    it("Edits articles with integration data", async () => {
      const expected = {
        alteredProcedures: [
          {
            childrenPath: "getting-started_and-admin",
            description: "",
            fileName: "getting-started_and-admin",
            knowledgeBaseID: 1,
            knowledgeCategoryID: null,
            name: "Getting Started Admin",
            parentID: null,
            path: "getting-started_and-admin/jupiterOne-query-language_(J1QL)-copy.md",
            procedureType: "Category",
          },
          {
            articleID: 87,
            body: " \n document from integration url",
            fileName: "jupiterOne-query-language_(J1QL)-copy.md",
            format: "markdown",
            knowledgeCategoryID: null,
            locale: "en",
            name: "Trend Micro Integration with JupiterOne",
            path: "getting-started_and-admin/jupiterOne-query-language_(J1QL)-copy.md",
            procedureType: "Article",
          },
        ],
      };
      const httpClient = {} as any;
      const markdownString =
        "# Integration with JupiterOne \n document from integration url";
      axiosSpy.mockResolvedValue({ data: markdownString });
      const actual = await replaceArticleBodyWithIntegration({
        procedures,
        httpClient,
      });
      expect(axiosSpy).toHaveBeenCalledWith(
        "https://raw.githubusercontent.com/JupiterOne/graph-trend-micro/main/docs/jupiterone.md"
      );
      expect(editArticle).toHaveBeenCalledWith({}, 87, {
        body: " \n document from integration url",
      });
      expect(actual).toEqual(expected);
    });

    it("handles when doc is not found", async () => {
      const expected = {
        alteredProcedures: [],
      };
      const httpClient = {} as any;

      axiosSpy.mockResolvedValue({});
      const actual = await replaceArticleBodyWithIntegration({
        procedures,
        httpClient,
      });
      expect(axiosSpy).toHaveBeenCalledTimes(0);
      expect(editArticle).toHaveBeenCalledTimes(0);
      expect(actual).toEqual(expected);
    });
  });
});
