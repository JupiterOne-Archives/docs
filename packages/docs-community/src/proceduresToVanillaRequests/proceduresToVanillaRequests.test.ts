/* eslint-disable jest/no-focused-tests */
import {
  FLAG_FOR_DELETE,
  KNOWN_CATEGORY_BEEN_DELETED,
  ProcedureTypeEnum,
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
  addImagesToArticleMarkdown,
  addVanillaArticleInfoToProcedure,
  addVanillaArticlesToProcedures,
  addVanillaCategoryToProcedure,
  procedureToArticle,
  procedureToKnowledgeCategory,
  removeDeletedCategories,
  useProceduresForVanillaRequests,
} from "./";
import {
  expectedDeleteANDCreatesPROCEDURES,
  matchingProcedureKnowledgeCategory,
  matchingVanillaKnowledgeArticle,
  procedureArticle,
  procedureKnowledgeCategory,
  procedureKnowledgeCategoryReleaseNotes,
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
import * as pToRequests from "./utils";
import { directoryExists, markdownToString } from "./utils";

jest.mock("../VanillaAPI");

describe("ProceduresToVanillaRequests", () => {
  let mockDirectoryExists = jest.spyOn(pToRequests, "directoryExists");
  let mockMarkdownToString = jest.spyOn(pToRequests, "markdownToString");
  beforeEach(() => {
    mockDirectoryExists = jest.spyOn(pToRequests, "directoryExists");
    mockDirectoryExists.mockImplementation(() => true);
    mockMarkdownToString = jest.spyOn(pToRequests, "markdownToString");
    mockMarkdownToString.mockImplementation(() => "" as any);
  });
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
    mockDirectoryExists.mockReturnValue(true);
    mockCreateArticle = createArticle as jest.MockedFunction<
      typeof createArticle
    >;
    mockMarkdownToString = markdownToString as jest.MockedFunction<
      typeof markdownToString
    >;
    mockDirectoryExists = directoryExists as jest.MockedFunction<
      typeof directoryExists
    >;

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
        foreignID: undefined,
        knowledgeBaseID: 1,
        knowledgeCategoryID: 23,
        name: "Compliance Reporting",
        parentID: 8,
        procedureType: "Category",
        sort: undefined,
        path: "getting-started_and-admin/compliance-reporting",
        sortChildren: undefined,
        url: undefined,
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
  describe("procedureToArticle", () => {
    describe("Creating new vanilla article", () => {
      it("returns procedure when previous knowledgeCategoryId doesnt exist", async () => {
        const procedureWithNoArticle = procedureArticletemp;
        mockCreateArticle.mockResolvedValue({
          articleID: null,
        } as any);
        const mockHttpclient = {} as any;
        const actual = await procedureToArticle(
          mockHttpclient,
          procedureWithNoArticle,
          null
        );
        expect(actual).toEqual({
          articleID: null,
          body: "",
          fileName: "soc2-with-jupiterone-copy.md",
          format: "markdown",
          knowledgeCategoryID: null,
          locale: "en",
          name: "Soc2 With Jupiterone Copy",
          path: "getting-started_and-admin/compliance-reporting/soc2-with-jupiterone-copy.md",
          procedureType: "Article",
        });
        expect(mockCreateArticle).toHaveBeenCalledTimes(0);
      });
      it("creates new Article and adds vanilla info to procedure", async () => {
        const procedureWithNoArticle = procedureArticletemp;
        const previousknowledgeCategoryID = 26;
        const articleID = 26;
        const mockVanillaReturn = {
          articleID,
          name: "Soc2 With Jupiterone Copy",
          knowledgeCategoryID: previousknowledgeCategoryID,
        } as any;

        mockCreateArticle.mockReset();
        mockCreateArticle.mockResolvedValue(mockVanillaReturn);
        const mockHttpclient = {} as any;
        const actual = await procedureToArticle(
          mockHttpclient,
          procedureWithNoArticle,
          previousknowledgeCategoryID
        );

        expect(actual).toEqual(mockVanillaReturn);
        expect(mockCreateArticle).toHaveBeenCalledWith(mockHttpclient, {
          body: "",
          format: "markdown",
          knowledgeCategoryID: articleID,
          locale: "en",
          name: "Soc2 With Jupiterone Copy",
          sort: 0,
          path: "getting-started_and-admin/compliance-reporting/soc2-with-jupiterone-copy.md",
        });
      });
    });
    describe("Editing existing vanilla article", () => {
      beforeEach(() => {
        mockEditArticle.mockReset();
      });
      it("edits an existing article", async () => {
        const previousknowledgeCategoryID = 28;
        const articleID = 55;
        const procedureWithArticle = {
          ...procedureArticletemp,
          articleID,
          knowledgeCategoryID: previousknowledgeCategoryID,
        };
        const mockVanillaReturnValue = {
          articleID,
          name: "Soc2 With Jupiterone Copy",
          knowledgeCategoryID: previousknowledgeCategoryID,
        } as any;
        const mockHttpclient = {} as any;
        mockEditArticle.mockResolvedValue(mockVanillaReturnValue);
        const actual = await procedureToArticle(
          mockHttpclient,
          procedureWithArticle,
          previousknowledgeCategoryID
        );
        expect(actual).toEqual(mockVanillaReturnValue);
        expect(mockEditArticle).toHaveBeenCalledWith(
          mockHttpclient,
          articleID,
          {
            body: "",
            format: "markdown",
            knowledgeCategoryID: previousknowledgeCategoryID,
            locale: "en",
            name: "Soc2 With Jupiterone Copy",
            sort: 0,
            path: "getting-started_and-admin/compliance-reporting/soc2-with-jupiterone-copy.md",
          }
        );
      });
    });
    describe("Deleting existing vanilla article", () => {
      beforeEach(() => {
        mockDeleteArticle.mockReset();
      });
      it("deletes existing article when body contains delete flag", async () => {
        const articleID = 234;
        const previousknowledgeCategoryID = 8;
        const procedureWithArticle = {
          ...procedureArticletemp,
          body: FLAG_FOR_DELETE,
          articleID,
          knowledgeCategoryID: previousknowledgeCategoryID,
        };
        const mockReturnForDelete = {
          ...procedureWithArticle,
        } as any;
        mockDeleteArticle.mockResolvedValue(mockReturnForDelete);
        mockMarkdownToString.mockResolvedValue(FLAG_FOR_DELETE);

        const mockHttpclient = {} as any;

        const actual = await procedureToArticle(
          mockHttpclient,
          procedureWithArticle,
          previousknowledgeCategoryID
        );
        expect(actual).toEqual(mockReturnForDelete);
        expect(mockDeleteArticle).toHaveBeenCalledWith(
          mockHttpclient,
          articleID
        );
      });
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
  describe("procedureToKnowledgeCategory", () => {
    beforeEach(() => {
      mockCreateKnowledgeCategory.mockReset();
    });
    it("Creates- Adds the knowledgeBase of Release-Notes for release-notes path", async () => {
      const knowledgeCategoryID = 111;
      mockCreateKnowledgeCategory.mockResolvedValue({
        ...procedureKnowledgeCategoryReleaseNotes,
        parentID: 22,
        knowledgeCategoryID,
        sort: undefined,
        sortChildren: undefined,
        url: undefined,
      });

      const expected = {
        childrenPath: "release-notes/2020-20-99.md",
        description: "",
        fileName: "2020-20-99",
        knowledgeBaseID: 2,
        knowledgeCategoryID: 111,
        name: "2020-20-99",
        parentID: 22,
        path: "release-notes/2020-20-99.md",
        procedureType: "Category",
        sort: undefined,
        sortChildren: undefined,
        url: undefined,
      };
      const mockHttpclient = {} as any;
      const actual = await procedureToKnowledgeCategory(
        mockHttpclient,
        procedureKnowledgeCategoryReleaseNotes,
        22,
        false
      );
      expect(mockCreateKnowledgeCategory).toHaveBeenCalledWith(
        {},
        {
          knowledgeBaseID: 2,
          name: "2020-20-99",
          parentID: 22,
        }
      );

      expect(actual).toEqual(expected);
    });
    it("Creates", async () => {
      mockDirectoryExists.mockReturnValue(true);
      const procedureKnowledgeCategoryNOKCID = {
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
      const knowledgeCategoryID = 111;

      const expected = {
        childrenPath:
          "getting-started_and-admin/soc2-reporting/soc2-with-jupiterone-copy.md",
        description: "",
        fileName: "soc2-reporting",
        foreignID: undefined,
        knowledgeBaseID: 1,
        knowledgeCategoryID,
        name: "Soc2 Reporting",
        parentID: 22,
        path: "getting-started_and-admin/soc2-reporting",
        procedureType: "Category",
        sort: undefined,
        sortChildren: undefined,
        url: undefined,
      };
      mockCreateKnowledgeCategory.mockResolvedValue({
        childrenPath:
          "getting-started_and-admin/soc2-reporting/soc2-with-jupiterone-copy.md",
        description: "",
        fileName: "soc2-reporting",
        foreignID: undefined,
        knowledgeBaseID: 1,
        knowledgeCategoryID,
        name: "Soc2 Reporting",
        parentID: 22,
        path: "getting-started_and-admin/soc2-reporting",
        procedureType: ProcedureTypeEnum.Category,
        sort: undefined,
        sortChildren: undefined,
        url: undefined,
      });
      const mockHttpclient = {} as any;
      const actual = await procedureToKnowledgeCategory(
        mockHttpclient,
        procedureKnowledgeCategoryNOKCID,
        22,
        false
      );
      expect(mockCreateKnowledgeCategory).toHaveBeenLastCalledWith(
        mockHttpclient,
        { knowledgeBaseID: 1, name: "Soc2 Reporting", parentID: 22 }
      );
      expect(actual).toEqual(expected);
    });
    describe("Edits", () => {
      beforeEach(() => {
        mockEditKnowledgeCategory.mockReset();
        mockDirectoryExists.mockReturnValue(true);
      });
      it("returns procedure when file exists, knowledgeCategoryID and has not moved", async () => {
        const knowledgeCategoryID = 111;
        mockDirectoryExists.mockReturnValue(true);
        const procedureKnowledgeCategoryWITHKCID = {
          ...procedureKnowledgeCategorytemp,
          knowledgeCategoryID,
        };

        mockEditKnowledgeCategory.mockResolvedValue({
          ...procedureKnowledgeCategoryWITHKCID,
          knowledgeCategoryID,
        });
        const expected = procedureKnowledgeCategoryWITHKCID;
        const mockHttpclient = {} as any;
        const actual = await procedureToKnowledgeCategory(
          mockHttpclient,
          procedureKnowledgeCategoryWITHKCID,
          22,
          false
        );

        expect(actual).toEqual(expected);
      });
      it("edits and returns procedure when file exists and has knowledgeCategoryID and HAS moved", async () => {
        const knowledgeCategoryID = 111;
        mockDirectoryExists.mockReturnValue(true);
        const procedureKnowledgeCategoryWITHKCID = {
          ...procedureKnowledgeCategorytemp,
          knowledgeCategoryID,
        };

        mockEditKnowledgeCategory.mockResolvedValue({
          ...procedureKnowledgeCategoryWITHKCID,
          knowledgeCategoryID,
        });
        const expected = procedureKnowledgeCategoryWITHKCID;
        const mockHttpclient = {} as any;
        const actual = await procedureToKnowledgeCategory(
          mockHttpclient,
          procedureKnowledgeCategoryWITHKCID,
          22,
          true
        );
        expect(mockEditKnowledgeCategory).toHaveBeenCalled();
        expect(actual).toEqual(expected);
      });
    });
    describe("Delete", () => {
      it(" Marks kcategories for delete when kcategory file does not exist", async () => {
        const knowledgeCategoryID = 111;
        mockDirectoryExists.mockReturnValue(false);
        const procedureKnowledgeCategoryNOKCID = {
          ...procedureKnowledgeCategorytemp,
          knowledgeCategoryID,
          path: "getting-started_and-admin/soc2-repzzzorting/soc2-with-jupiterone-copy.md",
        };
        const mockHttpclient = {} as any;
        const actual = await procedureToKnowledgeCategory(
          mockHttpclient,
          procedureKnowledgeCategoryNOKCID,
          22,
          false
        );

        expect(actual.description).toEqual(FLAG_FOR_DELETE);
      });
      it(" Marks kcategories AS deleted when missing kcategory file and knowledgeCategoryID", async () => {
        const knowledgeCategoryID = null;
        mockDirectoryExists.mockReturnValue(false);
        const procedureKnowledgeCategoryNOKCID = {
          ...procedureKnowledgeCategorytemp,
          knowledgeCategoryID,
          path: "getting-started_and-admin/soc2-repzzzorting/soc2-with-jupiterone-copy.md",
        };
        const mockHttpclient = {} as any;
        const actual = await procedureToKnowledgeCategory(
          mockHttpclient,
          procedureKnowledgeCategoryNOKCID,
          22,
          false
        );

        expect(actual.description).toEqual(KNOWN_CATEGORY_BEEN_DELETED);
      });
    });
  });

  describe("useProceduresForVanillaRequests", () => {
    beforeEach(() => {
      mockMarkdownToString.mockReset();
      mockCreateArticle.mockReset();
      mockCreateKnowledgeCategory.mockReset();
    });
    it("handles all new items", async () => {
      const mockHttpclient = {} as any;
      mockDirectoryExists.mockReturnValue(true);
      mockMarkdownToString.mockResolvedValue("Im markdown. LOOK AT ME.");
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

    // here
    it("handles addition, edits and removal of articles", async () => {
      const mockHttpclient = {} as any;
      mockDirectoryExists
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(false);

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
      mockMarkdownToString
        .mockResolvedValueOnce(FLAG_FOR_DELETE)
        .mockResolvedValue("Im markdown. LOOK AT ME.");
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
  describe("addImagesToArticleMarkdown", () => {
    it("returns empty string when no input supplied", async () => {
      const actual = await addImagesToArticleMarkdown("");
      const expected = "";
      expect(actual).toEqual(expected);
    });
    it("returns inputted string when length of imageSrcMap is 0", async () => {
      const inputedString =
        "markdown turned into a string and does not contain ()[assets/images]";
      const actual = await addImagesToArticleMarkdown(inputedString);
      const expected = inputedString;
      expect(actual).toEqual(expected);
    });
  });
});
