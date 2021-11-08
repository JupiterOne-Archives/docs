// name from the view point of changed files
const PATH_OF_DIRECTORY_TO_WATCH = 'docs/';
import { Article, KnowledgeCategory } from './types';

const createDisplayName = (name: string) => {
  return name
    .split(/-|_/g)
    .map((item) => `${item[0].toUpperCase()}${item.substring(1)}`)
    .join(' ');
};

const createArticleChange = (
  knowledgeCategoryChanges: string, // diff string of a file
  path: string
): Article => {
  let displayName = '';

  if (knowledgeCategoryChanges.startsWith('index')) {
    const splitOnExtention = knowledgeCategoryChanges.split('.')[0];
    displayName = createDisplayName(splitOnExtention);
  } else {
    const pathSplit = path.split('/');
    let replacementName = pathSplit[pathSplit.length - 2];
    displayName = createDisplayName(replacementName);
  }

  const kb: Article = {
    knowledgeCategoryID: null, //will need to get it, for sub folders
    fileName: knowledgeCategoryChanges,
    name: displayName,
    body: 'body of the new article',
    path: path,
    format: 'markdown',
    local: 'en',
  };

  return kb;
};

export interface HandleNestedKnowledgeCategoryChangesReturn {
  completed?: (KnowledgeCategory | Article)[];
  knowledgeCategoriesAlreadyHandled?: string[];
}
interface HandleNestedKnowledgeCategoryChangesProps {
  nestedCategoryChanges: string[];
  completed?: (KnowledgeCategory | Article)[];
  knowledgeCategoriesAlreadyHandled?: string[];
  originalChangesArray: string[];
  parentIndex: number;
}
// recursively create Knowledge categories per directory change. One parent KnowledgeCategory per directory.
const handleNestedKnowledgeCategoryChanges = (
  input: HandleNestedKnowledgeCategoryChangesProps
): HandleNestedKnowledgeCategoryChangesReturn => {
  if (input.nestedCategoryChanges.length === 0) {
    return {
      completed: input.completed,
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
      let displayName = createDisplayName(identifierForDirectoryOrFile);

      const kb: KnowledgeCategory = {
        parentID: null, //will need to get it, for sub folders
        knowledgeBaseID: 1, //will need to get it for nested. the docs knowledge base is 1 so for non nested we can use that
        name: identifierForDirectoryOrFile,
        displayName,
        desciption: '',
        path: input.originalChangesArray[tempParentIndex],
        hasChildren: true,
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
  const filteredChanges = gitDiffArray.filter((diff) =>
    diff.startsWith(PATH_OF_DIRECTORY_TO_WATCH)
  );
  const gitDiffWithOutDocs = filteredChanges.map((diff) =>
    diff.substring(PATH_OF_DIRECTORY_TO_WATCH.length)
  );

  const { completed } = handleNestedKnowledgeCategoryChanges({
    nestedCategoryChanges: [...gitDiffWithOutDocs], // need to create a new array for each
    originalChangesArray: [...gitDiffWithOutDocs], // need to create a new array for each
    parentIndex: 0,
  });
  return completed;
};
