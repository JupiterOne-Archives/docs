import fs from 'fs';
import HttpClient from './httpClient';
import { Article, KnowledgeCategory, VanillaKnowledgeCategory } from './types';
import { getAllArticles, getKnowedgeCategories } from './VanillaAPI';

export const markdownToString = async (filePath: string) => {
  fs.readFile(filePath, (err, buffer) => {
    if (err) {
      console.error(err, 'Error with file buffer', filePath);
      return;
    }
    return buffer.toString();
  });
};

const isKnowledgeCategoryType = (
  procedure: Article | KnowledgeCategory
): procedure is KnowledgeCategory => {
  return (procedure as KnowledgeCategory).hasChildren;
};

const isArticleType = (
  procedure: Article | KnowledgeCategory
): procedure is Article => {
  return Boolean((procedure as Article).format);
};

const addVanillaCategoryToProcedure = (
  procedure: Article | KnowledgeCategory,
  vanillaReturn: VanillaKnowledgeCategory[]
) => {
  if (isKnowledgeCategoryType(procedure)) {
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

export const addVanillaArticleInfoToProcedure = (
  procedure: Article,
  vanillaArticles: Article[]
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
  procedures: (Article | KnowledgeCategory)[],
  vanillaArticles: Article[]
) => {
  const proceduresWithVanillaCategoryInfo: (Article | KnowledgeCategory)[] = [];
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

export const proceduresToVanillaRequests = async (
  procedures: (Article | KnowledgeCategory)[]
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

    const proceduresWithVanillaCategories =
      addExistingKnowledgeCategoriesToProceedures(
        procedures,
        existingknowledgeCategoryInfo
      );
    console.log(
      'proceduresWithVanillaCategories((((((',
      proceduresWithVanillaCategories,
      'proceduresWithVanillaCategories'
    );
    const proceduresWithArticleInfo = addVanillaArticlesToProcedures(
      procedures,
      articles
    );
    console.log(
      'proceduresWithArticleInfo*********FINAL FORM',
      proceduresWithArticleInfo,
      'FINAL FORM---proceduresWithVanillaCategories'
    );
    // make categories first, return their ID on the procedure so the article can be tied to it.
  }
};
