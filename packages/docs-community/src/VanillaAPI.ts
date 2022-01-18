import FormData from "form-data";
import fs from "fs";
import path from "path";
import HttpClient from "./httpClient";
import { getFullMarkdownReferencePathMatches } from "./linksAndMediaHandlers";
import { logger } from "./loggingUtil";
import { kCategoriesByPathSize } from "./proceduresToVanillaRequests/utils";
import {
  FLAG_FOR_DELETE,
  KNOWN_CATEGORY_BEEN_DELETED,
  PATH_OF_DIRECTORY_TO_WATCH,
} from "./utils/constants";
import {
  ProcedureTypeEnum,
  VanillaArticle,
  VanillaKnowledgeCategory,
} from "./utils/types";

interface ErrorType {
  message: string;
  status: number;
  errors: any[];
}

interface MediaPostReturn {
  url: string;
  name: string;
  type: string;
  size: number;
  width: number;
  height: number;
  displaySize: string;
  mediaID: number;
  dateInserted: string;
  insertUserID: number;
  foreignType: string;
  foreignID: number;
}
const isErrorType = <T>(response: ErrorType | T): response is ErrorType => {
  return (response as ErrorType)?.message !== undefined;
};

export const getArticles = async (
  client: HttpClient,
  knowledgeCategoryID: number | null | undefined
): Promise<VanillaArticle[]> => {
  try {
    if (!knowledgeCategoryID) {
      return [];
    }
    const articles = (await client.get("/articles", {
      params: {
        limit: 500,
        knowledgeCategoryID, // docs dont say it.. but this is required
      },
    })) as {
      data: VanillaArticle[] | ErrorType;
    };

    if (!isErrorType(articles.data)) {
      return articles.data.map((a) => ({
        ...a,
        procedureType: ProcedureTypeEnum.Article,
        referencesNeedingUpdatesInMarkdown: getFullMarkdownReferencePathMatches(
          a.body
        ),
      }));
    }
  } catch (e) {
    logger.error(`getArticles error: ${JSON.stringify(e)}`);
  }

  return [];
};

export const deleteAllArticles = async (
  client: HttpClient,
  existingVanillaArticles: VanillaArticle[]
): Promise<VanillaArticle[]> => {
  const tempExistingknowledgeArticleInfo: VanillaArticle[] =
    existingVanillaArticles ? [...existingVanillaArticles] : [];
  const filteredExistingknowledgeArticleInfo: VanillaArticle[] =
    tempExistingknowledgeArticleInfo.filter(
      (ek) => typeof ek.articleID === "number"
    );
  const allArticlesPromises = filteredExistingknowledgeArticleInfo.map((a) =>
    deleteArticle(client, a?.articleID)
  );
  const resolved: VanillaArticle[] = [];
  for (
    let promiseIndex = 0;
    promiseIndex < allArticlesPromises.length;
    promiseIndex++
  ) {
    const resolvedPromise = await allArticlesPromises[promiseIndex];
    if (resolvedPromise) {
      resolved.push(resolvedPromise);
    }
  }

  if (resolved) {
    return resolved.flat();
  }

  return [];
};
export const getKnowedgeCategories = async (
  client: HttpClient,
  fetchedCategories?: VanillaKnowledgeCategory[],
  currentPage?: number,
  areMorePages?: boolean
): Promise<VanillaKnowledgeCategory[]> => {
  const fetchedCategoriesTemp = fetchedCategories ? [...fetchedCategories] : [];
  let page = currentPage ? currentPage : 1;
  const pageInfo = `&page=${page}`;
  let areMorePagesTemp = areMorePages ? areMorePages : false;

  try {
    const categories = (await client.get(
      `knowledge-categories?limit=100${pageInfo}`
    )) as {
      data: VanillaKnowledgeCategory[] | ErrorType;
      headers: any;
    };

    if (categories?.headers.link) {
      areMorePagesTemp = categories?.headers.link.indexOf('rel="next"') !== -1;
    }
    if (!isErrorType(categories?.data)) {
      categories.data.forEach((c) => {
        fetchedCategoriesTemp.push({
          ...c,
          procedureType: ProcedureTypeEnum.Category,
        });
      });
    }
  } catch (error) {
    logger.error(`getKnowedgeCategories error: ${JSON.stringify(error)}`);
  }

  if (areMorePagesTemp) {
    page++;
    return await getKnowedgeCategories(
      client,
      fetchedCategoriesTemp,
      page,
      areMorePagesTemp
    );
  }

  return fetchedCategoriesTemp;
};

