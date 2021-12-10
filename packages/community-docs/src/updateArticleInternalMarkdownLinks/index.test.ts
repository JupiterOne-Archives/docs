import { getAllArticlesReturn } from "../mocks/articles";
import { completedProcedures } from "../mocks/procedures";
import { updateArticleInternalMarkdownLinks } from "./";

const expectedReturn =
  "\n" +
  "    [1]: https://raw.githubusercontent.com/feathericons/feather/master/icons/settings.svg?sanitize=true\n" +
  "    https://jupiterone.vanillastaging.com/kb/categories/304-api-key-access\n" +
  "    - If you are an **Enterprise** customer and use SAML SSO, see the instructions\n" +
  "    [here](https://jupiterone.vanillastaging.com/kb/categories/304-faq-integrations)\n" +
  "   https://jupiterone.vanillastaging.com/kb/categories/305-alert-rule,\n" +
  "   https://jupiterone.vanillastaging.com/kb/categories/304-integrations-roadmap,\n" +
  "   https://jupiterone.vanillastaging.com/kb/categories/304-configure-sso-integration,\n" +
  "    - If you are an **Enterprise** customer and use SAML SSO, see the instructions\n" +
  "    click [here](https://jupiterone.vanillastaging.com/kb/categories/304-configure-sso-integration)\n" +
  " \n" +
  "   https://jupiterone.vanillastaging.com/kb/categories/304-faqs-aws\n" +
  "    ";
describe("updateArtilceInternalMarkdownLinks", () => {
  describe("index", () => {
    it("uses passed articles for urls", () => {
      const articles = getAllArticlesReturn;
      const actual = updateArticleInternalMarkdownLinks(
        completedProcedures,
        articles
      );

      const linksToRemove = actual[0].referencesNeedingUpdatesInMarkdown;
      expect(linksToRemove?.length).toEqual(7);
      expect(actual.length).toEqual(1);
      expect(actual[0].body).toEqual(expectedReturn);
    });
  });
});
