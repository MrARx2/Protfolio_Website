export function fitImageSize(image, viewport, padding = 16) {
  if (!image?.width || !image?.height || !viewport.width || !viewport.height) return { width: 0, height: 0 };
  const scale = Math.max(0, Math.min((viewport.width - padding) / image.width, (viewport.height - padding) / image.height, 1));
  return { width: image.width * scale, height: image.height * scale };
}

export function isGallerySwipe(dx, dy) {
  return Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4;
}
