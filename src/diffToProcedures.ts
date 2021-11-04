// name from the view point of changed files
const PATH_OF_DIRECTORY_TO_WATCH = 'docs/';

// const isDirectory = (diff: string) => !diff.endsWith('.md');
export interface Category {
  parentCategory: Category | null;
  categoryName: string | null;
  path: string | null;
  categoryID?: string;
  displayAs?: string;
}

export interface KnowledgeBase {
  uriCode: string; // the location of the knowledge base
  viewType: string; // guide or help
  name: string;
  desciption: string;
  sortArticles: 'manual' | 'name' | 'dateInserted' | 'dateInsertedDesc';
}
export interface KnowledgeCategory {
  knowledgeBaseID: null | number; // 1 is the docs
  parentID: null | number; // unique id of the parent
  hasChildren: boolean; // to determine if its creation order matters
  path?: string; // the path we use during diff
  name: string;
  displayName: string;
  desciption: string;
  sort?: number | null;
  sortChildren?: null | 'name' | 'dateInserted' | 'dateInsertedDesc' | 'manual';
  foreignID?: null | number; // to link to external srcs
}
export interface Article {
  knowledgeCategoryID: number | null;
  name: string;
  body: string;
  format:
    | 'text'
    | 'textex'
    | 'markdown'
    | 'wysiwyg'
    | 'html'
    | 'bbcode'
    | 'rich';
  local: string;
  sort?: number;
  discussionId?: number;
  foreignID?: null | string;
  fileRehosting?: {
    description: string;
    enabled: boolean;
    requestHeaders: any;
  };
  // things not on vanilla schema
  fileName: string;
  path: string;
  ArticleID?: string; //(will need to remove or edit the previous Article)
}

const createArticleChange = (
  knowledgeCategoryChanges: string, // diff string of a .md file
  path: string
): Article => {
  let displayName = '';

  if (knowledgeCategoryChanges.startsWith('index')) {
    const pathSplit = path.split('/');
    let replacementName = pathSplit[pathSplit.length - 2];
    displayName = replacementName
      .split('-')
      .map((item) => `${item[0].toUpperCase()}${item.substring(1)}`)
      .join(' ');
  } else {
    const splitOnExtention = knowledgeCategoryChanges.split('.')[0];
    displayName = splitOnExtention
      .split('-')
      .map((item) => `${item[0].toUpperCase()}${item.substring(1)}`)
      .join(' ');
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
) => {
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
      const kb: KnowledgeCategory = {
        parentID: null, //will need to get it, for sub folders
        knowledgeBaseID: 1, //will need to get it for nested. the docs knowledge base is 1 so for non nested we can use that
        name: identifierForDirectoryOrFile,
        displayName: identifierForDirectoryOrFile
          .split('-')
          .map((item) => `${item[0].toUpperCase()}${item.substring(1)}`)
          .join(' '),
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
  console.log('files with changes', gitDiffWithOutDocs);
  const stuff = handleNestedKnowledgeCategoryChanges({
    nestedCategoryChanges: [...gitDiffWithOutDocs], // need to create a new array for each
    originalChangesArray: [...gitDiffWithOutDocs], // need to create a new array for each
    parentIndex: 0,
  });
  console.log('***************', stuff, '&&&&&&&&&&');

  // create proceedures things needed.
  // Will need to find the deepest part of intersection,
  //query to see if the category(that intersection) exists, if not make it, get its id.
  // go up each level of depth checking for categories and making as needed. storing ids within the procedures'Categories.
  // directory before Article is special - it contains a type of 'discussion'
};
