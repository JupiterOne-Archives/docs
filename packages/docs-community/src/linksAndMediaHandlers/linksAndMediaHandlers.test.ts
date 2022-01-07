/* eslint-disable no-useless-escape */
import {
  getFullMarkdownReferencePathMatches,
  getMarkdownImageSrcs,
  isSupportedMediaType,
  modifyBodyLinkForImage,
  modifyBodyLinkForImageForReturnedArticles,
} from "./";
import {
  assetDefinition,
  criticalAsset,
  gearImage,
  markdownAsString,
  markdownAsStringNOImages,
  markdownAsStringWithInternalLinks,
} from "./mockMarkdown";
describe("linksAndMediaHandlers", () => {
  describe("modifyBodyLinkForImageForReturnedArticles", () => {
    it("returns a modified string", () => {
      const replacement =
        "https://jupiterone.vanillastaging.com/kb/articles/545-catalog";
      const body = `<li><a rel=\"nofollow\" href=\"../getting-started_and-admin/catalog.md\">look at this other doc</a></li>`;
      const expected = `<li><a rel=\"nofollow\" href="https://jupiterone.vanillastaging.com/kb/articles/545-catalog">look at this other doc</a></li>`;
      const actual = modifyBodyLinkForImageForReturnedArticles(
        body,
        "../getting-started_and-admin/catalog.md",
        replacement
      );
      expect(actual).toEqual(expected);
    });
  });
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
  describe("modifyBodyLinkForImage", () => {
    it("returns same string when no regex match", async () => {
      const replacementText = "Hotdog";
      const actual = modifyBodyLinkForImage(
        markdownAsString,
        "whatsforlunch",
        replacementText
      );

      expect(actual.indexOf(replacementText)).toEqual(-1);
      expect(actual).toEqual(markdownAsString);
    });
    it("returns altered string with assetLocation replaced with newLocation", async () => {
      const replacementText = "Hotdog";
      const actual = modifyBodyLinkForImage(
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
        "../queries/common-qq-training.md",
        "../queries/common-qq-endpoint.md",
      ];
      const actual = getFullMarkdownReferencePathMatches(
        markdownAsStringWithInternalLinks
      );

      expect(actual).toEqual(expected);
    });
  });
});
