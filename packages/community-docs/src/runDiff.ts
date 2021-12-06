import { replaceVanillaWithDirectoryToWatch } from "./";

const getDiffAndReportIssues = async () => {
  try {
    console.log("Running replaceVanillaWithDirectoryToWatch");
    const completed = await replaceVanillaWithDirectoryToWatch();

    if (completed !== undefined) {
      console.log("Completed", completed);
    } else {
      console.log("Failure");
    }
    console.log(completed, "Completed console log");
  } catch (error) {
    console.log("Failure on replaceVanillaWithDirectoryToWatch: ", error);
  }
};
export default getDiffAndReportIssues();
