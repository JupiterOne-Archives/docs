import * as diffToProceduresMock from "../diffToProcedures";
import {
  ProcedureTypeEnum,
  VanillaArticle,
  VanillaKnowledgeCategory,
} from "../utils";
import * as VanillaAPIMock from "../VanillaAPI";
import { removeDeletedArticles } from "./index";
jest.mock("../VanillaAPI");
jest.mock("../diffToProcedures");
jest.mock("../loggingUtil");
describe("conversion", () => {
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
  const createArticle = ({ id, name }: { id: number; name: string }) =>
    ({
      articleID: id,
      name,
    } as VanillaArticle);
  const createProcedure = ({ name }: { name: string }) =>
    ({
      procedureType: ProcedureTypeEnum.Article,
      name,
    } as any);

  const names = ["soc2", "existing", "articleName"];
  const articles = names.map((name, index) =>
    createArticle({ id: index, name })
  );
  const procedures = ["soc2", "existing"].map((n) =>
    createProcedure({ name: n })
  );

  let getArticlesSpy = jest
    .spyOn(VanillaAPIMock, "getAllArticles")
    .mockResolvedValue(articles);
  let getCategoriesSpy = jest
    .spyOn(VanillaAPIMock, "getKnowedgeCategories")
    .mockResolvedValue([]);
  let deleteArticleSpy = jest
    .spyOn(VanillaAPIMock, "deleteArticle")
    .mockResolvedValue({} as any);
  let diffToProcedures = jest
    .spyOn(diffToProceduresMock, "diffToProcedures")
    .mockReturnValue(procedures as any);

  beforeEach(() => {
    getArticlesSpy = jest
      .spyOn(VanillaAPIMock, "getAllArticles")
      .mockResolvedValue(articles);
    getCategoriesSpy = jest
      .spyOn(VanillaAPIMock, "getKnowedgeCategories")
      .mockResolvedValue([]);
    deleteArticleSpy = jest
      .spyOn(VanillaAPIMock, "deleteArticle")
      .mockResolvedValue({} as any);
    diffToProcedures = jest
      .spyOn(diffToProceduresMock, "diffToProcedures")
      .mockReturnValue(procedures as any);
  });

  it("remove articles that exist on vanilla but not within kb or integationsConfig", async () => {
    const mockHttp = {} as any;
    const names = [
      "soc2",
      "existing",
      "alsodoesntexist",
      "Trend Micro Integration with JupiterOne",
      "left by delete",
    ];
    const articles = names.map((name, index) =>
      createArticle({ id: index, name })
    );
    const integrationArticle = {
      articleID: 33,
      name: "Trend Micro Integration with JupiterOne",
    } as VanillaArticle;
    getArticlesSpy = jest
      .spyOn(VanillaAPIMock, "getAllArticles")
      .mockResolvedValue([...articles, integrationArticle]);
    await removeDeletedArticles({ httpClient: mockHttp });
    expect(diffToProcedures).toHaveBeenCalledTimes(1);
    expect(getCategoriesSpy).toHaveBeenCalledTimes(1);
    expect(getArticlesSpy).toHaveBeenCalledTimes(1);
    expect(deleteArticleSpy).toHaveBeenCalledWith(mockHttp, 2);
    expect(deleteArticleSpy).toHaveBeenCalledTimes(2);
  });
});
