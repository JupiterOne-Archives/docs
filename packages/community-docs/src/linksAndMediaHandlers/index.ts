import { MARKDOWN_IMAGE_REGEX, SUPPORTED_MEDIA_TYPES } from "../utils";

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
