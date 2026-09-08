import React, { act } from "react";
import { createRoot } from "react-dom/client";
import ProjectPreviewMedia from "./ProjectPreviewMedia";

let mount, root, observe, nextImage;
const project = { id: "test", title: "Test", cardPreview: { frames: [
  { src: "/first.jpg", label: "First" }, { src: "/second.jpg", label: "Second" }
] } };
beforeEach(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  jest.useFakeTimers();
  window.matchMedia = jest.fn(() => ({ matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn() }));
  observe = jest.fn();
  global.IntersectionObserver = class { observe = observe; disconnect() {} };
  nextImage = jest.spyOn(window, "Image");
  mount = document.createElement("div");
  document.body.append(mount);
  root = createRoot(mount);
});
afterEach(() => {
  act(() => root.unmount());
  mount.remove();
  jest.useRealTimers();
  jest.restoreAllMocks();
});

test("touch and narrow screens keep a single preview without timers, decoding, or visibility observers", () => {
  window.matchMedia.mockReturnValue({ matches: true, addEventListener: jest.fn(), removeEventListener: jest.fn() });
  act(() => root.render(<ProjectPreviewMedia project={project} />));
  const image = mount.querySelector("img");
  act(() => jest.advanceTimersByTime(60000));
  expect(mount.querySelector("img")).toBe(image);
  expect(image.getAttribute("src")).toBe("/first.jpg");
  expect(mount.querySelector(".project-preview-count")).toBeNull();
  expect(mount.querySelector(".project-preview-progress")).toBeNull();
  expect(observe).not.toHaveBeenCalled();
  expect(nextImage).not.toHaveBeenCalled();
});

test("desktop previews do not reset or start preloading when rapidly crossing the viewport edge", () => {
  let intersection;
  global.IntersectionObserver = class {
    constructor(callback) { intersection = callback; }
    observe() {} disconnect() {}
  };
  act(() => root.render(<ProjectPreviewMedia project={project} />));
  const image = mount.querySelector("img");
  for (let i = 0; i < 20; i += 1) {
    act(() => intersection([{ isIntersecting: true, intersectionRatio: 0.5 }]));
    act(() => intersection([{ isIntersecting: false, intersectionRatio: 0 }]));
  }
  expect(mount.querySelector("img")).toBe(image);
  // No image is allocated until the card has stayed visible for its dwell delay.
  expect(nextImage).not.toHaveBeenCalled();
});
