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
  preCreationID?: string; // ID we can use to find the correct knowledgeCategory to add vanillas knowledgeBaseID to this
  path?: string; // the path we use during diff
  name: string;
  desciption: string;
  sort?: number | null;
  sortChildren?: null | 'name' | 'dateInserted' | 'dateInsertedDesc' | 'manual';
  foreignID?: null | number; // to link to external srcs
}
export interface Article {
  parentCategory?: Category;
  articleName: string;
  path: string;
  ArticleID?: string;
}

// const categoryStartingPoint = {
//   parentCategory: null,
//   categoryName: null,
//   path: null,
// };

// const articleStartingPoint: Article = {
//   articleName: '',
//   path: '',
// };

// live inside of knowledge base
// const createArticleStucture = (
//   diff: string,
//   workingIndex: number = 1,
//   article: Article = articleStartingPoint
// ) => {
//   const diffSplit = diff.split('/');
//   if (diff.length === workingIndex && article) {
//     return article;
//   }
//   if (!article.parentCategory) {
//     article.parentCategory = {
//       parentCategory: null,
//       categoryName: diffSplit[diffSplit.length - workingIndex],
//       path: diff.slice(
//         0,
//         diff.indexOf(diffSplit[diffSplit.length - workingIndex])
//       ),
//       displayAs: 'discussions',
//     };
//   } else {
//   }

//   if (diff[diff.length - workingIndex]) {
//   }
// };
// this will be the first children of the '/docs' folder
// interface SortChangesReturn {
//   knowledgeCategoryChanges: string[];
//   nestedKnowledgeCategoryChanges: string[];
// }
// const sortChanges = (diffArray: string[]): SortChangesReturn => {
//   const knowledgeCategoryChanges: string[] = [];
//   const nestedKnowledgeCategoryChanges: string[] = [];
//   diffArray.forEach((item) => {
//     const splitItems = item.split('/');
//     if (
//       splitItems.length === 1 &&
//       splitItems[splitItems.length - 1].endsWith('.md')
//     ) {
//       knowledgeCategoryChanges.push(item);
//     } else {
//       nestedKnowledgeCategoryChanges.push(item);
//     }
//   });

//   console.log(knowledgeCategoryChanges, 'knowledgeCategoryChanges');
//   console.log(nestedKnowledgeCategoryChanges, 'nestedKnowledgeCategoryChanges');
//   return { knowledgeCategoryChanges, nestedKnowledgeCategoryChanges };
// };

// for md docs right at the docs level
const createRootKnowledgeCategoryChange = (
  // the category of the actual markdown file
  knowledgeCategoryChanges: string // diff string of a .md file
): KnowledgeCategory => {
  const kb: KnowledgeCategory = {
    parentID: null, //will need to get it, for sub folders
    knowledgeBaseID: 1, //will need to get it for nested. the docs knowledge base is 1 so for non nested we can use that
    name: knowledgeCategoryChanges
      .split('-')
      .map((item) => `${item[0].toUpperCase()}${item.substring(1)}`)
      .join(' '),
    desciption: knowledgeCategoryChanges
      .split('-')
      .map((item) => `${item[0].toUpperCase()}${item.substring(1)}`)
      .join(' '),
    path: knowledgeCategoryChanges,
    preCreationID: knowledgeCategoryChanges,
  };

  return kb;
};

