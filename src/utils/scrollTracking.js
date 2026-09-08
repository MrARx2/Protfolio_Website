// Measure layout only when it changes. A scroll frame reads the scroll offset
// and uses cached geometry, rather than forcing layout for every section.
export function trackScroll({ root = window, content, targets = [], inset, onUpdate }) {
  const isPage = root === window;
  let frame = null;
  let dirty = true;
  let metrics;
  const position = () => isPage ? window.scrollY : root.scrollTop;

  const update = () => {
    frame = null;
    const offset = position();
    if (dirty) {
      const rootTop = isPage ? 0 : root.getBoundingClientRect().top;
      const viewportHeight = isPage ? window.innerHeight : root.clientHeight;
      metrics = {
        viewportHeight,
        maxScroll: Math.max(0, (isPage ? document.documentElement.scrollHeight : root.scrollHeight) - viewportHeight),
        insetHeight: inset?.getBoundingClientRect().height || 0,
        tops: targets.map((target) => target.getBoundingClientRect().top + offset - rootTop)
      };
      dirty = false;
    }
    onUpdate({ ...metrics, position: offset });
  };
  const schedule = () => {
    if (frame === null) frame = window.requestAnimationFrame(update);
  };
  const invalidate = () => { dirty = true; schedule(); };
  const observer = typeof ResizeObserver === "function" ? new ResizeObserver(invalidate) : null;
  new Set([content, inset, ...targets, isPage ? document.documentElement : root])
    .forEach((element) => { if (element) observer?.observe(element); });
  root.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", invalidate, { passive: true });
  update();

  return () => {
    root.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", invalidate);
    observer?.disconnect();
    if (frame !== null) window.cancelAnimationFrame(frame);
  };
}
