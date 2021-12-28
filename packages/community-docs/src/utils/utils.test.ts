import { createDisplayName } from "./common";
describe("createDisplayName", () => {
  it("dashes are replaced with a space and next word is capitalized", () => {
    const expected = "Folder Name";
    const actual = createDisplayName("folder-name");
    expect(actual).toEqual(expected);
  });
  it("underscores are replaced with a space", () => {
    const expected = "The Name is Big";
    const actual = createDisplayName("the-name_is-big");
    expect(actual).toEqual(expected);
  });
});
