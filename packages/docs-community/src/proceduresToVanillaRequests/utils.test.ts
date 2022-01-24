import {
  createKnowledgeCategoryMock,
  ProcedureTypeEnum,
  VanillaArticle,
  VanillaKnowledgeCategory,
} from "../utils";
import {
  getPreviousKnowledgeID,
  hasKnowledgeCategoryBeenMoved,
  kCategoriesByPathSize,
} from "./utils";

describe("utils", () => {
  describe("hasKnowledgeCategoryBeenMoved", () => {
    it("should return knowledgeCategory name needed if its knowledgeCategory does not exist", () => {
      const notKCategoryPreviousParent = createKnowledgeCategoryMock({
        parentID: 1,
        knowledgeBaseID: 1,
        name: "APIs and Integrations",
        fileName: "APIs_and-integrations",
        description: "",
        knowledgeCategoryID: 512,
        path: "APIs_and-integrations",
        childrenPath: "APIs_and-integrations/atspoke/atspoke.md",
        procedureType: ProcedureTypeEnum.Category,
        sortChildren: null,
        sort: 0,
        insertUserID: 12,
        dateInserted: "2021-12-30T23:31:35+00:00",
        updateUserID: 12,
        dateUpdated: "2022-01-19T19:25:56+00:00",
        lastUpdatedArticleID: null,
        lastUpdatedUserID: null,
        articleCount: 71,
        articleCountRecursive: 83,
        childCategoryCount: 4,
        url: "https://jupiterone.vanillastaging.com/kb/categories/512-apis-and-integrations",
        foreignID: null,
      });
      const categoryProcedureWasNotMovedTo = createKnowledgeCategoryMock({
        parentID: 512,
        knowledgeBaseID: 1,
        name: "Atspoke",
        fileName: "atspoke",
        description: "",
        knowledgeCategoryID: 1157,
        path: "APIs_and-integrations/atspoke",
        childrenPath: "APIs_and-integrations/atspoke/atspoke.md",
        procedureType: ProcedureTypeEnum.Category,
        sortChildren: null,
        sort: 3,
        insertUserID: 12,
        dateInserted: "2022-01-19T19:25:56+00:00",
        updateUserID: 12,
        dateUpdated: "2022-01-19T19:25:56+00:00",
        lastUpdatedArticleID: null,
        lastUpdatedUserID: null,
        articleCount: 0,
        articleCountRecursive: 0,
        childCategoryCount: 0,
        url: "https://jupiterone.vanillastaging.com/kb/categories/1157-atspoke",
        foreignID: null,
      });
      const categoryProcedureWasMovedTo = createKnowledgeCategoryMock({
        parentID: 512,
        knowledgeBaseID: 1,
        name: "APIs",
        fileName: "APIs",
        description: "",
        knowledgeCategoryID: 1199,
        path: "APIs_and-integrations/APIs/atspoke",
        childrenPath: "APIs_and-integrations/APIs/atspoke/atspoke.md",
        procedureType: ProcedureTypeEnum.Category,
        sortChildren: null,
        sort: 3,
        insertUserID: 12,
        dateInserted: "2022-01-19T19:25:56+00:00",
        updateUserID: 12,
        dateUpdated: "2022-01-19T19:25:56+00:00",
        lastUpdatedArticleID: null,
        lastUpdatedUserID: null,
        articleCount: 0,
        articleCountRecursive: 0,
        childCategoryCount: 0,
        url: "https://jupiterone.vanillastaging.com/kb/categories/1157-atspoke",
        foreignID: null,
      });
      const randomOtherKnowledgeCategory = createKnowledgeCategoryMock({});
      const proceduresWithVanillaInfo: (
        | VanillaKnowledgeCategory
        | VanillaArticle
      )[] = [
        categoryProcedureWasNotMovedTo,
        randomOtherKnowledgeCategory,
        categoryProcedureWasMovedTo,
        notKCategoryPreviousParent,
      ];
      const testProcedure: VanillaKnowledgeCategory =
        createKnowledgeCategoryMock({
          parentID: 512,
          knowledgeBaseID: 1,
          name: "Airwatch",
          fileName: "airwatch",
          description: "",
          knowledgeCategoryID: 1157,
          path: "APIs_and-integrations/Other/airwatch",
          childrenPath: "APIs_and-integrations/airwatch/airwatch.md",
          procedureType: ProcedureTypeEnum.Category,
          sortChildren: null,
          sort: 3,
          insertUserID: 12,
          dateInserted: "2022-01-19T19:25:56+00:00",
          updateUserID: 12,
          dateUpdated: "2022-01-19T19:25:56+00:00",
          lastUpdatedArticleID: null,
          lastUpdatedUserID: null,
          articleCount: 0,
          articleCountRecursive: 0,
          childCategoryCount: 0,
          url: "https://jupiterone.vanillastaging.com/kb/categories/1157-airwatch",
          foreignID: null,
        });

      const actual = hasKnowledgeCategoryBeenMoved({
        proceduresWithVanillaInfo,
        procedure: testProcedure,
      });
      expect(actual).toEqual("Other");
    });
    it("should return new parentID if knowledgeCategory has moved", () => {
      const notKCategoryPreviousParent = createKnowledgeCategoryMock({
        parentID: 1,
        knowledgeBaseID: 1,
        name: "APIs and Integrations",
        fileName: "APIs_and-integrations",
        description: "",
        knowledgeCategoryID: 512,
        path: "APIs_and-integrations",
        childrenPath: "APIs_and-integrations/atspoke/atspoke.md",
        procedureType: ProcedureTypeEnum.Category,
        sortChildren: null,
        sort: 0,
        insertUserID: 12,
        dateInserted: "2021-12-30T23:31:35+00:00",
        updateUserID: 12,
        dateUpdated: "2022-01-19T19:25:56+00:00",
        lastUpdatedArticleID: null,
        lastUpdatedUserID: null,
        articleCount: 71,
        articleCountRecursive: 83,
        childCategoryCount: 4,
        url: "https://jupiterone.vanillastaging.com/kb/categories/512-apis-and-integrations",
        foreignID: null,
      });
      const categoryProcedureWasNotMovedTo = createKnowledgeCategoryMock({
        parentID: 512,
        knowledgeBaseID: 1,
        name: "Atspoke",
        fileName: "atspoke",
        description: "",
        knowledgeCategoryID: 1157,
        path: "APIs_and-integrations/atspoke",
        childrenPath: "APIs_and-integrations/atspoke/atspoke.md",
        procedureType: ProcedureTypeEnum.Category,
        sortChildren: null,
        sort: 3,
        insertUserID: 12,
        dateInserted: "2022-01-19T19:25:56+00:00",
        updateUserID: 12,
        dateUpdated: "2022-01-19T19:25:56+00:00",
        lastUpdatedArticleID: null,
        lastUpdatedUserID: null,
        articleCount: 0,
        articleCountRecursive: 0,
        childCategoryCount: 0,
        url: "https://jupiterone.vanillastaging.com/kb/categories/1157-atspoke",
        foreignID: null,
      });
      const categoryProcedureWasMovedTo = createKnowledgeCategoryMock({
        parentID: 512,
        knowledgeBaseID: 1,
        name: "APIs",
        fileName: "APIs",
        description: "",
        knowledgeCategoryID: 1199,
        path: "APIs_and-integrations/APIs/atspoke",
        childrenPath: "APIs_and-integrations/APIs/atspoke/atspoke.md",
        procedureType: ProcedureTypeEnum.Category,
        sortChildren: null,
        sort: 3,
        insertUserID: 12,
        dateInserted: "2022-01-19T19:25:56+00:00",
        updateUserID: 12,
        dateUpdated: "2022-01-19T19:25:56+00:00",
        lastUpdatedArticleID: null,
        lastUpdatedUserID: null,
        articleCount: 0,
        articleCountRecursive: 0,
        childCategoryCount: 0,
        url: "https://jupiterone.vanillastaging.com/kb/categories/1157-atspoke",
        foreignID: null,
      });
      const randomOtherKnowledgeCategory = createKnowledgeCategoryMock({});
      const proceduresWithVanillaInfo: (
        | VanillaKnowledgeCategory
        | VanillaArticle
      )[] = [
        categoryProcedureWasNotMovedTo,
        randomOtherKnowledgeCategory,
        categoryProcedureWasMovedTo,
        notKCategoryPreviousParent,
      ];
      const testProcedure: VanillaKnowledgeCategory =
        createKnowledgeCategoryMock({
          parentID: 512,
          knowledgeBaseID: 1,
          name: "Airwatch",
          fileName: "airwatch",
          description: "",
          knowledgeCategoryID: 1157,
          path: "APIs_and-integrations/APIs/airwatch",
          childrenPath: "APIs_and-integrations/airwatch/airwatch.md",
          procedureType: ProcedureTypeEnum.Category,
          sortChildren: null,
          sort: 3,
          insertUserID: 12,
          dateInserted: "2022-01-19T19:25:56+00:00",
          updateUserID: 12,
          dateUpdated: "2022-01-19T19:25:56+00:00",
          lastUpdatedArticleID: null,
          lastUpdatedUserID: null,
          articleCount: 0,
          articleCountRecursive: 0,
          childCategoryCount: 0,
          url: "https://jupiterone.vanillastaging.com/kb/categories/1157-airwatch",
          foreignID: null,
        });

      const actual = hasKnowledgeCategoryBeenMoved({
        proceduresWithVanillaInfo,
        procedure: testProcedure,
      });
      expect(actual).toEqual(1199);
    });
    it("should return false if knowledgeCategory has NOT moved", () => {
      const notKCategoryPreviousParent = createKnowledgeCategoryMock({
        parentID: 1,
        knowledgeBaseID: 1,
        name: "APIs and Integrations",
        fileName: "APIs_and-integrations",
        description: "",
        knowledgeCategoryID: 512,
        path: "APIs_and-integrations",
        childrenPath: "APIs_and-integrations/atspoke/airwatch/airwatch.md",
        procedureType: ProcedureTypeEnum.Category,
        sortChildren: null,
        sort: 0,
        insertUserID: 12,
        dateInserted: "2021-12-30T23:31:35+00:00",
        updateUserID: 12,
        dateUpdated: "2022-01-19T19:25:56+00:00",
        lastUpdatedArticleID: null,
        lastUpdatedUserID: null,
        articleCount: 71,
        articleCountRecursive: 83,
        childCategoryCount: 4,
        url: "https://jupiterone.vanillastaging.com/kb/categories/512-apis-and-integrations",
        foreignID: null,
      });
      const sameName = createKnowledgeCategoryMock({
        parentID: 512,
        knowledgeBaseID: 1,
        name: "Airwatch",
        fileName: "airwatch",
        description: "",
        knowledgeCategoryID: 1157,
        path: "APIs_and-integrations/atspoke",
        childrenPath: "APIs_and-integrations/atspoke/airwatch/airwatch.md",
        procedureType: ProcedureTypeEnum.Category,
        sortChildren: null,
        sort: 3,
        insertUserID: 12,
        dateInserted: "2022-01-19T19:25:56+00:00",
        updateUserID: 12,
        dateUpdated: "2022-01-19T19:25:56+00:00",
        lastUpdatedArticleID: null,
        lastUpdatedUserID: null,
        articleCount: 0,
        articleCountRecursive: 0,
        childCategoryCount: 0,
        url: "https://jupiterone.vanillastaging.com/kb/categories/1157-airwatch",
        foreignID: null,
      });
      const categoryProcedureWasMovedTo = createKnowledgeCategoryMock({
        parentID: 512,
        knowledgeBaseID: 1,
        name: "Atspoke",
        fileName: "atspoke",
        description: "",
        knowledgeCategoryID: 1157,
        path: "APIs_and-integrations/atspoke",
        childrenPath: "APIs_and-integrations/atspoke/airwatch/airwatch.md",
        procedureType: ProcedureTypeEnum.Category,
        sortChildren: null,
        sort: 3,
        insertUserID: 12,
        dateInserted: "2022-01-19T19:25:56+00:00",
        updateUserID: 12,
        dateUpdated: "2022-01-19T19:25:56+00:00",
        lastUpdatedArticleID: null,
        lastUpdatedUserID: null,
        articleCount: 0,
        articleCountRecursive: 0,
        childCategoryCount: 0,
        url: "https://jupiterone.vanillastaging.com/kb/categories/1157-atspoke",
        foreignID: null,
      });
      const randomOtherKnowledgeCategory = createKnowledgeCategoryMock({});
      const proceduresWithVanillaInfo: (
        | VanillaKnowledgeCategory
        | VanillaArticle
      )[] = [
        categoryProcedureWasMovedTo,
        randomOtherKnowledgeCategory,
        notKCategoryPreviousParent,
        sameName,
      ];
      const testProcedure: VanillaKnowledgeCategory =
        createKnowledgeCategoryMock({
          parentID: 512,
          knowledgeBaseID: 1,
          name: "Airwatch",
          fileName: "airwatch",
          description: "",
          knowledgeCategoryID: 1157,
          path: "APIs_and-integrations/airwatch",
          childrenPath: "APIs_and-integrations/airwatch/airwatch.md",
          procedureType: ProcedureTypeEnum.Category,
          sortChildren: null,
          sort: 3,
          insertUserID: 12,
          dateInserted: "2022-01-19T19:25:56+00:00",
          updateUserID: 12,
          dateUpdated: "2022-01-19T19:25:56+00:00",
          lastUpdatedArticleID: null,
          lastUpdatedUserID: null,
          articleCount: 0,
          articleCountRecursive: 0,
          childCategoryCount: 0,
          url: "https://jupiterone.vanillastaging.com/kb/categories/1157-airwatch",
          foreignID: null,
        });

      const actual = hasKnowledgeCategoryBeenMoved({
        proceduresWithVanillaInfo,
        procedure: testProcedure,
      });
      expect(actual).toEqual(512);
    });
  });
  describe("kCategoriesByPathSize", () => {
    it("returns knowledgeCategories by lenght of path -longest first", async () => {
      const mockKCategories = [
        { path: "one/two/three/four" },
        { path: "one/two/three" },
        { path: "one/two" },
        { path: "one/two/three" },
        { path: "one" },
        { path: "one/two/three/four" },
      ] as any;
      const actual = kCategoriesByPathSize(mockKCategories);
      const expected = [
        { path: "one/two/three/four" },
        { path: "one/two/three/four" },
        { path: "one/two/three" },
        { path: "one/two/three" },
        { path: "one/two" },
        { path: "one" },
      ] as any;

      expect(actual).toEqual(expected);
    });

    it("returns input when no length", async () => {
      const mockKCategories = [] as any;
      const actual = kCategoriesByPathSize(mockKCategories);
      const expected = [] as any;

      expect(actual).toEqual(expected);
    });
  });

  describe("getPreviousKnowledgeID", () => {
    const vanillaKnowledgeCategory = {} as VanillaKnowledgeCategory;
    const vanillaArticleWithInfo = {} as VanillaArticle;
    const knowledgeCategoryID = 827;
    const highestParentCategory = {
      parentID: 1,
      knowledgeBaseID: 1,
      name: "After started Admin",
      fileName: "after-started-admin",
      description: "",
      knowledgeCategoryID: knowledgeCategoryID,
      path: "after-started-admin",
      childrenPath: "after-started-admin/rock/rolls.md",
      procedureType: "Category",
      sortChildren: null,
      sort: 0,
      url: "",
      foreignID: null,
    } as VanillaKnowledgeCategory;
    const redHerring = {
      parentID: knowledgeCategoryID,
      knowledgeBaseID: 1,
      name: "Red",
      fileName: "red",
      description: "",
      knowledgeCategoryID: 828,
      path: "after-started-admin/red",
      childrenPath: "after-started-admin/red/herring.md",
      procedureType: "Category",
      sortChildren: null,
      sort: 0,
      url: "",
      foreignID: null,
    } as VanillaKnowledgeCategory;
    const herringArticle = {
      articleID: 22,
      body: "Im a fish",
      fileName: "herring.md",
      format: "markdown",
      knowledgeCategoryID: 828,
      locale: "en",
      name: "Herring",
      path: "after-started-admin/red/herring.md",
      procedureType: "Article",
    } as VanillaArticle;
    const blueHerring = {
      parentID: knowledgeCategoryID,
      knowledgeBaseID: 1,
      name: "Blue",
      fileName: "blue",
      description: "",
      knowledgeCategoryID: 829,
      path: "after-started-admin/blue",
      childrenPath: "after-started-admin/blue/b-herring.md",
      procedureType: "Category",
      sortChildren: null,
      sort: 0,
      url: "",
      foreignID: null,
    } as VanillaKnowledgeCategory;

    const categoryThatWeSeekToFindKnowledgeCategoryFor = {
      parentID: null,
      knowledgeBaseID: 1,
      name: "Rocks",
      fileName: "rocks",
      description: "",
      knowledgeCategoryID: null,
      path: "after-started-admin",
      childrenPath: "after-started-admin/rock/rolls.md",
      procedureType: "Category",
      sortChildren: null,
      sort: 0,
      url: "",
      foreignID: null,
    } as VanillaKnowledgeCategory;
    it("returns null when there is no previous knowledge category", () => {
      const expected = null;
      const childVanillaKnowledgeCategory = {} as VanillaKnowledgeCategory;
      const actualWithEmptyArray = getPreviousKnowledgeID(
        [],
        vanillaKnowledgeCategory,
        []
      );
      const actualWithNoCategories = getPreviousKnowledgeID(
        [vanillaArticleWithInfo, vanillaArticleWithInfo],
        childVanillaKnowledgeCategory,
        []
      );
      expect(actualWithEmptyArray).toEqual(expected);
      expect(actualWithNoCategories).toEqual(expected);
    });
    it("returns knowledgeCategoryID of nearest Category (parent existed before)", () => {
      const expected = knowledgeCategoryID;
      const actual = getPreviousKnowledgeID(
        [highestParentCategory, redHerring, herringArticle, blueHerring],
        categoryThatWeSeekToFindKnowledgeCategoryFor,
        [
          highestParentCategory,
          redHerring,
          blueHerring,
          vanillaKnowledgeCategory,
        ]
      );

      expect(actual).toEqual(expected);
    });
    it("returns knowledgeCategoryID of nearest Category (parent was created)", () => {
      const expected = knowledgeCategoryID;
      const actual = getPreviousKnowledgeID(
        [highestParentCategory, redHerring, herringArticle, blueHerring],
        categoryThatWeSeekToFindKnowledgeCategoryFor,
        []
      );

      expect(actual).toEqual(expected);
    });
    it("new parent category gets null as knowledgeCategoryID", () => {
      const anotherParentCategory = {
        parentID: 1,
        knowledgeBaseID: 1,
        name: "Getting Started Admin",
        fileName: "getting-started_and-admin",
        description: "",
        knowledgeCategoryID: 49,
        path: "getting-started_and-admin",
        childrenPath:
          "getting-started_and-admin/jupiterOne-query-language_(J1QL)-copy.md",
        procedureType: "Category",
        sortChildren: null,
        sort: 0,
        url: "",
        foreignID: null,
      } as VanillaKnowledgeCategory;
      const tester = {
        parentID: 1,
        knowledgeBaseID: 1,
        name: "After started Admin",
        fileName: "after-started-admin",
        description: "",
        knowledgeCategoryID: null,
        path: "after-started-admin",
        childrenPath: "after-started-admin/rock/rolls.md",
        procedureType: "Category",
        sortChildren: null,
        sort: 0,
        url: "",
        foreignID: null,
      } as VanillaKnowledgeCategory;
      const cousinNotParent = {
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

      const returnedId = getPreviousKnowledgeID(
        [anotherParentCategory, cousinNotParent],
        tester,
        [anotherParentCategory, cousinNotParent]
      );

      expect(returnedId).toEqual(null);
    });
    it("no matching categories in completed procedures", () => {
      const testerParent = {
        parentID: 1,
        knowledgeBaseID: 1,
        name: "After Started Admin",
        fileName: "after-started-admin",
        description: "",
        knowledgeCategoryID: 12,
        path: "after-started-admin",
        childrenPath: "after-started-admin/rock/rolls.md",
        procedureType: "Category",
        sortChildren: null,
        sort: 0,
        url: "",
        foreignID: null,
      } as VanillaKnowledgeCategory;
      const otherRootCategory = {
        parentID: 1,
        knowledgeBaseID: 1,
        name: "Getting Started Admin",
        fileName: "getting-started_and-admin",
        description: "",
        knowledgeCategoryID: 49,
        path: "getting-started_and-admin",
        childrenPath:
          "getting-started_and-admin/jupiterOne-query-language_(J1QL)-copy.md",
        procedureType: "Category",
        sortChildren: null,
        sort: 0,
        url: "",
        foreignID: null,
      } as VanillaKnowledgeCategory;
      const tester = {
        parentID: 1,
        knowledgeBaseID: 1,
        name: "Rock",
        fileName: "rock",
        description: "",
        knowledgeCategoryID: null,
        path: "after-started-admin/rock",
        childrenPath: "after-started-admin/rock/rolls.md",
        procedureType: "Category",
        sortChildren: null,
        sort: 0,
        url: "",
        foreignID: null,
      } as VanillaKnowledgeCategory;
      const cousinNotParent = {
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

      const returnedId = getPreviousKnowledgeID(
        [testerParent, otherRootCategory, cousinNotParent],
        tester,
        [cousinNotParent]
      );

      expect(returnedId).toEqual(12);
    });
  });
});
