// name from the view point of changed files
const PATH_OF_DIRECTORY_TO_WATCH = 'docs/';

// maybe get an object view of how /docs looks, and use that for a comparison?

const isDirectory = (diff: string) => !diff.endsWith('.md');
const isDiscussion = (diff: string) => {
  // can be in only one Category (directory)
  // is the directory before a markdown file
  // is a category.type
  return false;
};
const isArticle = (diff: string) => diff.endsWith('.md');

const newDirectoryCreated = (nameOfDiff: string) => {
  if (isDiscussion(nameOfDiff)) {
    return {
      type: 'category',
      subType: 'subcategory',
      diff: nameOfDiff,
      isParentDirectory: true,
      hasChildren: true,
      proceedureType: 'creation',
    };
  } else {
    return {
      type: 'category',
      subType: '',
      diff: nameOfDiff,
      isParentDirectory: true,
      hasChildren: true,
      proceedureType: 'creation',
    };
  }
};

const directoryRemoved = (nameOfDiff: string) => {
  // will need to first query to get the category(vanilla's ) id
  return {
    type: 'category',
    name: nameOfDiff,
    isParentDirectory: true,
    hasChildren: true,
    proceedureType: 'removal',
  };
};
const markdownFileAdded = () => {};

export const diffToProcedures = (gitDiffArray: string[]) => {
  const proceedures = [];
  gitDiffArray.forEach((diff) => {
    if (diff.startsWith(PATH_OF_DIRECTORY_TO_WATCH)) {
      if (isDirectory(diff)) {
        newDirectoryCreated(diff);
      } else {
      }
    }
  });
};
