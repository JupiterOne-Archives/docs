// import { updateCommunityDocs } from "./";
import { updateArticleInternalMarkdownLinks } from "./linksAndMediaHandlers/updateArticleInternalMarkdownLinks";
import { Logger } from "./Logging";

const getDiffAndReportIssues = async () => {
  try {
    Logger.info("Starting updateCommunityDocs");
    const completed = await updateArticleInternalMarkdownLinks();

    Logger.info(`UpdateCommunityDocs completed: ${completed}`);
  } catch (error) {
    Logger.error(`UpdateCommunityDocs Errored: \n ${JSON.stringify(error)}`);
  }
};
export default getDiffAndReportIssues();