export const createKnowledgeCategory = async (
  client: HttpClient,
  bodyOfRequest: Partial<VanillaKnowledgeCategory>
): Promise<VanillaKnowledgeCategory | undefined> => {
  const { path } = bodyOfRequest;
  let isReleaseNotes = false;
  if (path && path.toLowerCase().indexOf("release-notes") !== -1) {
    isReleaseNotes = true;
  }

  try {
    const category = (await client.post("/knowledge-categories", {
      ...bodyOfRequest,
      parentID: bodyOfRequest.parentID === -1 ? 1 : bodyOfRequest.parentID,
      knowledgeBaseID: isReleaseNotes ? 2 : 1,
    })) as {
      data: VanillaKnowledgeCategory | ErrorType;
    };

    if (!isErrorType(category?.data)) {
      return {
        ...category.data,
        procedureType: ProcedureTypeEnum.Category,
      };
    }
  } catch (e) {
    logger.error(
      `${bodyOfRequest.name} createKnowledgeCategory error: ${JSON.stringify(
        e
      )}`
    );
  }
};

export const editKnowledgeCategory = async (
  client: HttpClient,
  knowledgeCategoryID: number,
  bodyOfRequest: Partial<VanillaKnowledgeCategory>
): Promise<VanillaKnowledgeCategory | undefined> => {
  try {
    const category = (await client.patch(
      `/knowledge-categories/${knowledgeCategoryID}`,
      bodyOfRequest
    )) as {
      data: VanillaKnowledgeCategory | ErrorType;
    };

    if (!isErrorType(category.data)) {
      return {
        ...category.data,
        procedureType: ProcedureTypeEnum.Category,
      };
    }
  } catch (e) {
    logger.error(
      `editKnowledgeCategory error: ${JSON.stringify(
        e
      )}\n KnowledgeCategoryName: ${bodyOfRequest.name}`
    );
  }
};

export const deleteKnowledgeCategory = async (
  client: HttpClient,
  knowledgeCategory: VanillaKnowledgeCategory
): Promise<VanillaKnowledgeCategory> => {
  const tempKnowledgeCategory: VanillaKnowledgeCategory = knowledgeCategory;

  try {
    await client.delete(
      `knowledge-categories/${knowledgeCategory.knowledgeCategoryID}`
    );
    tempKnowledgeCategory.description = "been deleted";
  } catch (e) {
    logger.error(
      `deleteKnowledgeCategory error: ${JSON.stringify(
        e
      )}\n KnowledgeCategoryName: ${knowledgeCategory.name}`
    );
    return tempKnowledgeCategory;
  }

  return tempKnowledgeCategory;
};

export const deleteAllFlaggedCategories = async (
  client: HttpClient,
  flaggedForDeletedKnowledgeCategorys: VanillaKnowledgeCategory[]
): Promise<VanillaKnowledgeCategory[]> => {
  const tempExistingknowledgeCategories: VanillaKnowledgeCategory[] =
    flaggedForDeletedKnowledgeCategorys
      ? [...flaggedForDeletedKnowledgeCategorys]
      : [];
  const orderedCategories = kCategoriesByPathSize(
    tempExistingknowledgeCategories
  );
  const filteredExistingknowledgeCategoryWithFlags = orderedCategories.filter(
    (ek) =>
      ek.knowledgeCategoryID !== null &&
      ek?.description === (KNOWN_CATEGORY_BEEN_DELETED || FLAG_FOR_DELETE)
  );
  const allDeletePromises = filteredExistingknowledgeCategoryWithFlags.map(
    (c) => {
      if (c.knowledgeCategoryID) {
        return deleteKnowledgeCategory(client, c);
      }
    }
  );
  const resolved: VanillaKnowledgeCategory[] = [];
  for (
    let promiseIndex = 0;
    promiseIndex < allDeletePromises.length;
    promiseIndex++
  ) {
    const resolvedPromise = await allDeletePromises[promiseIndex];
    if (resolvedPromise) {
      resolved.push(resolvedPromise);
    }
  }
  const categoriesAfterIteration = resolved.flat();
  const categoriesNOTDeletedYet = categoriesAfterIteration.filter(
    (c) => c.description === FLAG_FOR_DELETE
  );
  if (categoriesNOTDeletedYet.length) {
    return deleteAllFlaggedCategories(client, categoriesNOTDeletedYet);
  }

  return categoriesAfterIteration;
};

