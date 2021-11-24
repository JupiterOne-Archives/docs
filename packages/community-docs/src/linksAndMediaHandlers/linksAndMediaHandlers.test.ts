import {
  getMarkdownImageSrcs,
  isSupportedMediaType,
  modifyBodyImageLink,
} from "./";
import {
  assetDefinition,
  criticalAsset,
  gearImage,
  markdownAsString,
  markdownAsStringNOImages,
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
});
