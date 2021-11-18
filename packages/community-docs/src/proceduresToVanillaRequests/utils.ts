import fs from "fs";
import path from "path";
import {
  FLAG_FOR_DELETE,
  SUPPORTED_FILE_TYPE_EXTENTIONS,
  MARKDOWN_IMAGE_REGEX
} from "../utils/constants";

export const markdownToString = (filePath?: string): string => {
  // we also want to use this to see if the file got deleted! the git diff wont differenitate
  const fileLocation = path.join(__dirname, "../../../../docs", `/${filePath}`);

  let supportedTypeOfFile = false;
  SUPPORTED_FILE_TYPE_EXTENTIONS.forEach((extention) => {
    if (fileLocation.endsWith(extention)) {
      supportedTypeOfFile = true;
    }
  });
  if (!supportedTypeOfFile) {
    return FLAG_FOR_DELETE;
  }
  try {
    const blockingReadOfFile = fs.readFileSync(fileLocation);
    if (blockingReadOfFile) {
      return blockingReadOfFile.toString();
    }
  } catch (error) {
    return FLAG_FOR_DELETE;
  }

  return FLAG_FOR_DELETE;
};

export const directoryExists = (filePath?: string): boolean => {
  // we also want to use this to see if the file got deleted! the git diff wont differenitate
  const fileLocation = path.join(__dirname, "../docs", `/${filePath}`);
  if (!filePath) {
    return false;
  }
  try {
    const blockingReadOfFile = fs.readFileSync(fileLocation);
    if (blockingReadOfFile) {
      return true;
    }
  } catch (error) {
    return false;
  }

  return false;
};

export const getMarkdownImageSrcMap = (markdownAsString:string) => {
   const markdownAssetRegularExpression = new RegExp(MARKDOWN_IMAGE_REGEX);
    const bodyTemp = `${markdownAsString}`;
    // make a new regular expression that matches exactly to target the uploading image src in the markdown
    const matches = [...bodyTemp.matchAll(markdownAssetRegularExpression)]
    return bodyTemp.replace(
      markdownAssetRegularExpression,
      "](https://us.v-cdn.net/6035554/uploads/2QGC57M0ZHO4/api-key-access-view.png)"
    );

  return [];
};
