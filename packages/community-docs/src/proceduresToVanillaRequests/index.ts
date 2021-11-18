import HttpClient from "../httpClient";
import { isArticleType, isKnowledgeCategoryType } from "../utils";
import { FLAG_FOR_DELETE } from "../utils/constants";
import { VanillaArticle, VanillaKnowledgeCategory } from "../utils/types";
import {
  createArticle,
  createKnowledgeCategory,
  deleteArticle,
  deleteKnowledgeCategory,
  editArticle,
  editKnowledgeCategory,
  getAllArticles,
  getKnowedgeCategories,
} from "../VanillaAPI";
import {
  directoryExists,
  getMarkdownImageSrcMap,
  markdownToString,
} from "./utils";

export const addVanillaCategoryToProcedure = (
  procedure: VanillaKnowledgeCategory,
  vanillaReturn: VanillaKnowledgeCategory[]
) => {
  const tempVanillaReturn: VanillaKnowledgeCategory[] = vanillaReturn || [];
  let procedureTarget: VanillaKnowledgeCategory = procedure;
  const match = tempVanillaReturn.filter(
    (v) => v.name === procedureTarget.name
  );
  if (match.length) {
    procedureTarget = {
      ...procedureTarget,
      knowledgeCategoryID: match[0].knowledgeCategoryID,
      parentID: match[0].parentID,
      knowledgeBaseID: match[0].knowledgeBaseID,
      sortChildren: match[0].sortChildren,
      sort: match[0].sort,
      url: match[0].url,
      foreignID: match[0].foreignID,
    };
  }
  return procedureTarget;
};

export const addVanillaArticleInfoToProcedure = (
  procedure: VanillaArticle,
  vanillaArticles: VanillaArticle[]
) => {
  let procedureTarget = procedure;
  const match = vanillaArticles.filter((v) => v.name === procedureTarget.name);

  if (match.length) {
    procedureTarget = {
      ...procedureTarget,
      knowledgeCategoryID: match[0].knowledgeCategoryID,
      articleID: match[0].articleID, // used in path
      locale: "en",
      format: "markdown",
    };
  }

  return procedureTarget;
};

export const addVanillaArticlesToProcedures = (
  procedures: (VanillaArticle | VanillaKnowledgeCategory)[],
  vanillaArticles: VanillaArticle[]
) => {
  const proceduresWithVanillaCategoryInfo: (
    | VanillaArticle
    | VanillaKnowledgeCategory
  )[] = [];
  procedures.forEach((p) => {
    if (isArticleType(p)) {
      proceduresWithVanillaCategoryInfo.push(
        addVanillaArticleInfoToProcedure(p, vanillaArticles)
      );
    } else {
      proceduresWithVanillaCategoryInfo.push(p);
    }
  });
  return proceduresWithVanillaCategoryInfo;
};

export const addImagesToArticleMarkdown = async (markdownAsString: string) => {
  if (!markdownAsString || !markdownAsString.length) {
    return "";
  }
  const alteredMarkdown = markdownAsString;
  const imageSrcMap = getMarkdownImageSrcMap(alteredMarkdown);
  if (!imageSrcMap.length) {
    return alteredMarkdown;
  }
  return alteredMarkdown;
};

export const procedureToArticle = async (
  httpClient: HttpClient,
  procedureWorkedOn: VanillaArticle,
  previousknowledgeCategoryID: null | number,
  bodyMock?: string
): Promise<VanillaArticle> => {
  let tempProcedureWorkedOn = { ...procedureWorkedOn };
  const bodyOfArticle = bodyMock
    ? bodyMock
    : markdownToString(tempProcedureWorkedOn?.path);
  tempProcedureWorkedOn.body = await addImagesToArticleMarkdown(bodyOfArticle);
  // add images to body

  if (
    tempProcedureWorkedOn.articleID === null &&
    previousknowledgeCategoryID !== null
  ) {
    if (!previousknowledgeCategoryID) {
      return tempProcedureWorkedOn;
    }
    tempProcedureWorkedOn.knowledgeCategoryID = previousknowledgeCategoryID;

    if (tempProcedureWorkedOn.body != FLAG_FOR_DELETE) {
      const articleRequest: Partial<VanillaArticle> = {
        body: tempProcedureWorkedOn.body,
        format: "markdown",
        knowledgeCategoryID: previousknowledgeCategoryID,
        locale: "en",
        name: tempProcedureWorkedOn.name,
        sort: 0,
      };
      const createdArticle = await createArticle(httpClient, articleRequest);

      if (createdArticle?.articleID) {
        tempProcedureWorkedOn = addVanillaArticleInfoToProcedure(
          tempProcedureWorkedOn,
          [createdArticle]
        );
      }
    }
  } else {
    if (
      tempProcedureWorkedOn.body &&
      tempProcedureWorkedOn.body !== FLAG_FOR_DELETE &&
      tempProcedureWorkedOn.articleID
    ) {
      const articleRequest: Partial<VanillaArticle> = {
        body: tempProcedureWorkedOn.body,
        format: "markdown",
        knowledgeCategoryID: previousknowledgeCategoryID,
        locale: "en",
        name: tempProcedureWorkedOn.name,
        sort: 0,
      };

      const editedArticle = await editArticle(
        httpClient,
        tempProcedureWorkedOn.articleID,
        articleRequest
      );

      if (editedArticle?.articleID) {
        procedureWorkedOn = addVanillaArticleInfoToProcedure(
          tempProcedureWorkedOn,
          [editedArticle]
        );
      }
    }
    if (
      tempProcedureWorkedOn.body === FLAG_FOR_DELETE &&
      tempProcedureWorkedOn.articleID
    ) {
      const deletedArticle = await deleteArticle(
        httpClient,
        tempProcedureWorkedOn.articleID
      );

      if (deletedArticle) {
        tempProcedureWorkedOn = addVanillaArticleInfoToProcedure(
          tempProcedureWorkedOn,
          [deletedArticle]
        );
      }
    }
    // tempProcedureWorkedOn.body = bodyMock ? bodyMock : FLAG_FOR_DELETE;
  }

  return tempProcedureWorkedOn;
};

