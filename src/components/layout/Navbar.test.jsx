import React, { act } from "react";
import { createRoot } from "react-dom/client";
import Navbar from "./Navbar";

let root, page, frames, onSelect, back;
const portfolioState = { kind: "portfolio", category: "games", scrollY: 1240 };
const click = (element) => act(() => element.click());
const menu = () => document.querySelector(".mobile-menu-panel");
const popToPortfolio = () => {
  act(() => {
    window.history.replaceState(portfolioState, "", "#games");
    window.dispatchEvent(new PopStateEvent("popstate", { state: portfolioState }));
  });
  act(() => { while (frames.length) frames.shift()(); });
};

beforeEach(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  frames = [];
  onSelect = jest.fn();
  window.matchMedia = jest.fn(() => ({ matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn() }));
  Object.defineProperty(window, "scrollY", { value: 1240, configurable: true });
  jest.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => { frames.push(callback); return frames.length; });
  jest.spyOn(HTMLElement.prototype, "getClientRects").mockImplementation(() => [{ width: 44, height: 44 }]);
  back = jest.spyOn(window.history, "back").mockImplementation(() => {});
  window.history.replaceState(portfolioState, "", "#games");
  page = document.createElement("div");
  page.className = "portfolio-page";
  document.body.append(page);
  root = createRoot(page);
  act(() => root.render(<Navbar theme="amber" onThemeChange={jest.fn()} categories={[{ id: "games", label: "Games", count: 3 }]}
    activeCategory="games" onSelectCategory={onSelect} showCategories />));
});

afterEach(() => {
  act(() => root.unmount());
  page.remove();
  frames = [];
  Object.defineProperty(window, "scrollY", { value: 0, configurable: true });
  jest.restoreAllMocks();
});

test("browser Back dismisses the mobile menu and releases its scroll lock", () => {
  click(page.querySelector('[aria-label="Open menu"]'));
  expect(window.history.state).toMatchObject({ kind: "menu", scrollY: 1240 });
  expect(menu()).not.toBeNull();
  popToPortfolio();
  expect(menu()).toBeNull();
  expect(document.body.style.overflow).toBe("");
  expect(document.activeElement).toBe(page.querySelector('[aria-label="Open menu"]'));
});

test("selecting a section waits for menu history to close before scrolling", () => {
  click(page.querySelector('[aria-label="Open menu"]'));
  click(menu().querySelector(".mobile-menu-sections button"));
  expect(back).toHaveBeenCalledTimes(1);
  expect(onSelect).not.toHaveBeenCalled();
  popToPortfolio();
  expect(onSelect).toHaveBeenCalledWith("games");
  expect(menu()).toBeNull();
});

test("resume replaces the menu entry so Back returns directly to the portfolio", () => {
  click(page.querySelector('[aria-label="Open menu"]'));
  const entries = window.history.length;
  click(menu().querySelector(".mobile-menu-links button"));
  expect(window.history.length).toBe(entries);
  expect(window.history.state).toMatchObject({ kind: "resume", scrollY: 1240 });
  expect(menu()).toBeNull();
  expect(document.querySelector(".resume-modal-content")).not.toBeNull();
  popToPortfolio();
  expect(document.querySelector(".resume-modal-content")).toBeNull();
  expect(document.body.style.overflow).toBe("");
});
