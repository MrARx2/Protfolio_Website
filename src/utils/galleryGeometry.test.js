import { fitImageSize, isGallerySwipe } from "./galleryGeometry";

test("a wide process image fits a small phone without magnifying empty space", () => {
  const size = fitImageSize({ width: 1920, height: 1080 }, { width: 302, height: 408 });
  expect(size.width).toBe(286);
  expect(size.height).toBeCloseTo(160.875);
  // Zooming the image keeps it shorter than the viewport; it stays centered.
  expect(size.height * 2).toBeLessThan(408);
});

test("a tall mobile capture fits entirely inside a landscape viewer", () => {
  const size = fitImageSize({ width: 1440, height: 3120 }, { width: 828, height: 242 });
  expect(size.height).toBeCloseTo(226);
  expect(size.width / size.height).toBeCloseTo(1440 / 3120);
});

test("small images retain their intrinsic size and unmeasured images do not divide by zero", () => {
  expect(fitImageSize({ width: 80, height: 40 }, { width: 800, height: 600 })).toEqual({ width: 80, height: 40 });
  expect(fitImageSize(null, { width: 0, height: 0 })).toEqual({ width: 0, height: 0 });
});

test("vertical scrolling, diagonal movement and taps never navigate the gallery", () => {
  expect(isGallerySwipe(8, 0)).toBe(false);
  expect(isGallerySwipe(70, 80)).toBe(false);
  expect(isGallerySwipe(70, 55)).toBe(false);
  expect(isGallerySwipe(-80, 12)).toBe(true);
  expect(isGallerySwipe(80, -12)).toBe(true);
});
