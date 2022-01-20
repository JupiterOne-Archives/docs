/* eslint-disable no-useless-escape */
import {
  checkBodyForTitleToUseForArticle,
  markdownToString,
  MARKDOWN_IMAGE_REGEX,
  MARKDOWN_VANILLA_RETURN_MARKDOWN_LINK_V2,
  SUPPORTED_MEDIA_TYPES,
  TITLE_FROM_MARKDOWN_REGEX,
} from "../utils";

export const isSupportedMediaType = (imagePath: string): string | boolean => {
  let supportedTypeOfFile = false;
  SUPPORTED_MEDIA_TYPES.forEach((extention: string) => {
    if (imagePath.endsWith(extention)) {
      supportedTypeOfFile = true;
    }
  });
  return supportedTypeOfFile;
};

export const modifyBodyLinkForImage = (
  body: string,
  matchToBeReplaced: string,
  replacement: string
): string => {
  let bodyAlterations = `${body}`;
  const matchToBeReplacedSanitized = matchToBeReplaced.replace("/", "\\/");
  const markdownAssetRegularExpression = new RegExp(
    matchToBeReplacedSanitized,
    "gi"
  );

  bodyAlterations = bodyAlterations.replace(
    markdownAssetRegularExpression,
    `${replacement}`
  );
  return bodyAlterations;
};
export type modifyBodyLinkForImageForReturnedArticlesReturn = {
  bodyAlterations: string;
  existingMatches: string | false;
};
//return.body gives back a html type body string
export const modifyBodyLinkForImageForReturnedArticles = (
  body: string,
  matchToBeReplaced: string,
  replacement: string,
  secondTime?: boolean
): modifyBodyLinkForImageForReturnedArticlesReturn => {
  let bodyAlterations = `${body}`;
  const slashRegex = new RegExp("/", "gi");
  const matchToBeReplacedSanitized = matchToBeReplaced
    .replace(slashRegex, "\\/")
    .replace("(", "\\(")
    .replace(")", "\\)");
  const markdownAssetRegularExpression = new RegExp(
    matchToBeReplacedSanitized,
    "gi"
  );

  bodyAlterations = bodyAlterations.replace(
    markdownAssetRegularExpression,
    `${replacement}`
  );
  if (secondTime) {
    return {
      bodyAlterations,
      existingMatches: false,
    };
  }
  const existingMatches = bodyAlterations.match(markdownAssetRegularExpression);
  console.log(existingMatches, "EXISTING MATCHES");
  return {
    bodyAlterations,
    existingMatches:
      existingMatches && existingMatches.length ? matchToBeReplaced : false,
  };
};

export const getMarkdownImageSrcs = (markdownAsString: string): string[] => {
  const markdownAssetRegularExpression = new RegExp(MARKDOWN_IMAGE_REGEX, "gi");
  const matches = [];
  let array1;

  while (
    (array1 = markdownAssetRegularExpression.exec(markdownAsString)) !== null
  ) {
    matches.push(array1[0]);
  }

  return matches.map((m) => m.substring(2, m.length - 1));
};
// body is in html format
export const getFullMarkdownReferencePathMatches = (
  markdownAsString: string
): string[] => {
  if (!markdownAsString) {
    return [];
  }
  const markdownAssetRegularExpression = new RegExp(
    MARKDOWN_VANILLA_RETURN_MARKDOWN_LINK_V2,
    "gi"
  );

  const matches = [];
  let array1;

  while (
    (array1 = markdownAssetRegularExpression.exec(markdownAsString)) !== null
  ) {
    matches.push(array1[0]);
  }
  const editedMatches = matches.map((m) => {
    let matchEdit = m.substring(m.indexOf('"') + 1);
    if (matchEdit.indexOf('"') !== -1) {
      matchEdit = matchEdit.substring(0, matchEdit.length - 1);
    }

    return matchEdit;
  });

  return editedMatches.filter((m: string) => m[0] === ".");
};

export const getArticleNameFromReference = async (
  pathOfReference: string,
  currentArticlePath: string | undefined
): Promise<string | false> => {
  const regexTwoDots = new RegExp(/\.\.\//, "g");
  const regexOneDot = new RegExp(/\.\//, "g");
  let cleanedPath = pathOfReference.replace(regexTwoDots, "");
  if (cleanedPath.indexOf("./") !== -1 && currentArticlePath) {
    cleanedPath = cleanedPath.replace(regexOneDot, "");
    const directoryForSingleSlash = currentArticlePath.split("/");
    const pathForMissing: string[] = [];
    directoryForSingleSlash.forEach((p) => {
      if (p.indexOf(".md") == -1) {
        pathForMissing.push(p);
      }
    });
    const newPath = pathForMissing.join("/");
    cleanedPath = `/${newPath}/${cleanedPath}`;
  }

  const articleBody = await markdownToString(cleanedPath);

  const titleFromBody = checkBodyForTitleToUseForArticle(
    articleBody,
    TITLE_FROM_MARKDOWN_REGEX
  );
  return titleFromBody;
};
