import {
  checkBodyForTitleToUseForArticle,
  createDisplayName,
  getMarkdownAsStringFromPath,
  removeTitleFromArticleBody,
  sanitizeMarkdownNewLines,
} from "./common";
import { TITLE_FROM_MARKDOWN_REGEX } from "./constants";
describe("checkBodyForTitleToUseForArticle", () => {
  it("should return a string to use for title if tag used", async () => {
    const markdown = await getMarkdownAsStringFromPath("./mockMarkdown.md");
    const markdownTarget = markdown !== undefined ? markdown : "";
    const actual = checkBodyForTitleToUseForArticle(
      markdownTarget,
      TITLE_FROM_MARKDOWN_REGEX
    );
    const expected = "Using Filters in the Asset Inventory App";
    expect(actual).toEqual(expected);
  });
  it("should false if title target not found", async () => {
    const markdown = await getMarkdownAsStringFromPath(
      "./mockMarkdownNoTitle.md"
    );

    const markdownTarget = markdown !== undefined ? markdown : "";
    const actual = checkBodyForTitleToUseForArticle(
      markdownTarget,
      TITLE_FROM_MARKDOWN_REGEX
    );
    const expected = false;
    expect(actual).toEqual(expected);
  });
});

describe("removeTitleFromArticleBody", () => {
  it("returns string to be used as article body without part used for article title", async () => {
    const markdown = await getMarkdownAsStringFromPath(
      "./mockMarkdownForTitleRemoval.md"
    );
    const markdownTarget = markdown !== undefined ? markdown : "";

    const actual = removeTitleFromArticleBody(
      markdownTarget,
      TITLE_FROM_MARKDOWN_REGEX
    );
    const expected =
      "To see all the digital assets (entities) you have, in JupiterOne.";
    expect(actual).toEqual(expected);
  });
});
describe("createDisplayName", () => {
  it("dashes are replaced with a space and next word is capitalized", () => {
    const expected = "Folder Name";
    const actual = createDisplayName("folder-name");
    expect(actual).toEqual(expected);
  });
  it("underscores are replaced with a space", () => {
    const expected = "The Name is Big";
    const actual = createDisplayName("the-name_is-big");
    expect(actual).toEqual(expected);
  });
});

describe("sanitizeMarkdownNewLines", () => {
  it("removes extra spaces and trims lines", async () => {
    const markdown = await getMarkdownAsStringFromPath("markdownWithBreaks.md");

    if (markdown) {
      const actual = sanitizeMarkdownNewLines(markdown);
      let spacesNotWantedCount = 0;
      actual.split("").forEach((line) => {
        if (line === "") {
          spacesNotWantedCount++;
        }
      });
      expect(spacesNotWantedCount).toEqual(0);
    } else {
      expect(markdown).toBeDefined();
    }
  });
});
