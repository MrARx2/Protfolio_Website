import { decodeRoutePart } from "./routeHelpers";

test("decodes shared project and system names", () => {
  expect(decodeRoutePart("Roguelike%20Talent%20System")).toBe("Roguelike Talent System");
  expect(decodeRoutePart("rainbow-dagger")).toBe("rainbow-dagger");
});

test("malformed shared links cannot throw during rendering", () => {
  expect(decodeRoutePart("%E0%A4%A")).toBeNull();
  expect(decodeRoutePart("100%" )).toBeNull();
});
