import {
  createDisplayName,
  MARKDOWN_IMAGE_REGEX,
  MARKDOWN_REGEX_FULL_MARKDOWN_PATH,
  SUPPORTED_MEDIA_TYPES,
  VanillaArticle,
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

export const modifyBodyLink = (
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

export const getFullMarkdownReferencePathMatches = (
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

export const getArticleNameFromReference = (match: string): string => {
  const split = match.split("/");
  if (match === "") {
    return "NoFile";
  }

  const nameOfFile = split[split.length - 1];

  const name = nameOfFile ? nameOfFile : "NoFile";

  return createDisplayName(name.substring(0, name.indexOf(".md")));
};

export const replaceMarkdownReferencesWithVanillaSlugs = (
  markdownAsAString: string,
  allArticles: VanillaArticle[]
) => {
  let markdownAsStringTarget: string = `${markdownAsAString}`;
  const matches = getFullMarkdownReferencePathMatches(markdownAsStringTarget);

  if (matches.length) {
    matches.forEach((m) => {
      const matchArticleName = getArticleNameFromReference(m);
      let articlesWithSameNameAsRef: VanillaArticle[] = [];
      if (matchArticleName && matchArticleName !== "NoFile") {
        articlesWithSameNameAsRef = allArticles.filter(
          (a) => a.name === matchArticleName
        );
        if (
          articlesWithSameNameAsRef.length &&
          articlesWithSameNameAsRef[0].slug
        ) {
          markdownAsStringTarget = modifyBodyLink(
            markdownAsStringTarget,
            m,
            articlesWithSameNameAsRef[0].slug
          );
        }
      }
    });
  }
  return markdownAsStringTarget;
};
