/* eslint-disable jest/no-focused-tests */
import {
  FLAG_FOR_DELETE,
  VanillaArticle,
  VanillaKnowledgeCategory,
} from "../utils";
import {
  createArticle,
  createKnowledgeCategory,
  deleteAllFlaggedCategories,
  deleteArticle,
  editArticle,
  editKnowledgeCategory,
} from "../VanillaAPI";
import {
  addVanillaArticleInfoToProcedure,
  addVanillaArticlesToProcedures,
  addVanillaCategoryToProcedure,
  removeDeletedCategories,
  useProceduresForVanillaRequests,
} from "./";
import {
  expectedDeleteANDCreatesPROCEDURES,
  matchingProcedureKnowledgeCategory,
  matchingVanillaKnowledgeArticle,
  procedureArticle,
  procedureKnowledgeCategory,
  PROCEDURES,
  PROCEDURESKCategoriesDELETED,
  proceduresMock,
  PROCEDURESWithKCategoriesToDelete,
  PROCEDURESWithOneDeleteArticleAndCreates,
  SHAPEWEWANT,
  vanillaArticleWithInfo,
  vanillaKnowledgeArticle,
  vanillaKnowledgeCategory,
} from "./mocks";

jest.mock("../VanillaAPI");

describe("ProceduresToVanillaRequests", () => {
  let mockCreateKnowledgeCategory =
    createKnowledgeCategory as jest.MockedFunction<
      typeof createKnowledgeCategory
    >;

  let mockEditKnowledgeCategory = editKnowledgeCategory as jest.MockedFunction<
    typeof editKnowledgeCategory
  >;

  let mockDeleteAllFlaggedCategories =
    deleteAllFlaggedCategories as jest.MockedFunction<
      typeof deleteAllFlaggedCategories
    >;

  let mockCreateArticle = createArticle as jest.MockedFunction<
    typeof createArticle
  >;
  let mockEditArticle = editArticle as jest.MockedFunction<typeof editArticle>;
  let mockDeleteArticle = deleteArticle as jest.MockedFunction<
    typeof deleteArticle
  >;
  let matchingVanillaKnowledgeArticletemp = matchingVanillaKnowledgeArticle;
  let vanillaKnowledgeArticletemp = vanillaKnowledgeArticle;
  let procedureArticletemp = procedureArticle;
  let vanillaKnowledgeCategorytemp = vanillaKnowledgeCategory;
  let procedureKnowledgeCategorytemp = procedureKnowledgeCategory;
  let matchingProcedureKnowledgeCategorytemp =
    matchingProcedureKnowledgeCategory;
  let proceduresMocktemp = proceduresMock;

  beforeEach(() => {
    mockCreateArticle = createArticle as jest.MockedFunction<
      typeof createArticle
    >;

    jest.resetModules();
    jest.doMock("../utils", () => ({
      hasKnowledgeCategoryBeenMoved: jest.fn(() => 22),
      directoryExists: jest.fn().mockResolvedValue(true),
    }));

    mockDeleteAllFlaggedCategories =
      deleteAllFlaggedCategories as jest.MockedFunction<
        typeof deleteAllFlaggedCategories
      >;
    mockEditKnowledgeCategory = editKnowledgeCategory as jest.MockedFunction<
      typeof editKnowledgeCategory
    >;
    mockCreateKnowledgeCategory =
      createKnowledgeCategory as jest.MockedFunction<
        typeof createKnowledgeCategory
      >;
    mockEditArticle = editArticle as jest.MockedFunction<typeof editArticle>;
    mockDeleteArticle = deleteArticle as jest.MockedFunction<
      typeof deleteArticle
    >;
    matchingVanillaKnowledgeArticletemp = matchingVanillaKnowledgeArticle;
    vanillaKnowledgeArticletemp = vanillaKnowledgeArticle;
    procedureArticletemp = procedureArticle;
    vanillaKnowledgeCategorytemp = vanillaKnowledgeCategory;
    procedureKnowledgeCategorytemp = procedureKnowledgeCategory;
    matchingProcedureKnowledgeCategorytemp = matchingProcedureKnowledgeCategory;
    proceduresMocktemp = proceduresMock;
  });
  describe("addVanillaCategoryToProcedure", () => {
    it("returns the procedure if no match from vanilla return", () => {
      const expected = procedureKnowledgeCategorytemp;
      const actual = addVanillaCategoryToProcedure(
        procedureKnowledgeCategorytemp,
        [vanillaKnowledgeCategorytemp]
      );

      expect(actual).toEqual(expected);
    });
    it("returns procedure with info from vanilla api mapped to it", () => {
      const expected = {
        childrenPath:
          "getting-started_and-admin/compliance-reporting/soc2-with-jupiterone-copy.md",
        description: "",
        fileName: "compliance-reporting",
        knowledgeBaseID: 1,
        knowledgeCategoryID: 23,
        name: "Compliance Reporting",
        parentID: 8,
        path: "getting-started_and-admin/compliance-reporting",
        procedureType: "Category",
      };
      const actual = addVanillaCategoryToProcedure(
        matchingProcedureKnowledgeCategorytemp,
        [vanillaKnowledgeCategorytemp]
      );

      expect(actual).toEqual(expected);
    });
  });

  describe("addVanillaArticleToProcedure", () => {
    it("returns the procedure if no match from vanilla return", () => {
      const expected = procedureArticletemp;
      const actual = addVanillaArticleInfoToProcedure(procedureArticletemp, [
        vanillaKnowledgeArticletemp,
      ]);

      expect(actual).toEqual(expected);
    });
    it("returns addition of knowledge return to the procedure", () => {
      const expected = {
        articleID: 43,
        body: "",
        fileName: "soc2-with-jupiterone-copy.md",
        format: "markdown",
        knowledgeCategoryID: 22,
        locale: "en",
        name: "Soc2 With Jupiterone Copy",
        path: "getting-started_and-admin/compliance-reporting/soc2-with-jupiterone-copy.md",
        procedureType: "Article",
      };
      const actual = addVanillaArticleInfoToProcedure(procedureArticletemp, [
        matchingVanillaKnowledgeArticletemp,
      ]);

      expect(actual).toEqual(expected);
    });
  });
  describe("addVanillaArticlesToProcedures", () => {
    it("return proceduresWithVanillaCategoryInfo", () => {
      const expected = [
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
          articleID: null,
          body: "",
          fileName: "jupiterOne-query-language_(J1QL)-copy.md",
          format: "markdown",
          knowledgeCategoryID: null,
          locale: "en",
          name: "Jupiterone Query Language Copy",
          path: "getting-started_and-admin/jupiterOne-query-language_(J1QL)-copy.md",
          procedureType: "Article",
        },
        {
          articleID: null,
          body: "",
          fileName: "jupiterOne-query-language.md",
          format: "markdown",
          knowledgeCategoryID: null,
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
          path: "getting-started_and-admin/compliance-reporting/soc2-with-jupiterone-copy.md",
          procedureType: "Category",
        },
        {
          articleID: 43,
          body: "",
          fileName: "soc2-with-jupiterone-copy.md",
          format: "markdown",
          knowledgeCategoryID: 22,
          locale: "en",
          name: "Soc2 With Jupiterone Copy",
          path: "getting-started_and-admin/compliance-reporting/soc2-with-jupiterone-copy.md",
          procedureType: "Article",
        },
        {
          articleID: null,
          body: "",
          fileName: "soc2-with-jupiterone.md",
          format: "markdown",
          knowledgeCategoryID: null,
          locale: "en",
          name: "Soc2 With Jupiterone",
          path: "getting-started_and-admin/compliance-reporting/soc2-with-jupiterone.md",
          procedureType: "Article",
        },
      ];
      const actual = addVanillaArticlesToProcedures(proceduresMocktemp, [
        matchingVanillaKnowledgeArticletemp,
      ]);
      expect(actual).toEqual(expected);
    });
  });

  describe("deleteAllFlaggedCategories", () => {
    beforeEach(() => {
      mockDeleteAllFlaggedCategories.mockReset();
    });
    it("returns obj with procedures, categoriesDeleted", async () => {
      mockDeleteAllFlaggedCategories.mockResolvedValue(
        PROCEDURESKCategoriesDELETED
      );
      const expected = {
        procedures: PROCEDURESWithKCategoriesToDelete,
        categoriesDeleted: PROCEDURESKCategoriesDELETED,
      };
      const mockHttpclient = {} as any;
      const actual = await removeDeletedCategories(
        mockHttpclient,
        PROCEDURESWithKCategoriesToDelete
      );
      expect(actual).toEqual(expected);
    });
    it("handles empty array", async () => {
      const noneToDelete: VanillaKnowledgeCategory[] = [];
      mockDeleteAllFlaggedCategories.mockResolvedValue(noneToDelete as any);
      const expected = {
        procedures: PROCEDURESWithKCategoriesToDelete,
        categoriesDeleted: noneToDelete,
      };
      const mockHttpclient = {} as any;
      const actual = await removeDeletedCategories(
        mockHttpclient,
        PROCEDURESWithKCategoriesToDelete
      );
      expect(actual).toEqual(expected);
      expect(PROCEDURESWithKCategoriesToDelete).toEqual(actual.procedures);
    });
  });

  describe("useProceduresForVanillaRequests", () => {
    beforeEach(() => {
      mockCreateArticle.mockReset();
      mockCreateKnowledgeCategory.mockReset();
    });
    it("handles all new items", async () => {
      const mockHttpclient = {} as any;
      jest.doMock("../utils", () => ({
        mockDirectoryExists: jest.fn(() => true),
        mockMarkdownToString: jest
          .fn()
          .mockResolvedValue("Im markdown. LOOK AT ME."),
      }));
      mockCreateArticle
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
      mockCreateKnowledgeCategory
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

      const deleteArticle = {
        articleID: 11,
        body: "FILE_DOES_NOT_EXIST",
        fileName: "jupiterOne-query-language_(J1QL)-copy.md",
        format: "markdown",
        knowledgeCategoryID: 22,
        locale: "en",
        status: "deleted",
        name: "Jupiterone Query Language Copy",
        path: "getting-started_and-admin/jupiterOne-query-language_(J1QL)-copy.md",
        procedureType: "Article",
      } as VanillaArticle;
      jest.doMock("../utils", () => ({
        mockMarkdownToString: jest
          .fn()
          .mockResolvedValueOnce(FLAG_FOR_DELETE)
          .mockResolvedValue("Im markdown. LOOK AT ME."),
      }));
      mockEditArticle.mockResolvedValue({
        articleID: 12,
        body: "some body",
        fileName: "jupiterOne-query-language.md",
        format: "markdown",
        knowledgeCategoryID: 22,
        locale: "en",
        name: "Jupiterone Query Language",
        path: "getting-started_and-admin/jupiterOne-query-language.md",
        procedureType: "Article",
      } as VanillaArticle);
      mockDeleteArticle.mockResolvedValue(deleteArticle);
      mockCreateArticle
        .mockResolvedValueOnce({
          articleID: 21,
          body: "",
          fileName: "jupiterOne-query-language_(J1QL)-copy.md",
          format: "markdown",
          knowledgeCategoryID: 22,
          locale: "en",
          name: "Soc2 With Jupiterone Copy",
          path: "getting-started_and-admin/jupiterOne-query-language_(J1QL)-copy.md",
          procedureType: "Article",
        } as VanillaArticle)
        .mockResolvedValueOnce({
          articleID: 22,
          body: "",
          fileName: "compliance-with-jupiterone.md",
          format: "markdown",
          knowledgeCategoryID: 23,
          locale: "en",
          name: "Compliance With Jupiterone",
          path: "getting-started_and-admin/compliance-reporting/compliance-with-jupiterone.md",
          procedureType: "Article",
        } as VanillaArticle);

      mockCreateKnowledgeCategory.mockResolvedValueOnce({
        childrenPath: "compliance-reporting",
        description: "",
        fileName: "compliance-reporting",
        knowledgeBaseID: 1,
        knowledgeCategoryID: 23,
        name: "Compliance Reporting",
        parentID: 22,
        path: "getting-started_and-admin/compliance-reporting/compliance-with-jupiterone.md",
        procedureType: "Category",
      } as VanillaKnowledgeCategory);

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
});
