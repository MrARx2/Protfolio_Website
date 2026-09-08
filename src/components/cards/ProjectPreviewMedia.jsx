import ResponsiveImage from "../project/ResponsiveImage";
import { responsiveImageProps } from "../../utils/responsiveImages";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from "react";

function normalizedIndex(index, length) {
  if (!length) return 0;
  return (index + length) % length;
}

const ProjectPreviewMedia = forwardRef(function ProjectPreviewMedia({
  project,
  previewData,
  className = "",
  badge,
  paused = false,
  eager = false,
  imageSizes = "(max-width: 768px) 94vw, 70vw"
}, ref) {
  const preview = previewData || project.cardPreview || {};
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
  const [staticPreview, setStaticPreview] = useState(() => window.matchMedia(
    "(prefers-reduced-motion: reduce), (max-width: 900px), (hover: none), (pointer: coarse)"
  ).matches);
  const [interacting, setInteracting] = useState(false);
  const [saveData] = useState(() => Boolean(navigator.connection?.saveData));
  const [pageVisible, setPageVisible] = useState(() => !document.hidden);
  const initialDelay = useMemo(() => {
    const projectSeed = Array.from(project.id || "preview")
      .reduce((total, character) => total + character.charCodeAt(0), 0);
    return 4200 + (projectSeed % 900);
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
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 900px), (hover: none), (pointer: coarse)");
    const updatePreference = () => setStaticPreview(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener?.("change", updatePreference);
    return () => mediaQuery.removeEventListener?.("change", updatePreference);
  }, []);

  useEffect(() => {
    const updateVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    const target = rootRef.current;
    if (!target || staticPreview || paused || frames.length < 2) {
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
        // Keep the decoded frame when a card leaves view; fast reversals must
        // not remount images and replay their entrance animations.
      }
    }, {
      threshold: [0, 0.08, 0.24, 0.6],
      rootMargin: "-4% 0px -4% 0px"
    });

    observer.observe(target);
    return () => observer.disconnect();
  }, [frames.length, project.id, staticPreview, paused]);

  useEffect(() => {
    if (!inView || !pageVisible || paused || interacting || saveData || staticPreview || frames.length < 2) return undefined;

    const delay = hasStartedCyclingRef.current ? 5200 : initialDelay;
    let cancelled = false;
    let image;
    const timer = window.setTimeout(() => {
      image = new Image();
      image.onload = async () => {
        try { await image.decode?.(); } catch { /* A loaded image can still be shown if decoding is unavailable. */ }
        if (!cancelled) {
          hasStartedCyclingRef.current = true;
          showFrame(activeIndex + 1);
        }
      };
      const props = responsiveImageProps(frames[normalizedIndex(activeIndex + 1, frames.length)].src, imageSizes);
      image.sizes = props.sizes || "";
      image.srcset = props.srcSet || "";
      image.src = props.src;
    }, delay);
    return () => { cancelled = true; if (image) image.onload = null; window.clearTimeout(timer); };
  }, [activeIndex, frames, imageSizes, inView, initialDelay, pageVisible, paused, interacting, saveData, staticPreview, showFrame]);

  useEffect(() => {
    const card = rootRef.current?.closest('[role="button"]');
    if (!card) return undefined;
    const pause = () => setInteracting(true);
    const resume = (event) => setInteracting(event.type === 'mouseleave' ? card.contains(document.activeElement) : card.matches(':hover') || card.contains(event.relatedTarget));
    card.addEventListener("mouseenter", pause);
    card.addEventListener("mouseleave", resume);
    card.addEventListener("focusin", pause);
    card.addEventListener("focusout", resume);
    return () => {
      card.removeEventListener("mouseenter", pause);
      card.removeEventListener("mouseleave", resume);
      card.removeEventListener("focusin", pause);
      card.removeEventListener("focusout", resume);
    };
  }, []);
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
    >
      {!loadedFrames.has(activeIndex) && <div className="skeleton-loader project-preview-loader" aria-hidden="true" />}
      {visibleIndexes.map((index) => {
        const frame = frames[index];
        const isActive = index === activeIndex;
        return (
          <ResponsiveImage
            className={`project-preview-frame ${isActive ? "is-active" : "is-previous"}`}
            src={frame.src}
            sizes={imageSizes}
            alt={isActive ? `${project.title}: ${frame.label}` : ""}
            style={{ objectPosition: frame.position || undefined }}
            key={index}
            onLoad={() => markLoaded(index)}
            loading={eager ? "eager" : "lazy"}
          />
        );
      })}

      <div className="project-preview-scrim" aria-hidden="true" />
      {badge && <span className="project-preview-badge">{badge}</span>}
      <div className="project-preview-hud" aria-hidden="true">
        <div className="project-preview-story" key={`story-${activeIndex}`}>
          <span>Project preview</span>
          <strong>{activeFrame.label}</strong>
        </div>
        <span className="project-preview-count" key={`count-${activeIndex}`}>
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
