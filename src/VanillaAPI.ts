import HttpClient from './httpClient';
import { VanillaArticle, VanillaKnowledgeCategory } from './types';


interface ErrorType {

  message:string;
  status:number;
  errors:any[]
}
const isErrorType = <T>(response:ErrorType|T):response is ErrorType=>{
  return (response as ErrorType)?.message!==undefined
}
export const getKnowedgeCategories = async (client: HttpClient):Promise<VanillaKnowledgeCategory[]> => {
  try {
    const categories = (await client.get('knowledge-categories')) as {
      data: VanillaKnowledgeCategory[]|ErrorType;
    };

    if (!isErrorType(categories?.data)) {
      return categories.data;
    }
  } catch (error) {
    console.error(error, 'Error in getting categories');
  }

  return [];
};

export const createKnowledgeCategory = async (
  client: HttpClient,
  bodyOfRequest: Partial<VanillaKnowledgeCategory>
):Promise<VanillaKnowledgeCategory|undefined> => {
  // only required - totally not the same as the docs
  // {"name":"bryan test categroy two","parentID":1}

  try {
    const category = (await client.post('/knowledge-categories', bodyOfRequest)) as {
      data: VanillaKnowledgeCategory|ErrorType;
    };

    if (!isErrorType(category?.data)) {
      return category.data;
    }
  } catch (e) {
    console.error(e, 'Create Knowledge Category error', {e});
  }


};

export const editKnowledgeCategory = async (
  client: HttpClient,
  knowledgeCategoryID:number,
  bodyOfRequest: Partial<VanillaKnowledgeCategory>
):Promise<VanillaKnowledgeCategory|undefined> => {


  try {
    const category = (await client.patch(`/knowledge-categories/${knowledgeCategoryID}`, bodyOfRequest)) as {
      data: VanillaKnowledgeCategory|ErrorType;
    };

    if (!isErrorType(category.data)) {
      return category.data;
    }
  } catch (e) {
    console.error(e, 'Create Knowledge Category error');
  }


};
export const deleteKnowledgeCategory = async(
  client: HttpClient,
  knowledgeCategoryID: number
):Promise<boolean>=>{
  let success = true
  try {
    await client.delete(`knowledge-categories/${knowledgeCategoryID}`)

  
  } catch (e) {
    success = false
    console.error(e, 'error deleting');
  }

  return success
}

export const getArticles = async (
  client: HttpClient,
  knowledgeCategoryID: number | null | undefined
):Promise<VanillaArticle[]> => {
  try {
    if(!knowledgeCategoryID){
      return []
    }
    const articles = (await client.get('/articles', {
      params: {
        limit: 500,
        knowledgeCategoryID, // docs dont say it.. but this is required
      },
    })) as {
      data: VanillaArticle[]|ErrorType;
    };

    if (!isErrorType(articles.data)) {
      return articles.data;
    }
  } catch (e) {
    console.error({e}, 'errrrr');
  }

  return [];
};

export const getAllArticles = async (
  client: HttpClient,
  existingknowledgeCategoryInfo: VanillaKnowledgeCategory[]
):Promise<VanillaArticle[]> => {
  const tempExistingknowledgeCategoryInfo: VanillaKnowledgeCategory[] = existingknowledgeCategoryInfo?[...existingknowledgeCategoryInfo]:[]
  const filteredExistingknowledgeCategoryInfo = tempExistingknowledgeCategoryInfo.filter(ek=>!!ek.knowledgeCategoryID)
  const allArticlesPromises = filteredExistingknowledgeCategoryInfo.map((c) =>getArticles(client, c.knowledgeCategoryID));
  let resolved: VanillaArticle[][] = [];
  for (
    let promiseIndex = 0;
    promiseIndex < allArticlesPromises.length;
    promiseIndex++
  ) {
    const resolvedPromise = await allArticlesPromises[promiseIndex];
    if(resolvedPromise){
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
):Promise<VanillaArticle|undefined> => {

  // only required - totally not the same as the docs
  // {
  //   "body": "this is the body of the article",
  //   "format": "markdown",
  //  "knowledgeCategoryID": 10,
  //   "locale": "en",
  //   "name": "postman - article five",
  //   "sort": 0}

  try {
    const article = (await client.post('/articles', bodyOfRequest)) as {
      data: VanillaArticle|ErrorType;
    };

    if(!isErrorType(article.data)){
      return article.data;
    }
  } catch (e) {

    console.error(e, 'Create Article error');

  }

  
};

export const deleteArticle = async (
  client: HttpClient,
  articleID: number
):Promise<VanillaArticle|undefined> => {

  try {
    const article = (await client.patch(
      `/articles/${articleID}/status`,{articleID, status:'deleted'})) as {
        data: VanillaArticle|ErrorType;
      };;

    if (!isErrorType(article.data)) {
      return article.data;
    }
  } catch (e) {
    console.error(e, 'Create Article error', {e});
  }


}


export const editArticle = async (
  client: HttpClient,
  articleID: number,
  edits:Partial<VanillaArticle>
):Promise<VanillaArticle|undefined>=>{

  try {
    const article = (await client.patch(`/articles/${articleID}`,edits)) as {
      data: VanillaArticle|ErrorType;
    };

    if (!isErrorType(article.data)) {
      return article.data;
    }
  } catch (e) {
    console.error(e, 'Create Article error',{e});
  }


}