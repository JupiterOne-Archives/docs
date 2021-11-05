import Axios from 'axios-observable';
import { retry } from 'rxjs';
// import { getKnowledgeCategoryReturn } from './mocks';
import { Article, KnowledgeCategory, VanillaKnowledgeCategory } from './types';
const Arthorization =
  '';

export const onErrorWithKnowledge = (e: any) => {
  console.log(e, 'next');
};
// const mocked = () => {
//   return new Promise((resolve) => resolve(getKnowledgeCategoryReturn));
// };
export const handleKnowledgeCategorysSuccess = (success: {
  data: VanillaKnowledgeCategory[];
}) => {
  console.log(success.data, 'next');
  return success.data;
};

export const getKnowedgeBases = async () => {
  return Axios.request({
    method: 'GET',
    url: 'https://jupiterone.vanillastaging.com/api/v2/knowledge-categories',
    headers: {
      Arthorization,
    },
  })

    .pipe(retry(3))
    .subscribe({
      complete: () => console.log('complete'),
      next: handleKnowledgeCategorysSuccess,
      error: onErrorWithKnowledge,
    });
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
    const existingKnowledgeBases = getKnowedgeBases();
    // if(existingKnowledgeBases){
    addExistingKnowledgeCategoriesProps(procedures, existingKnowledgeBases);
    console.log('procedures', procedures);
    console.log(existingKnowledgeBases, 'existingKnowledgeBases');
    // }
  }
};
