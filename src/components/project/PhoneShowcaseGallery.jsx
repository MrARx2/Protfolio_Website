import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PhoneFrame from "./PhoneFrame";

function PhoneShowcaseGallery({
  title = "Selected gallery",
  description,
  collections = [],
  groups = [],
  projectTitle,
  onImageClick
}) {
  const images = collections.find((collection) => collection.images?.length)?.images || [];
  const label = collections.find((collection) => collection.images?.length)?.label || "Mobile showcase";
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState("next");
  const [isTouching, setIsTouching] = useState(false);
  const stageRef = useRef(null);
  const thumbnailPanelRef = useRef(null);
  const isGalleryInViewRef = useRef(false);
  const touchStartRef = useRef(null);
  const touchHintTimerRef = useRef(null);
  const suppressClickUntilRef = useRef(0);
  const total = images.length;

  const resolvedGroups = useMemo(() => {
    if (groups.length > 0) return groups;
    return [{ label: "Screens", indexes: images.map((_, index) => index) }];
  }, [groups, images]);

  const previous = useCallback(() => {
    if (total < 2) return;
    setTransitionDirection("previous");
    setActiveIndex((index) => (index - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    if (total < 2) return;
    setTransitionDirection("next");
    setActiveIndex((index) => (index + 1) % total);
  }, [total]);

  const selectImage = useCallback((index) => {
    if (index === activeIndex) return;
    setTransitionDirection(index > activeIndex ? "next" : "previous");
    setActiveIndex(index);
  }, [activeIndex]);

  const openDetailView = useCallback(() => {
    onImageClick(images, activeIndex, { presentation: "phone-showcase" });
  }, [activeIndex, images, onImageClick]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isGalleryInViewRef.current = entry.isIntersecting && entry.intersectionRatio >= 0.28;
      },
      { threshold: [0, 0.28, 0.5] }
    );

    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handlePageKeys = (event) => {
      if (event.defaultPrevented || !isGalleryInViewRef.current || document.querySelector(".image-modal")) return;
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        previous();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        next();
      }
    };

    document.addEventListener("keydown", handlePageKeys);
    return () => document.removeEventListener("keydown", handlePageKeys);
  }, [next, previous]);

  useEffect(() => {
    const panel = thumbnailPanelRef.current;
    const activeThumbnail = panel?.querySelector(`[data-phone-gallery-index="${activeIndex}"]`);
    if (!panel || !activeThumbnail) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const centeredLeft = activeThumbnail.offsetLeft - (panel.clientWidth / 2) + (activeThumbnail.offsetWidth / 2);
    const centeredTop = activeThumbnail.offsetTop - (panel.clientHeight / 2) + (activeThumbnail.offsetHeight / 2);

    panel.scrollTo({
      left: Math.max(0, centeredLeft),
      top: Math.max(0, centeredTop),
      behavior: reduceMotion ? "auto" : "smooth"
    });
  }, [activeIndex]);

  useEffect(() => {
    if (total < 2) return undefined;
    const preloadIndexes = [(activeIndex - 1 + total) % total, (activeIndex + 1) % total];
    const preloads = preloadIndexes.map((index) => {
      const image = new Image();
      image.src = images[index];
      return image;
    });
    return () => preloads.forEach((image) => { image.src = ""; });
  }, [activeIndex, images, total]);

  useEffect(() => () => {
    if (touchHintTimerRef.current) window.clearTimeout(touchHintTimerRef.current);
  }, []);

  if (total === 0) return null;

  const handleStageKeys = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      previous();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    }
  };

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    if (!touch) return;

    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    if (touchHintTimerRef.current) window.clearTimeout(touchHintTimerRef.current);
    setIsTouching(true);
  };

  const handleTouchEnd = (event) => {
    const start = touchStartRef.current;
    const touch = event.changedTouches[0];
    if (!start || !touch) return;

    const distanceX = touch.clientX - start.x;
    const distanceY = touch.clientY - start.y;
    const isHorizontalSwipe = Math.abs(distanceX) >= 44
      && Math.abs(distanceX) > Math.abs(distanceY) * 1.15;
    const isTap = Math.abs(distanceX) < 10 && Math.abs(distanceY) < 10;

    if (isHorizontalSwipe) {
      if (distanceX < 0) next();
      else previous();
      suppressClickUntilRef.current = Date.now() + 500;
    } else if (isTap) {
      const bounds = event.currentTarget.getBoundingClientRect();
      const position = (touch.clientX - bounds.left) / bounds.width;
      if (position < 0.3) previous();
      else if (position > 0.7) next();
      else openDetailView();
      suppressClickUntilRef.current = Date.now() + 500;
    }

    touchStartRef.current = null;
    touchHintTimerRef.current = window.setTimeout(() => setIsTouching(false), 280);
  };

  const handleTouchCancel = () => {
    touchStartRef.current = null;
    setIsTouching(false);
  };

  const handleScreenClick = () => {
    if (Date.now() < suppressClickUntilRef.current) return;
    openDetailView();
  };

  const activeImage = images[activeIndex];

  return (
    <section className="case-study-section adaptive-gallery-section phone-showcase-section">
      <div className="gallery-heading-row phone-showcase-heading">
        <div className="section-header">
          <span className="section-kicker">Visual development</span>
          <h2 className="section-title">{title}</h2>
          {description && <p className="section-description">{description}</p>}
        </div>
        <div className="phone-showcase-heading-meta" aria-hidden="true">
          <span>Built for mobile</span>
          <strong>{String(total).padStart(2, "0")} screens</strong>
        </div>
      </div>

      <div
        className="phone-showcase-stage"
        ref={stageRef}
        tabIndex={0}
        onKeyDown={handleStageKeys}
        role="region"
        aria-label={`${label}, image ${activeIndex + 1} of ${total}. Use left and right arrow keys to change images.`}
      >
        <div
          className="phone-showcase-ambient"
          style={{ backgroundImage: `url("${activeImage}")` }}
          aria-hidden="true"
        />
        <div className="phone-showcase-glow" aria-hidden="true" />

        <div className="phone-showcase-layout">
          <div className="phone-showcase-feature">
            <div className="phone-showcase-feature-topline">
              <span>{label}</span>
              <span aria-live="polite">{String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
            </div>

            <PhoneFrame className="phone-showcase-device" label={`${projectTitle} screen ${activeIndex + 1} of ${total}`}>
              <button
                type="button"
                className={`phone-showcase-screen-button ${isTouching ? "is-touching" : ""}`}
                onClick={handleScreenClick}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchCancel}
                aria-label={`Open ${projectTitle} mobile screen ${activeIndex + 1} in detail view`}
              >
                <img
                  key={activeImage}
                  src={activeImage}
                  alt={`${projectTitle} mobile screen ${activeIndex + 1}`}
                  className={`phone-showcase-image direction-${transitionDirection}`}
                />
                <span className="phone-showcase-touch-hint phone-showcase-touch-hint-left" aria-hidden="true">←</span>
                <span className="phone-showcase-touch-hint phone-showcase-touch-hint-right" aria-hidden="true">→</span>
                <span className="phone-showcase-expand">Inspect details <span aria-hidden="true">↗</span></span>
              </button>
            </PhoneFrame>

            <div className="phone-showcase-controls">
              <button type="button" onClick={previous} disabled={total < 2} aria-label="Previous mobile screen">
                <span aria-hidden="true">←</span> Previous
              </button>
              <div className="phone-showcase-progress" aria-hidden="true">
                <span style={{ width: `${((activeIndex + 1) / total) * 100}%` }} />
              </div>
              <button type="button" onClick={next} disabled={total < 2} aria-label="Next mobile screen">
                Next <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          <aside className="phone-showcase-index" aria-label="Path of Embers screen index">
            <div className="phone-showcase-index-header">
              <div>
                <span className="phone-showcase-index-kicker">Screen index</span>
                <h3>Explore the game</h3>
              </div>
              <span className="phone-showcase-key-hint" aria-hidden="true">← → browse</span>
            </div>

            <div className="phone-showcase-thumb-scroll" ref={thumbnailPanelRef}>
              {resolvedGroups.map((group) => (
                <div className="phone-showcase-thumb-group" key={group.label}>
                  <h4>{group.label}</h4>
                  <div className="phone-showcase-thumb-grid">
                    {group.indexes.map((index) => {
                      const image = images[index];
                      if (!image) return null;
                      return (
                        <button
                          type="button"
                          key={image}
                          data-phone-gallery-index={index}
                          className={index === activeIndex ? "active" : ""}
                          aria-current={index === activeIndex ? "true" : undefined}
                          aria-label={`Show mobile screen ${index + 1} of ${total}`}
                          onClick={() => selectImage(index)}
                        >
                          <img src={image} alt="" loading="lazy" />
                          <span>{String(index + 1).padStart(2, "0")}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default PhoneShowcaseGallery;
