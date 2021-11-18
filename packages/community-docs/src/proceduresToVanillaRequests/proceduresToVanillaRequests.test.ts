import { FLAG_FOR_DELETE, VanillaArticle } from "../utils";
import {
  createArticle,
  createKnowledgeCategory,
  deleteArticle,
  deleteKnowledgeCategory,
  editArticle,
  editKnowledgeCategory,
} from "../VanillaAPI";
import {
  addImagesToArticleMarkdown,
  addVanillaArticleInfoToProcedure,
  addVanillaArticlesToProcedures,
  addVanillaCategoryToProcedure,
  getPreviousKnowledgeID,
  procedureToArticle,
  procedureToKnowledgeCategory,
  useProceduresForVanillaRequests,
} from "./";
import {
  expectedDeleteANDCreatesPROCEDURES,
  matchingProcedureKnowledgeCategory,
  matchingVanillaKnowledgeArticle,
  procedureArticle,
  procedureKnowledgeCategory,
  PROCEDURES,
  proceduresMock,
  PROCEDURESWithOneDeleteArticleAndCreates,
  SHAPEWEWANT,
  vanillaArticleWithInfo,
  vanillaKnowledgeArticle,
  vanillaKnowledgeCategory,
} from "./mocks";
import { markdownToString } from "./utils";
jest.mock("../VanillaAPI");
jest.mock("./utils");

