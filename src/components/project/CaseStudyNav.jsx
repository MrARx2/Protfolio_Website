import React, { useCallback, useEffect, useRef, useState } from "react";

function CaseStudyNav({ sections, scrollRootRef }) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "");
  const navRef = useRef(null);
  const frameRef = useRef(null);
  const scrollAnimationRef = useRef(null);
  const indexRef = useRef(null);
  const [railEdges, setRailEdges] = useState({ overflow: false, start: true, end: true });

  useEffect(() => {
    const rail = navRef.current;
    const index = indexRef.current;
    if (!rail || !index) return undefined;
    const measure = () => {
      const next = { overflow: rail.scrollWidth > index.clientWidth + 2,
        start: rail.scrollLeft <= 2, end: rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2 };
      setRailEdges((previous) => Object.keys(next).every((key) => next[key] === previous[key]) ? previous : next);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(index);
    observer.observe(rail);
    rail.addEventListener("scroll", measure, { passive: true });
    measure();
    return () => { observer.disconnect(); rail.removeEventListener("scroll", measure); };
  }, [sections]);

  const scrollRail = (direction) => navRef.current?.scrollBy({
    left: direction * Math.max(120, navRef.current.clientWidth * 0.65),
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
  });

  useEffect(() => {
    setActiveSection(sections[0]?.id || "");
  }, [sections]);

  const updateActiveSection = useCallback(() => {
    const scrollRoot = scrollRootRef.current;
    if (!scrollRoot || sections.length === 0 || scrollAnimationRef.current) return;

    const toolbar = scrollRoot.querySelector(".case-study-toolbar");
    const toolbarBottom = toolbar?.getBoundingClientRect().bottom || 0;
    const activationLine = Math.max(toolbarBottom + 52, scrollRoot.clientHeight * 0.28);
    const availableSections = sections
      .map((section) => ({ ...section, element: document.getElementById(section.id) }))
      .filter((section) => section.element);

    if (availableSections.length === 0) return;

    const reachedBottom = scrollRoot.scrollTop + scrollRoot.clientHeight >= scrollRoot.scrollHeight - 4;
    let current = reachedBottom ? availableSections[availableSections.length - 1] : availableSections[0];

    if (!reachedBottom) {
      availableSections.forEach((section) => {
        if (section.element.getBoundingClientRect().top <= activationLine) current = section;
      });
    }

    setActiveSection((previous) => previous === current.id ? previous : current.id);
  }, [scrollRootRef, sections]);

  useEffect(() => {
    const scrollRoot = scrollRootRef.current;
    if (!scrollRoot) return undefined;

    const requestUpdate = () => {
      if (frameRef.current) return;
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        updateActiveSection();
      });
    };

    requestUpdate();
    scrollRoot.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      scrollRoot.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, [scrollRootRef, updateActiveSection]);

  useEffect(() => {
    const scrollRoot = scrollRootRef.current;
    if (!scrollRoot) return undefined;

    const cancelAnimatedScroll = () => {
      if (!scrollAnimationRef.current) return;
      window.cancelAnimationFrame(scrollAnimationRef.current);
      scrollAnimationRef.current = null;
    };

    scrollRoot.addEventListener("wheel", cancelAnimatedScroll, { passive: true });
    scrollRoot.addEventListener("touchstart", cancelAnimatedScroll, { passive: true });
    const cancelOnKey = (event) => { if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) cancelAnimatedScroll(); };
    scrollRoot.addEventListener("keydown", cancelOnKey);

    return () => {
      cancelAnimatedScroll();
      scrollRoot.removeEventListener("wheel", cancelAnimatedScroll);
      scrollRoot.removeEventListener("touchstart", cancelAnimatedScroll);
      scrollRoot.removeEventListener("keydown", cancelOnKey);
    };
  }, [scrollRootRef]);

  useEffect(() => {
    const nav = navRef.current;
    const activeButton = nav?.querySelector(`[data-section-id="${activeSection}"]`);
    if (!nav || !activeButton) return;

    const targetLeft = activeButton.offsetLeft - (nav.clientWidth - activeButton.offsetWidth) / 2;
    nav.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });
  }, [activeSection]);

  const navigateTo = (sectionId) => {
    const scrollRoot = scrollRootRef.current;
    const target = document.getElementById(sectionId);
    if (!scrollRoot || !target) return;

    const toolbar = scrollRoot.querySelector(".case-study-toolbar");
    const toolbarHeight = toolbar?.getBoundingClientRect().height || 68;
    const rootTop = scrollRoot.getBoundingClientRect().top;
    const heading = target.querySelector(".section-header, .gallery-heading-row") || target;
    const targetTop = Math.min(heading.getBoundingClientRect().top, target.querySelector(".video-preview-block")?.getBoundingClientRect().top ?? Infinity);
    const destination = sectionId === sections[0]?.id ? 0 : scrollRoot.scrollTop + targetTop - rootTop - toolbarHeight - 24;

    const targetScrollTop = Math.max(0, destination);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setActiveSection(sectionId);
    if (scrollAnimationRef.current) window.cancelAnimationFrame(scrollAnimationRef.current);

    if (reduceMotion) {
      scrollAnimationRef.current = null;
      scrollRoot.scrollTop = targetScrollTop;
      return;
    }

    const startScrollTop = scrollRoot.scrollTop;
    const distance = targetScrollTop - startScrollTop;
    const duration = Math.min(650, Math.max(360, Math.abs(distance) * 0.14));
    const startTime = window.performance.now();

    const animateScroll = (now) => {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 4);
      scrollRoot.scrollTop = startScrollTop + distance * eased;

      if (progress < 1) {
        scrollAnimationRef.current = window.requestAnimationFrame(animateScroll);
      } else {
        scrollAnimationRef.current = null;
      }
    };

    scrollAnimationRef.current = window.requestAnimationFrame(animateScroll);
  };

  if (sections.length < 2) return null;

  return (
    <nav className="case-study-index" aria-label="Case study sections" ref={indexRef}>
      {railEdges.overflow && <button type="button" className="case-study-rail-arrow" aria-label="Show earlier sections" disabled={railEdges.start} onClick={() => scrollRail(-1)}>‹</button>}
      <div className="case-study-index-rail" ref={navRef}>
        {sections.map((section) => (
          <button
            type="button"
            key={section.id}
            data-section-id={section.id}
            className={activeSection === section.id ? "active" : ""}
            aria-current={activeSection === section.id ? "location" : undefined}
            onClick={() => navigateTo(section.id)}
          >
            {section.label}
          </button>
        ))}
      </div>
      {railEdges.overflow && <button type="button" className="case-study-rail-arrow" aria-label="Show more sections" disabled={railEdges.end} onClick={() => scrollRail(1)}>›</button>}
    </nav>
  );
}

export default CaseStudyNav;
