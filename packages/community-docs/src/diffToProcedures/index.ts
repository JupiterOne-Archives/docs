// name from the view point of changed files

import { VanillaArticle, VanillaKnowledgeCategory,ProcedureTypeEnum } from '../utils/types';
import {
  filterDiffs,
  createDisplayName
}from './utils'


export const createArticleChange = (
  articleChanges: string, // diff string of a file
  path: string
): VanillaArticle => {
  let displayName = '';
// we dont want articles to be called 'index'
  if (articleChanges.startsWith('index')) {
    const pathSplit = path.split('/');
    const replacementName = pathSplit[pathSplit.length - 2];
    displayName = createDisplayName(replacementName);
  } else {
 
    const splitOnExtention = articleChanges.split('.')[0];
    displayName = createDisplayName(splitOnExtention);
  }

  const kb: VanillaArticle = {
    knowledgeCategoryID: null, //will need to create it and get it- for sub folders
    articleID: null,
    fileName: articleChanges,
    name: displayName,
    body: '',
    path: path,
    format: 'markdown',
    locale: 'en',
    procedureType:ProcedureTypeEnum.Article
  };

  return kb;
};

export interface HandleNestedKnowledgeCategoryChangesReturn {
  completed?: (VanillaKnowledgeCategory | VanillaArticle)[];
  knowledgeCategoriesAlreadyHandled?: string[];
}
export interface HandleNestedKnowledgeCategoryChangesProps {
  nestedCategoryChanges: string[];
  completed?: (VanillaKnowledgeCategory | VanillaArticle)[];
  knowledgeCategoriesAlreadyHandled?: string[];
  originalChangesArray: string[];
  parentIndex: number;
}
// recursively create Knowledge categories per directory change. One parent KnowledgeCategory per directory.
export const handleNestedKnowledgeCategoryChanges = (
  input: HandleNestedKnowledgeCategoryChangesProps
): HandleNestedKnowledgeCategoryChangesReturn => {
  if (input.nestedCategoryChanges.length === 0) {
    return {
      completed: input.completed||[],
    };
  }

  let tempParentIndex = input.parentIndex;

  const tempNestedCategoryChanges = input.nestedCategoryChanges;
  const tempHandled = input.knowledgeCategoriesAlreadyHandled || [];
  const tempCompleted = input.completed || [];
  const target = tempNestedCategoryChanges.shift();

  if (target === undefined) {
    return {
      completed: input.completed,
      knowledgeCategoriesAlreadyHandled:
        input.knowledgeCategoriesAlreadyHandled,
    };
  }

  const directorySplitBySlash = target.split('/');

  const identifierForDirectoryOrFile = directorySplitBySlash.shift();

  const createAnotherIterationForDirectory = directorySplitBySlash.length >= 1;

  if (createAnotherIterationForDirectory) {
    tempNestedCategoryChanges.unshift(directorySplitBySlash.join('/'));
  }

  if (
    identifierForDirectoryOrFile &&
    !tempHandled.includes(identifierForDirectoryOrFile)
  ) {
    tempHandled.push(identifierForDirectoryOrFile);
    if (
      identifierForDirectoryOrFile.endsWith('.md') ||
      identifierForDirectoryOrFile.endsWith('.rst')
    ) {
      const markDownFileToKnowledgeCategory = createArticleChange(
        target,
        input.originalChangesArray[tempParentIndex]
      );
      tempCompleted.push(markDownFileToKnowledgeCategory);
    } else {
      const displayName = createDisplayName(identifierForDirectoryOrFile);

      const kb: VanillaKnowledgeCategory = {
        parentID: null, //will need to get it, for sub folders
        knowledgeBaseID: 1, //will need to get it for nested. the docs knowledge base is 1 so for non nested we can use that
        name: displayName,
        fileName:identifierForDirectoryOrFile,
        desciption: '',
        knowledgeCategoryID:null,
        path: input.originalChangesArray[tempParentIndex],
        childrenPath: identifierForDirectoryOrFile,
        procedureType:ProcedureTypeEnum.Category
      };
      tempCompleted.push(kb);

      const nextCategoryAddition = target.substring(
        identifierForDirectoryOrFile.length + 1 // plus one for the slash
      );

      if (nextCategoryAddition.length) {
        tempNestedCategoryChanges.push(nextCategoryAddition);
      }
    }
  }

  if (!createAnotherIterationForDirectory) {
    tempParentIndex += 1;
  }
  if (tempNestedCategoryChanges.length) {
    handleNestedKnowledgeCategoryChanges({
      nestedCategoryChanges: tempNestedCategoryChanges,
      completed: tempCompleted,
      knowledgeCategoriesAlreadyHandled: tempHandled,
      originalChangesArray: input.originalChangesArray,
      parentIndex: tempParentIndex,
    });
  }
  return {
    completed: tempCompleted,
    knowledgeCategoriesAlreadyHandled: tempHandled,
  };
};

export const diffToProcedures = (gitDiffArray: string[]) => {

  const gitDiffWithOutDocs = filterDiffs(gitDiffArray);

  const { completed } = handleNestedKnowledgeCategoryChanges({
    nestedCategoryChanges: [...gitDiffWithOutDocs], // need to create a new array for each
    originalChangesArray: [...gitDiffWithOutDocs], // need to create a new array for each
    parentIndex: 0,
  });

  return completed;
};
