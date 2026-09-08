import { trackScroll } from "./scrollTracking";

let frames, resize, observers;
const flush = () => {
  const queued = [...frames.values()];
  frames.clear();
  queued.forEach((callback) => callback());
};
beforeEach(() => {
  frames = new Map();
  observers = [];
  let id = 0;
  jest.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => { frames.set(++id, callback); return id; });
  jest.spyOn(window, "cancelAnimationFrame").mockImplementation((frame) => frames.delete(frame));
  global.ResizeObserver = class {
    constructor(callback) { resize = callback; observers.push(this); }
    observe = jest.fn();
    disconnect = jest.fn();
  };
});
afterEach(() => jest.restoreAllMocks());

test("nested scrolling reuses section geometry, coalesces events, and remeasures after layout changes", () => {
  const root = document.createElement("div");
  const section = document.createElement("section");
  const toolbar = document.createElement("nav");
  Object.defineProperties(root, { clientHeight: { value: 600 }, scrollHeight: { value: 2400 } });
  root.getBoundingClientRect = jest.fn(() => ({ top: 20 }));
  let sectionTop = 900;
  section.getBoundingClientRect = jest.fn(() => ({ top: sectionTop - root.scrollTop + 20 }));
  toolbar.getBoundingClientRect = jest.fn(() => ({ height: 68 }));
  const update = jest.fn();
  const stop = trackScroll({ root, targets: [section], inset: toolbar, onUpdate: update });
  expect(update).toHaveBeenLastCalledWith({ position: 0, tops: [900], viewportHeight: 600, maxScroll: 1800, insetHeight: 68 });
  update.mockClear();
  for (let i = 0; i < 40; i += 1) {
    root.scrollTop = i * 10;
    root.dispatchEvent(new Event("scroll"));
  }
  flush();
  expect(update).toHaveBeenCalledTimes(1);
  expect(section.getBoundingClientRect).toHaveBeenCalledTimes(1);
  expect(update.mock.calls[0][0].position).toBe(390);
  sectionTop = 1100;
  resize();
  flush();
  expect(update.mock.calls.at(-1)[0].tops).toEqual([1100]);
  expect(section.getBoundingClientRect).toHaveBeenCalledTimes(2);
  stop();
});

test("unmount removes scroll listeners, pending frames, and layout observation", () => {
  const root = document.createElement("div");
  const update = jest.fn();
  const stop = trackScroll({ root, onUpdate: update });
  update.mockClear();
  root.dispatchEvent(new Event("scroll"));
  stop();
  flush();
  root.dispatchEvent(new Event("scroll"));
  window.dispatchEvent(new Event("resize"));
  flush();
  expect(update).not.toHaveBeenCalled();
  expect(observers[0].disconnect).toHaveBeenCalledTimes(1);
});
