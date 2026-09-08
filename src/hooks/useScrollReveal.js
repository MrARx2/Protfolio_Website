import { useLayoutEffect } from "react";

const revealSelector = [
  ".work-section-heading",
  ".project-card",
  ".modeling-card",
  ".scene-card",
  ".contact-section > .section-kicker",
  ".contact-section > h2",
  ".contact-section > p",
  ".contact-section > .contact-actions",
  ".contact-section > .footer-meta",
  ".project-detail .section-header",
  ".project-detail .gallery-heading-row"
].join(",");

function revealDelay(target) {
  const parent = target.parentElement;
  if (!parent) return 0;

  const siblings = Array.from(parent.children).filter((child) => child.matches?.(
    ".project-card, .modeling-card, .scene-card"
  ));
  const index = siblings.indexOf(target);
  return index >= 0 ? Math.min(index * 90, 180) : 0;
}

export default function useScrollReveal(refreshKey) {
  useLayoutEffect(() => {
    const targets = Array.from(document.querySelectorAll(revealSelector));
    const skipReveal = window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 900px), (hover: none), (pointer: coarse)").matches;

    targets.forEach((target) => {
      target.classList.add("motion-reveal");
      target.style.setProperty("--reveal-delay", `${window.innerWidth > 768 ? revealDelay(target) : 0}ms`);
    });

    document.documentElement.classList.add("motion-observer-ready");

    if (skipReveal || !("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-revealed"));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0,
      rootMargin: "0px 0px 40px 0px"
    });

    targets.forEach((target) => {
      if (target.classList.contains("is-revealed")) return;
      observer.observe(target);
    });

    return () => {
      observer.disconnect();
      targets.forEach((target) => target.classList.add("is-revealed"));
    };
  }, [refreshKey]);
}
