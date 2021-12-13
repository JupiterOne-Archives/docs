import {
  createDisplayName,
  MARKDOWN_IMAGE_REGEX,
  MARKDOWN_VANILLA_RETURN_MARKDOWN_LINK,
  SUPPORTED_MEDIA_TYPES,
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
  const markdownAssetRegularExpression = new RegExp(matchToBeReplacedSanitized);

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
  const markdownAssetRegularExpression = new RegExp(matchToBeReplacedSanitized);

  bodyAlterations = bodyAlterations.replace(
    markdownAssetRegularExpression,
    `${replacement}`
  );
  return bodyAlterations;
};

export const getMarkdownImageSrcs = (markdownAsString: string): string[] => {
  const markdownAssetRegularExpression = new RegExp(MARKDOWN_IMAGE_REGEX, "g");
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
    "g"
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

export const getArticleNameFromReference = (match: string): string => {
  const split = match.split("/");
  if (match === "") {
    return "NoFile";
  }

  const nameOfFile = split[split.length - 1];

  const name = nameOfFile ? nameOfFile : "NoFile";

  return createDisplayName(name.substring(0, name.indexOf(".md")));
};