export const getAllArticles = async (
  client: HttpClient,
  existingknowledgeCategoryInfo: VanillaKnowledgeCategory[]
): Promise<VanillaArticle[]> => {
  const tempExistingknowledgeCategoryInfo: VanillaKnowledgeCategory[] =
    existingknowledgeCategoryInfo ? [...existingknowledgeCategoryInfo] : [];
  const filteredExistingknowledgeCategoryInfo =
    tempExistingknowledgeCategoryInfo.filter((ek) => !!ek.knowledgeCategoryID);
  const allArticlesPromises = filteredExistingknowledgeCategoryInfo.map((c) =>
    getArticles(client, c.knowledgeCategoryID)
  );
  const resolved: VanillaArticle[][] = [];

  for (
    let promiseIndex = 0;
    promiseIndex < allArticlesPromises.length;
    promiseIndex++
  ) {
    const resolvedPromise = await allArticlesPromises[promiseIndex];
    if (resolvedPromise) {
      resolved.push(resolvedPromise);
    }
  }

  if (resolved) {
    return resolved.flat();
  }

  return [];
};

export const createArticle = async (
  client: HttpClient,
  bodyOfRequest: Partial<VanillaArticle>
): Promise<VanillaArticle | undefined> => {
  try {
    const article = (await client.post("/articles", bodyOfRequest)) as {
      data: VanillaArticle | ErrorType;
    };

    if (!isErrorType(article.data)) {
      if (article.data.body !== null) {
        const referencesNeedingUpdatesInMarkdown =
          getFullMarkdownReferencePathMatches(article.data.body);
        if (
          referencesNeedingUpdatesInMarkdown &&
          referencesNeedingUpdatesInMarkdown.length
        ) {
          return {
            ...article.data,
            path:bodyOfRequest.path,
            referencesNeedingUpdatesInMarkdown,
            procedureType: ProcedureTypeEnum.Article,
          };
        }
      }
      return { ...article.data, procedureType: ProcedureTypeEnum.Article };
    }
  } catch (e) {
    logger.error(
      `createArticle error: ${JSON.stringify(e)} \n ArticleName: ${
        bodyOfRequest.name
      }`
    );
  }
};

export const deleteArticle = async (
  client: HttpClient,
  articleID: number | null
): Promise<VanillaArticle | undefined> => {
  if (articleID === null) {
    return {} as VanillaArticle;
  }
  try {
    const article = (await client.patch(`/articles/${articleID}/status`, {
      articleID,
      status: "deleted",
    })) as {
      data: VanillaArticle | ErrorType;
    };

    if (!isErrorType(article.data)) {
      return { ...article.data, procedureType: ProcedureTypeEnum.Article };
    }
  } catch (e) {
    logger.error(
      `deleteArticle error: ${JSON.stringify(e)} \n ArticleID: ${articleID}`
    );
  }
};

export const editArticle = async (
  client: HttpClient,
  articleID: number,
  edits: Partial<VanillaArticle>
): Promise<VanillaArticle | undefined> => {
  try {
    const article = (await client.patch(`/articles/${articleID}`, {
      format: "markdown",
      ...edits,
    })) as {
      data: VanillaArticle | ErrorType;
    };

    if (!isErrorType(article.data)) {
      if (article.data.body !== null) {
        const referencesNeedingUpdatesInMarkdown =
          getFullMarkdownReferencePathMatches(article.data.body);
        if (
          referencesNeedingUpdatesInMarkdown &&
          referencesNeedingUpdatesInMarkdown.length
        ) {
          return {
            ...article.data,
            referencesNeedingUpdatesInMarkdown,
            procedureType: ProcedureTypeEnum.Article,
            path:edits.path
          };
        }
      }
      return { ...article.data, procedureType: ProcedureTypeEnum.Article };
    }
  } catch (e) {
    logger.error(
      `editArticle error: ${JSON.stringify(e)} \n ArticleName: ${articleID}`
    );
  }
};

