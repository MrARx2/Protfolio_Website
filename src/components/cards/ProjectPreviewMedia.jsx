import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from "react";
import { projectTransitionStyle } from "../../utils/projectTransitions";

function normalizedIndex(index, length) {
  if (!length) return 0;
  return (index + length) % length;
}

const ProjectPreviewMedia = forwardRef(function ProjectPreviewMedia({
  project,
  className = "",
  badge,
  paused = false,
  eager = false,
  transitionEnabled = true
}, ref) {
  const preview = project.cardPreview || {};
  const frames = useMemo(() => {
    if (preview.frames?.length) return preview.frames;
    const fallback = project.thumbnail || project.images?.[0] || project.renders?.[0];
    return fallback ? [{ src: fallback, label: "Project preview" }] : [];
  }, [preview.frames, project.thumbnail, project.images, project.renders]);
  const presentation = preview.presentation || "game";
  const rootRef = useRef(null);
  const previousFrameTimerRef = useRef(null);
  const activeIndexRef = useRef(0);
  const hasStartedCyclingRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(null);
  const [loadedFrames, setLoadedFrames] = useState(() => new Set());
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const initialDelay = useMemo(() => {
    const projectSeed = Array.from(project.id || "preview")
      .reduce((total, character) => total + character.charCodeAt(0), 0);
    return 1200 + (projectSeed % 900);
  }, [project.id]);

  const showFrame = useCallback((requestedIndex) => {
    if (frames.length < 2) return;
    const nextIndex = normalizedIndex(requestedIndex, frames.length);

    setActiveIndex((currentIndex) => {
      if (currentIndex === nextIndex) return currentIndex;
      activeIndexRef.current = nextIndex;
      setPreviousIndex(currentIndex);
      window.clearTimeout(previousFrameTimerRef.current);
      previousFrameTimerRef.current = window.setTimeout(() => setPreviousIndex(null), 760);
      return nextIndex;
    });
  }, [frames.length]);

  useImperativeHandle(ref, () => ({
    getCurrentFrame: () => frames[activeIndexRef.current] || frames[0]
  }), [frames]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener?.("change", updatePreference);
    return () => mediaQuery.removeEventListener?.("change", updatePreference);
  }, []);

  useEffect(() => {
    const target = rootRef.current;
    if (!target || reducedMotion || frames.length < 2) {
      setInView(false);
      return undefined;
    }

    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.24) {
        setInView(true);
      } else if (!entry.isIntersecting || entry.intersectionRatio <= 0.08) {
        setInView(false);
        hasStartedCyclingRef.current = false;
        activeIndexRef.current = 0;
        setActiveIndex(0);
        setPreviousIndex(null);
      }
    }, {
      threshold: [0, 0.08, 0.24, 0.6],
      rootMargin: "-4% 0px -4% 0px"
    });

    observer.observe(target);
    return () => observer.disconnect();
  }, [frames.length, project.id, reducedMotion]);

  useEffect(() => {
    if (!inView || paused || reducedMotion || frames.length < 2) return undefined;

    const delay = hasStartedCyclingRef.current ? 2800 : initialDelay;
    const timer = window.setTimeout(() => {
      hasStartedCyclingRef.current = true;
      showFrame(activeIndex + 1);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [activeIndex, frames.length, inView, initialDelay, paused, reducedMotion, showFrame]);

  useEffect(() => {
    if (!inView || reducedMotion || frames.length < 2 || typeof window.Image !== "function") return undefined;
    const nextIndex = normalizedIndex(activeIndex + 1, frames.length);
    const image = new window.Image();
    image.src = frames[nextIndex].src;
    return () => { image.onload = null; };
  }, [activeIndex, frames, inView, reducedMotion]);

  useEffect(() => () => window.clearTimeout(previousFrameTimerRef.current), []);

  const markLoaded = (index) => {
    setLoadedFrames((current) => {
      if (current.has(index)) return current;
      const next = new Set(current);
      next.add(index);
      return next;
    });
  };

  if (!frames.length) return <div className={`${className} project-preview-media project-preview-empty`} />;

  const activeFrame = frames[activeIndex] || frames[0];
  const visibleIndexes = previousIndex === null || previousIndex === activeIndex
    ? [activeIndex]
    : [previousIndex, activeIndex];

  return (
    <div
      className={`${className} project-preview-media project-preview-${presentation}`.trim()}
      ref={rootRef}
      style={projectTransitionStyle(project, "media", transitionEnabled)}
    >
      {!loadedFrames.has(activeIndex) && <div className="skeleton-loader project-preview-loader" aria-hidden="true" />}
      {visibleIndexes.map((index) => {
        const frame = frames[index];
        const isActive = index === activeIndex;
        return (
          <img
            className={`project-preview-frame ${isActive ? "is-active" : "is-previous"}`}
            src={frame.src}
            alt={isActive ? `${project.title}: ${frame.label}` : ""}
            style={{ objectPosition: frame.position || undefined }}
            key={`${index}-${isActive ? "active" : "previous"}`}
            onLoad={() => markLoaded(index)}
            loading={eager || index === 0 ? "eager" : "lazy"}
          />
        );
      })}

      <div className="project-preview-scrim" aria-hidden="true" />
      {badge && <span className="project-preview-badge">{badge}</span>}
      <div className="project-preview-hud" aria-hidden="true">
        <div className="project-preview-story">
          <span>Project preview</span>
          <strong>{activeFrame.label}</strong>
        </div>
        <span className="project-preview-count">
          {String(activeIndex + 1).padStart(2, "0")} / {String(frames.length).padStart(2, "0")}
        </span>
      </div>
      <div className="project-preview-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${(activeIndex + 1) / frames.length})` }} />
      </div>
    </div>
  );
});

export default ProjectPreviewMedia;
