import {
  checkBodyForTitleToUseForArticle,
  markdownToString,
  MARKDOWN_IMAGE_REGEX,
  MARKDOWN_VANILLA_RETURN_MARKDOWN_LINK,
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
//return.body gives back a html type body string
export const modifyBodyLinkForImageForReturnedArticles = (
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
  const markdownAssetRegularExpression = new RegExp(
    MARKDOWN_VANILLA_RETURN_MARKDOWN_LINK,
    "gi"
  );
  const matches = [];
  let array1;

  while (
    (array1 = markdownAssetRegularExpression.exec(markdownAsString)) !== null
  ) {
    matches.push(array1[0]);
  }
  return matches.map((m) => m.substring(m.indexOf('"') + 1));
};

export const getArticleNameFromReference = async (
  pathOfReference: string,
  currentArticlePath: string | undefined
): Promise<string | false> => {
  const regexTwoDots = new RegExp(/\.\.\//, "g");
  let cleanedPath = pathOfReference.replace(regexTwoDots, "");

  if (cleanedPath.indexOf("./") !== -1 && currentArticlePath) {
    const directoryForSingleSlash = currentArticlePath.split("/");
    cleanedPath = `/${directoryForSingleSlash[directoryForSingleSlash.length - 2]}/${cleanedPath}`;
  }

  const articleBody = await markdownToString(cleanedPath);

  const titleFromBody = checkBodyForTitleToUseForArticle(
    articleBody,
    TITLE_FROM_MARKDOWN_REGEX
  );
  return titleFromBody;
};
