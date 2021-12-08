import {
  fullMarkdownReferencePath,
  getMarkdownImageSrcs,
  getMarkdownInternalLinks,
  getMarkdownInternalReferences,
  isSupportedMediaType,
  modifyBodyImageLink,
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
  describe("modifyBodyImageLink", () => {
    it("returns same string when no regex match", async () => {
      const replacementText = "Hotdog";
      const actual = modifyBodyImageLink(
        markdownAsString,
        "whatsforlunch",
        replacementText
      );

      expect(actual.indexOf(replacementText)).toEqual(-1);
      expect(actual).toEqual(markdownAsString);
    });
    it("returns altered string with assetLocation replaced with newLocation", async () => {
      const replacementText = "Hotdog";
      const actual = modifyBodyImageLink(
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
  describe("getMarkdownInternalLinks", () => {
    it("returns empty array when no links found", () => {
      const expected: string[] = [];
      const actual = getMarkdownInternalLinks("");
      expect(actual).toEqual(expected);
    });
    it("returns matches on MARKDOWN_REGEX_LINK_MARKDOWN_FILE", () => {
      const expected: string[] = [
        "asset-inventory-filters.md",
        "configure-integrations.md",
      ];
      const actual = getMarkdownInternalLinks(
        markdownAsStringWithInternalLinks
      );
      expect(actual).toEqual(expected);
    });
  });
  describe("getMarkdownInternalReferences", () => {
    it("returns empty array when no links found", () => {
      const expected: string[] = [];
      const actual = getMarkdownInternalReferences("");
      expect(actual).toEqual(expected);
    });
    it("returns matches on MARKDOWN_REGEX_NON_LINK_FILE_PATH", () => {
      const expected: string[] = [
        "/jupiterone-api",
        "/queries/common-qq-training",
        "/queries/common-qq-endpoint",
        "/schemas/bulk-upload",
        "/jupiterone-api",
        "/../docs/data-model/org-grc",
      ];
      const actual = getMarkdownInternalReferences(
        markdownAsStringWithInternalLinks
      );
      expect(actual).toEqual(expected);
    });
  });
  describe("fullMarkdownReferencePath", () => {
    it("returns empty array when no links found", () => {
      const expected: string[] = [];
      const actual = fullMarkdownReferencePath("");
      expect(actual).toEqual(expected);
    });
    it("returns matches on MARKDOWN_REGEX_FULL_MARKDOWN_PATH", () => {
      const expected: string[] = [
        "asset-inventory-filters.md",
        "../jupiterone-api.md",
        "configure-integrations.md",
        "../queries/common-qq-training.md",
        "../queries/common-qq-endpoint.md",
        "./schemas/bulk-upload.md",
        "./jupiterone-api.md",
        "../../docs/data-model/org-grc.md",
      ];
      const actual = fullMarkdownReferencePath(
        markdownAsStringWithInternalLinks
      );
      expect(actual).toEqual(expected);
    });
  });
});