export const procedureToKnowledgeCategory = async (
  httpClient: HttpClient,
  procedureWorkedOn: VanillaKnowledgeCategory,
  previousknowledgeCategoryID: null | number,
  mockShouldEdit?: boolean
): Promise<VanillaKnowledgeCategory> => {
  let tempProcedureWorkedOn = { ...procedureWorkedOn };

  if (tempProcedureWorkedOn.knowledgeCategoryID === null) {
    const reqData = {
      name: tempProcedureWorkedOn.name,
      parentID: previousknowledgeCategoryID ? previousknowledgeCategoryID : 1,
    };

    const createdKnowledgeCategory = await createKnowledgeCategory(
      httpClient,
      reqData
    );

    if (createdKnowledgeCategory) {
      tempProcedureWorkedOn = addVanillaCategoryToProcedure(
        tempProcedureWorkedOn,
        [createdKnowledgeCategory]
      );
    }
  } else {
    const reqData = {
      name: tempProcedureWorkedOn.name,
      parentID: previousknowledgeCategoryID ? previousknowledgeCategoryID : 1,
    };
    if (mockShouldEdit || directoryExists(tempProcedureWorkedOn?.path)) {
      const categoryEdit = await editKnowledgeCategory(
        httpClient,
        tempProcedureWorkedOn.knowledgeCategoryID,
        reqData
      );
      if (categoryEdit) {
        tempProcedureWorkedOn = addVanillaCategoryToProcedure(
          tempProcedureWorkedOn,
          [categoryEdit]
        );
      }
    } else {
      const categoryDelete = await deleteKnowledgeCategory(
        httpClient,
        tempProcedureWorkedOn.knowledgeCategoryID
      );
      if (categoryDelete) {
        tempProcedureWorkedOn = {
          ...tempProcedureWorkedOn,
          description: "deleted",
        };
      }
    }
  }
  return tempProcedureWorkedOn;
};

export const getPreviousKnowledgeID = (
  completedProcedures: (VanillaArticle | VanillaKnowledgeCategory)[]
): number | null => {
  const tempCompletedProcedures = [...completedProcedures];
  const categoryOnlyProcedures = tempCompletedProcedures.filter(
    (p) => p.procedureType === "Category"
  );
  if (!categoryOnlyProcedures.length) {
    return null;
  }
  const lastCategoryInArray = categoryOnlyProcedures.pop();

  return lastCategoryInArray?.knowledgeCategoryID || null;
};

export const useProceduresForVanillaRequests = async (
  procedures: (VanillaArticle | VanillaKnowledgeCategory)[],
  completedProcedures?: (VanillaArticle | VanillaKnowledgeCategory)[],
  httpHandling: HttpClient = new HttpClient()
): Promise<(VanillaArticle | VanillaKnowledgeCategory)[]> => {
  const httpClient = httpHandling;
  const tempCompletedProcedures = completedProcedures
    ? [...completedProcedures]
    : [];
  const tempProcedures = [...procedures];
  let previousknowledgeCategoryID = null;

  // this needs to be syncronous, going in order of the procedures.
  // for example - a new folder with a markdown file, we need to make a
  // new knowledgeCategory and use its id to create the new article
  let procedureWorkedOn = tempProcedures.shift();

  if (!procedureWorkedOn) {
    return tempCompletedProcedures;
  }

  previousknowledgeCategoryID = getPreviousKnowledgeID(tempCompletedProcedures);
  if (isArticleType(procedureWorkedOn)) {
    procedureWorkedOn = await procedureToArticle(
      httpClient,
      procedureWorkedOn,
      previousknowledgeCategoryID
    );
  }
  if (isKnowledgeCategoryType(procedureWorkedOn)) {
    procedureWorkedOn = await procedureToKnowledgeCategory(
      httpClient,
      procedureWorkedOn,
      previousknowledgeCategoryID
    );
  }

  tempCompletedProcedures.push(procedureWorkedOn);

  return await useProceduresForVanillaRequests(
    tempProcedures,
    tempCompletedProcedures,
    httpHandling
  );
};

export const proceduresToVanillaRequests = async (
  procedures: (VanillaArticle | VanillaKnowledgeCategory)[]
) => {
  if (procedures && procedures.length) {
    const httpClient = new HttpClient();

    const existingknowledgeCategoryInfo = await getKnowedgeCategories(
      httpClient
    );

    const articles = await getAllArticles(
      httpClient,
      existingknowledgeCategoryInfo
    );

    const proceduresWithVanillaCategories = procedures.map((p) => {
      if (isKnowledgeCategoryType(p)) {
        return addVanillaCategoryToProcedure(p, existingknowledgeCategoryInfo);
      }
      return p;
    });

    const proceduresWithArticleInfo = articles?.length
      ? addVanillaArticlesToProcedures(
          proceduresWithVanillaCategories,
          articles
        )
      : proceduresWithVanillaCategories;

    const finishedProcedures = await useProceduresForVanillaRequests(
      proceduresWithArticleInfo
    );
    console.log(finishedProcedures, "Finished");
    return finishedProcedures;

    // make categories first, return their ID on the procedure so the article can be tied to it.
  }
};
