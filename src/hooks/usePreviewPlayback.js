import { useEffect, useState } from "react";

const STATIC_QUERY = "(prefers-reduced-motion: reduce), (max-width: 900px), (hover: none), (pointer: coarse)";
export default function usePreviewPlayback() {
  const [paused, setPaused] = useState(() => {
    try { return localStorage.getItem("portfolio-previews-paused") === "true"; }
    catch { return false; }
  });
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    const query = window.matchMedia(STATIC_QUERY);
    const connection = navigator.connection;
    const update = () => setAvailable(!query.matches && !connection?.saveData);
    update();
    query.addEventListener?.("change", update);
    connection?.addEventListener?.("change", update);
    return () => { query.removeEventListener?.("change", update); connection?.removeEventListener?.("change", update); };
  }, []);
  const toggle = () => setPaused(previous => {
    const next = !previous;
    try { localStorage.setItem("portfolio-previews-paused", String(next)); } catch { /* Storage may be disabled. */ }
    return next;
  });
  return { paused, available, toggle };
}
