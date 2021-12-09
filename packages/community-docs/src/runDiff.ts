import { deleteAllThingsCurrentlyOnVanillaForum } from "./";
import { Logger } from "./Logging";

const getDiffAndReportIssues = async () => {
  try {
    Logger.info("Starting updateCommunityDocs");
    const completed = await deleteAllThingsCurrentlyOnVanillaForum();

    Logger.info(`UpdateCommunityDocs completed: ${completed}`);
  } catch (error) {
    Logger.error(`UpdateCommunityDocs Errored: \n ${JSON.stringify(error)}`);
  }
};
export default getDiffAndReportIssues();
