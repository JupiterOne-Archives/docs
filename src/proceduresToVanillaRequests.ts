import HttpClient from './httpClient';
// import { getKnowledgeCategoryReturn } from './mocks';
import { Article, KnowledgeCategory, VanillaKnowledgeCategory } from './types';

export const handleKnowledgeCategorysSuccess = (success: {
  data: VanillaKnowledgeCategory[];
}) => {
  console.log(success.data, 'next');
  return success.data;
};

export const getKnowedgeCategoriesAddInfoToProcedures = async (
  client: HttpClient,
  procedures: (Article | KnowledgeCategory)[]
) => {
  const categories = (await client.get('knowledge-categories')) as {
    data: VanillaKnowledgeCategory[];
  };
  console.log(categories, 'handleKnowledgeCategorysSuccess');
  if (categories) {
    return addExistingKnowledgeCategoriesProps(procedures, categories.data);
  }
};

const isKnowledgeCategory = (
  procedure: Article | KnowledgeCategory
): procedure is KnowledgeCategory => {
  return (procedure as KnowledgeCategory).hasChildren;
};

const addExistingKnowledgeCategoriesProps = (
  procedures: (Article | KnowledgeCategory)[],
  vanillaReturn: VanillaKnowledgeCategory[]
) => {
  return procedures.map((p) => {
    if (isKnowledgeCategory(p)) {
      vanillaReturn.forEach((v) => {
        if (v.name === p.displayName) {
          return {
            ...p,
            knowledgeCategoryID: v.knowledgeCategoryID,
            parentID: v.parentID,
            knowledgeBaseID: v.knowledgeBaseID,
            sortChildren: v.sortChildren,
            sort: v.sort,
            url: v.url,
            foreignID: v.foreignID,
          };
        }
      });
    } else {
      return p;
    }
  });
};
export const fetchWrapper = async (
  procedures: (Article | KnowledgeCategory)[]
) => {
  if (procedures && procedures.length) {
    const httpClient = new HttpClient();
    const existingKnowledgeBases = getKnowedgeCategoriesAddInfoToProcedures(
      httpClient,
      procedures
    );

    if (existingKnowledgeBases) {
      // addExistingKnowledgeCategoriesProps(procedures, existingKnowledgeBases);
      console.log('procedures', procedures);
      console.log(existingKnowledgeBases, 'existingKnowledgeBases');
    }
  }
};
