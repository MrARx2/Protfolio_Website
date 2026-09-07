import React, { act } from "react";
import { createRoot } from "react-dom/client";
import ResponsiveImage from "./ResponsiveImage";

test("a missing optimized image falls back to its original before reporting failure", () => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  const mount = document.createElement("div");
  const root = createRoot(mount);
  const onError = jest.fn();
  const src = "/Images/Ricochet/Mid-Match.jpg";
  act(() => root.render(<ResponsiveImage src={src} alt="Ricochet" onError={onError} />));
  expect(mount.querySelector("img").getAttribute("src")).toContain("/Images/previews/");
  act(() => mount.querySelector("img").dispatchEvent(new Event("error")));
  expect(mount.querySelector("img").getAttribute("src")).toBe(src);
  expect(mount.querySelector("img").hasAttribute("srcset")).toBe(false);
  expect(onError).not.toHaveBeenCalled();
  act(() => mount.querySelector("img").dispatchEvent(new Event("error")));
  expect(onError).toHaveBeenCalledTimes(1);
  act(() => root.unmount());
});
