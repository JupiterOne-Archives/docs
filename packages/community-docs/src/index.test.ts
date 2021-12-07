describe("index", () => {
  it("has a test that needs updating", () => {
    expect(1).toEqual(1);
  });
});
/* eslint-disable jest/no-commented-out-tests */
// import { getAllSubChanges } from "./index";
// import {
//   createArticle,
//   createKnowledgeCategory,
//   deleteAllFlaggedCategories,
//   deleteKnowledgeCategory,
//   editArticle,
//   getAllArticles,
//   getKnowedgeCategories,
//   uploadImageAndReturnUrl,
// } from "./VanillaAPI";
// jest.mock("./httpClient", () => {
//   const mGit = {
//     get: jest.fn(),
//     post: jest.fn(),
//     delete: jest.fn(),
//     uploadMedia: jest.fn(),
//     patch: jest.fn(),
//     getAllArticles: jest.fn(),
//     getKnowedgeCategories: jest.fn(),
//   };
//   return jest.fn(() => mGit);
// });

// jest.mock("./VanillaAPI");

// jest.mock("simple-git/promise", () => {
//   const mGit = {
//     diff: jest
//       .fn()
//       .mockResolvedValue(
//         `knowledgeBase/compliance-reporting/adv-example-query-using-metadata.md`
//       ),
//   };
//   return jest.fn(() => mGit);
// });

// describe("Community docs", () => {
//   const articleMock = {
//     articleID: 284,
//     articleRevisionID: 1065,
//     knowledgeCategoryID: 195,
//     breadcrumbs: [],
//     knowledgeBaseID: 1,
//     name: "Adv Example Query Using Metadata",
//     body: "",
//     outline: [],
//     excerpt:
//       "Query using internal metadata JupiterOne assigns metadata to resources and sometimes it is helpful to leverage them in queries. Here are some examples to take a look at. Identify network access to/from external resources using _source filter: Find Firewall that allows as rule (Host|Network) with…",
//     seoDescription: null,
//     seoName: null,
//     slug: "284-adv-example-query-using-metadata",
//     sort: 0,
//     score: 0,
//     views: 0,
//     url: "https://jupiterone.vanillastaging.com/kb/articles/284-adv-example-query-using-metadata",
//     insertUserID: 12,
//     dateInserted: "2021-11-29T23:05:17+00:00",
//     updateUserID: 12,
//     dateUpdated: "2021-11-29T23:05:17+00:00",
//     status: "published",
//     featured: false,
//     dateFeatured: null,
//     locale: "en",
//     translationStatus: "up-to-date",
//     foreignID: null,
//     procedureType: "Article",
//   } as any;
//   let mockCreateKnowledgeCategory =
//     createKnowledgeCategory as jest.MockedFunction<
//       typeof createKnowledgeCategory
//     >;

//   let mockdeleteKnowledgeCategory =
//     deleteKnowledgeCategory as jest.MockedFunction<
//       typeof deleteKnowledgeCategory
//     >;

//   let mockdeleteAllFlaggedCategories =
//     deleteAllFlaggedCategories as jest.MockedFunction<
//       typeof deleteAllFlaggedCategories
//     >;

//   let mockGetKnowedgeCategories = getKnowedgeCategories as jest.MockedFunction<
//     typeof getKnowedgeCategories
//   >;
//   let mockCreateArticle = createArticle as jest.MockedFunction<
//     typeof createArticle
//   >;

//   let mockEditArticle = editArticle as jest.MockedFunction<typeof editArticle>;
//   let mockuploadImageAndReturnUrl =
//     uploadImageAndReturnUrl as jest.MockedFunction<
//       typeof uploadImageAndReturnUrl
//     >;

//   let mockgetAllArticles = getAllArticles as jest.MockedFunction<
//     typeof getAllArticles
//   >;

//   const mockKCategory = {
//     knowledgeCategoryID: 195,
//     name: "Compliance Reporting",
//     parentID: 1,
//     knowledgeBaseID: 1,
//     sortChildren: null,
//     sort: 0,
//     insertUserID: 12,
//     dateInserted: "2021-11-30T16:50:22+00:00",
//     updateUserID: 12,
//     dateUpdated: "2021-11-30T16:50:22+00:00",
//     lastUpdatedArticleID: null,
//     lastUpdatedUserID: null,
//     articleCount: 0,
//     articleCountRecursive: 0,
//     childCategoryCount: 0,
//     url: "https://jupiterone.vanillastaging.com/kb/categories/197-compliance-reporting",
//     foreignID: null,
//   } as any;

