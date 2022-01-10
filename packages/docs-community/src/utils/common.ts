import { default as fs } from "fs";
import path from "path";
import {
  FLAG_FOR_DELETE,
  PATH_OF_DIRECTORY_TO_WATCH,
  SUPPORTED_FILE_TYPE_EXTENTIONS,
  VanillaArticle,
  VanillaKnowledgeCategory,
} from "./";

export const isKnowledgeCategoryType = (
  procedure: VanillaArticle | VanillaKnowledgeCategory
): procedure is VanillaKnowledgeCategory => {
  return Boolean(
    (procedure as VanillaKnowledgeCategory).procedureType === "Category"
  );
};

export const isArticleType = (
  procedure: VanillaArticle | VanillaKnowledgeCategory
): procedure is VanillaArticle => {
  return Boolean((procedure as VanillaArticle).procedureType === "Article");
};

export const createDisplayName = (name: string) => {
  return name
    .split(/_/g)
    .map((item) => `${item[0]}${item.substring(1)}`)
    .join(" ")
    .split(/-/g)
    .map((item) => `${item[0].toUpperCase()}${item.substring(1)}`)
    .join(" ");
};

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
    const blockingReadOfFile = await fs.promises.readFile(fileLocation, {
      encoding: "utf8",
    });
    if (blockingReadOfFile) {
      return blockingReadOfFile.toString();
    }
  } catch (error) {
    return FLAG_FOR_DELETE;
  }

  return FLAG_FOR_DELETE;
};

export const getMarkdownAsStringFromPath = async (
  filePath?: string
): Promise<string | undefined> => {
  // we also want to use this to see if the file got deleted! the git diff wont differenitate
  const fileLocation = path.join(__dirname, `./${filePath}`);

  try {
    const blockingReadOfFile = await fs.promises.readFile(fileLocation, {
      encoding: "utf8",
    });
    if (blockingReadOfFile) {
      return blockingReadOfFile.toString();
    }
  } catch (error) {
    return undefined;
  }
};

export const checkBodyForTitleToUseForArticle = (
  markdownAsString: string,
  targetRegex: RegExp
) => {
  const markdownTitleRegularExpression = new RegExp(targetRegex);
  const matches = markdownAsString.match(markdownTitleRegularExpression);

  if (matches && matches[0]) {
    return matches[0].substring(2);
  }

  return false;
};

export const removeTitleFromArticleBody = (
  markdownAsString: string,
  targetRegex: RegExp
) => {
  let bodyAlterations = `${markdownAsString}`;
  const markdownTitleRegularExpression = new RegExp(targetRegex);
  const matches = markdownAsString.match(markdownTitleRegularExpression);

  if (matches && matches[0]) {
    bodyAlterations = bodyAlterations.replace(matches[0], "");
  }

  return bodyAlterations.trim();
};
// Was used for APP-62223, but we instead need to have correct markdown rather than altering it. was causing issue with code blocks and tables
export const sanitizeMarkdownNewLines = (markdownAsString: string) => {
  if (markdownAsString) {
    return markdownAsString
      .split(/\n\n/g)
      .map((line) => line.replace(/\n/g, " "))
      .join("\n\n");
  }
  return markdownAsString;
};
