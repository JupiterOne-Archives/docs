import { getDiffFromHead } from ".";
jest.mock("simple-git/promise", () => {
  const mGit = {
    diff: jest
      .fn()
      .mockResolvedValue(
        `knowledgeBase/compliance-reporting/adv-example-query-using-metadata.md`
      ),
  };
  return jest.fn(() => mGit);
});
describe("gitDifferent", () => {
  const mockValues =
    "knowledgeBase/compliance-reporting/adv-example-query-using-metadata.md";

  it("returns success", async () => {
    const actual = await getDiffFromHead();
    expect(actual).toEqual(mockValues);
  });
});
