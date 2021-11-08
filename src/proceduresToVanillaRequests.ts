import HttpClient from './httpClient';
// import { getKnowledgeCategoryReturn } from './mocks';
import { Article, KnowledgeCategory, VanillaKnowledgeCategory } from './types';

export const handleKnowledgeCategorysSuccess = (success: {
  data: VanillaKnowledgeCategory[];
}) => {
  console.log(success.data, 'next');
  return success.data;
};

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
      data: Article[];
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
  let resolved: Article[][] = [];
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

const isKnowledgeCategory = (
  procedure: Article | KnowledgeCategory
): procedure is KnowledgeCategory => {
  return (procedure as KnowledgeCategory).hasChildren;
};

const addVanillaCategoryToProcedure = (
  procedure: Article | KnowledgeCategory,
  vanillaReturn: VanillaKnowledgeCategory[]
) => {
  if (isKnowledgeCategory(procedure)) {
    let procedureTarget: KnowledgeCategory = procedure;
    const match = vanillaReturn.filter(
      (v) => v.name === procedureTarget.displayName
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
  }
  return procedure;
};

const addExistingKnowledgeCategoriesToProceedures = (
  procedures: (Article | KnowledgeCategory)[],
  vanillaReturn: VanillaKnowledgeCategory[]
) => {
  if (!vanillaReturn || !vanillaReturn.length) {
    return procedures;
  }
  const proceduresWithVanillaCategoryInfo: (Article | KnowledgeCategory)[] = [];
  procedures.forEach((p) => {
    proceduresWithVanillaCategoryInfo.push(
      addVanillaCategoryToProcedure(p, vanillaReturn)
    );
  });

  return proceduresWithVanillaCategoryInfo;
};

export const proceduresToVanillaRequests = async (
  procedures: (Article | KnowledgeCategory)[]
) => {
  console.log(
    'PPPPPPPPPPPPPPPPPPPPPP--------',
    procedures,
    '------PPPPPPPPPPPPPPPPPPPPPP'
  );
  if (procedures && procedures.length) {
    const httpClient = new HttpClient();

    const existingknowledgeCategoryInfo = await getKnowedgeCategories(
      httpClient
    );
    console.log(existingknowledgeCategoryInfo, 'existingknowledgeCategoryInfo');
    const articles = await getAllArticles(
      httpClient,
      existingknowledgeCategoryInfo
    );
    console.log('arty', articles);

    const proceduresWithVanillaCategories =
      addExistingKnowledgeCategoriesToProceedures(
        procedures,
        existingknowledgeCategoryInfo
      );

    console.log(
      proceduresWithVanillaCategories,
      'proceduresWithVanillaCategories'
    );
  }
};
