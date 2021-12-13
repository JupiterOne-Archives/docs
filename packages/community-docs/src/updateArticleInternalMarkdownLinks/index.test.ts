/* eslint-disable no-useless-escape */
import { getAllArticlesReturn } from "../mocks/articles";
import { completedProcedures } from "../mocks/procedures";
import { updateArticleInternalMarkdownLinks } from "./";

// const expectedReturn =
//   "\n" +
//   "    [1]: https://raw.githubusercontent.com/feathericons/feather/master/icons/settings.svg?sanitize=true\n" +
//   "    https://jupiterone.vanillastaging.com/kb/articles/537-api-key-access\n" +
//   "    - If you are an **Enterprise** customer and use SAML SSO, see the instructions\n" +
//   "    [here](https://jupiterone.vanillastaging.com/kb/articles/542-faqs-integrations)" +
//   "\b" +
//   `   <a rel="nofollow" href="https://jupiterone.vanillastaging.com/kb/articles/536-alert-rule">instructions</a>\n` +
//   "   https://jupiterone.vanillastaging.com/kb/articles/543-integrations-roadmap,\n" +
//   "   https://jupiterone.vanillastaging.com/kb/articles/540-configure-sso-integration,\n" +
//   "    - If you are an **Enterprise** customer and use SAML SSO, see the instructions\n" +
//   "    click [here](https://jupiterone.vanillastaging.com/kb/articles/540-configure-sso-integration)\n" +
//   " \n" +
//   "   https://jupiterone.vanillastaging.com/kb/articles/541-faqs-aws\n" +
//   "    ";

// const exampleResponse = `<h1 data-id=\"example-of-adding-a-new-doc\">Example of Adding a New Doc</h1>\n\n<h2 data-id=\"adding-an-image-just-like-with-previous-markdown-file\">Adding an image. Just like with previous markdown file.</h2>\n\n<p>As a markdown file is converted to a vanilla 'article', the asset referenced is uploaded to vanilla (10mb limit each) and the image link in your markdown file will be replaced with vanilla's version of that asset.</p>\n\n<p>Example image:</p>\n\n<blockquote class=\"UserQuote blockquote\"><div class=\"QuoteText blockquote-content\">\n  <p class=\"blockquote-line\"><img src=\"https://us.v-cdn.net/6035554/uploads/TAJVDH9N5EUP/compliance-mapped-policy-procedure.png\" alt=\"compliance-mapped-policy-procedure\" class=\"embedImage-img importedEmbed-img\"></img></p>\n</div></blockquote>\n\n<h2 data-id=\"adding-an-internal-link-to-another-document\">Adding an Internal Link to Another Document</h2>\n\n<p>You can reference other markdown files within a doc. The (internal) links added will be replaced with the link to the vanilla location of referenced doc.</p>\n\n<p>Example internal markdown link:</p>\n\n<ul><li><a rel=\"nofollow\" href=\"../getting-started-admin/catalog.md\">look at this other doc</a></li>\n</ul><p>Example internal link with reference list:</p>\n\n<p>See <a rel=\"nofollow\" href=\"../docs/metadata.md\">this doc</a> for a complete list and description of each metadata property</p>\n\n<h2 data-id=\"naming-of-articles-and-knowledge-categories\">`
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