describe("ProceduresToVanillaRequests", () => {
  let mockCreateKnowledgeCategory =
    createKnowledgeCategory as jest.MockedFunction<
      typeof createKnowledgeCategory
    >;
  let mockMarkdownToString = markdownToString as jest.MockedFunction<
    typeof markdownToString
  >;
  let mockEditKnowledgeCategory = editKnowledgeCategory as jest.MockedFunction<
    typeof editKnowledgeCategory
  >;
  let mockDeleteKnowledgeCategory =
    deleteKnowledgeCategory as jest.MockedFunction<
      typeof deleteKnowledgeCategory
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
    mockMarkdownToString = markdownToString as jest.MockedFunction<
      typeof markdownToString
    >;
    mockDeleteKnowledgeCategory =
      deleteKnowledgeCategory as jest.MockedFunction<
        typeof deleteKnowledgeCategory
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
    it("returns addition of knowledge return to the procedure", () => {
      const expected = {
        childrenPath: "compliance-reporting",
        description: "",
        fileName: "compliance-reporting",
        foreignID: undefined,
        knowledgeBaseID: 1,
        knowledgeCategoryID: 23,
        name: "Compliance Reporting",
        parentID: 8,
        path: "getting-started-admin/compliance-reporting/soc2-with-jupiterone-copy.md",
        procedureType: "Category",
        sort: undefined,
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
        path: "getting-started-admin/compliance-reporting/soc2-with-jupiterone-copy.md",
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
          childrenPath: "getting-started-admin",
          description: "",
          fileName: "getting-started-admin",
          knowledgeBaseID: 1,
          knowledgeCategoryID: null,
          name: "Getting Started Admin",
          parentID: null,
          path: "getting-started-admin/jupiterone-query-language-copy.md",
          procedureType: "Category",
        },
        {
          articleID: null,
          body: "",
          fileName: "jupiterone-query-language-copy.md",
          format: "markdown",
          knowledgeCategoryID: null,
          locale: "en",
          name: "Jupiterone Query Language Copy",
          path: "getting-started-admin/jupiterone-query-language-copy.md",
          procedureType: "Article",
        },
        {
          articleID: null,
          body: "",
          fileName: "jupiterone-query-language.md",
          format: "markdown",
          knowledgeCategoryID: null,
          locale: "en",
          name: "Jupiterone Query Language",
          path: "getting-started-admin/jupiterone-query-language.md",
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
          path: "getting-started-admin/compliance-reporting/soc2-with-jupiterone-copy.md",
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
          path: "getting-started-admin/compliance-reporting/soc2-with-jupiterone-copy.md",
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
          path: "getting-started-admin/compliance-reporting/soc2-with-jupiterone.md",
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
          null,
          "fackeBody"
        );
        expect(actual).toEqual({
          articleID: null,
          body: "fackeBody",
          fileName: "soc2-with-jupiterone-copy.md",
          format: "markdown",
          knowledgeCategoryID: null,
          locale: "en",
          name: "Soc2 With Jupiterone Copy",
          path: "getting-started-admin/compliance-reporting/soc2-with-jupiterone-copy.md",
          procedureType: "Article",
        });
        expect(mockCreateArticle).toHaveBeenCalledTimes(0);
      });
      it("creates new Article and adds vanilla info to procedure", async () => {
        const procedureWithNoArticle = procedureArticletemp;
        const previousknowledgeCategoryID = 26;
        const articleID = 26;
        mockCreateArticle.mockReset();
        mockCreateArticle.mockResolvedValue({
          articleID,
          name: "Soc2 With Jupiterone Copy",
          knowledgeCategoryID: previousknowledgeCategoryID,
        } as any);
        const mockHttpclient = {} as any;
        const actual = await procedureToArticle(
          mockHttpclient,
          procedureWithNoArticle,
          previousknowledgeCategoryID,
          "fackeBody"
        );

        expect(actual).toEqual({
          articleID,
          body: "fackeBody",
          fileName: "soc2-with-jupiterone-copy.md",
          format: "markdown",
          knowledgeCategoryID: previousknowledgeCategoryID,
          locale: "en",
          name: "Soc2 With Jupiterone Copy",
          path: "getting-started-admin/compliance-reporting/soc2-with-jupiterone-copy.md",
          procedureType: "Article",
        });
        expect(mockCreateArticle).toHaveBeenCalledWith(mockHttpclient, {
          body: "fackeBody",
          format: "markdown",
          knowledgeCategoryID: articleID,
          locale: "en",
          name: "Soc2 With Jupiterone Copy",
          sort: 0,
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
        const mockHttpclient = {} as any;
        mockEditArticle.mockResolvedValue({
          articleID,
          name: "Soc2 With Jupiterone Copy",

          knowledgeCategoryID: previousknowledgeCategoryID,
        } as any);
        const actual = await procedureToArticle(
          mockHttpclient,
          procedureWithArticle,
          previousknowledgeCategoryID,
          "fackeBody"
        );
        expect(actual).toEqual({
          knowledgeCategoryID: previousknowledgeCategoryID,
          articleID,
          fileName: "soc2-with-jupiterone-copy.md",
          name: "Soc2 With Jupiterone Copy",
          body: "fackeBody",
          path: "getting-started-admin/compliance-reporting/soc2-with-jupiterone-copy.md",
          format: "markdown",
          locale: "en",
          procedureType: "Article",
        });
        expect(mockEditArticle).toHaveBeenCalledWith(
          mockHttpclient,
          articleID,
          {
            body: "fackeBody",
            format: "markdown",
            knowledgeCategoryID: previousknowledgeCategoryID,
            locale: "en",
            name: "Soc2 With Jupiterone Copy",
            sort: 0,
          }
        );
      });
    });
    describe("Deleting existing vanilla article", () => {
      beforeEach(() => {
        mockDeleteArticle.mockReset();
      });
      it("deletes existing article when body empty", async () => {
        mockDeleteArticle.mockResolvedValue({} as any);
        const articleID = 234;
        const previousknowledgeCategoryID = 8;
        const mockHttpclient = {} as any;
        const procedureWithArticle = {
          ...procedureArticletemp,
          articleID,
          knowledgeCategoryID: previousknowledgeCategoryID,
        };
        const actual = await procedureToArticle(
          mockHttpclient,
          procedureWithArticle,
          previousknowledgeCategoryID,
          FLAG_FOR_DELETE
        );
        expect(actual).toEqual({
          articleID: 234,
          body: "FILE_DOES_NOT_EXIST",
          fileName: "soc2-with-jupiterone-copy.md",
          format: "markdown",
          knowledgeCategoryID: 8,
          locale: "en",
          name: "Soc2 With Jupiterone Copy",
          path: "getting-started-admin/compliance-reporting/soc2-with-jupiterone-copy.md",
          procedureType: "Article",
        });
      });
    });
  });
  describe("procedureToKnowledgeCategory", () => {
    beforeEach(() => {
      mockCreateKnowledgeCategory.mockReset();
    });
    it("Creates", async () => {
      const procedureKnowledgeCategoryNOKCID = {
        ...procedureKnowledgeCategorytemp,
      };
      const knowledgeCategoryID = 111;
      mockCreateKnowledgeCategory.mockResolvedValue({
        ...procedureKnowledgeCategoryNOKCID,
        knowledgeCategoryID,
      });
      const expected = {
        childrenPath: "soc2-reporting",
        description: "",
        fileName: "soc2-reporting",
        foreignID: undefined,
        knowledgeBaseID: 1,
        knowledgeCategoryID,
        name: "Soc2 Reporting",
        parentID: null,
        path: "getting-started-admin/soc2-reporting/soc2-with-jupiterone-copy.md",
        procedureType: "Category",
        sort: undefined,
        sortChildren: undefined,
        url: undefined,
      };
      const mockHttpclient = {} as any;
      const actual = await procedureToKnowledgeCategory(
        mockHttpclient,
        procedureKnowledgeCategoryNOKCID,
        22
      );
      expect(mockCreateKnowledgeCategory).toHaveBeenLastCalledWith(
        mockHttpclient,
        {
          name: "Soc2 Reporting",
          parentID: 22,
        }
      );
      expect(actual).toEqual(expected);
    });
    describe("Edits", () => {
      beforeEach(() => {
        mockEditKnowledgeCategory.mockReset();
      });
      it("edits when file exists", async () => {
        const knowledgeCategoryID = 111;
        const procedureKnowledgeCategoryNOKCID = {
          ...procedureKnowledgeCategorytemp,
          knowledgeCategoryID,
        };

        mockEditKnowledgeCategory.mockResolvedValue({
          ...procedureKnowledgeCategoryNOKCID,
          knowledgeCategoryID,
        });
        const expected = {
          childrenPath: "soc2-reporting",
          description: "",
          fileName: "soc2-reporting",
          foreignID: undefined,
          knowledgeBaseID: 1,
          knowledgeCategoryID,
          name: "Soc2 Reporting",
          parentID: null,
          path: "getting-started-admin/soc2-reporting/soc2-with-jupiterone-copy.md",
          procedureType: "Category",
          sort: undefined,
          sortChildren: undefined,
          url: undefined,
        };
        const mockHttpclient = {} as any;
        const actual = await procedureToKnowledgeCategory(
          mockHttpclient,
          procedureKnowledgeCategoryNOKCID,
          22,
          true
        );
        expect(mockEditKnowledgeCategory).toHaveBeenLastCalledWith(
          mockHttpclient,
          knowledgeCategoryID,
          {
            name: "Soc2 Reporting",
            parentID: 22,
          }
        );
        expect(actual).toEqual(expected);
      });
    });
    describe("Deletes", () => {
      it("deletes when file does not exist", async () => {
        const knowledgeCategoryID = 111;
        const procedureKnowledgeCategoryNOKCID = {
          ...procedureKnowledgeCategorytemp,
          knowledgeCategoryID,
          path: "getting-started-admin/soc2-repzzzorting/soc2-with-jupiterone-copy.md",
        };

        mockDeleteKnowledgeCategory.mockResolvedValue(true);

        const mockHttpclient = {} as any;
        const actual = await procedureToKnowledgeCategory(
          mockHttpclient,
          procedureKnowledgeCategoryNOKCID,
          22
        );
        expect(mockDeleteKnowledgeCategory).toHaveBeenLastCalledWith(
          mockHttpclient,
          knowledgeCategoryID
        );
        expect(actual.description).toEqual("deleted");
      });
    });
  });

  describe("getPreviousKnowledgeID", () => {
    it("returns null when there is no previous knowledge category", () => {
      const expected = null;
      const actualWithEmptyArray = getPreviousKnowledgeID([]);
      const actualWithNoCategories = getPreviousKnowledgeID([
        vanillaArticleWithInfo,
        vanillaArticleWithInfo,
      ]);
      expect(actualWithEmptyArray).toEqual(expected);
      expect(actualWithNoCategories).toEqual(expected);
    });
    it("returns knowledgeCategoryID of nearest Category", () => {
      const knowledgeCategoryID = 827;
      const targetForKnowledgeCategory = {
        ...vanillaKnowledgeCategory,
        knowledgeCategoryID,
      };
      const expected = knowledgeCategoryID;
      const actualWithEmptyArray = getPreviousKnowledgeID([
        vanillaKnowledgeCategory,
        vanillaArticleWithInfo,
        targetForKnowledgeCategory,
        vanillaArticleWithInfo,
      ]);

      expect(actualWithEmptyArray).toEqual(expected);
    });
  });

  describe("useProceduresForVanillaRequests", () => {
    beforeEach(() => {
      mockMarkdownToString.mockReset();
      mockCreateArticle.mockReset();
      mockCreateKnowledgeCategory.mockReset();
    });
    it("handles all new items", async () => {
      mockMarkdownToString.mockReturnValue("Im markdown. LOOK AT ME.");
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

      const actual = await useProceduresForVanillaRequests(PROCEDURES, []);

      expect(actual).toEqual(SHAPEWEWANT);
    });
    it("handles addition and removal of an articles", async () => {
      const editArticle =
        PROCEDURESWithOneDeleteArticleAndCreates[2] as VanillaArticle;
      const deleteArticle =
        PROCEDURESWithOneDeleteArticleAndCreates[1] as VanillaArticle;
      mockMarkdownToString
        .mockReturnValueOnce(FLAG_FOR_DELETE)
        .mockReturnValue("Im markdown. LOOK AT ME.");
      mockEditArticle.mockResolvedValue(editArticle);
      mockDeleteArticle.mockResolvedValue(deleteArticle);
      mockCreateArticle

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
      mockCreateKnowledgeCategory.mockResolvedValueOnce({
        ...vanillaKnowledgeCategory,
        parentID: 22,
        knowledgeBaseID: 1,
        name: "Compliance Reporting",

        knowledgeCategoryID: 33,
      });

      const actual = await useProceduresForVanillaRequests(
        PROCEDURESWithOneDeleteArticleAndCreates,
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
