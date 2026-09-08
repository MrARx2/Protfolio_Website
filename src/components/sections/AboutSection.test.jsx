import React, { act } from "react";
import { createRoot } from "react-dom/client";
import AboutSection from "./AboutSection";

const desktopQuery = "(min-width: 901px) and (hover: hover) and (pointer: fine)";
const motionQuery = "(prefers-reduced-motion: reduce)";
let root, mount, queries, observers, play, pause, hidden;

function setMedia(query, matches) {
  const media = window.matchMedia(query);
  media.matches = matches;
  act(() => media.listeners.forEach(listener => listener(media)));
}

function renderHero(props = {}) {
  act(() => root.render(<AboutSection onExplore={() => {}} {...props} />));
  act(() => jest.advanceTimersByTime(200));
  return mount.querySelector("video");
}

function intersect(visible) {
  act(() => observers[observers.length - 1].callback([{
    isIntersecting: visible,
    intersectionRatio: visible ? 1 : 0,
  }]));
}

beforeEach(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  jest.useFakeTimers();
  queries = new Map();
  window.matchMedia = jest.fn(query => {
    if (!queries.has(query)) {
      const listeners = new Set();
      queries.set(query, {
        matches: query === desktopQuery,
        listeners,
        addEventListener: (_, listener) => listeners.add(listener),
        removeEventListener: (_, listener) => listeners.delete(listener),
      });
    }
    return queries.get(query);
  });
  Object.defineProperty(navigator, "connection", {
    value: { saveData: false }, configurable: true,
  });
  hidden = jest.spyOn(document, "hidden", "get").mockReturnValue(false);
  const playback = new WeakMap();
  jest.spyOn(HTMLMediaElement.prototype, "paused", "get")
    .mockImplementation(function () { return playback.get(this) !== true; });
  play = jest.spyOn(HTMLMediaElement.prototype, "play")
    .mockImplementation(function () { playback.set(this, true); return Promise.resolve(); });
  pause = jest.spyOn(HTMLMediaElement.prototype, "pause")
    .mockImplementation(function () { playback.set(this, false); });
  observers = [];
  global.IntersectionObserver = class {
    constructor(callback) { this.callback = callback; observers.push(this); }
    observe() {}
    disconnect() {}
  };
  mount = document.createElement("div");
  document.body.append(mount);
  root = createRoot(mount);
});

afterEach(() => {
  act(() => root.unmount());
  mount.remove();
  delete navigator.connection;
  jest.useRealTimers();
  jest.restoreAllMocks();
});

test("desktop uses only the new video with a loading poster and controlled playback", () => {
  act(() => root.render(<AboutSection />));
  expect(mount.querySelector(".hero-desktop-poster")).not.toBeNull();
  expect(mount.querySelector("video")).toBeNull();
  act(() => jest.advanceTimersByTime(200));
  const video = mount.querySelector("video");
  expect(video.getAttribute("src")).toBe("/Videos/hero-desktop.mp4");
  expect(video.getAttribute("poster")).toBe("/Images/hero-desktop-poster.webp");
  expect(video.hasAttribute("autoplay")).toBe(false);
  expect(video.muted).toBe(true);
  expect(play).not.toHaveBeenCalled();
});

test("phones retain the portrait video without loading the desktop poster", () => {
  setMedia(desktopQuery, false);
  const video = renderHero();
  expect(video.getAttribute("src")).toBe("/Videos/herotrailer8_Compressed.mp4");
  expect(mount.querySelector(".hero-desktop-poster")).toBeNull();
  expect(video.hasAttribute("poster")).toBe(false);
});

test("changing the device layout replaces and pauses the previous video", () => {
  const desktop = renderHero();
  intersect(true);
  setMedia(desktopQuery, false);
  const mobile = mount.querySelector("video");
  expect(mobile).not.toBe(desktop);
  expect(desktop.paused).toBe(true);
  expect(mount.querySelectorAll("video")).toHaveLength(1);
  expect(mobile.getAttribute("src")).toContain("herotrailer8_Compressed.mp4");
  intersect(true);
  expect(mobile.paused).toBe(false);
});

test.each(["reduced motion", "data saving"])("%s displays the desktop poster without creating a video", preference => {
  if (preference === "reduced motion") setMedia(motionQuery, true);
  else navigator.connection.saveData = true;
  renderHero();
  act(() => jest.advanceTimersByTime(10000));
  expect(mount.querySelector("video")).toBeNull();
  expect(mount.querySelector(".hero-desktop-poster")).not.toBeNull();
  expect(play).not.toHaveBeenCalled();
});

test("video stays paused offscreen, in hidden tabs, and behind blocking overlays", async () => {
  const video = renderHero();
  intersect(false);
  expect(play).not.toHaveBeenCalled();
  intersect(true);
  expect(video.paused).toBe(false);
  intersect(false);
  expect(video.paused).toBe(true);
  intersect(true);
  hidden.mockReturnValue(true);
  act(() => document.dispatchEvent(new Event("visibilitychange")));
  expect(video.paused).toBe(true);
  hidden.mockReturnValue(false);
  act(() => document.dispatchEvent(new Event("visibilitychange")));
  expect(video.paused).toBe(false);
  const overlay = document.createElement("div");
  overlay.className = "resume-modal-backdrop";
  await act(async () => document.body.append(overlay));
  expect(video.paused).toBe(true);
  await act(async () => overlay.remove());
  expect(video.paused).toBe(false);
  renderHero({ paused: true });
  intersect(true);
  expect(video.paused).toBe(true);
  expect(pause).toHaveBeenCalled();
});
