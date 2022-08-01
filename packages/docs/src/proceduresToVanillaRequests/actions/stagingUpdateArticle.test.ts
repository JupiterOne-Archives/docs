import { logger } from '../../loggingUtil';
import { VanillaArticle } from '../../utils';
import * as mockVanillaAPI from '../../VanillaAPI';
import { createChangesContentForStaging } from './stagingUpdateArticle';
describe('CreateChangesContentForStaging', () => {
  const loggerMock = jest.spyOn(logger, 'error');

  let createArticle = jest
    .spyOn(mockVanillaAPI, 'createArticle')
    .mockResolvedValue({ name: 'aryth' } as VanillaArticle);
  let editArticle = jest
    .spyOn(mockVanillaAPI, 'editArticle')
    .mockResolvedValue({ name: 'aryth' } as VanillaArticle);
  beforeEach(() => {
    createArticle = jest
      .spyOn(mockVanillaAPI, 'createArticle')
      .mockResolvedValue({ name: 'aryth' } as VanillaArticle);
    editArticle = jest
      .spyOn(mockVanillaAPI, 'editArticle')
      .mockResolvedValue({ name: 'aryth' } as VanillaArticle);
  });
  it("creates a new article when 'Changes From Update' not found", async () => {
    const procedures: VanillaArticle[] = [
      { name: 'procedureThatChanged', url: 'urlofArticle' },
    ] as VanillaArticle[];
    const httpClient = {} as any;
    const combinationOfArticlesAndProcedures: VanillaArticle[] = [];
    const createProperties = {
      body: '\n [procedureThatChanged](urlofArticle) - Deleted',
      format: 'markdown',
      knowledgeCategoryID: 1,
      locale: 'en',
      name: 'Changes From Updates',
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
  it('creates handles create error', async () => {
    const procedures: VanillaArticle[] = [
      { name: 'procedureThatChanged', url: 'urlofArticle' },
    ] as VanillaArticle[];
    const httpClient = {} as any;
    const combinationOfArticlesAndProcedures: VanillaArticle[] = [];
    const createProperties = {
      body: '\n [procedureThatChanged](urlofArticle) - Deleted',
      format: 'markdown',
      knowledgeCategoryID: 1,
      locale: 'en',
      name: 'Changes From Updates',
      sort: 0,
    };
    createArticle.mockRejectedValue({ message: 'error' });
    await createChangesContentForStaging({
      procedures,
      httpClient,
      combinationOfArticlesAndProcedures,
    });
    const [calls] = createArticle.mock.calls;
    expect(loggerMock).toHaveBeenCalledTimes(1);
    expect(calls[1]).toEqual(createProperties);
  });
  it("Edits article named 'Changes From Update'", async () => {
    const changesArticle = {
      name: 'changeviaProcedure',
      url: 'urlofArticle',
    } as VanillaArticle;
    const procedures: VanillaArticle[] = [changesArticle] as VanillaArticle[];
    const httpClient = {} as any;
    const now = new Date();
    const date = now.toISOString();
    editArticle.mockReset();
    const combinationOfArticlesAndProcedures: VanillaArticle[] = [
      {
        body: '',
        name: 'Changes From Updates',
        articleID: 89,
      },
    ] as VanillaArticle[];
    const editReq = {
      body: `## ${date.substring(
        0,
        date.indexOf('T')
      )} \n  \n \n [changeviaProcedure](urlofArticle) - Deleted`,
    };
    await createChangesContentForStaging({
      procedures,
      httpClient,
      combinationOfArticlesAndProcedures,
    });
    const [calls] = editArticle.mock.calls;
    expect(calls[0]).toEqual(httpClient);
    expect(calls[1]).toEqual(89);
    expect(calls[2]).toEqual(editReq);
  });
  it('Edits article handles error', async () => {
    const changesArticle = {
      name: 'changeviaProcedure',
      url: 'urlofArticle',
    } as VanillaArticle;
    const procedures: VanillaArticle[] = [changesArticle] as VanillaArticle[];
    const httpClient = {} as any;
    const now = new Date();
    const date = now.toISOString();
    editArticle.mockRejectedValue({ e: 'error' });

    const combinationOfArticlesAndProcedures: VanillaArticle[] = [
      {
        body: '',
        name: 'Changes From Updates',
        articleID: 89,
      },
    ] as VanillaArticle[];
    const editReq = {
      body: `## ${date.substring(
        0,
        date.indexOf('T')
      )} \n  \n \n [changeviaProcedure](urlofArticle) - Deleted`,
    };
    await createChangesContentForStaging({
      procedures,
      httpClient,
      combinationOfArticlesAndProcedures,
    });
    const [calls] = editArticle.mock.calls;
    expect(calls[0]).toEqual(httpClient);
    expect(calls[1]).toEqual(89);
    expect(calls[2]).toEqual(editReq);
    expect(loggerMock).toHaveBeenCalledTimes(1);
  });
});
