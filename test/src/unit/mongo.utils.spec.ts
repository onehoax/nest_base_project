import { getIsDeleted } from "@inlaze_techlead/gannar-core";

describe("Mongo Utils", () => {
  test("IsDeleted util", () => {
    const flag: boolean = true;

    expect(getIsDeleted(flag)).toEqual({ isDeleted: flag });
  });
});
