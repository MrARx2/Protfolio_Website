import React, { useCallback, useEffect, useRef, useState } from "react";
import PhoneFrame from "../project/PhoneFrame";

function PhoneImageModal({ images, initialIndex = 0, onClose }) {
  const [index, setIndex] = useState(initialIndex);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isInspecting, setIsInspecting] = useState(false);
  const closeButtonRef = useRef(null);
  const imageViewportRef = useRef(null);
  const touchStartRef = useRef(null);
  const total = images?.length || 0;

  const previous = useCallback(() => {
    if (total < 2) return;
    setIndex((current) => (current - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    if (total < 2) return;
    setIndex((current) => (current + 1) % total);
  }, [total]);

  const scrollImage = useCallback((direction) => {
    if (!isInspecting || !imageViewportRef.current) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    imageViewportRef.current.scrollBy({
      top: direction * Math.max(160, imageViewportRef.current.clientHeight * 0.5),
      behavior: reduceMotion ? "auto" : "smooth"
    });
  }, [isInspecting]);

  const toggleInspection = () => {
    setIsInspecting((current) => {
      const nextValue = !current;
      window.requestAnimationFrame(() => {
        const viewport = imageViewportRef.current;
        if (!viewport) return;
        viewport.scrollTo({
          left: nextValue ? Math.max(0, (viewport.scrollWidth - viewport.clientWidth) / 2) : 0,
          top: 0,
          behavior: "auto"
        });
      });
      return nextValue;
    });
  };

  useEffect(() => {
    setIndex(initialIndex);
  }, [images, initialIndex]);

  useEffect(() => {
    setImageLoaded(false);
    setIsInspecting(false);
    imageViewportRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [index]);

  useEffect(() => {
    if (total < 2) return undefined;
    const preloadIndexes = [(index - 1 + total) % total, (index + 1) % total];
    const preloads = preloadIndexes.map((preloadIndex) => {
      const image = new Image();
      image.src = images[preloadIndex];
      return image;
    });
    return () => preloads.forEach((image) => { image.src = ""; });
  }, [images, index, total]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        previous();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        next();
      }
      if (event.key === "ArrowUp" && isInspecting) {
        event.preventDefault();
        scrollImage(-1);
      }
      if (event.key === "ArrowDown" && isInspecting) {
        event.preventDefault();
        scrollImage(1);
      }
      if (event.key === "Home") {
        event.preventDefault();
        setIndex(0);
      }
      if (event.key === "End") {
        event.preventDefault();
        setIndex(total - 1);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus({ preventScroll: true });

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isInspecting, next, onClose, previous, scrollImage, total]);

  if (!images || total === 0) return null;

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    touchStartRef.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
  };

  const handleTouchEnd = (event) => {
    if (!touchStartRef.current) return;
    const touch = event.changedTouches[0];
    if (!touch) return;
    const distanceX = touch.clientX - touchStartRef.current.x;
    const distanceY = touch.clientY - touchStartRef.current.y;
    if (Math.abs(distanceX) > 55 && Math.abs(distanceX) > Math.abs(distanceY)) {
      if (distanceX > 0) previous();
      else next();
    }
    touchStartRef.current = null;
  };

  const activeImage = images[index];

  return (
    <div
      className="image-modal phone-image-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Path of Embers mobile screen viewer. Use left and right to change screens."
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="phone-modal-shell">
        <header className="modal-topbar phone-modal-topbar">
          <div>
            <span className="modal-eyebrow">Mobile screen</span>
            <span className="modal-counter" aria-live="polite">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
          <button ref={closeButtonRef} className="modal-close-btn" onClick={onClose} aria-label="Close gallery" type="button">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div
          className="phone-modal-stage"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="phone-modal-ambient" style={{ backgroundImage: `url("${activeImage}")` }} aria-hidden="true" />
          <div className="phone-modal-scrim" aria-hidden="true" />

          {total > 1 && (
            <>
              <button type="button" className="phone-modal-arrow phone-modal-arrow-previous" onClick={previous} aria-label="Previous mobile screen">
                <span aria-hidden="true">←</span>
              </button>
              <button type="button" className="phone-modal-arrow phone-modal-arrow-next" onClick={next} aria-label="Next mobile screen">
                <span aria-hidden="true">→</span>
              </button>
            </>
          )}

          <div className="phone-modal-device-wrap">
            {!imageLoaded && <div className="phone-modal-loader"><div className="spinner" /></div>}
            <PhoneFrame
              className={`phone-modal-device ${isInspecting ? "is-inspecting" : ""}`}
              screenRef={imageViewportRef}
              label={`Path of Embers mobile screen ${index + 1} of ${total}`}
            >
              <button
                type="button"
                className="phone-modal-image-button"
                onClick={toggleInspection}
                aria-label={isInspecting ? "Fit the complete mobile screen" : "Inspect mobile screen details"}
              >
                <img
                  key={activeImage}
                  src={activeImage}
                  alt={`Path of Embers mobile screen ${index + 1} of ${total}`}
                  className="phone-modal-image"
                  onLoad={() => setImageLoaded(true)}
                  style={{ opacity: imageLoaded ? 1 : 0 }}
                />
              </button>
            </PhoneFrame>
          </div>
        </div>

        <footer className="modal-controls phone-modal-controls">
          <button type="button" onClick={previous} disabled={total < 2} aria-label="Previous mobile screen">
            <span aria-hidden="true">←</span> Previous
          </button>
          <div className="phone-modal-center-controls">
            <span>{isInspecting ? "↑ ↓ scroll details · ← → browse" : "Complete screen · ← → browse"}</span>
            <button type="button" className="phone-modal-inspect-button" onClick={toggleInspection}>
              {isInspecting ? "Fit screen" : "Inspect details"}
            </button>
          </div>
          <button type="button" onClick={next} disabled={total < 2} aria-label="Next mobile screen">
            Next <span aria-hidden="true">→</span>
          </button>
        </footer>
      </div>
    </div>
  );
}

export default PhoneImageModal;
