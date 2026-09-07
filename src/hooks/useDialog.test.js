import { lockPageScroll } from "./useDialog";

test("closing a gallery keeps its underlying case study scroll-locked", () => {
  document.body.style.overflow = "auto";
  document.body.style.paddingRight = "8px";
  const closeProject = lockPageScroll();
  const lockedPadding = document.body.style.paddingRight;
  const closeGallery = lockPageScroll();
  expect(document.body.style.paddingRight).toBe(lockedPadding);
  closeGallery();
  expect(document.body.style.overflow).toBe("hidden");
  closeProject();
  expect(document.body.style.overflow).toBe("auto");
  expect(document.body.style.paddingRight).toBe("8px");
});

test("dialogs can close out of order and cleanup is safe to repeat", () => {
  document.body.style.overflow = "";
  const closeFirst = lockPageScroll();
  const closeSecond = lockPageScroll();
  closeFirst();
  closeFirst();
  expect(document.body.style.overflow).toBe("hidden");
  closeSecond();
  expect(document.body.style.overflow).toBe("");
});
