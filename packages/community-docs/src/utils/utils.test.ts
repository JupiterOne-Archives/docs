import { createDisplayName } from "./common";
describe("createDisplayName", () => {
  it("handles dashes", () => {
    const expected = "Folder Name";
    const actual = createDisplayName("folder-name");
    expect(actual).toEqual(expected);
  });
  it("handles underscores", () => {
    const expected = "Folder Name";
    const actual = createDisplayName("folder_name");
    expect(actual).toEqual(expected);
  });
});
