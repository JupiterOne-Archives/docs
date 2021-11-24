import FormData from "form-data";
import fs from "fs/promises";
import path from "path";
import HttpClient from "./httpClient";
import { Logger } from "./Logging";
import { FLAG_FOR_DELETE, PATH_OF_DIRECTORY_TO_WATCH } from "./utils/constants";
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
      }));
    }
  } catch (e) {
    Logger.error(`getArticles error: ${JSON.stringify(e)}`);
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
  client: HttpClient
): Promise<VanillaKnowledgeCategory[]> => {
  try {
    const categories = (await client.get("knowledge-categories")) as {
      data: VanillaKnowledgeCategory[] | ErrorType;
    };

    if (!isErrorType(categories?.data)) {
      return categories.data.map((c) => ({
        ...c,
        procedureType: ProcedureTypeEnum.Category,
      }));
    }
  } catch (error) {
    Logger.error(`getKnowedgeCategories error: ${JSON.stringify(error)}`);
  }

  return [];
};

export const createKnowledgeCategory = async (
  client: HttpClient,
  bodyOfRequest: Partial<VanillaKnowledgeCategory>
): Promise<VanillaKnowledgeCategory | undefined> => {
  try {
    const category = (await client.post(
      "/knowledge-categories",
      bodyOfRequest
    )) as {
      data: VanillaKnowledgeCategory | ErrorType;
    };

    if (!isErrorType(category?.data)) {
      return {
        ...category.data,
        procedureType: ProcedureTypeEnum.Category,
      };
    }
  } catch (e) {
    Logger.error(`createKnowledgeCategory error: ${JSON.stringify(e)}`);
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
    Logger.error(`editKnowledgeCategory error: ${JSON.stringify(e)}`);
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
    Logger.error(`deleteKnowledgeCategory error: ${JSON.stringify(e)}`);
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

  const filteredExistingknowledgeCategoryWithFlags =
    tempExistingknowledgeCategories.filter(
      (ek) =>
        ek.knowledgeCategoryID !== null && ek?.description === FLAG_FOR_DELETE
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
      return { ...article.data, procedureType: ProcedureTypeEnum.Article };
    }
  } catch (e) {
    Logger.error(`createArticle error: ${JSON.stringify(e)}`);
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
    Logger.error(`deleteArticle error: ${JSON.stringify(e)}`);
  }
};

export const editArticle = async (
  client: HttpClient,
  articleID: number,
  edits: Partial<VanillaArticle>
): Promise<VanillaArticle | undefined> => {
  try {
    const article = (await client.patch(`/articles/${articleID}`, edits)) as {
      data: VanillaArticle | ErrorType;
    };

    if (!isErrorType(article.data)) {
      return { ...article.data, procedureType: ProcedureTypeEnum.Article };
    }
  } catch (e) {
    Logger.error(`editArticle error: ${JSON.stringify(e)}`);
  }
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
    Logger.error(
      `postImageError:\n${JSON.stringify(data)} error: ${JSON.stringify(error)}`
    );
  }
};

export const uploadImageAndReturnUrl = async (
  imagePath: string
): Promise<string> => {
  const httpClient = new HttpClient();
  const form = new FormData();
  const mediaLocation = imagePath.substring(3);
  const mediaLocationChopped = imagePath.split("/");
  const imageName = mediaLocationChopped[mediaLocationChopped.length - 1];

  const fileLocation = path.join(
    __dirname,
    `../../../${PATH_OF_DIRECTORY_TO_WATCH}/`,
    `${mediaLocation}`
  );

  try {
    const imageFile = await fs.readFile(fileLocation);
    form.append("file", imageFile, imageName);
    const postImageResponse = await postImage(httpClient, form);

    if (postImageResponse && postImageResponse?.url) {
      return postImageResponse.url;
    }
  } catch (e) {
    Logger.error(
      `uploadImageAndReturnUrl: file does not exist (${fileLocation})\n error: ${JSON.stringify(
        e
      )}`
    );
  }

  return imagePath;
};