export const makeRequestsToChangeMarkdownReferences = async (
  articlesNeedingLinkUpdates: VanillaArticle[],
  client: HttpClient
) => {
  const handledArticles = [];
  for (let a = 0; a < articlesNeedingLinkUpdates.length; a++) {
    const { articleID } = articlesNeedingLinkUpdates[a];

    if (articlesNeedingLinkUpdates[a].body && articleID !== null) {
      const editResponse = await editArticle(client, articleID, {
        body: articlesNeedingLinkUpdates[a].body,
        format: "html",
      });
      if (editResponse) {
        handledArticles.push(editResponse);
      }
    }
  }
  return handledArticles;
};

export const postImage = async (client: HttpClient, data: FormData) => {
  try {
    const image = (await client.uploadMedia(data)) as {
      data: MediaPostReturn | ErrorType;
    };

    if (!isErrorType(image?.data)) {
      return image.data;
    }
  } catch (error) {
    logger.error(
      `postImageError:\n${JSON.stringify(data)} error: ${JSON.stringify(
        error
      )} \n mediaData: ${data}`
    );
  }
};

export const uploadImageAndReturnUrl = async (
  imagePath: string
): Promise<string> => {
  const httpClient = new HttpClient();
  const form = new FormData();
  const mediaLocation = imagePath.replace(/((\.\.\/){1,})/g,'')
  const mediaLocationChopped = imagePath.split("/");
  const imageName = mediaLocationChopped[mediaLocationChopped.length - 1];
  const fileLocation = path.join(
    __dirname,
    `../../../${PATH_OF_DIRECTORY_TO_WATCH}/`,
    `${mediaLocation}`
  );

  try {
    const imageFile = await fs.promises.readFile(fileLocation);
    form.append("file", imageFile, imageName);
    const postImageResponse = await postImage(httpClient, form);

    if (postImageResponse && postImageResponse?.url) {
      return postImageResponse.url;
    }
  } catch (e) {
    logger.error(
      `uploadImageAndReturnUrl: file does not exist (${fileLocation})\n fileLocation:${fileLocation}\n error: ${JSON.stringify(
        e
      )}`
    );
  }

  return imagePath;
};

export const deleteEmptyCategories = async (client: HttpClient) => {
  const knowledgeCategories = await getKnowedgeCategories(client);
  const emptyKnowedgeCategories = knowledgeCategories
    .filter((k) => k.articleCount === 0)
    .filter((k) => k.articleCountRecursive === 0)
    .filter((k) => k.childCategoryCount === 0);
  for (let k = 0; k < emptyKnowedgeCategories.length; k++) {
    try {
      logger.info(
        `Deleting Empty Category: ${JSON.stringify(emptyKnowedgeCategories[k])}`
      );
      await deleteKnowledgeCategory(client, emptyKnowedgeCategories[k]);
    } catch (error) {
      logger.error(
        `deleteEmptyCategoryError: \n ${JSON.stringify(
          error
        )} \n KnowedgeCategoryName:${emptyKnowedgeCategories[k].name}`
      );
    }
  }
};

export const removeSoloChildedCategories = async (client: HttpClient) => {
  const knowledgeCategories = await getKnowedgeCategories(client);
  const knowledgeCategoriesWithOneArticleChild = knowledgeCategories
    .filter((k) => k.articleCount === 1)
    .filter((k) => k.articleCountRecursive === 1)
    .filter((k) => k.childCategoryCount === 0);
  for (let i = 0; i < knowledgeCategoriesWithOneArticleChild.length; i++) {
    const [article] = await getArticles(
      client,
      knowledgeCategoriesWithOneArticleChild[i].knowledgeCategoryID
    );
    const { parentID } = knowledgeCategoriesWithOneArticleChild[i];

    if (article && article.articleID) {
      await editArticle(client, article.articleID, {
        knowledgeCategoryID: parentID,
      });
    }
  }
};
