import {
  createKnowledgeCategoryMock,
  FLAG_FOR_DELETE,
  KNOWN_CATEGORY_BEEN_DELETED,
  VanillaKnowledgeCategory,
} from "../utils";
import { deleteAllFlaggedCategories } from "../VanillaAPI";
import {
  procedureToArticle,
  procedureToKnowledgeCategory,
  removeDeletedCategories,
} from "./conversion";
import {
  procedureArticle,
  procedureKnowledgeCategory,
  PROCEDURESKCategoriesDELETED,
  PROCEDURESWithKCategoriesToDelete,
} from "./mocks";
jest.mock("../VanillaAPI");

describe("proceduresToVanillaRequests", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe("procedureToArticle", () => {
    beforeEach(() => {
      jest.resetModules();
    });

    it("deletes existing article when body contains delete flag", async () => {
      jest.doMock("../utils", () => ({
        mockMarkdownToString: jest.fn(() => FLAG_FOR_DELETE),
      }));
      const articleID = 234;
      const previousknowledgeCategoryID = 8;

      const procedureWithArticle = {
        ...procedureArticle,
        body: FLAG_FOR_DELETE,
        articleID,
        knowledgeCategoryID: previousknowledgeCategoryID,
      };
      jest.doMock("../VanillaAPI", () => ({
        editArticle: jest.fn().mockResolvedValue(procedureWithArticle),
      }));

      const mockReturnForDelete = {
        ...procedureWithArticle,
      } as any;

      const mockHttpclient = {} as any;

      const actual = await procedureToArticle(
        mockHttpclient,
        procedureWithArticle,
        previousknowledgeCategoryID
      );
      expect(actual).toEqual(mockReturnForDelete);
    });
    it("edits an existing article", async () => {
      const previousknowledgeCategoryID = 28;
      const articleID = 55;
      const mockVanillaReturnValue = {
        articleID,
        name: "Soc2 With Jupiterone Copy",
        knowledgeCategoryID: previousknowledgeCategoryID,
      } as any;
      jest.doMock("../VanillaAPI", () => ({
        editArticle: jest.fn().mockResolvedValue(mockVanillaReturnValue),
      }));

      const procedureWithArticle = {
        ...procedureArticle,
        articleID,
        knowledgeCategoryID: previousknowledgeCategoryID,
      };

      const mockHttpclient = {} as any;
      const expected = {
        articleID: 55,
        body: "",
        fileName: "soc2-with-jupiterone-copy.md",
        format: "markdown",
        knowledgeCategoryID: 28,
        locale: "en",
        name: "Soc2 With Jupiterone Copy",
        path: "getting-started_and-admin/compliance-reporting/soc2-with-jupiterone-copy.md",
        procedureType: "Article",
      };

      const actual = await procedureToArticle(
        mockHttpclient,
        procedureWithArticle,
        previousknowledgeCategoryID
      );
      expect(actual).toEqual(expected);
    });

    it("creates new Article and adds vanilla info to procedure", async () => {
      const procedureWithNoArticle = procedureArticle;
      const previousknowledgeCategoryID = 26;
      const articleID = 26;
      const mockVanillaReturn = {
        articleID,
        name: "Soc2 With Jupiterone Copy",
        knowledgeCategoryID: previousknowledgeCategoryID,
      } as any;
      jest.doMock("../VanillaAPI", () => ({
        createArticle: jest.fn().mockResolvedValue(mockVanillaReturn),
      }));

      const mockHttpclient = {} as any;
      const actual = await procedureToArticle(
        mockHttpclient,
        procedureWithNoArticle,
        previousknowledgeCategoryID
      );

      expect(actual).toEqual({
        articleID: null,
        body: "",
        fileName: "soc2-with-jupiterone-copy.md",
        format: "markdown",
        knowledgeCategoryID: 26,
        locale: "en",
        name: "Soc2 With Jupiterone Copy",
        path: "getting-started_and-admin/compliance-reporting/soc2-with-jupiterone-copy.md",
        procedureType: "Article",
      });
    });
    it("returns procedure when previous knowledgeCategoryId doesnt exist", async () => {
      const procedureWithNoArticle = procedureArticle;
      jest.doMock("../VanillaAPI", () => ({
        createArticle: jest.fn().mockResolvedValue({
          articleID: null,
        } as any),
      }));

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
    });
  });
  describe("procedureToKnowledgeCategory", () => {
    beforeEach(() => {
      jest.resetModules();
    });
    it("returns procedure when file exists, knowledgeCategoryID and has not moved", async () => {
      jest.doMock("../VanillaAPI", () => ({
        editKnowledgeCategory: jest.fn().mockResolvedValue({
          ...procedure,
          knowledgeCategoryID,
        } as any),
      }));
      const knowledgeCategoryID = 111;
      const procedure = createKnowledgeCategoryMock({ knowledgeCategoryID });
      jest.doMock("../utils", () => ({
        directoryExists: jest.fn(() => true),
      }));
      jest.doMock("./utils", () => ({
        hasKnowledgeCategoryBeenMoved: jest.fn(() => knowledgeCategoryID),
      }));

      const expected = procedure;
      const mockHttpclient = {} as any;
      const actual = await procedureToKnowledgeCategory(
        mockHttpclient,
        procedure,
        22
      );

      expect(actual).toEqual(expected);
    });
    it("edits and returns procedure when file exists and has knowledgeCategoryID and HAS moved", async () => {
      const knowledgeCategoryID = 111;
      const procedure = createKnowledgeCategoryMock({ knowledgeCategoryID });
      jest.doMock("../VanillaAPI", () => ({
        createKnowledgeCategory: jest.fn().mockResolvedValue({
          ...procedure,
          description: "",
          knowledgeCategoryID,
        } as any),
      }));
      jest.doMock("../utils", () => ({
        directoryExists: jest.fn(() => true),
        mockMarkdownToString: jest.fn().mockResolvedValue(""),
      }));
      jest.doMock("./utils", () => ({
        hasKnowledgeCategoryBeenMoved: jest.fn(() => 22),
        getPreviousKnowledgeID: jest.fn(() => 111),
      }));

      const expected = procedure;
      const mockHttpclient = {} as any;
      const actual = await procedureToKnowledgeCategory(
        mockHttpclient,
        procedure,
        22
      );

      expect(actual).toEqual(expected);
    });
    it(" Marks kcategories AS deleted when missing kcategory file and knowledgeCategoryID", async () => {
      const knowledgeCategoryID = null;
      jest.doMock("../utils", () => ({
        mockDirectoryExists: jest.fn(() => false),
      }));

      const procedureKnowledgeCategoryNOKCID = {
        ...procedureKnowledgeCategory,
        knowledgeCategoryID,
        path: "getting-started_and-admin/soc2-repzzzorting/soc2-with-jupiterone-copy.md",
      };
      const mockHttpclient = {} as any;
      const actual = await procedureToKnowledgeCategory(
        mockHttpclient,
        procedureKnowledgeCategoryNOKCID,
        22
      );

      expect(actual.description).toEqual(KNOWN_CATEGORY_BEEN_DELETED);
    });

    it(" Marks kcategories for delete when kcategory file does not exist", async () => {
      const knowledgeCategoryID = 111;
      jest.doMock("../utils", () => ({
        mockDirectoryExists: jest.fn(() => false),
      }));
      const procedureKnowledgeCategoryNOKCID = {
        ...procedureKnowledgeCategory,
        knowledgeCategoryID,
        path: "getting-started_and-admin/soc2-repzzzorting/soc2-with-jupiterone-copy.md",
      };
      const mockHttpclient = {} as any;
      const actual = await procedureToKnowledgeCategory(
        mockHttpclient,
        procedureKnowledgeCategoryNOKCID,
        22
      );

      expect(actual.description).toEqual(FLAG_FOR_DELETE);
    });
    it("Creates", async () => {
      jest.doMock("../VanillaAPI", () => ({
        createKnowledgeCategory: jest.fn().mockResolvedValue({
          ...procedure,
          knowledgeCategoryID: 99,
        } as any),
      }));
      jest.doMock("../utils", () => ({
        hasKnowledgeCategoryBeenMoved: jest.fn(() => 22),
        directoryExists: jest.fn().mockResolvedValue(true),
      }));
      const knowledgeCategoryID = null;
      const procedure = createKnowledgeCategoryMock({ knowledgeCategoryID });

      const mockHttpclient = {} as any;
      const actual = await procedureToKnowledgeCategory(
        mockHttpclient,
        procedure,
        22
      );
      console.log(actual, "ACTUTUTUTUTU");
      expect(actual).toEqual(procedure);
    });

    it("Creates- Adds the knowledgeBase of Release-Notes for release-notes path", async () => {
      jest.doMock("../utils", () => ({
        directoryExists: jest.fn().mockReturnValue(true),
      }));
      jest.doMock("../VanillaAPI", () => ({
        createKnowledgeCategory: jest.fn().mockResolvedValue({
          ...procedure,
          knowledgeCategoryID: 99,
        } as any),
      }));
      jest.doMock("../utils", () => ({
        hasKnowledgeCategoryBeenMoved: jest.fn(() => "nameOfparent"),
        directoryExists: jest.fn().mockResolvedValue(true),
      }));
      const knowledgeCategoryID = null;
      const procedure = createKnowledgeCategoryMock({
        knowledgeCategoryID,
        knowledgeBaseID: 2,
        path: "release-notes/article.md",
      });

      const mockHttpclient = {} as any;
      const actual = await procedureToKnowledgeCategory(
        mockHttpclient,
        procedure,
        22
      );

      expect(actual.knowledgeBaseID).toEqual(2);
    });
  });

  describe("deleteAllFlaggedCategories", () => {
    const mockDeleteAllFlaggedCategories =
      deleteAllFlaggedCategories as jest.MockedFunction<
        typeof deleteAllFlaggedCategories
      >;
    it("returns obj with procedures, categoriesDeleted", async () => {
      mockDeleteAllFlaggedCategories.mockResolvedValue(
        PROCEDURESKCategoriesDELETED
      );
      const expected = {
        procedures: PROCEDURESWithKCategoriesToDelete,
        categoriesDeleted: PROCEDURESKCategoriesDELETED,
      };
      const mockHttpclient = {
        delete: jest.fn().mockResolvedValue(PROCEDURESKCategoriesDELETED[0]),
      } as any;
      const actual = await removeDeletedCategories(
        mockHttpclient,
        PROCEDURESWithKCategoriesToDelete
      );
      expect(actual).toEqual(expected);
    });
    it("handles empty array", async () => {
      const noneToDelete: VanillaKnowledgeCategory[] = [];
      mockDeleteAllFlaggedCategories.mockResolvedValue(noneToDelete);
      const expected = {
        procedures: [],
        categoriesDeleted: noneToDelete,
      };
      const mockHttpclient = {
        delete: jest.fn().mockResolvedValue(noneToDelete),
      } as any;
      const actual = await removeDeletedCategories(
        mockHttpclient,
        noneToDelete
      );
      expect(actual).toEqual(expected);
      expect(noneToDelete).toEqual(actual.procedures);
    });
  });
});