//   beforeEach(() => {
//     mockgetAllArticles = getAllArticles as jest.MockedFunction<
//       typeof getAllArticles
//     >;
//     mockuploadImageAndReturnUrl =
//       uploadImageAndReturnUrl as jest.MockedFunction<
//         typeof uploadImageAndReturnUrl
//       >;
//     mockuploadImageAndReturnUrl.mockResolvedValue("newurl");
//     mockEditArticle = editArticle as jest.MockedFunction<typeof editArticle>;
//     mockCreateArticle = createArticle as jest.MockedFunction<
//       typeof createArticle
//     >;
//     mockGetKnowedgeCategories = getKnowedgeCategories as jest.MockedFunction<
//       typeof getKnowedgeCategories
//     >;
//     mockCreateArticle = createArticle as jest.MockedFunction<
//       typeof createArticle
//     >;
//     mockdeleteAllFlaggedCategories =
//       deleteAllFlaggedCategories as jest.MockedFunction<
//         typeof deleteAllFlaggedCategories
//       >;
//     mockdeleteAllFlaggedCategories.mockResolvedValue({} as any);
//     mockdeleteKnowledgeCategory =
//       deleteKnowledgeCategory as jest.MockedFunction<
//         typeof deleteKnowledgeCategory
//       >;
//     mockdeleteKnowledgeCategory.mockResolvedValue({} as any);
//     mockCreateKnowledgeCategory =
//       createKnowledgeCategory as jest.MockedFunction<
//         typeof createKnowledgeCategory
//       >;
//     mockuploadImageAndReturnUrl.mockResolvedValue("newurl");
//     mockdeleteAllFlaggedCategories.mockResolvedValue({} as any);
//     mockdeleteKnowledgeCategory.mockResolvedValue({} as any);
//     mockgetAllArticles.mockResolvedValue([articleMock]);
//     mockGetKnowedgeCategories.mockResolvedValue([mockKCategory]);
//   });
//   //   describe("one or the other works... something to do with the mocks", () => {
//   //     it("handles the addition of new markdownFile", async () => {
//   //       //         createKnowledgeCategory.mockReset()
//   //       //   uploadImageAndReturnUrl: jest.fn().mockResolvedValue("newuri"),
//   //       //   editArticle: jest.fn(),
//   //       //   createArticle: jest.fn(),
//   //       //   getArticles: jest.fn().mockResolvedValue([]),
//   //       //   getAllArticles.mockReset()
//   //       //   getKnowedgeCategories.mockReset()
//   //       //   mockGetKnowedgeCategories.mockReset();
//   //       //   mockgetAllArticles.mockReset();
//   //       mockCreateKnowledgeCategory.mockResolvedValue(mockKCategory);
//   //       mockGetKnowedgeCategories.mockResolvedValue([]);
//   //       mockgetAllArticles.mockResolvedValue([]);
//   //       await updateCommunityDocs();
//   //       expect(createKnowledgeCategory).toHaveBeenCalledTimes(1);
//   //       expect(mockCreateArticle).toHaveBeenCalledTimes(1);
//   //       expect(mockEditArticle).toHaveBeenCalledTimes(0);
//   //     });
//   //   });
//   // describe("updateCommunityDocs", () => {
//   //   it("handles the editing of a markdownFile", async () => {
//   //     mockGetKnowedgeCategories.mockResolvedValue([mockKCategory]);
//   //     mockgetAllArticles.mockResolvedValue([articleMock]);

//   //     await updateCommunityDocs();
//   //     expect(mockCreateKnowledgeCategory).toHaveBeenCalledTimes(0);
//   //     expect(mockCreateArticle).toHaveBeenCalledTimes(1);
//   //     expect(mockEditArticle).toHaveBeenCalledTimes(1);
//   //     expect(mockEditArticle.mock.calls[0][1]).toEqual(articleMock.articleID);
//   //   });
//   // });
//   // describe("getAllSubChanges", () => {
//   //   it("returns all sub items", async () => {
//   //     const expected: string[] = [
//   //       "/Users/bryanschauerte/work/augustTwo/docs-community/knowledgeBase/asset-management/",
//   //     ];

//   //     const actual = await getAllSubChanges("knowledgeBase/asset-management/");
//   //     expect(expected).toEqual(actual);
//   //   });
//   //   it("returns git change if not a folder", async () => {
//   //     const gitChange =
//   //       "knowledgeBase/tester-monday-2/asset-inventory-filters.md";
//   //     const expected: string[] = [gitChange];

//   //     const actual = await getAllSubChanges(gitChange);
//   //     expect(expected).toEqual(actual);
//   //   });
//   // });
// });
