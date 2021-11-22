import fs from "fs/promises";
import path from "path";
import {
  FLAG_FOR_DELETE,
  PATH_OF_DIRECTORY_TO_WATCH,
  SUPPORTED_FILE_TYPE_EXTENTIONS,
} from "../utils/constants";

export const markdownToString = async (filePath?: string): Promise<string> => {
  // we also want to use this to see if the file got deleted! the git diff wont differenitate
  const fileLocation = path.join(
    __dirname,
    `../../../../${PATH_OF_DIRECTORY_TO_WATCH}`,
    `/${filePath}`
  );

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
    const blockingReadOfFile = await fs.readFile(fileLocation);
    if (blockingReadOfFile) {
      return blockingReadOfFile.toString();
    }
  } catch (error) {
    return FLAG_FOR_DELETE;
  }

  return FLAG_FOR_DELETE;
};

export const directoryExists = async (filePath?: string): Promise<boolean> => {
  // we also want to use this to see if the file got deleted! the git diff wont differenitate
  if (!filePath) {
    return false;
  }

  const fileLocation = path.join(
    __dirname,
    `../../../../${PATH_OF_DIRECTORY_TO_WATCH}`,
    `/${filePath}`
  );

  try {
    const blockingReadOfFile = await fs.readFile(fileLocation);
    if (blockingReadOfFile) {
      return true;
    }
  } catch (error) {
    return false;
  }

  return true;
};
