// name from the view point of changed files
const PATH_OF_DIRECTORY_TO_WATCH = 'docs/';

// const isDirectory = (diff: string) => !diff.endsWith('.md');
export interface Category {
  parentCategory: Category | null;
  categoryName: string | null;
  path: string | null;
  categoryID?: string;
  type?: string;
}

export interface Article {
  parentCategory: Category;
  articleName: string;
  path: string;
  ArticleID?: string;
}

const createListOfArticles = (diffArray: string[]) => {
  const files: Article[] = [];
  diffArray.forEach((d) => {
    let temp = d.split('/');
    const articleName = temp[temp.length - 1];
    if (!files.some((file) => file.articleName === articleName)) {
      let parentCategory: Category = {
        parentCategory: null,
        categoryName: null,
        path: null,
        type: 'discussion',
      };
      if (temp[temp.length - 2]) {
        parentCategory = {
          parentCategory: null,
          categoryName: temp[temp.length - 2],
          path: d.slice(0, d.indexOf(temp[temp.length - 2])),
        };
        if (temp[temp.length - 3]) {
          parentCategory.parentCategory = {
            parentCategory: null,
            categoryName: temp[temp.length - 3],
            path: d.slice(0, d.indexOf(temp[temp.length - 3])),
          };
          if (temp[temp.length - 4]) {
            parentCategory.parentCategory.parentCategory = {
              parentCategory: null,
              categoryName: temp[temp.length - 4],
              path: d.slice(0, d.indexOf(temp[temp.length - 4])),
            };
          }
        }
      }
      console.log(parentCategory, 'PARNET');
      const article: Article = {
        parentCategory: parentCategory,
        articleName: articleName,
        path: d,
      };
      console.log(article, 'article');

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
  console.log(filteredChanges, 'filteredChanges');
  // creates the shape that we need
  createListOfArticles(filteredChanges);

  // create proceedures things needed.
  // Will need to find the deepest part of intersection,
  //query to see if the category(that intersection) exists, if not make it, get its id.
  // go up each level of depth checking for categories and making as needed. storing ids within the procedures'Categories.
  // directory before Article is special - it contains a type of 'discussion'
};
