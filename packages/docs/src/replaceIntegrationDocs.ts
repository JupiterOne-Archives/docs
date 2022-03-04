import { updateIntegrationArticles } from ".";
import { logger } from "./loggingUtil";

const replaceIntegrationDocsWithGitHubRepoDocs = async () => {
  try {
    const completed = await updateIntegrationArticles();

    logger.info(
      `Update integrations from integrationConfig: ${JSON.stringify(
        completed,
        null,
        2
      )}`
    );
  } catch (error) {
    logger.error(`integrationConfig Errored: \n ${JSON.stringify(error)}`);
  }
};
export default replaceIntegrationDocsWithGitHubRepoDocs();
