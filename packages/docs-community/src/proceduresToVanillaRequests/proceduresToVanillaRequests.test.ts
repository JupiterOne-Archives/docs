/* eslint-disable jest/no-focused-tests */
import * as integrationHandlingMock from "../integrationHandling";
import * as removeArticlesMock from "../removeDeletedArticles";
import * as updateMarkdownMock from "../updateArticleInternalMarkdownLinks";
import {
  createKnowledgeCategoryMock,
  FLAG_FOR_DELETE,
  ProcedureTypeEnum,
  VanillaArticle,
  VanillaKnowledgeCategory,
} from "../utils";
import * as mockVanillaAPI from "../VanillaAPI";
import {
  proceduresToVanillaRequests,
  useProceduresForVanillaRequests,
} from "./";
import * as mockAddMeta from "./actions/addMeta";
import * as createChangesContentForStagingMock from "./actions/stagingUpdateArticle";
import {
  expectedDeleteANDCreatesPROCEDURES,
  oneArticleAndOneProcedure,
  PROCEDURES,
  PROCEDURESWithOneDeleteArticleAndCreates,
  SHAPEWEWANT,
  vanillaArticleWithInfo,
  vanillaKnowledgeArticle,
} from "./mocks";
jest.mock("../httpClient");
describe("ProceduresToVanillaRequests", () => {
  const removeDeletedArticles = jest.spyOn(
    removeArticlesMock,
    "removeDeletedArticles"
  );
  let integrationHandling = jest
    .spyOn(integrationHandlingMock, "replaceArticleBodyWithIntegration")
    .mockResolvedValue({ alteredProcedures: [] });
  const procedures: (VanillaKnowledgeCategory | VanillaArticle)[] =
    oneArticleAndOneProcedure;
  let getAllArticles = jest
    .spyOn(mockVanillaAPI, "getAllArticles")
    .mockResolvedValue([]);
  let getKnowedgeCategories = jest
    .spyOn(mockVanillaAPI, "getKnowedgeCategories")
    .mockResolvedValue([]);
  let createKnowledgeCategory = jest
    .spyOn(mockVanillaAPI, "createKnowledgeCategory")
    .mockResolvedValue(createKnowledgeCategoryMock({}));

  let makeRequestsToChangeMarkdownReferences = jest
    .spyOn(mockVanillaAPI, "makeRequestsToChangeMarkdownReferences")
    .mockResolvedValue([]);
  let createArticle = jest
    .spyOn(mockVanillaAPI, "createArticle")
    .mockResolvedValue({ name: "aryth" } as VanillaArticle);
  let addVanillaArticlesToProcedures = jest
    .spyOn(mockAddMeta, "addVanillaArticlesToProcedures")
    .mockReturnValue([vanillaKnowledgeArticle]);
  let addVanillaCategoryToProcedure = jest.spyOn(
    mockAddMeta,
    "addVanillaCategoryToProcedure"
  );

  let createChangesContentForStaging = jest
    .spyOn(createChangesContentForStagingMock, "createChangesContentForStaging")
    .mockResolvedValue();
  let updateArticleInternalMarkdownLinks = jest
    .spyOn(updateMarkdownMock, "updateArticleInternalMarkdownLinks")
    .mockResolvedValue([]);
  let deleteAllFlaggedCategories = jest
    .spyOn(mockVanillaAPI, "deleteAllFlaggedCategories")
    .mockResolvedValue([]);

  beforeEach(() => {
    updateArticleInternalMarkdownLinks = jest
      .spyOn(updateMarkdownMock, "updateArticleInternalMarkdownLinks")
      .mockResolvedValue([]);

    getAllArticles = jest
      .spyOn(mockVanillaAPI, "getAllArticles")
      .mockResolvedValue([]);
    getKnowedgeCategories = jest
      .spyOn(mockVanillaAPI, "getKnowedgeCategories")
      .mockResolvedValue([]);
    createKnowledgeCategory = jest
      .spyOn(mockVanillaAPI, "createKnowledgeCategory")
      .mockResolvedValue(createKnowledgeCategoryMock({}));

    makeRequestsToChangeMarkdownReferences = jest
      .spyOn(mockVanillaAPI, "makeRequestsToChangeMarkdownReferences")
      .mockResolvedValue([]);
    deleteAllFlaggedCategories = jest
      .spyOn(mockVanillaAPI, "deleteAllFlaggedCategories")
      .mockResolvedValue([]);
    createArticle = jest
      .spyOn(mockVanillaAPI, "createArticle")
      .mockResolvedValue({ name: "aryth" } as VanillaArticle);
    addVanillaArticlesToProcedures = jest
      .spyOn(mockAddMeta, "addVanillaArticlesToProcedures")
      .mockReturnValue([vanillaKnowledgeArticle]);
    addVanillaCategoryToProcedure = jest.spyOn(
      mockAddMeta,
      "addVanillaCategoryToProcedure"
    );

    createChangesContentForStaging = jest
      .spyOn(
        createChangesContentForStagingMock,
        "createChangesContentForStaging"
      )
      .mockResolvedValue();
    integrationHandling = jest
      .spyOn(integrationHandlingMock, "replaceArticleBodyWithIntegration")
      .mockResolvedValue({ alteredProcedures: [] });
  });

  describe("useProceduresForVanillaRequests", () => {
    const vanillaKnowledgeCategory = {
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

    it("handles all new items", async () => {
      const mockHttpclient = {} as any;
      jest.doMock("../utils", () => ({
        mockDirectoryExists: jest.fn(() => true),
        mockMarkdownToString: jest
          .fn()
          .mockResolvedValue("Im markdown. LOOK AT ME."),
      }));
      createArticle

        .mockResolvedValueOnce({
          ...vanillaArticleWithInfo,
          knowledgeCategoryID: 22,
          articleID: 11,
          name: "Jupiterone Query Language Copy",
        })
        .mockResolvedValueOnce({
          ...vanillaArticleWithInfo,
          knowledgeCategoryID: 22,
          articleID: 12,

          name: "Jupiterone Query Language",
        })
        .mockResolvedValueOnce({
          ...vanillaArticleWithInfo,
          knowledgeCategoryID: 33,
          articleID: 21,
          name: "Soc2 With Jupiterone Copy",
        })
        .mockResolvedValueOnce({
          ...vanillaArticleWithInfo,
          knowledgeCategoryID: 33,
          articleID: 22,

          name: "Soc2 With Jupiterone",
        });
      createKnowledgeCategory
        .mockResolvedValueOnce({
          ...vanillaKnowledgeCategory,
          parentID: 1,
          knowledgeBaseID: 1,
          name: "Getting Started Admin",
          description: "",
          knowledgeCategoryID: 22,
        })

        .mockResolvedValueOnce({
          ...vanillaKnowledgeCategory,
          parentID: 22,
          knowledgeBaseID: 1,
          name: "Compliance Reporting",

          knowledgeCategoryID: 33,
        });

      const actual = await useProceduresForVanillaRequests(
        PROCEDURES,
        mockHttpclient,
        []
      );

      expect(actual).toEqual(SHAPEWEWANT);
    });

    it("handles addition, edits and removal of articles", async () => {
      const mockHttpclient = {} as any;
      jest.doMock("../utils", () => ({
        mockDirectoryExists: jest
          .fn(() => true)
          .mockReturnValueOnce(true)
          .mockReturnValueOnce(true)
          .mockReturnValueOnce(true)
          .mockReturnValueOnce(false)
          .mockReturnValueOnce(false)
          .mockReturnValueOnce(false),
        mockMarkdownToString: jest
          .fn()
          .mockResolvedValue("Im markdown. LOOK AT ME."),
      }));

      jest.doMock("../utils", () => ({
        mockMarkdownToString: jest
          .fn()
          .mockResolvedValueOnce(FLAG_FOR_DELETE)
          .mockResolvedValue("Im markdown. LOOK AT ME."),
      }));

      const existingCategories = [
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
      ] as VanillaKnowledgeCategory[];

      const actual = await useProceduresForVanillaRequests(
        PROCEDURESWithOneDeleteArticleAndCreates,
        mockHttpclient,
        existingCategories,
        []
      );

      expect(actual).toEqual(expectedDeleteANDCreatesPROCEDURES);
    });
  });
  describe("useProceduresForVanillaRequests run", () => {
    beforeEach(() => {
      jest.doMock("../httpClient", () => ({}));
    });
    it("handles empty procedures", async () => {
      const procedures: (VanillaKnowledgeCategory | VanillaArticle)[] = [];
      const actual = await proceduresToVanillaRequests({ procedures });
      expect(actual).toEqual([]);
    });
    it("returns Articles and Procedures", async () => {
      const actual = await proceduresToVanillaRequests({ procedures });
      expect(getKnowedgeCategories).toHaveBeenCalledTimes(1);
      expect(getAllArticles).toHaveBeenCalledTimes(1);
      expect(addVanillaCategoryToProcedure).toHaveBeenCalledTimes(1);
      expect(addVanillaArticlesToProcedures).toHaveBeenCalledTimes(1);
      expect(updateArticleInternalMarkdownLinks).toHaveBeenCalledTimes(1);
      expect(makeRequestsToChangeMarkdownReferences).toHaveBeenCalledTimes(1);
      expect(createChangesContentForStaging).toHaveBeenCalledTimes(1);
      expect(deleteAllFlaggedCategories).toHaveBeenCalledTimes(1);
      expect(integrationHandling).toHaveBeenCalledTimes(0);
      expect(actual).toEqual([]);
    });
    it("handles integrations only", async () => {
      const actual = await proceduresToVanillaRequests({
        procedures,
        integrationsOnly: true,
      });

      expect(getKnowedgeCategories).toHaveBeenCalledTimes(1);
      expect(getAllArticles).toHaveBeenCalledTimes(1);
      expect(addVanillaCategoryToProcedure).toHaveBeenCalledTimes(1);
      expect(addVanillaArticlesToProcedures).toHaveBeenCalledTimes(1);
      expect(updateArticleInternalMarkdownLinks).toHaveBeenCalledTimes(1);
      expect(makeRequestsToChangeMarkdownReferences).toHaveBeenCalledTimes(1);
      expect(createChangesContentForStaging).toHaveBeenCalledTimes(1);
      expect(deleteAllFlaggedCategories).toHaveBeenCalledTimes(1);
      expect(integrationHandling).toHaveBeenCalledTimes(1);
      expect(removeDeletedArticles).toHaveBeenCalledTimes(1);
      expect(actual).toEqual([]);
    });
  });
});
