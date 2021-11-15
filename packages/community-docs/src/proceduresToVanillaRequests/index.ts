
import HttpClient from '../httpClient';
import { VanillaArticle, VanillaKnowledgeCategory } from '../utils/types';
import { getAllArticles, getKnowedgeCategories, createKnowledgeCategory, createArticle, editArticle, editKnowledgeCategory, deleteArticle } from '../VanillaAPI';
import { FLAG_FOR_DELETE } from '../utils/constants'
import { markdownToString } from './utils'
import {
  isKnowledgeCategoryType,
  isArticleType
} from '../utils'




export const addVanillaCategoryToProcedure = (
  procedure: VanillaKnowledgeCategory,
  vanillaReturn: VanillaKnowledgeCategory[]
) => {

  const tempVanillaReturn: VanillaKnowledgeCategory[] = vanillaReturn || []
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
      locale: 'en',
      format: 'markdown',
    };
  }

  return procedureTarget;
};

export const addVanillaArticlesToProcedures = (
  procedures: (VanillaArticle | VanillaKnowledgeCategory)[],
  vanillaArticles: VanillaArticle[]
) => {
  const proceduresWithVanillaCategoryInfo: (VanillaArticle | VanillaKnowledgeCategory)[] = [];
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



const procedureToArticle = async (
  httpClient: HttpClient,
  procedureWorkedOn: VanillaArticle,
  previousknowledgeCategoryID: null | number,

): Promise<VanillaArticle> => {
  let tempProcedureWorkedOn = { ...procedureWorkedOn }

  if (tempProcedureWorkedOn.articleID === null && previousknowledgeCategoryID) {
    // create a new article
    // needs the knowledgeCategory of previous procedure

    if (!previousknowledgeCategoryID) {

      return tempProcedureWorkedOn
    }
    const body = markdownToString(tempProcedureWorkedOn?.path)

    if (body != FLAG_FOR_DELETE) {
      const articleRequest: Partial<VanillaArticle> = {
        body,
        format: "markdown",
        knowledgeCategoryID: previousknowledgeCategoryID,
        locale: "en",
        name: tempProcedureWorkedOn.name,
        sort: 0
      }
      const createdArticle = await createArticle(httpClient, articleRequest)
      if (createdArticle?.articleID) {
        tempProcedureWorkedOn = addVanillaArticleInfoToProcedure(procedureWorkedOn, [createdArticle])
      }

    }


  } else {
    const body = markdownToString(tempProcedureWorkedOn.path);

    if (body && body !== FLAG_FOR_DELETE && tempProcedureWorkedOn.articleID) {
      const articleRequest: Partial<VanillaArticle> = {
        body,
        format: "markdown",
        knowledgeCategoryID: previousknowledgeCategoryID,
        locale: "en",
        name: tempProcedureWorkedOn.name,
        sort: 0
      }
      const createdArticle = await editArticle(httpClient, tempProcedureWorkedOn.articleID, articleRequest)
      if (createdArticle?.articleID) {
        procedureWorkedOn = addVanillaArticleInfoToProcedure(tempProcedureWorkedOn, [createdArticle])
      }
    }
    if (body === FLAG_FOR_DELETE && tempProcedureWorkedOn.articleID) {

      const deletedArticle = await deleteArticle(httpClient, tempProcedureWorkedOn.articleID)
      if (deletedArticle) {
        tempProcedureWorkedOn = deletedArticle
      }
    }
    // we dont care if they dont have a body. or articleID. They dont exist and we dont have anything to post...? 
    tempProcedureWorkedOn.body = FLAG_FOR_DELETE

  }
  return tempProcedureWorkedOn
}

const procedureToKnowledgeCategory = async (
  httpClient: HttpClient,
  procedureWorkedOn: VanillaKnowledgeCategory,
  previousknowledgeCategoryID: null | number | undefined,

): Promise<VanillaKnowledgeCategory> => {
  let tempProcedureWorkedOn = { ...procedureWorkedOn }

  if (!tempProcedureWorkedOn.knowledgeCategoryID) {
    // create a KnowledgeCategory
    const reqData = {
      name: tempProcedureWorkedOn.name,
      parentID: previousknowledgeCategoryID ? previousknowledgeCategoryID : 1
    }

    const createdKnowledgeCategory = await createKnowledgeCategory(httpClient, reqData)

    if (createdKnowledgeCategory) {
      tempProcedureWorkedOn = addVanillaCategoryToProcedure(tempProcedureWorkedOn, [createdKnowledgeCategory])

    }


  } else {

    const reqData = { name: tempProcedureWorkedOn.name, parentID: previousknowledgeCategoryID ? previousknowledgeCategoryID : 1 }
    const categoryEdit = await editKnowledgeCategory(httpClient, tempProcedureWorkedOn.knowledgeCategoryID, reqData)
    if (categoryEdit) {
      tempProcedureWorkedOn = addVanillaCategoryToProcedure(tempProcedureWorkedOn, [categoryEdit])
    }

  }
  return tempProcedureWorkedOn
}
const getPreviousKnowledgeID = (
  completedProcedures: (VanillaArticle | VanillaKnowledgeCategory)[],
  procedureWorkedOn: (VanillaArticle | VanillaKnowledgeCategory)
): number | null => {
  // articles HAVE to reside in a knowledgeCategory. when TWO or more procedures are in a row, we need to find the closest (before) knowledgeCategory
  if (!completedProcedures?.length) {
    return null
  }
  let previousknowledgeCategoryID = completedProcedures[completedProcedures.length - 1]?.knowledgeCategoryID || null;

  if (procedureWorkedOn.fileName) {
    const proceduredPathSplit = procedureWorkedOn.path?.split('/')
    const indexOfFilename = proceduredPathSplit?.indexOf(procedureWorkedOn.fileName)

    for (let pIndex = completedProcedures.length - 1; pIndex >= 0; pIndex--) {

      if (proceduredPathSplit && indexOfFilename && completedProcedures[pIndex].fileName === proceduredPathSplit[indexOfFilename - 1]) {
        previousknowledgeCategoryID = completedProcedures[pIndex].knowledgeCategoryID
      }


    }
  }

  return previousknowledgeCategoryID

}
export const useProceduresForVanillaRequests = async (
  procedures: (VanillaArticle | VanillaKnowledgeCategory)[],

  completedProcedures?: (VanillaArticle | VanillaKnowledgeCategory)[]
) => {

  const httpClient = new HttpClient();
  const tempCompletedProcedures = completedProcedures ? [...completedProcedures] : []
  const tempProcedures = [...procedures]
  let previousknowledgeCategoryID = null


  // this needs to be syncronous, going in order of the procedures. 
  // for example - a new folder with a markdown file, we need to make a 
  // new knowledgeCategory and use its id to create the new article
  let procedureWorkedOn = tempProcedures.shift()

  if (!procedureWorkedOn) {

    return tempCompletedProcedures
  }
  previousknowledgeCategoryID = getPreviousKnowledgeID(tempCompletedProcedures, procedureWorkedOn)
  if (isArticleType(procedureWorkedOn)) {
    procedureWorkedOn = await procedureToArticle(
      httpClient,
      procedureWorkedOn,
      previousknowledgeCategoryID,

    )

  } else if (isKnowledgeCategoryType(procedureWorkedOn)) {

    procedureWorkedOn = await procedureToKnowledgeCategory(httpClient,
      procedureWorkedOn,
      previousknowledgeCategoryID)
  }

  tempCompletedProcedures.push(procedureWorkedOn)
  await useProceduresForVanillaRequests(tempProcedures, tempCompletedProcedures)
}

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


    const proceduresWithVanillaCategories = procedures.map(p => {
      if (isKnowledgeCategoryType(p)) {
        return addVanillaCategoryToProcedure(
          p,
          existingknowledgeCategoryInfo
        );
      }
      return p
    })


    const proceduresWithArticleInfo = articles?.length ? addVanillaArticlesToProcedures(
      proceduresWithVanillaCategories,
      articles
    ) : proceduresWithVanillaCategories;

    const finishedProcedures = await useProceduresForVanillaRequests(proceduresWithArticleInfo)
    console.log(finishedProcedures, 'Finished')
    return finishedProcedures



    // make categories first, return their ID on the procedure so the article can be tied to it.
  }
};
