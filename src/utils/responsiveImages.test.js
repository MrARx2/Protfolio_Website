import fs from "fs";
import path from "path";
import images from "../data/responsiveImages.json";
import { imageVariant, responsiveImageProps } from "./responsiveImages";

test("every generated preview points to an existing asset and preserves its original", () => {
  Object.entries(images).forEach(([original, image]) => {
    expect(fs.existsSync(path.join(process.cwd(), "public", original))).toBe(true);
    expect(image.width).toBeGreaterThan(0);
    expect(image.height).toBeGreaterThan(0);
    image.variants.forEach((variant) => {
      expect(fs.existsSync(path.join(process.cwd(), "public", variant.src))).toBe(true);
      expect(variant.width).toBeLessThanOrEqual(image.width);
    });
  });
});

test("new or external image URLs still work before preview generation", () => {
  expect(responsiveImageProps("/new-image.jpg", "100vw")).toEqual({ src: "/new-image.jpg" });
  expect(imageVariant("https://example.com/image.jpg")).toBe("https://example.com/image.jpg");
});

test("a small thumbnail selects the smallest preview instead of the full-size render", () => {
  const source = "/Images/Renders and Modeling/Rainbow_Dagger/Highres-Screenshot00006.png";
  expect(imageVariant(source, 100)).toMatch(/-320\.webp$/);
  expect(responsiveImageProps(source, "96px").srcSet).toContain("768w");
  expect(responsiveImageProps(source, "96px").sizes).toBe("96px");
});
