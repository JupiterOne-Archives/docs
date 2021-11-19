import fs from "fs";
import path from "path";
import {
  FLAG_FOR_DELETE,
  SUPPORTED_FILE_TYPE_EXTENTIONS,
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
