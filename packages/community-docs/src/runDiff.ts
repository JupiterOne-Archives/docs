import { updateVanillaWithDirectoryToWatch } from "./";
import { Logger } from "./Logging";

const getDiffAndReportIssues = async () => {
  try {
    Logger.info("Starting updateCommunityDocs");
    const completed = await updateVanillaWithDirectoryToWatch();

    Logger.info(`UpdateCommunityDocs completed: ${completed}`);
  } catch (error) {
    Logger.error(`UpdateCommunityDocs Errored: \n ${JSON.stringify(error)}`);
  }
};
export default getDiffAndReportIssues();
