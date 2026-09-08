import React, { act } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const mockCardRender = jest.fn();
jest.mock("./components/cards/FrostedCard", () => () => { mockCardRender(); return null; });
jest.mock("./components/cards/ModelingCard", () => () => null);
jest.mock("./components/cards/SceneCard", () => () => null);
jest.mock("./components/layout/Navbar", () => () => <div className="navbar" />);
jest.mock("./components/sections/AboutSection", () => () => <section id="about" />);
jest.mock("./hooks/useScrollReveal", () => () => {});

let root, mount, frames;
const flushFrames = () => act(() => {
  const queued = [...frames.values()];
  frames.clear();
  queued.forEach((callback) => callback(performance.now()));
});

beforeEach(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  frames = new Map();
  let frameId = 0;
  window.matchMedia = jest.fn(() => ({ matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn() }));
  global.ResizeObserver = class { observe() {} disconnect() {} };
  jest.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => { frames.set(++frameId, callback); return frameId; });
  jest.spyOn(window, "cancelAnimationFrame").mockImplementation((id) => frames.delete(id));
  Object.defineProperty(window, "scrollY", { value: 300, writable: true, configurable: true });
  Object.defineProperty(document.documentElement, "scrollHeight", { value: 10000, configurable: true });
  jest.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function () {
    const top = this.id === "projects" ? 100 : 2000;
    return { top: top - window.scrollY, bottom: top + 68 - window.scrollY, height: 68, width: 390 };
  });
  window.history.replaceState(null, "", "#about");
  mount = document.createElement("div");
  document.body.append(mount);
  root = createRoot(mount);
  act(() => root.render(<App />));
  flushFrames();
  flushFrames();
  mockCardRender.mockClear();
});

afterEach(() => {
  act(() => root.unmount());
  mount.remove();
  jest.restoreAllMocks();
});

test("a rapid scroll within a section does not redraw project cards or remeasure their layout", () => {
  const measure = HTMLElement.prototype.getBoundingClientRect;
  measure.mockClear();
  for (let step = 0; step < 60; step += 1) {
    act(() => {
      window.scrollY = 300 + step * 10;
      window.dispatchEvent(new Event("scroll"));
    });
    flushFrames();
  }
  expect(mockCardRender).not.toHaveBeenCalled();
  expect(measure).not.toHaveBeenCalled();
  expect(mount.querySelector(".site-progress span").style.transform).not.toBe("scaleX(0)");
});
