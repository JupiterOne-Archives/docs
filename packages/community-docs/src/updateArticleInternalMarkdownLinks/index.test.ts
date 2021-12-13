/* eslint-disable no-useless-escape */
import { getAllArticlesReturn } from "../mocks/articles";
import { completedProcedures } from "../mocks/procedures";
import { updateArticleInternalMarkdownLinks } from "./";

describe("updateArtilceInternalMarkdownLinks", () => {
  describe("index", () => {
    it("uses passed articles for urls", () => {
      const articles = getAllArticlesReturn;

      const actual = updateArticleInternalMarkdownLinks(
        completedProcedures,
        articles
      );

      const linksToRemove = actual[0].referencesNeedingUpdatesInMarkdown;
      expect(linksToRemove?.length).toEqual(8);
      expect(actual.length).toEqual(1);

      expect(
        actual[0].body.indexOf("../getting-started-admin/catalog.md")
      ).toEqual(-1);
      expect(
        actual[0].body.indexOf(
          "https://jupiterone.vanillastaging.com/kb/articles/545-catalog"
        )
      ).not.toEqual(-1);
    });
  });
});