// recursively create Knowledge categories per directory change. One parent KnowledgeCategory per directory.
const handleNestedKnowledgeCategoryChanges = (
  nestedCategoryChanges: string[], //diff paths split on /
  completed: KnowledgeCategory[] = [],
  knowledgeCategoriesAlreadyHandled: string[] = []
) => {
  if (nestedCategoryChanges.length === 0) {
    return {
      completed,
    };
  }
  const tempNestedCategoryChanges = nestedCategoryChanges;
  const tempHandled = knowledgeCategoriesAlreadyHandled;
  const tempCompleted = completed;
  const target = tempNestedCategoryChanges.pop();
  console.log('****** TARGET', target, '****** TARGET');
  if (target === undefined) {
    return { completed, knowledgeCategoriesAlreadyHandled };
  }

  const directorySplitBySlash = target.split('/');
  const identifierForDirectoryOrMarkdownFile = directorySplitBySlash[0];

  if (
    !knowledgeCategoriesAlreadyHandled.includes(
      identifierForDirectoryOrMarkdownFile
    )
  ) {
    tempHandled.push(identifierForDirectoryOrMarkdownFile);
    if (identifierForDirectoryOrMarkdownFile.endsWith('.md')) {
      const markDownFileToKnowledgeCategory =
        createRootKnowledgeCategoryChange(target);
      tempCompleted.push(markDownFileToKnowledgeCategory);
    } else {
      console.log('&&*&*&*&&', tempHandled, 'firstDirectory');

      const kb: KnowledgeCategory = {
        parentID: null, //will need to get it, for sub folders
        preCreationID: identifierForDirectoryOrMarkdownFile,
        knowledgeBaseID: 1, //will need to get it for nested. the docs knowledge base is 1 so for non nested we can use that
        name: identifierForDirectoryOrMarkdownFile
          .split('-')
          .map((item) => `${item[0].toUpperCase()}${item.substring(1)}`)
          .join(' '),
        desciption: identifierForDirectoryOrMarkdownFile
          .split('-')
          .map((item) => `${item[0].toUpperCase()}${item.substring(1)}`)
          .join(' '),
        path: target,
      };
      tempCompleted.push(kb);
      //     nst directorySplitBySlash = target.split('/');
      // const identifierForDirectoryOrMarkdownFile = directorySplitBySlash[0];
      const nextCategoryAddition = target.substring(
        identifierForDirectoryOrMarkdownFile.length + 1 // plus one for the slash
      );
      if (nextCategoryAddition.length) {
        tempNestedCategoryChanges.push(nextCategoryAddition);
      }
    }
  }

  if (tempNestedCategoryChanges.length) {
    handleNestedKnowledgeCategoryChanges(
      tempNestedCategoryChanges,
      tempCompleted,
      tempHandled
    );
  }
  return {
    completed: tempCompleted,
    knowledgeCategoriesAlreadyHandled: tempHandled,
  };
};

const createListOfArticles = (diffArray: string[]) => {
  const files: Article[] = [];

  diffArray.forEach((d) => {
    let splitDiff = d.split('/');
    const articleName = splitDiff[splitDiff.length - 1];
    if (!files.some((file) => file.articleName === articleName)) {
      let parentCategory: Category = {
        parentCategory: null,
        categoryName: null,
        path: null,
        displayAs: 'discussions',
      };

      if (
        splitDiff[splitDiff.length - 2] &&
        splitDiff[splitDiff.length - 2] !== PATH_OF_DIRECTORY_TO_WATCH
      ) {
        parentCategory = {
          parentCategory: null,
          categoryName: splitDiff[splitDiff.length - 2],
          path: d.slice(0, d.indexOf(splitDiff[splitDiff.length - 2])),
        };
        if (splitDiff[splitDiff.length - 3]) {
          parentCategory.parentCategory = {
            parentCategory: null,
            categoryName: splitDiff[splitDiff.length - 3],
            path: d.slice(0, d.indexOf(splitDiff[splitDiff.length - 3])),
          };
          if (splitDiff[splitDiff.length - 4]) {
            parentCategory.parentCategory.parentCategory = {
              parentCategory: null,
              categoryName: splitDiff[splitDiff.length - 4],
              path: d.slice(0, d.indexOf(splitDiff[splitDiff.length - 4])),
            };
          }
        }
      }

      const article: Article = {
        parentCategory: parentCategory,
        articleName: articleName,
        path: d,
      };

      files.push(article);
    }
  });
  return files;
};

export const diffToProcedures = (gitDiffArray: string[]) => {
  // const proceedures = [];
  // let structure: any = {};
  const filteredChanges = gitDiffArray.filter((diff) =>
    diff.startsWith(PATH_OF_DIRECTORY_TO_WATCH)
  );
  const gitDiffWithOutDocs = filteredChanges.map((diff) =>
    diff.substring(PATH_OF_DIRECTORY_TO_WATCH.length)
  );

  // const knowledgeCategorysNeededForArticles = createRootKnowledgeCategoryChange(
  //   knowledgeCategoryChanges
  // );
  // console.log(
  //   knowledgeCategorysNeededForArticles,
  //   'knowledgeCategorysNeededForArticles'
  // );
  console.log(gitDiffWithOutDocs, 'gitDiffWithOutDocs');
  const stuff = handleNestedKnowledgeCategoryChanges(gitDiffWithOutDocs);
  console.log('***************', stuff, '&&&&&&&&&&');
  createListOfArticles(filteredChanges);

  // create proceedures things needed.
  // Will need to find the deepest part of intersection,
  //query to see if the category(that intersection) exists, if not make it, get its id.
  // go up each level of depth checking for categories and making as needed. storing ids within the procedures'Categories.
  // directory before Article is special - it contains a type of 'discussion'
};
