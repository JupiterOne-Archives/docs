import { VanillaArticle } from "../../utils";
import * as mockVanillaAPI from "../../VanillaAPI";
import { createChangesContentForStaging } from "./stagingUpdateArticle";
describe("CreateChangesContentForStaging", () => {
  let createArticle = jest
    .spyOn(mockVanillaAPI, "createArticle")
    .mockResolvedValue({ name: "aryth" } as VanillaArticle);
  let editArticle = jest
    .spyOn(mockVanillaAPI, "createArticle")
    .mockResolvedValue({ name: "aryth" } as VanillaArticle);
  beforeEach(() => {
    createArticle = jest
      .spyOn(mockVanillaAPI, "createArticle")
      .mockResolvedValue({ name: "aryth" } as VanillaArticle);
    editArticle = jest
      .spyOn(mockVanillaAPI, "createArticle")
      .mockResolvedValue({ name: "aryth" } as VanillaArticle);
  });
  it("creates a new article when 'Changes From Update' not found", async () => {
    const procedures: VanillaArticle[] = [
      { name: "procedureThatChanged", url: "urlofArticle" },
    ] as VanillaArticle[];
    const httpClient = {} as any;
    const combinationOfArticlesAndProcedures: VanillaArticle[] = [];
    const createProperties = {
      body: "\n [procedureThatChanged](urlofArticle) - Deleted",
      format: "markdown",
      knowledgeCategoryID: 1,
      locale: "en",
      name: "Changes From Updates",
      sort: 0,
    };
    await createChangesContentForStaging({
      procedures,
      httpClient,
      combinationOfArticlesAndProcedures,
    });
    const [calls] = createArticle.mock.calls;

    expect(calls[1]).toEqual(createProperties);
  });
  it("Edits article named 'Changes From Update'", async () => {
    const procedures: VanillaArticle[] = [
      { name: "changeviaProcedure", url: "urlofArticle" },
    ] as VanillaArticle[];
    const httpClient = {} as any;
    const combinationOfArticlesAndProcedures: VanillaArticle[] = [];
    const createProperties = {
      body: "\n [changeviaProcedure](urlofArticle) - Deleted",
      format: "markdown",
      knowledgeCategoryID: 1,
      locale: "en",
      name: "Changes From Updates",
      sort: 0,
    };
    await createChangesContentForStaging({
      procedures,
      httpClient,
      combinationOfArticlesAndProcedures,
    });
    const [calls] = editArticle.mock.calls;
    expect(calls[1]).toEqual(createProperties);
  });
});
