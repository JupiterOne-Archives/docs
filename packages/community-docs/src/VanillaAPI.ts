import FormData from "form-data";
import fs from "fs/promises";
import path from "path";
import HttpClient from "./httpClient";
import { PATH_OF_DIRECTORY_TO_WATCH } from "./utils/constants";
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
    console.error({ e }, "errrrr");
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
    console.error(error, "Error in getting categories");
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
    console.error(e, "Create Knowledge Category error", { e });
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
    console.error(e, "Create Knowledge Category error");
  }
};

export const deleteKnowledgeCategory = async (
  client: HttpClient,
  knowledgeCategoryID: number,
  endIt?: boolean
): Promise<boolean> => {
  if (endIt) {
    return true;
  }
  let success = true;

  console.log("trying to delete", knowledgeCategoryID);
  try {
    //hopefully its empty...
    await client.delete(`knowledge-categories/${knowledgeCategoryID}`);
  } catch (e) {
    success = false;
    console.error(e, "attempt to delete non-empty category");
    // try {
    //   const articles = await getArticles(client, knowledgeCategoryID);

    //   await deleteAllArticles(client, articles);
    //   return deleteKnowledgeCategory(client, knowledgeCategoryID);
    // } catch (e) {
    //   console.log("Error deleting all articles within category");
    // }

    //categories
    // try {
    //   const categories = await getKnowedgeCategories(client);
    //   if (categories?.length) {
    //     categories.filter(
    //       (c) =>
    //         c.parentID === knowledgeCategoryID &&
    //         c?.knowledgeCategoryID !== null
    //     );
    //     if (categories[0] && categories[0].knowledgeCategoryID) {
    //       return await deleteKnowledgeCategory(
    //         client,
    //         categories[0].knowledgeCategoryID
    //       );
    //     }
    //   }
    //   await deleteKnowledgeCategory(client, knowledgeCategoryID);
    // } catch (e) {
    //   console.log("Error deleting all nested categories", e);
    // }
    // end categories
  }

  // THIS NEEDS TO BE SLLLLLOWED DOWN BEFORE ACTUAL RUNNING!!!!!!
  // return true
  // if (!doForReal) {
  //   return new Promise((resolve) => {
  //     resolve(true);
  //   });
  // }

  // let haveToDeleteChildArticles = false;
  // let haveToDeleteChildCategories = false;
  // let catagory;
  // try {
  //   catagory = (await client.get(
  //     `knowledge-categories/${knowledgeCategoryID}`
  //   )) as {
  //     data:
  //       | {
  //           articleCount: number;
  //           articleCountRecursive: number;
  //           childCategoryCount: number;
  //         }
  //       | ErrorType;
  //   };
  // } catch (catError) {
  //   return true;
  // }

  // if (!isErrorType(catagory?.data) && catagory.data?.articleCount !== 0) {
  //   haveToDeleteChildArticles = true;
  //   const articles = await getArticles(client, knowledgeCategoryID);
  //   await deleteAllArticles(client, articles);
  //   return await deleteKnowledgeCategory(client, knowledgeCategoryID);
  // }
  // if(!isErrorType(catagory?.data)&&catagory.data?.articleCountRecursive !==0){
  //   haveToDeleteChildArticles=true
  // LEAVING in case we need to do it
  // }
  // if (!isErrorType(catagory?.data) && catagory.data?.childCategoryCount !== 0) {
  //   haveToDeleteChildCategories = false;
  //   const categories = await getKnowedgeCategories(client);
  //   if (categories?.length) {
  //     categories.filter(
  //       (c) =>
  //         c.parentID === knowledgeCategoryID && c?.knowledgeCategoryID !== null
  //     );
  //     if (categories[0] && categories[0].knowledgeCategoryID) {
  //       return await deleteKnowledgeCategory(
  //         client,
  //         categories[0].knowledgeCategoryID
  //       );
  //     }
  //   }
  // }

  // if (!haveToDeleteChildArticles && !haveToDeleteChildCategories) {
  //   try {
  //     await client.delete(`knowledge-categories/${knowledgeCategoryID}`);
  //   } catch (e) {
  //     success = false;
  //     console.error(e, "error deleting");
  //   }
  // }
  // return await deleteKnowledgeCategory(client, knowledgeCategoryID, success)
  console.log("return of delete", success);
  return success;
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
    console.error(e, "Create Article error");
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
    console.error(e, "Create Article error", { e });
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
    console.error(e, "Create Article error", { e });
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
    console.error(
      JSON.stringify(error, null, 2),
      "Error uploading image",
      error?.data?.errors
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
  console.log(imageName, "imagePath", imagePath);
  const fileLocation = path.join(
    __dirname,
    `../../../${PATH_OF_DIRECTORY_TO_WATCH}/`,
    `${mediaLocation}`
  );
  console.log(fileLocation, "FILLLEEE");

  try {
    const imageFile = await fs.readFile(fileLocation);
    form.append("file", imageFile, imageName);
    const postImageResponse = await postImage(httpClient, form);

    if (postImageResponse && postImageResponse?.url) {
      return postImageResponse.url;
    }
  } catch (e) {
    console.log("file doesnt exist escape", e);
  }

  return imagePath;
};
