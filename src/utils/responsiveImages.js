import images from "../data/responsiveImages.json";

export function imageVariant(src, width = 768) {
  const variants = images[src]?.variants;
  return variants?.find((variant) => variant.width >= width)?.src || variants?.[variants.length - 1]?.src || src;
}

export function responsiveImageProps(src, sizes) {
  const image = images[src];
  if (!image) return { src };
  return {
    src: imageVariant(src),
    srcSet: image.variants.map((variant) => `${variant.src} ${variant.width}w`).join(", "),
    sizes,
    width: image.width,
    height: image.height
  };
}
