import HttpClient from "../../httpClient";
import { logger } from "../../loggingUtil";
import { VanillaArticle } from "../../utils";
import { createArticle, editArticle } from "../../VanillaAPI";

export interface CreateChangesContentForStagingProps {
  procedures: VanillaArticle[];
  httpClient: HttpClient;
  combinationOfArticlesAndProcedures: VanillaArticle[];
}
export const createChangesContentForStaging = async ({
  procedures,
  httpClient,
  combinationOfArticlesAndProcedures,
}: CreateChangesContentForStagingProps) => {
  if (process.env.targetVanillaEnv === "staging" || process.env.RUNNING_TESTS) {
    const [changesArticle] = combinationOfArticlesAndProcedures.filter(
      (p) => p.name === "Changes From Updates"
    );
    const body = `${procedures.map(
      (p) =>
        `\n [${p.name}](${p.url})${
          p.status !== "published" || !p.url ? " - Deleted" : ""
        }`
    )}`;

    if (changesArticle && changesArticle.articleID) {
      const now = new Date();
      const date = now.toISOString();
      const editBody = `## ${date.substring(0, date.indexOf("T"))} \n ${
        changesArticle.body ? changesArticle.body : ""
      } \n ${body}`;

      try {
        await editArticle(httpClient, changesArticle.articleID, {
          body: `${editBody}`,
        });
      } catch (e) {
        logger.error(`error editing changes article: \n ${e}`);
      }
    } else {
      console.log(body, "PPPDDDUYYY");
      const articleRequest: Partial<VanillaArticle> = {
        body,

        format: "markdown",
        knowledgeCategoryID: 1,
        locale: "en",
        name: "Changes From Updates",
        sort: 0,
      };
      try {
        await createArticle(
          httpClient,

          articleRequest
        );
      } catch (e) {
        logger.error(`error creating changes article: \n ${e}`);
      }
    }
  }
};
