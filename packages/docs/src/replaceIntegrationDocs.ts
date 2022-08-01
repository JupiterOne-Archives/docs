import { updateIntegrationArticles } from '.';
import { logger } from './loggingUtil';

const replaceIntegrationDocsWithGitHubRepoDocs = async () => {
  try {
    logger.info(
      '------------ STARTING TO UPDATE INTEGRATIONS DOCS ------------'
    );
    await updateIntegrationArticles();

    logger.info(
      '------------ COMPLETED INTEGRATIONS DOCS UPDATES ------------'
    );
  } catch (error) {
    logger.error(`ERROR UPDATING INTEGRATIONS DOCS: ${JSON.stringify(error)}`);
  }
};
export default replaceIntegrationDocsWithGitHubRepoDocs();
