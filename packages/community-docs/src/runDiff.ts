import { updateCommunityDocs } from "./";

const getDiffAndReportIssues = async () => {
  try {
    console.log("Running updateCommunityDocs");
    const completed = await updateCommunityDocs();
    if (completed !== undefined) {
      console.log("Completed", completed);
    } else {
      console.log("Failure");
    }
  } catch (error) {
    console.log("Failure on updateCommunityDocs: ", error);
  }
};
export default getDiffAndReportIssues();
