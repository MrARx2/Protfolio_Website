import React, { act } from "react";
import { createRoot } from "react-dom/client";
import PhoneImageModal from "./PhoneImageModal";

let root, mount, changed;
beforeEach(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  window.matchMedia = jest.fn(() => ({ matches: false }));
  HTMLElement.prototype.scrollTo = jest.fn();
  changed = jest.fn();
  mount = document.createElement("div");
  document.body.append(mount);
  root = createRoot(mount);
  act(() => root.render(<PhoneImageModal images={["/screen-one.jpg", "/screen-two.jpg"]} onClose={jest.fn()} onIndexChange={changed} />));
});
afterEach(() => {
  act(() => root.unmount());
  mount.remove();
  jest.restoreAllMocks();
});

test("a failed mobile screenshot offers recovery and cannot enter a blank zoom view", () => {
  act(() => mount.querySelector(".phone-modal-image").dispatchEvent(new Event("error")));
  expect(mount.querySelector(".phone-modal-error").textContent).toContain("couldn’t load");
  expect(mount.querySelector(".phone-modal-inspect-button").disabled).toBe(true);
  act(() => mount.querySelector(".phone-modal-error button").click());
  expect(mount.querySelector(".phone-modal-error")).toBeNull();
  act(() => mount.querySelector(".phone-modal-image").dispatchEvent(new Event("load")));
  expect(mount.querySelector(".phone-modal-inspect-button").disabled).toBe(false);
  expect(mount.querySelector(".phone-modal-loader")).toBeNull();
});

test("browser Back shortcuts are not consumed as gallery navigation", () => {
  const browserBack = new KeyboardEvent("keydown", { key: "ArrowLeft", altKey: true, cancelable: true });
  act(() => window.dispatchEvent(browserBack));
  expect(browserBack.defaultPrevented).toBe(false);
  expect(changed).toHaveBeenLastCalledWith(0);
  act(() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", cancelable: true })));
  expect(changed).toHaveBeenLastCalledWith(1);
});
