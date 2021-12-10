import { updateCommunityDocs } from "./";
// import {updateArticleInternalMarkdownLinks} from './linksAndMediaHandlers/updateArticleInternalMarkdownLinks'
import { Logger } from "./Logging";

const updateCommunityDocsByMergeChanges = async () => {
  try {
    Logger.info("Starting updateCommunityDocs");
    const completed = await updateCommunityDocs();

    Logger.info(
      `UpdateCommunityDocs completed: ${JSON.stringify(completed, null, 2)}`
    );
  } catch (error) {
    Logger.error(`UpdateCommunityDocs Errored: \n ${JSON.stringify(error)}`);
  }
};
export default updateCommunityDocsByMergeChanges();
