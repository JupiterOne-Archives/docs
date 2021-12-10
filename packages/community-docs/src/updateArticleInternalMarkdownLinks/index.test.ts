import { getAllArticles, getKnowedgeCategories } from "../VanillaAPI";
jest.mock("../httpClient", () => {
  const mocker = {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
    uploadMedia: jest.fn(),
    patch: jest.fn(),
    getAllArticles: jest.fn(),
    getKnowedgeCategories: jest.fn(),
  };
  return jest.fn(() => mocker);
});

jest.mock("../Logging", () => {
  const mocker = {
    info: jest.fn(),
    debug: jest.fn(),
    error: jest.fn(),
  };
  return jest.fn(() => mocker);
});
jest.mock("../VanillaAPI");

describe("updateArtilceInternalMarkdownLinks", () => {
  const mockGetAllArticles = getAllArticles as jest.MockedFunction<
    typeof getAllArticles
  >;
  const mockGetKnowedgeCategories =
    getKnowedgeCategories as jest.MockedFunction<typeof getKnowedgeCategories>;
  beforeAll(() => {
    mockGetAllArticles.mockResolvedValue([]);
    mockGetKnowedgeCategories.mockResolvedValue([]);
  });

  describe("index", () => {
    it("runs a test", () => {
      expect(1).toEqual(1);
    });
  });
});
