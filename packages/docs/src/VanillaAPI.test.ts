import FormData from "form-data";
import { logger } from "./loggingUtil";
import {
  FLAG_FOR_DELETE,
  ProcedureTypeEnum,
  VanillaArticle,
  VanillaKnowledgeCategory,
} from "./utils";
import {
  createArticle,
  createKnowledgeCategory,
  deleteAllArticles,
  deleteAllFlaggedCategories,
  deleteArticle,
  deleteEmptyCategories,
  deleteKnowledgeCategory,
  editArticle,
  editKnowledgeCategory,
  getAllArticles,
  getArticles,
  getKnowedgeCategories,
  makeRequestsToChangeMarkdownReferences,
  postImage,
  uploadImageAndReturnUrl,
} from "./VanillaAPI";

describe("VanillaAPI", () => {
  const errorLog = jest.spyOn(logger, "error");

  describe("getKnowedgeCategories", () => {
    it("handles Errors", async () => {
      const getMock = jest.fn().mockRejectedValue({ error: "error" });
      const httpClient = {
        get: getMock,
      } as any;

      await getKnowedgeCategories(httpClient);
      expect(errorLog).toHaveBeenCalledTimes(1);
    });
  });

  describe("getArticles", () => {
    it("handles error", async () => {
      const getMock = jest.fn().mockRejectedValue({ error: "error" });
      const httpClient = {
        get: getMock,
      } as any;

      await getArticles(httpClient, 1);
      expect(errorLog).toHaveBeenCalledTimes(1);
    });
    it("handles success", async () => {
      const getMock = jest
        .fn()
        .mockResolvedValue({ data: [{ name: "article" }] });
      const httpClient = {
        get: getMock,
      } as any;
      const expected = [
        {
          name: "article",
          procedureType: "Article",
          referencesNeedingUpdatesInMarkdown: [],
        } as any,
      ] as VanillaArticle[];
      const actual = await getArticles(httpClient, 1);
      expect(actual).toEqual(expected);
    });
    it("handles null categoryId", async () => {
      const getMock = jest
        .fn()
        .mockResolvedValue({ data: [{ name: "article" }] });
      const httpClient = {
        get: getMock,
      } as any;
      const expected = [] as VanillaArticle[];
      const actual = await getArticles(httpClient, null);
      expect(actual).toEqual(expected);
    });
  });

  describe("getAllArticles", () => {
    const categories = [
      {
        knowledgeCategoryID: 22,
        path: "one/two/three.md",
      },
      {
        knowledgeCategoryID: 282,
        path: "one/two.md",
      },
    ] as VanillaKnowledgeCategory[];
    it("handles error", async () => {
      const getMock = jest.fn().mockRejectedValue({ error: "error" });
      const httpClient = {
        get: getMock,
      } as any;

      await getAllArticles(httpClient, categories);
      expect(errorLog).toHaveBeenCalledTimes(2);
    });
    it("handles success", async () => {
      const getMock = jest
        .fn()
        .mockResolvedValueOnce({ data: [{ name: "article" }] })
        .mockResolvedValueOnce({ data: [{ name: "articleTwo" }] });
      const httpClient = {
        get: getMock,
      } as any;
      const expected = [
        {
          name: "article",
          procedureType: "Article",
          referencesNeedingUpdatesInMarkdown: [],
        } as any,
        {
          name: "articleTwo",
          procedureType: "Article",
          referencesNeedingUpdatesInMarkdown: [],
        } as any,
      ] as VanillaArticle[];
      const actual = await getAllArticles(httpClient, categories);
      expect(getMock).toHaveBeenCalledTimes(2);
      expect(actual).toEqual(expected);
    });
  });

  describe("createKnowledgeCategory", () => {
    it("handles error", async () => {
      const postMock = jest.fn().mockRejectedValue({ error: "error" });
      const httpClient = {
        post: postMock,
      } as any;

      await createKnowledgeCategory(httpClient, {});
      expect(errorLog).toHaveBeenCalledTimes(1);
    });
    it("handles release notes success", async () => {
      const created = {
        name: "category",
        path: "release-notes",
        procedureType: ProcedureTypeEnum.Category,
      };
      const postMock = jest.fn().mockResolvedValue({ data: created });
      const httpClient = {
        post: postMock,
      } as any;

      const actual = await createKnowledgeCategory(httpClient, created);

      expect(actual).toEqual(created);
    });
    it("handles non release notes success", async () => {
      const created = {
        name: "category",
        path: "integrations",
        procedureType: ProcedureTypeEnum.Category,
      };
      const postMock = jest.fn().mockResolvedValue({ data: created });
      const httpClient = {
        post: postMock,
      } as any;

      const actual = await createKnowledgeCategory(httpClient, created);

      expect(actual).toEqual(created);
    });
  });

  describe("editKnowledgeCategory", () => {
    it("handles error", async () => {
      const patchMock = jest.fn().mockRejectedValue({ error: "error" });
      const httpClient = {
        patch: patchMock,
      } as any;

      await editKnowledgeCategory(httpClient, 1, {});
      expect(errorLog).toHaveBeenCalledTimes(1);
    });
    it("handles success", async () => {
      const created = {};
      const patchMock = jest.fn().mockResolvedValue({ data: created });
      const httpClient = {
        patch: patchMock,
      } as any;

      const actual = await editKnowledgeCategory(httpClient, 1, {});
      expect(actual).toEqual({
        ...created,
        procedureType: ProcedureTypeEnum.Category,
      });
    });
  });

  describe("deleteKnowledgeCategory", () => {
    it("handles error", async () => {
      const deleteMock = jest.fn().mockRejectedValue({ error: "error" });
      const httpClient = {
        delete: deleteMock,
      } as any;
      const category = {
        name: "category",
        path: "integrations",
        procedureType: ProcedureTypeEnum.Category,
      } as VanillaKnowledgeCategory;
      await deleteKnowledgeCategory(httpClient, category);
      expect(errorLog).toHaveBeenCalledTimes(1);
    });
    it("handles success", async () => {
      const deleted = { knowledgeCategoryID: 22 } as VanillaKnowledgeCategory;
      const deleteMock = jest.fn().mockResolvedValue(deleted);
      const httpClient = {
        delete: deleteMock,
      } as any;

      const actual = await deleteKnowledgeCategory(httpClient, deleted);
      expect(actual).toEqual({
        description: "been deleted",
        knowledgeCategoryID: 22,
      });
    });
  });
  describe("deleteEmptyCategories", () => {
    it("handles error", async () => {
      const category = {
        name: "category",
        path: "integrations",
        procedureType: ProcedureTypeEnum.Category,
      } as VanillaKnowledgeCategory;
      const deleteMock = jest.fn().mockRejectedValue({ error: "error" });
      const getMock = jest.fn().mockResolvedValue([category]);

      const httpClient = {
        delete: deleteMock,
        get: getMock,
      } as any;

      await deleteEmptyCategories(httpClient);
      expect(errorLog).toHaveBeenCalledTimes(1);
    });
  });

  describe("deleteAllFlaggedCategories", () => {
    const categories = [
      {
        knowledgeCategoryID: 22,
        description: FLAG_FOR_DELETE,
        path: "one/two/three.md",
      },
      {
        knowledgeCategoryID: 282,
        description: FLAG_FOR_DELETE,
        path: "one/two.md",
      },
    ] as VanillaKnowledgeCategory[];
    it("handles error", async () => {
      const deleteMock = jest.fn().mockRejectedValue({ error: "error" });
      const httpClient = {
        delete: deleteMock,
      } as any;

      await deleteAllFlaggedCategories(httpClient, categories);
      expect(errorLog).toHaveBeenCalledTimes(2);
    });
    it("handles success", async () => {
      const deleted = { knowledgeCategoryID: 22 } as VanillaKnowledgeCategory;
      const deleteMock = jest.fn().mockResolvedValue(deleted);
      const httpClient = {
        delete: deleteMock,
      } as any;

      const actual = await deleteAllFlaggedCategories(httpClient, categories);
      expect(actual).toEqual(
        categories.map((c) => ({
          ...c,
          description: "been deleted",
        }))
      );
    });
  });

  describe("createArticle", () => {
    it("handles error", async () => {
      const createArticleMock = jest.fn().mockRejectedValue({ error: "error" });
      const httpClient = {
        post: createArticleMock,
      } as any;

      await createArticle(httpClient, {});
      expect(errorLog).toHaveBeenCalledTimes(1);
    });
    it("handles success", async () => {
      const article = {} as VanillaArticle;
      const createArticleMock = jest.fn().mockResolvedValue({ data: article });
      const httpClient = {
        post: createArticleMock,
      } as any;

      const actual = await createArticle(httpClient, {});
      expect(actual).toEqual({
        ...article,
        procedureType: ProcedureTypeEnum.Article,
      });
    });
  });

  describe("deleteArticle", () => {
    it("handles error", async () => {
      const deleteArticleMock = jest.fn().mockRejectedValue({ error: "error" });
      const httpClient = {
        patch: deleteArticleMock,
      } as any;

      await deleteArticle(httpClient, 1);
      expect(errorLog).toHaveBeenCalledTimes(1);
    });

    it("handles success", async () => {
      const article = {};
      const deleteArticleMock = jest.fn().mockResolvedValue({ data: article });
      const httpClient = {
        patch: deleteArticleMock,
      } as any;

      const actual = await deleteArticle(httpClient, 22);
      expect(actual).toEqual({
        ...article,
        procedureType: ProcedureTypeEnum.Article,
      });
    });
  });

  describe("deleteAllArticles", () => {
    it("handles error", async () => {
      const deleteArticleMock = jest.fn().mockRejectedValue({ error: "error" });
      const httpClient = {
        patch: deleteArticleMock,
      } as any;
      const articles = [{ articleID: 8 }] as VanillaArticle[];

      await deleteAllArticles(httpClient, articles);
      expect(deleteArticleMock).toHaveBeenCalledTimes(1);
      expect(errorLog).toHaveBeenCalledTimes(1);
    });

    it("handles success", async () => {
      const deleteArticleMock = jest
        .fn()
        .mockResolvedValue({ name: "article" });
      const httpClient = {
        patch: deleteArticleMock,
      } as any;
      const articles = [{ articleID: 8 }] as VanillaArticle[];

      const actual = await deleteAllArticles(httpClient, articles);
      expect(deleteArticleMock).toHaveBeenCalledTimes(1);
      expect(actual).toEqual([{ procedureType: "Article" }]);
    });
  });

  describe("editArticle", () => {
    it("handles error", async () => {
      const editArticleMock = jest.fn().mockRejectedValue({ error: "error" });
      const httpClient = {
        patch: editArticleMock,
      } as any;

      await editArticle(httpClient, 2, {});
      expect(errorLog).toHaveBeenCalledTimes(1);
    });
    it("handles success", async () => {
      const article = {
        body: "",
      };

      jest.doMock("./linksAndMediaHandlers", () => ({
        getFullMarkdownReferencePathMatches: jest.fn().mockResolvedValue([]),
      }));

      const editArticleMock = jest.fn().mockResolvedValue({ data: article });
      const httpClient = {
        patch: editArticleMock,
      } as any;

      const actual = await editArticle(httpClient, 2, {});
      expect(actual).toEqual({ body: "", procedureType: "Article" });
    });
  });

  describe("postImage", () => {
    it("handles error", async () => {
      const postImageMock = jest.fn().mockRejectedValue({ error: "error" });
      const httpClient = {
        uploadMedia: postImageMock,
      } as any;
      const formData = new FormData() as any;
      await postImage(httpClient, formData);
      expect(errorLog).toHaveBeenCalledTimes(1);
    });
    it("handles success", async () => {
      const postImageMock = jest.fn().mockResolvedValue({ data: {} });
      const httpClient = {
        uploadMedia: postImageMock,
      } as any;
      const formData = new FormData() as any;
      const actual = await postImage(httpClient, formData);
      expect(actual).toEqual({});
    });
  });

  describe("uploadImageAndReturnUrl", () => {
    it("handles failure", async () => {
      const postImageMock = jest.fn().mockResolvedValue({ data: {} });

      await uploadImageAndReturnUrl("./path");
      expect(postImageMock).toHaveBeenCalledTimes(0);
      expect(errorLog).toHaveBeenCalledTimes(1);
    });
  });

  describe("makeRequestsToChangeMarkdownReferences", () => {
    const articles = [
      {
        name: "article",
        procedureType: "Article",
        referencesNeedingUpdatesInMarkdown: [],
        body: "body",
        articleID: 87,
      } as any,
      {
        name: "articleTwo",
        procedureType: "Article",
        referencesNeedingUpdatesInMarkdown: [],
        body: "body",
        articleID: 88,
      } as any,
    ] as VanillaArticle[];
    it("handles success", async () => {
      const patchMock = jest.fn().mockResolvedValue({ data: {} });
      const httpClient = {
        patch: patchMock,
      } as any;

      const actual = await makeRequestsToChangeMarkdownReferences(
        articles,
        httpClient
      );
      expect(patchMock).toHaveBeenCalledTimes(2);
      expect(actual).toEqual(articles);
    });
    it("handles failure", async () => {
      const patchMock = jest
        .fn()
        .mockResolvedValue({ data: {} })
        .mockRejectedValue({ error: "secondfailed" });
      const httpClient = {
        patch: patchMock,
      } as any;

      const actual = await makeRequestsToChangeMarkdownReferences(
        articles,
        httpClient
      );
      expect(patchMock).toHaveBeenCalledTimes(2);
      expect(actual).toEqual(articles);
    });
  });
});
