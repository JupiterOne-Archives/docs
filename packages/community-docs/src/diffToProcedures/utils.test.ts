import { PATH_OF_DIRECTORY_TO_WATCH } from "../utils/constants";
import { filterDiffs } from "./utils";
describe("Utils", () => {
  describe("filterDiffs", () => {
    it("ignores Release-Notes directory", async () => {
      const exampleDiffs = [
        `${PATH_OF_DIRECTORY_TO_WATCH}/getting-started-admin/compliance-reporting/soc2-with-jupiterone-copy.md`,
        `${PATH_OF_DIRECTORY_TO_WATCH}/getting-started-admin/compliance-reporting/soc2-with-jupiterone.md`,
        `${PATH_OF_DIRECTORY_TO_WATCH}/getting-started-admin/jupiterone-query-language-copy.md`,
        `${PATH_OF_DIRECTORY_TO_WATCH}/getting-started-admin/jupiterone-query-language.md`,
        `${PATH_OF_DIRECTORY_TO_WATCH}/Release-Notes`,
        `${PATH_OF_DIRECTORY_TO_WATCH}/Release-Notes/2019-88.md`,
        `${PATH_OF_DIRECTORY_TO_WATCH}/release-notes/2012-88.md`,
      ];

      const actual = filterDiffs(exampleDiffs);

      const expected: string[] = [
        "getting-started-admin/jupiterone-query-language-copy.md",
        "getting-started-admin/jupiterone-query-language.md",
        "getting-started-admin/compliance-reporting/soc2-with-jupiterone-copy.md",
        "getting-started-admin/compliance-reporting/soc2-with-jupiterone.md",
      ];
      expect(actual).toEqual(expected);
    });
  });
});
