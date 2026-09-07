import { useEffect, useRef } from "react";

let scrollLocks = 0;
let restoreScrollStyles;

// A gallery can sit above a case study. Only the last dialog unlocks the page.
export function lockPageScroll() {
  if (scrollLocks++ === 0) {
    const body = document.body;
    const previous = { overflow: body.style.overflow, paddingRight: body.style.paddingRight };
    const gutter = window.innerWidth - document.documentElement.clientWidth;
    if (gutter > 0) body.style.paddingRight = `${parseFloat(getComputedStyle(body).paddingRight) + gutter}px`;
    body.style.overflow = "hidden";
    restoreScrollStyles = () => Object.assign(body.style, previous);
  }
  let released = false;
  return () => {
    if (released) return;
    released = true;
    if (--scrollLocks === 0) restoreScrollStyles?.();
  };
}

export function usePageScrollLock() {
  useEffect(() => lockPageScroll(), []);
}

export default function useDialog({ panelRef, initialFocusRef, onClose, backgroundSelector, returnFocusRef }) {
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const trigger = returnFocusRef?.current || document.activeElement;
    const triggerParent = trigger?.parentElement;
    const unlock = lockPageScroll();
    const background = backgroundSelector ? document.querySelector(backgroundSelector) : null;
    const wasInert = background?.inert;
    if (background) background.inert = true;
    initialFocusRef.current?.focus({ preventScroll: true });
    const handleKey = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        closeRef.current();
      }
      if (event.key !== "Tab") return;
      const items = Array.from(panelRef.current?.querySelectorAll('button:not([disabled]), [href], iframe, [tabindex]:not([tabindex="-1"])') || [])
        .filter((item) => item.getClientRects().length && !item.closest('[inert]'));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && (document.activeElement === first || !panelRef.current.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !panelRef.current.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      unlock();
      if (background) background.inert = wasInert;
      requestAnimationFrame(() => {
        const target = trigger?.isConnected ? trigger : triggerParent?.isConnected
          ? triggerParent.querySelector('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])') : null;
        if (target && !target.closest('[inert]')) target.focus({ preventScroll: true });
      });
    };
  }, [backgroundSelector, initialFocusRef, panelRef, returnFocusRef]);
}
