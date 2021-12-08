import {
  MARKDOWN_IMAGE_REGEX,
  MARKDOWN_REGEX_FULL_MARKDOWN_PATH,
  MARKDOWN_REGEX_LINK_MARKDOWN_FILE,
  MARKDOWN_REGEX_NON_LINK_FILE_PATH,
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

export const modifyBodyImageLink = (
  body: string,
  assetLocationInOriginalMarkdown: string,
  newLocation: string
): string => {
  let bodyAlterations = `${body}`;
  const assetLocationInOriginalMarkdownSanitized =
    assetLocationInOriginalMarkdown.replace("/", "\\/");
  const markdownAssetRegularExpression = new RegExp(
    assetLocationInOriginalMarkdownSanitized
  );

  bodyAlterations = bodyAlterations.replace(
    markdownAssetRegularExpression,
    `${newLocation}`
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

// for link in markdown like [instructions](configure-integrations.md) or [reference the documentation](../../docs/parameters.md)
// returns "](../../docs/parameters.md)" and "](configure-integrations.md)"
export const getMarkdownInternalLinks = (
  markdownAsString: string
): string[] => {
  const markdownAssetRegularExpression = new RegExp(
    MARKDOWN_REGEX_LINK_MARKDOWN_FILE,
    "g"
  );
  const matches = [];
  let array1;

  while (
    (array1 = markdownAssetRegularExpression.exec(markdownAsString)) !== null
  ) {
    matches.push(array1[0]);
  }
  return matches.map((m) => m.substring(2, m.length - 1));
};

// targets [10]: ../queries/common-qq-training.md
// [11]: ../queries/common-qq-endpoint.md
// [1]: ./schemas/bulk-upload.md
// [2]: ./jupiterone-api.md#entity-and-relationship-synchronization
// returns  "/jupiterone-api", "/queries/common-qq-training",
// "/queries/common-qq-endpoint","/schemas/bulk-upload","/jupiterone-api",

export const getMarkdownInternalReferences = (
  markdownAsString: string
): string[] => {
  const markdownAssetRegularExpression = new RegExp(
    MARKDOWN_REGEX_NON_LINK_FILE_PATH,
    "g"
  );
  const matches = [];
  let array1;

  while (
    (array1 = markdownAssetRegularExpression.exec(markdownAsString)) !== null
  ) {
    matches.push(array1[0]);
  }
  return matches;
};

export const fullMarkdownReferencePath = (
  markdownAsString: string
): string[] => {
  const markdownAssetRegularExpression = new RegExp(
    MARKDOWN_REGEX_FULL_MARKDOWN_PATH,
    "g"
  );
  const matches = [];
  let array1;

  while (
    (array1 = markdownAssetRegularExpression.exec(markdownAsString)) !== null
  ) {
    matches.push(array1[0]);
  }
  return matches;
};
export const removeDocPaths = (markdownAsString: string): string => {
  return markdownAsString;
};
