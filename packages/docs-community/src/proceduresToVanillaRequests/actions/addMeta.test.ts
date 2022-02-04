import {
  ProcedureTypeEnum,
  VanillaArticle,
  VanillaKnowledgeCategory,
} from "../../utils";
import {
  addVanillaArticleInfoToProcedure,
  addVanillaArticlesToProcedures,
  addVanillaCategoryToProcedure,
} from "./addMeta";

describe("AddMeta", () => {
  describe("addVanillaArticleToProcedure", () => {
    const procedureArticle = {
      knowledgeCategoryID: null,
      articleID: null,
      fileName: "soc2-with-jupiterone-copy.md",
      name: "Soc2 With Jupiterone Copy",
      body: "",
      path: "getting-started_and-admin/compliance-reporting/soc2-with-jupiterone-copy.md",
      format: "markdown",
      locale: "en",
      procedureType: ProcedureTypeEnum.Article,
    } as VanillaArticle;

    const matchingVanillaKnowledgeArticle = {
      name: "Soc2 With Jupiterone Copy",
      knowledgeCategoryID: 22,
      articleID: 43, // used in path
    } as VanillaArticle;
    it("returns the procedure if no match from vanilla return", () => {
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
      const actual = addVanillaArticleInfoToProcedure(procedureArticle, [
        matchingVanillaKnowledgeArticle,
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
      const actual = addVanillaArticleInfoToProcedure(procedureArticle, [
        matchingVanillaKnowledgeArticle,
      ]);

      expect(actual).toEqual(expected);
    });
  });

  describe("addVanillaArticlesToProcedures", () => {
    const procedureArticles = [
      {
        knowledgeCategoryID: null,
        articleID: null,
        fileName: "soc2-with-jupiterone-copy.md",
        name: "Soc2 With Jupiterone Copy",
        body: "",
        path: "getting-started_and-admin/compliance-reporting/soc2-with-jupiterone-copy.md",
        format: "markdown",
        locale: "en",
        procedureType: ProcedureTypeEnum.Article,
      },
      {
        knowledgeCategoryID: null,
        articleID: null,
        fileName: "jupiterOne-query-language_(J1QL)-copy.md",
        locale: "en",
        name: "Jupiterone Query Language Copy",
        path: "getting-started_and-admin/jupiterOne-query-language_(J1QL)-copy.md",
        procedureType: "Article",
      },
    ] as VanillaArticle[];

    const matchingVanillaKnowledgeArticle = {
      name: "Soc2 With Jupiterone Copy",
      knowledgeCategoryID: 22,
      articleID: 43, // used in path
    } as VanillaArticle;
    it("matches article by name to procedure and maps article to procedure", () => {
      const expected = [
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
          fileName: "jupiterOne-query-language_(J1QL)-copy.md",
          knowledgeCategoryID: null,
          locale: "en",
          name: "Jupiterone Query Language Copy",
          path: "getting-started_and-admin/jupiterOne-query-language_(J1QL)-copy.md",
          procedureType: "Article",
        },
      ];
      const actual = addVanillaArticlesToProcedures(procedureArticles, [
        matchingVanillaKnowledgeArticle,
      ]);
      expect(actual).toEqual(expected);
    });
  });
  describe("addVanillaCategoryToProcedure", () => {
    const procedureKnowledgeCategory = {
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
    const vanillaKnowledgeCategory = {
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

    const matchingProcedureKnowledgeCategory = {
      parentID: null,
      knowledgeBaseID: 1,
      name: "Compliance Reporting",
      fileName: "compliance-reporting",
      description: "",
      knowledgeCategoryID: null,
      path: "getting-started_and-admin/compliance-reporting/soc2-with-jupiterone-copy.md",
      childrenPath: "compliance-reporting",
      procedureType: ProcedureTypeEnum.Category,
    };
    it("returns the procedure if no match from vanilla return", () => {
      const expected = procedureKnowledgeCategory;
      const actual = addVanillaCategoryToProcedure(procedureKnowledgeCategory, [
        vanillaKnowledgeCategory,
      ]);

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
        matchingProcedureKnowledgeCategory,
        [vanillaKnowledgeCategory]
      );

      expect(actual).toEqual(expected);
    });
  });
});
