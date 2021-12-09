/* eslint-disable jest/no-commented-out-tests */
import { updateCommunityDocs } from "./";
import { getDiffFromHead } from "./gitDifference";
import {
  directoryExists,
  kCategoriesByPathSize,
  markdownToString,
} from "./proceduresToVanillaRequests/utils";
import { FLAG_FOR_DELETE } from "./utils";
import { VanillaKnowledgeCategory } from "./utils/types";
import {
  createArticle,
  createKnowledgeCategory,
  deleteAllFlaggedCategories,
  deleteArticle,
  deleteKnowledgeCategory,
  editArticle,
  getAllArticles,
  getKnowedgeCategories,
  updateArticleMarkdownReferences,
} from "./VanillaAPI";
jest.mock("./httpClient", () => {
  const mGit = {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
    uploadMedia: jest.fn(),
    patch: jest.fn(),
    getAllArticles: jest.fn(),
    getKnowedgeCategories: jest.fn(),
  };
  return jest.fn(() => mGit);
});
jest.mock("./proceduresToVanillaRequests/utils");
jest.mock("./VanillaAPI");
jest.mock("./gitDifference");

describe("Community docs", () => {
  const articleMock = {
    articleID: 284,
    articleRevisionID: 1065,
    knowledgeCategoryID: 195,
    breadcrumbs: [],
    knowledgeBaseID: 1,
    name: "Adv Example Query Using Metadata",
    body: "",
    outline: [],
    excerpt:
      "Query using internal metadata JupiterOne assigns metadata to resources and sometimes it is helpful to leverage them in queries. Here are some examples to take a look at. Identify network access to/from external resources using _source filter: Find Firewall that allows as rule (Host|Network) with…",
    seoDescription: null,
    seoName: null,
    slug: "284-adv-example-query-using-metadata",
    sort: 0,
    score: 0,
    views: 0,
    url: "https://jupiterone.vanillastaging.com/kb/articles/284-adv-example-query-using-metadata",
    insertUserID: 12,
    dateInserted: "2021-11-29T23:05:17+00:00",
    updateUserID: 12,
    dateUpdated: "2021-11-29T23:05:17+00:00",
    status: "published",
    featured: false,
    dateFeatured: null,
    locale: "en",
    translationStatus: "up-to-date",
    foreignID: null,
    procedureType: "Article",
  } as any;
  const mockDirectoryExists = directoryExists as jest.MockedFunction<
    typeof directoryExists
  >;
  const mockKCategoriesByPathSize =
    kCategoriesByPathSize as jest.MockedFunction<typeof kCategoriesByPathSize>;

  const mockGetDiffFromHead = getDiffFromHead as jest.MockedFunction<
    typeof getDiffFromHead
  >;
  mockGetDiffFromHead.mockResolvedValue(
    "knowledgeBase/compliance-reporting/adv-example-query-using-metadata.md\n"
  );
  const mockMarkdownToString = markdownToString as jest.MockedFunction<
    typeof markdownToString
  >;
  let mockDeleteArticle = deleteArticle as jest.MockedFunction<
    typeof deleteArticle
  >;
  let mockCreateKnowledgeCategory =
    createKnowledgeCategory as jest.MockedFunction<
      typeof createKnowledgeCategory
    >;
  let mockUpdateArticleMarkdownReferences =
    updateArticleMarkdownReferences as jest.MockedFunction<
      typeof updateArticleMarkdownReferences
    >;
  let mockdeleteKnowledgeCategory =
    deleteKnowledgeCategory as jest.MockedFunction<
      typeof deleteKnowledgeCategory
    >;

  let mockdeleteAllFlaggedCategories =
    deleteAllFlaggedCategories as jest.MockedFunction<
      typeof deleteAllFlaggedCategories
    >;

  let mockGetKnowedgeCategories = getKnowedgeCategories as jest.MockedFunction<
    typeof getKnowedgeCategories
  >;
  let mockCreateArticle = createArticle as jest.MockedFunction<
    typeof createArticle
  >;

  let mockEditArticle = editArticle as jest.MockedFunction<typeof editArticle>;

  let mockgetAllArticles = getAllArticles as jest.MockedFunction<
    typeof getAllArticles
  >;

  const mockKCategory = {
    knowledgeCategoryID: 195,
    name: "Compliance Reporting",
    parentID: 1,
    knowledgeBaseID: 1,
    sortChildren: null,
    sort: 0,
    insertUserID: 12,
    dateInserted: "2021-11-30T16:50:22+00:00",
    updateUserID: 12,
    dateUpdated: "2021-11-30T16:50:22+00:00",
    lastUpdatedArticleID: null,
    lastUpdatedUserID: null,
    articleCount: 0,
    articleCountRecursive: 0,
    childCategoryCount: 0,
    url: "https://jupiterone.vanillastaging.com/kb/categories/197-compliance-reporting",
    foreignID: null,
    procedureType: "Category",
  } as any;

  beforeEach(() => {
    mockgetAllArticles = getAllArticles as jest.MockedFunction<
      typeof getAllArticles
    >;
    mockDeleteArticle = deleteArticle as jest.MockedFunction<
      typeof deleteArticle
    >;
    mockEditArticle = editArticle as jest.MockedFunction<typeof editArticle>;
    mockCreateArticle = createArticle as jest.MockedFunction<
      typeof createArticle
    >;
    mockGetKnowedgeCategories = getKnowedgeCategories as jest.MockedFunction<
      typeof getKnowedgeCategories
    >;
    mockCreateArticle.mockResolvedValue({
      name: "totally an article",
      articleID: 99,
    } as any);
    mockDeleteArticle.mockResolvedValue({
      ...articleMock,
      status: "deleted",
    });
    mockUpdateArticleMarkdownReferences =
      updateArticleMarkdownReferences as jest.MockedFunction<
        typeof updateArticleMarkdownReferences
      >;
    mockdeleteAllFlaggedCategories =
      deleteAllFlaggedCategories as jest.MockedFunction<
        typeof deleteAllFlaggedCategories
      >;

    mockdeleteKnowledgeCategory =
      deleteKnowledgeCategory as jest.MockedFunction<
        typeof deleteKnowledgeCategory
      >;

    mockCreateKnowledgeCategory =
      createKnowledgeCategory as jest.MockedFunction<
        typeof createKnowledgeCategory
      >;
    mockKCategoriesByPathSize.mockReturnValue([] as VanillaKnowledgeCategory[]);
  });
  afterAll(jest.clearAllMocks);
  describe("updateCommunityDocs", () => {
    it("handles the addition of new markdownFile in a new folder", async () => {
      mockGetDiffFromHead.mockResolvedValue(
        "knowledgeBase/compliance-reporting/adv-example-query-using-metadata.md"
      );
      mockDirectoryExists.mockReturnValue(true);
      mockCreateKnowledgeCategory.mockResolvedValue({ ...mockKCategory });
      mockGetKnowedgeCategories.mockResolvedValue([]);
      mockgetAllArticles.mockResolvedValue([]);
      await updateCommunityDocs();
      expect(mockCreateKnowledgeCategory).toHaveBeenCalledTimes(1);
      expect(mockCreateArticle).toHaveBeenCalledTimes(1);
      expect(mockEditArticle).toHaveBeenCalledTimes(0);
    });
    it("handles the addition of new markdownFile in existing folder", async () => {
      mockGetDiffFromHead.mockResolvedValue(
        "knowledgeBase/compliance-reporting/adv-example-query-using-metadata.md"
      );
      mockDirectoryExists.mockReturnValue(true);
      const mockGetAllArticleReturn: any[] = [];
      const createkCategoryReturn = { ...mockKCategory };
      mockCreateKnowledgeCategory.mockResolvedValue(createkCategoryReturn);
      mockGetKnowedgeCategories.mockResolvedValue([createkCategoryReturn]);

      mockCreateArticle.mockResolvedValue({
        name: "totally an article",
        articleID: 99,
      } as any);
      mockgetAllArticles.mockResolvedValue(mockGetAllArticleReturn);
      await updateCommunityDocs();
      expect(mockCreateKnowledgeCategory).toHaveBeenCalledTimes(0);
      expect(mockCreateArticle).toHaveBeenCalledTimes(1);
      expect(mockEditArticle).toHaveBeenCalledTimes(0);

      expect(mockUpdateArticleMarkdownReferences).toHaveBeenCalledTimes(1);
    });
    it("handles the deletion of a folder of existing KnowledgeCategory", async () => {
      mockGetDiffFromHead.mockResolvedValue(
        "knowledgeBase/compliance-reporting/adv-example-query-using-metadata.md"
      );
      const getCategoryResult = {
        ...mockKCategory,
        path: "knowledgeBase/compliance-reporting/adv-example-query-using-metadata.md",
        name: "Compliance Reporting",
        knowledgeCategoryID: 88,
      } as VanillaKnowledgeCategory;
      const mockGetAllArticlesReturn = [articleMock];
      mockGetKnowedgeCategories.mockResolvedValue([getCategoryResult]);
      mockDirectoryExists.mockReturnValue(false);
      mockMarkdownToString.mockResolvedValue(FLAG_FOR_DELETE);
      mockdeleteKnowledgeCategory.mockResolvedValue({} as any);
      mockgetAllArticles.mockResolvedValue(mockGetAllArticlesReturn);
      mockDeleteArticle.mockResolvedValue({
        ...articleMock,
        status: "deleted",
      });

      await updateCommunityDocs();
      expect(mockDeleteArticle).toHaveBeenCalledTimes(1);
      expect(mockdeleteAllFlaggedCategories).toHaveBeenCalledTimes(1);
      expect(mockdeleteAllFlaggedCategories).toHaveBeenCalledWith(
        expect.anything(),
        [
          {
            ...getCategoryResult,
            childrenPath:
              "compliance-reporting/adv-example-query-using-metadata.md",
            description: "FILE_DOES_NOT_EXIST",
            fileName: "compliance-reporting",
          },
        ]
      );
      expect(mockCreateKnowledgeCategory).toHaveBeenCalledTimes(0);
      expect(mockCreateArticle).toHaveBeenCalledTimes(0);
      expect(mockEditArticle).toHaveBeenCalledTimes(0);
      expect(mockUpdateArticleMarkdownReferences).toHaveBeenCalledTimes(1);
    });
    it("handles the deletion of article", async () => {
      mockKCategoriesByPathSize.mockReturnValue(
        [] as VanillaKnowledgeCategory[]
      );
      const mockArticleForDelete = { ...articleMock };
      mockGetDiffFromHead.mockResolvedValue(
        "knowledgeBase/compliance-reporting/adv-example-query-using-metadata.md"
      );
      const createkCategoryReturn = {
        ...mockKCategory,
        knowledgeCategoryID: 88,
      } as VanillaKnowledgeCategory;
      mockGetKnowedgeCategories.mockResolvedValue([createkCategoryReturn]);
      mockDirectoryExists.mockReturnValue(true);
      mockMarkdownToString.mockResolvedValue(FLAG_FOR_DELETE);
      mockdeleteKnowledgeCategory.mockResolvedValue({} as any);
      mockgetAllArticles.mockResolvedValue([articleMock]);
      mockDeleteArticle.mockResolvedValue(mockArticleForDelete);
      mockGetKnowedgeCategories.mockResolvedValue([createkCategoryReturn]);

      await updateCommunityDocs();
      expect(mockDeleteArticle).toHaveBeenCalledTimes(1);
      expect(mockdeleteAllFlaggedCategories).toHaveBeenCalledWith(
        expect.anything(),
        []
      );
      expect(mockCreateKnowledgeCategory).toHaveBeenCalledTimes(0);
      expect(mockCreateArticle).toHaveBeenCalledTimes(0);
      expect(mockEditArticle).toHaveBeenCalledTimes(0);
    });
  });
});
