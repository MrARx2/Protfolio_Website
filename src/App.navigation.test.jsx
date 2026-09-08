import React, { act } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

jest.mock("./components/cards/FrostedCard", () => ({ project, onClick }) => <button id={`project-card-${project.id}`} onClick={() => onClick(project)}>{project.title}</button>);
jest.mock("./components/cards/ModelingCard", () => () => null);
jest.mock("./components/cards/SceneCard", () => () => null);
jest.mock("./components/layout/Navbar", () => () => <div className="navbar" />);
jest.mock("./components/sections/AboutSection", () => () => <section id="about" />);
jest.mock("./hooks/useScrollReveal", () => () => {});
jest.mock("./hooks/usePortfolioScroll", () => () => {});
jest.mock("./components/layout/ScrollProgress", () => () => null);
jest.mock("./components/project/ProjectDetail", () => ({ project, nextProject, onNextProject, onBack, onViewWork }) => <section data-project={project.id}>
  <button data-action="back" onClick={onBack}>Back</button>
  <button data-action="all" onClick={onViewWork}>All work</button>
  {nextProject && <button data-action="next" onClick={onNextProject}>{nextProject.title}</button>}
</section>);

let root, mount, frames, go;
const click = selector => act(() => mount.querySelector(selector).click());
const flushFrames = () => act(() => {
  const queued = [...frames.values()]; frames.clear();
  queued.forEach(callback => callback(performance.now()));
});
const pop = (state, hash) => act(() => {
  window.history.replaceState(state, "", hash);
  window.dispatchEvent(new PopStateEvent("popstate", { state }));
});
const render = (hash = "#about") => {
  window.history.replaceState(null, "", hash);
  act(() => root.render(<App />));
};
beforeEach(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  frames = new Map(); let frameId = 0;
  window.matchMedia = jest.fn(() => ({ matches: true, addEventListener: jest.fn(), removeEventListener: jest.fn() }));
  jest.spyOn(window, "requestAnimationFrame").mockImplementation(callback => { frames.set(++frameId, callback); return frameId; });
  jest.spyOn(window, "cancelAnimationFrame").mockImplementation(id => frames.delete(id));
  jest.spyOn(window, "scrollTo").mockImplementation(() => {});
  jest.spyOn(window, "scrollBy").mockImplementation(() => {});
  go = jest.spyOn(window.history, "go").mockImplementation(() => {});
  Object.defineProperty(window, "scrollY", { value: 1240, writable: true, configurable: true });
  Object.defineProperty(document.documentElement, "scrollHeight", { value: 10000, configurable: true });
  mount = document.createElement("div"); document.body.append(mount); root = createRoot(mount);
});
afterEach(() => {
  act(() => root.unmount()); mount.remove(); jest.restoreAllMocks();
  Object.defineProperty(window, "scrollY", { value: 0, configurable: true });
});

test("next projects preserve the original return position, while browser Back can revisit each project", () => {
  render(); click("#project-card-path-of-embers");
  const first = window.history.state;
  click('[data-action="next"]');
  const second = window.history.state;
  expect(second).toMatchObject({ project: "Ricochet", projectDepth: 2, returnProjectId: "path-of-embers", scrollY: 1240 });
  expect(document.title).toContain("Ricochet");
  pop(first, "#project/path-of-embers");
  expect(mount.querySelector('[data-project="path-of-embers"]')).not.toBeNull();
  pop(second, "#project/Ricochet");
  click('[data-action="back"]');
  expect(go).toHaveBeenCalledWith(-2);
  click('[data-action="back"]');
  expect(go).toHaveBeenCalledTimes(1);
  pop({ kind: "portfolio", category: "games", scrollY: 1240 }, "#games");
  flushFrames(); flushFrames();
  expect(mount.querySelector("[data-project]")).toBeNull();
  expect(window.scrollTo).toHaveBeenCalledWith({ top: 1240, behavior: "auto" });
  expect(document.activeElement.id).toBe("project-card-path-of-embers");
});

test("direct project links can return to the portfolio without leaving the website", () => {
  render("#project/path-of-embers");
  click('[data-action="next"]');
  expect(window.history.state.canGoBack).toBe(false);
  click('[data-action="back"]');
  flushFrames(); flushFrames();
  expect(go).not.toHaveBeenCalled();
  expect(window.location.hash).toBe("#games");
  expect(mount.querySelector("[data-project]")).toBeNull();
});

test("the explicit all-work action returns to the start of the portfolio", () => {
  render("#project/path-of-embers");
  click('[data-action="all"]');
  flushFrames(); flushFrames();
  expect(window.location.hash).toBe("#projects");
  expect(document.activeElement.id).toBe("main-content");
});
