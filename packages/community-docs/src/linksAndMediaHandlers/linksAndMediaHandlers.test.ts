import { VanillaArticle } from "../utils";
import {
  getArticleNameFromReference,
  getFullMarkdownReferencePathMatches,
  getMarkdownImageSrcs,
  isSupportedMediaType,
  modifyBodyLink,
  replaceMarkdownReferencesWithVanillaSlugs,
} from "./";
import {
  assetDefinition,
  criticalAsset,
  gearImage,
  markdownAsString,
  markdownAsStringNOImages,
  markdownAsStringWithInternalLinks,
  markdownAsStringWithNOInternalLinks,
} from "./mockMarkdown";
describe("linksAndMediaHandlers", () => {
  describe("getMarkdownImageSrcs", () => {
    it("returns empty array when no regex matches", async () => {
      const actual = getMarkdownImageSrcs(markdownAsStringNOImages);
      const expected: string[] = [];
      expect(actual).toEqual(expected);
    });
    it("returns array of image srcs", async () => {
      const actual = getMarkdownImageSrcs(markdownAsString);
      const expected = [criticalAsset, gearImage, assetDefinition];
      expect(actual).toEqual(expected);
    });
  });
  describe("modifyBodyLink", () => {
    it("returns same string when no regex match", async () => {
      const replacementText = "Hotdog";
      const actual = modifyBodyLink(
        markdownAsString,
        "whatsforlunch",
        replacementText
      );

      expect(actual.indexOf(replacementText)).toEqual(-1);
      expect(actual).toEqual(markdownAsString);
    });
    it("returns altered string with assetLocation replaced with newLocation", async () => {
      const replacementText = "Hotdog";
      const actual = modifyBodyLink(
        markdownAsString,
        criticalAsset,
        replacementText
      );

      expect(actual.indexOf(replacementText)).not.toEqual(-1);
    });
  });

  describe("isSupportedMediaType", () => {
    it("returns true for media files supported", () => {
      const expected = true;
      const actual = isSupportedMediaType(criticalAsset);

      expect(actual).toEqual(expected);
    });
    it("returns false for media files not supported", () => {
      const expected = false;
      const actual = isSupportedMediaType("../assets/asset-critical.svg");
      expect(actual).toEqual(expected);
    });
  });

  describe("getFullMarkdownReferencePathMatches", () => {
    it("returns empty array when no links found", () => {
      const expected: string[] = [];
      const actual = getFullMarkdownReferencePathMatches("");
      expect(actual).toEqual(expected);
    });
    it("returns matches on MARKDOWN_REGEX_FULL_MARKDOWN_PATH", () => {
      const expected: string[] = [
        'href="../queries/common-qq-training.md',
        'href="../queries/common-qq-endpoint.md',
      ];
      const actual = getFullMarkdownReferencePathMatches(
        markdownAsStringWithInternalLinks
      );

      expect(actual).toEqual(expected);
    });
  });
  describe("replaceMarkdownReferencesWithVanillaSlugs", () => {
    it("returns the markdownAsAString without changes when there are no matches", () => {
      const markdownWithNoInternalMarkdownRefs =
        markdownAsStringWithNOInternalLinks;
      const expected = markdownWithNoInternalMarkdownRefs;
      const allArticles: VanillaArticle[] = [
        {
          name: "Bulk Upload",
          url: "https://jupiterone.vanillastaging.com/kb/articles/471-bulk-upload",
        },
        {
          name: "Bulk Upload Not",
          url: "https://jupiterone.vanillastaging.com/kb/articles/472-bulk-upload-not",
        },
      ] as VanillaArticle[];
      const actual = replaceMarkdownReferencesWithVanillaSlugs(
        markdownWithNoInternalMarkdownRefs,
        allArticles
      );
      expect(actual).toEqual(expected);
    });

    it("returns the markdownAsAString without changes when there are no matching articles", () => {
      const markdownWithInternalMarkdownRefs =
        markdownAsStringWithInternalLinks;
      const expected = markdownWithInternalMarkdownRefs;
      const allArticles: VanillaArticle[] = [
        {
          name: "Bulky Upload",
          slug: "https://jupiterone.vanillastaging.com/kb/articles/471-bulk-upload",
        },
        {
          name: "Bulky Upload Not",
          slug: "https://jupiterone.vanillastaging.com/kb/articles/472-bulk-upload-not",
        },
      ] as VanillaArticle[];
      const actual = replaceMarkdownReferencesWithVanillaSlugs(
        markdownWithInternalMarkdownRefs,
        allArticles
      );

      expect(actual).toEqual(expected);
    });

    it("returns the markdownAsAString with new links", () => {
      const markdownWithInternalMarkdownRefs =
        markdownAsStringWithInternalLinks;
      const matchingArticle = {
        name: "Common Qq Training",
        url: "https://jupiterone.vanillastaging.com/kb/articles/471-bulk-upload",
      };
      const allArticles: VanillaArticle[] = [
        matchingArticle,
        {
          name: "Common Qq Training Not",
          url: "https://jupiterone.vanillastaging.com/kb/articles/472-bulk-upload-not",
        },
      ] as VanillaArticle[];
      const actual = replaceMarkdownReferencesWithVanillaSlugs(
        markdownWithInternalMarkdownRefs,
        allArticles
      );

      expect(actual.indexOf(matchingArticle.url) != -1).toEqual(true);
    });
  });
  describe("getArticleNameFromReference", () => {
    it("returns noFile for empty match", () => {
      const match: string = "";
      const expected = "NoFile";
      const actual = getArticleNameFromReference(match);
      expect(actual).toEqual(expected);
    });
    it("returns the filename", () => {
      const match: string = 'href="../queries/common-qq-training.md';
      const expected = "Common Qq Training";
      const actual = getArticleNameFromReference(match);
      expect(actual).toEqual(expected);

      const matchTwo: string = "asset-inventory-filters.md";
      const expectedTwo = "Asset Inventory Filters";
      const actualTwo = getArticleNameFromReference(matchTwo);
      expect(actualTwo).toEqual(expectedTwo);

      const matchThree: string = "../queries/common-qq-training.md";
      const expectedThree = "Common Qq Training";
      const actualThree = getArticleNameFromReference(matchThree);
      expect(actualThree).toEqual(expectedThree);

      const matchFour: string =
        "https://github.com/JupiterOne/docs/blob/main/docs/parameters.md";
      const expectedFour = "Parameters";
      const actualFour = getArticleNameFromReference(matchFour);
      expect(actualFour).toEqual(expectedFour);
    });
    it("handles url-type links", () => {
      const match: string =
        "https://github.com/JupiterOne/docs/blob/main/docs/parameters.md";
      const expected = "Parameters";
      const actual = getArticleNameFromReference(match);
      expect(actual).toEqual(expected);
    });
  });
});
