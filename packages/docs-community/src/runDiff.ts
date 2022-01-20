import { refreshVanillaItems } from "./";
import { logger } from "./loggingUtil";

const updateCommunityDocsByMergeChanges = async () => {
  try {
    const completed = await refreshVanillaItems();

    logger.info(
      `UpdateCommunityDocs cssompleted: ${JSON.stringify(completed, null, 2)}`
    );
  } catch (error) {
    logger.error(`UpdateCommunityDocs Errored: \n ${JSON.stringify(error)}`);
  }
};
export default updateCommunityDocsByMergeChanges();
