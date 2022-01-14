import { PATH_OF_DIRECTORY_TO_WATCH } from "../utils/constants";
import { ProcedureTypeEnum, VanillaArticle } from "../utils/types";
import {
  createArticleChange,
  diffToProcedures,
  handleNestedKnowledgeCategoryChanges,
} from "./index";
import {
  expectedSortedChanges,
  expectHandleNestedKnowledgeCategoryChanges,
} from "./mocks";
import { filterDiffs } from "./utils";
jest.mock("../VanillaAPI");

describe("diffToProceedures", () => {
  let exampleDiffs = [
    "getting-started_and-admin/compliance-reporting/soc2-with-jupiterone-copy.md",
    "getting-started_and-admin/compliance-reporting/soc2-with-jupiterone.md",
    "getting-started_and-admin/jupiterOne-query-language_(J1QL)-copy.md",
    "getting-started_and-admin/jupiterOne-query-language_(J1QL).md",
  ];
  beforeEach(() => {
    exampleDiffs = [
      "getting-started_and-admin/compliance-reporting/soc2-with-jupiterone-copy.md",
      "getting-started_and-admin/compliance-reporting/soc2-with-jupiterone.md",
      "getting-started_and-admin/jupiterOne-query-language_(J1QL)-copy.md",
      "getting-started_and-admin/jupiterOne-query-language_(J1QL).md",
    ];
  });

  describe("createArticleChange", () => {
    it("handles index files", async () => {
      const actual = await createArticleChange(
        "index.md",
        "k-category/index.md"
      );
      const expected: VanillaArticle = {
        knowledgeCategoryID: null, //will need to create it and get it- for sub folders
        articleID: null,
        fileName: "index.md",
        name: "K Category",
        body: "FILE_DOES_NOT_EXIST",
        path: "k-category/index.md",
        format: "markdown",
        locale: "en",
        procedureType: ProcedureTypeEnum.Article,
      };
      expect(actual).toEqual(expected);
    });
    it("handles named files", async () => {
      const actual = await createArticleChange(
        "article-title.md",
        "k-category/article-title.md"
      );
      const expected: VanillaArticle = {
        knowledgeCategoryID: null, //will need to create it and get it- for sub folders
        articleID: null,
        fileName: "article-title.md",
        name: "Article Title",
        body: "FILE_DOES_NOT_EXIST",
        path: "k-category/article-title.md",
        format: "markdown",
        locale: "en",
        procedureType: ProcedureTypeEnum.Article,
      };
      expect(expected).toEqual(actual);
    });
  });

  describe("handleNestedKnowledgeCategoryChanges", () => {
    it("returns expected sequence of procedures", async () => {
      const expected = expectHandleNestedKnowledgeCategoryChanges;
      const diffs = [...exampleDiffs, "rock-and-roll/rocks.md"];
      const { completed } = await handleNestedKnowledgeCategoryChanges({
        nestedCategoryChanges: [...diffs], // need to create a new array for each
        originalChangesArray: [...diffs], // need to create a new array for each
        parentIndex: 0,
      });
      expect(expected).toEqual(completed);
    });
    it("returns upon input nestedCategoryChanges length == 0", async () => {
      const { completed } = await handleNestedKnowledgeCategoryChanges({
        nestedCategoryChanges: [], // need to create a new array for each
        originalChangesArray: [], // need to create a new array for each
        parentIndex: 0,
      });
      expect(completed).toEqual([]);
    });
  });

  describe("diffToProcedures", () => {
    it("takes in a list of diffs and returns procedures", async () => {
      exampleDiffs = [
        `${PATH_OF_DIRECTORY_TO_WATCH}/`,
        `${PATH_OF_DIRECTORY_TO_WATCH}/getting-started_and-admin/compliance-reporting/soc2-with-jupiterone-copy.md`,
        "",
        `${PATH_OF_DIRECTORY_TO_WATCH}/getting-started_and-admin/compliance-reporting/soc2-with-jupiterone.md`,
        `${PATH_OF_DIRECTORY_TO_WATCH}/getting-started_and-admin/compliance-reporting/soc2-with-jupiterone.png`,
        `${PATH_OF_DIRECTORY_TO_WATCH}/getting-started_and-admin/jupiterOne-query-language_(J1QL)-copy.md`,
        `${PATH_OF_DIRECTORY_TO_WATCH}/getting-started_and-admin/jupiterOne-query-language_(J1QL).md`,
      ];
      const actual = await diffToProcedures(exampleDiffs);
      const expected = expectedSortedChanges;

      expect(actual).toEqual(expected);
    });
  });
  describe("filterDiffs", () => {
    it("removes PATH_OF_DIRECTORY_TO_WATCH", () => {
      const expected = [
        "getting-started_and-admin/jupiterOne-query-language_(J1QL)-copy.md",
        "getting-started_and-admin/jupiterOne-query-language_(J1QL).md",
        "getting-started_and-admin/compliance-reporting/soc2-with-jupiterone-copy.md",
        "getting-started_and-admin/compliance-reporting/soc2-with-jupiterone.md",
      ];
      const startingArray = [
        `${PATH_OF_DIRECTORY_TO_WATCH}/getting-started_and-admin/compliance-reporting/soc2-with-jupiterone-copy.md`,
        `${PATH_OF_DIRECTORY_TO_WATCH}/getting-started_and-admin/compliance-reporting/soc2-with-jupiterone.md`,
        `${PATH_OF_DIRECTORY_TO_WATCH}/getting-started_and-admin/jupiterOne-query-language_(J1QL)-copy.md`,
        `${PATH_OF_DIRECTORY_TO_WATCH}/getting-started_and-admin/jupiterOne-query-language_(J1QL).md`,
      ];
      const actual = filterDiffs(startingArray);
      expect(actual).toEqual(expected);
    });
  });
});
