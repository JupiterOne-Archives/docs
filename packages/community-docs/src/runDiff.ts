import { updateCommunityDocs } from "./";
// import {updateArticleInternalMarkdownLinks} from './linksAndMediaHandlers/updateArticleInternalMarkdownLinks'
import { logger } from "./loggingUtil";

const updateCommunityDocsByMergeChanges = async () => {
  try {
    logger.info("Starting updateCommunityDocs");
    const completed = await updateCommunityDocs();

    logger.info(
      `UpdateCommunityDocs completed: ${JSON.stringify(completed, null, 2)}`
    );
  } catch (error) {
    logger.error(`UpdateCommunityDocs Errored: \n ${JSON.stringify(error)}`);
  }
};
export default updateCommunityDocsByMergeChanges();
