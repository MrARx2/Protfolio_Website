import React, { useEffect, useRef } from "react";
import { trackScroll } from "../../utils/scrollTracking";

export default function ScrollProgress({ projectId }) {
  const barRef = useRef(null);
  useEffect(() => {
    const root = projectId ? document.querySelector(".project-detail-backdrop") : window;
    if (!root) return undefined;
    return trackScroll({
      root,
      content: document.querySelector(projectId ? ".project-detail" : ".portfolio-page"),
      onUpdate: ({ position, maxScroll }) => {
        const progress = maxScroll > 0 ? Math.max(0, Math.min(1, position / maxScroll)) : 0;
        // This tiny compositor-only update must not render the entire app.
        barRef.current.style.transform = `scaleX(${progress})`;
      }
    });
  }, [projectId]);
  return <div className="site-progress" aria-hidden="true"><span ref={barRef} style={{ transform: "scaleX(0)" }} /></div>;
}
