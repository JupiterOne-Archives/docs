import {
  PATH_OF_DIRECTORY_TO_WATCH,
  SUPPORTED_FILE_TYPE_EXTENTIONS,
} from "../utils/constants";

export const filterDiffs = (gitDiffArray: string[]) => {
  const filteredArray = gitDiffArray
    .filter((diff) => diff.startsWith(PATH_OF_DIRECTORY_TO_WATCH))
    .filter((diff) => {
      let diffIsOfCorrectType = false;
      SUPPORTED_FILE_TYPE_EXTENTIONS.forEach((ext) => {
        if (diff.includes(ext)) {
          diffIsOfCorrectType = true;
        }
      });
      return diffIsOfCorrectType;
    })
    .map((diff) => diff.substring(PATH_OF_DIRECTORY_TO_WATCH.length));
  //
  filteredArray.sort((a, b) => a.split("/").length - b.split("/").length);

  return filteredArray;
};

export const createDisplayName = (name: string) => {
  return name
    .split(/-|_/g)
    .map((item) => `${item[0].toUpperCase()}${item.substring(1)}`)
    .join(" ");
};
