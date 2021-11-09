import HttpClient from './httpClient';
import { VanillaArticle, VanillaKnowledgeCategory } from './types';

export const getKnowedgeCategories = async (client: HttpClient) => {
  try {
    const categories = (await client.get('knowledge-categories')) as {
      data: VanillaKnowledgeCategory[];
    };

    if (categories) {
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
) => {
  // only required - totally not the same as the docs
  // {"name":"bryan test categroy two","parentID":1}
  try {
    const category = await client.post('/knowledge-category', bodyOfRequest);

    if (category) {
      return category.data;
    }
  } catch (e) {
    console.error(e, 'Create Knowledge Category error');
  }

  return {};
};

export const deleteKnowledgeCategory = async(
  client: HttpClient,
  knowledgeCategoryID: number
)=>{
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
  knowledgeCategoryID: number
) => {
  try {
    const articles = (await client.get('/articles', {
      params: {
        limit: 500,
        knowledgeCategoryID, // docs dont say it.. but this is required
      },
    })) as {
      data: VanillaArticle[];
    };

    if (articles) {
      return articles.data;
    }
  } catch (e) {
    console.log(e, 'errrrr');
  }

  return [];
};

export const getAllArticles = async (
  client: HttpClient,
  existingknowledgeCategoryInfo: VanillaKnowledgeCategory[]
) => {
  const allArticlesPromises = existingknowledgeCategoryInfo.map((c) =>
    getArticles(client, c.knowledgeCategoryID)
  );
  let resolved: VanillaArticle[][] = [];
  for (
    let promiseIndex = 0;
    promiseIndex < allArticlesPromises.length;
    promiseIndex++
  ) {
    const resolvedPromise = await allArticlesPromises[promiseIndex];
    resolved.push(resolvedPromise);
  }

  if (resolved) {
    return resolved.flat();
  }

  return [];
};



export const createArticle = async (
  client: HttpClient,
  bodyOfRequest: Partial<VanillaArticle>
) => {
  // only required - totally not the same as the docs
  // {
  //   "body": "this is the body of the article",
  //   "format": "markdown",
  //  "knowledgeCategoryID": 10,
  //   "locale": "en",
  //   "name": "postman - article five",
  //   "sort": 0}
  try {
    const article = await client.post('/articles', bodyOfRequest);

    if (article) {
      return article.data;
    }
  } catch (e) {
    console.error(e, 'Create Article error');
  }

  return {};
};

export const deleteArticle = async (
  client: HttpClient,
  articleID: number
)=>{

  try {
    const article = await client.patch(
      `/articles/${articleID}/status`,{articleID, status:'deleted'});

    if (article) {
      return article.data;
    }
  } catch (e) {
    console.error(e, 'Create Article error');
  }

  return {};
}


export const editArticle = async (
  client: HttpClient,
  articleID: number,
  edits:Partial<VanillaArticle>
)=>{

  try {
    const article = await client.patch(`/articles/${articleID}`,edits);

    if (article) {
      return article.data;
    }
  } catch (e) {
    console.error(e, 'Create Article error');
  }

  return {};
}