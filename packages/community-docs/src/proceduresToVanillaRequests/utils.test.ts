import { kCategoriesByPathSize } from "./utils";
describe("utils", () => {
  describe("kCategoriesByPathSize", () => {
    it("returns knowledgeCategories by lenght of path -longest first", async () => {
      const mockKCategories = [
        { path: "one/two/three/four" },
        { path: "one/two/three" },
        { path: "one/two" },
        { path: "one/two/three" },
        { path: "one" },
        { path: "one/two/three/four" },
      ] as any;
      const actual = kCategoriesByPathSize(mockKCategories);
      const expected = [
        { path: "one/two/three/four" },
        { path: "one/two/three/four" },
        { path: "one/two/three" },
        { path: "one/two/three" },
        { path: "one/two" },
        { path: "one" },
      ] as any;

      expect(actual).toEqual(expected);
    });

    it("returns input when no length", async () => {
      const mockKCategories = [] as any;
      const actual = kCategoriesByPathSize(mockKCategories);
      const expected = [] as any;

      expect(actual).toEqual(expected);
    });
  });
});
