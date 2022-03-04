import { mockLogging } from "@jupiterone/platform-sdk-logging/src/test";

mockLogging({
  enableLogging: false,
});
jest.mock("./packages/docs/src/httpClient", () => {
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

afterEach(jest.resetAllMocks);
