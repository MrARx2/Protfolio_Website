import { useEffect, useRef } from "react";
import { trackScroll } from "../utils/scrollTracking";

const sectionIds = ["games", "modeling", "scenes"];

export default function usePortfolioScroll({ enabled, docked, activeCategory, animationRef, onDockChange, onCategoryChange }) {
  const current = useRef({ docked, activeCategory });
  current.current = { docked, activeCategory };

  useEffect(() => {
    if (!enabled) return undefined;
    const pill = document.querySelector(".work-nav-shell");
    if (!pill) return undefined;
    const sections = sectionIds.map((category) => ({ category, element: document.getElementById(`${category}-section`) }))
      .filter(({ element }) => element);
    return trackScroll({
      content: document.querySelector(".portfolio-page"),
      targets: [pill, ...sections.map(({ element }) => element)],
      inset: document.querySelector(".navbar"),
      onUpdate: ({ position, tops, insetHeight }) => {
        // Separate dock/release thresholds prevent flicker at the handoff.
        const nextDocked = tops[0] - position <= (current.current.docked ? 96 : 72);
        if (nextDocked !== current.current.docked) {
          current.current.docked = nextDocked;
          onDockChange(nextDocked);
        }
        if (animationRef.current) return;
        const marker = position + (insetHeight || 72) + 40;
        let nextCategory = "all";
        sections.forEach(({ category }, index) => {
          if (tops[index + 1] <= marker) nextCategory = category;
        });
        if (nextCategory !== current.current.activeCategory) {
          current.current.activeCategory = nextCategory;
          onCategoryChange(nextCategory);
        }
      }
    });
  }, [enabled, animationRef, onDockChange, onCategoryChange]);
}
