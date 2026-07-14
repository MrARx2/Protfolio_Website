import React, { useCallback, useEffect, useRef, useState } from "react";

function ImageModal({ images, initialIndex = 0, portrait = false, onClose }) {
  const [index, setIndex] = useState(initialIndex);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const closeButtonRef = useRef(null);
  const imageContainerRef = useRef(null);
  const touchStartX = useRef(null);
  const total = images?.length || 0;

  const previous = useCallback(() => {
    if (total < 2) return;
    setIndex((current) => (current - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    if (total < 2) return;
    setIndex((current) => (current + 1) % total);
  }, [total]);

  const scrollPortraitImage = useCallback((direction) => {
    const imageViewport = imageContainerRef.current;
    if (!imageViewport) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    imageViewport.scrollBy({
      top: direction * Math.max(180, imageViewport.clientHeight * 0.55),
      behavior: reduceMotion ? "auto" : "smooth"
    });
  }, []);

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex, images]);

  useEffect(() => {
    setImageLoaded(false);
    setIsZoomed(false);
    if (imageContainerRef.current) imageContainerRef.current.scrollTop = 0;
  }, [index]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        next();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        previous();
      }
      if (portrait && event.key === "ArrowUp") {
        event.preventDefault();
        scrollPortraitImage(-1);
      }
      if (portrait && event.key === "ArrowDown") {
        event.preventDefault();
        scrollPortraitImage(1);
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
  }, [next, onClose, portrait, previous, scrollPortraitImage, total]);

  if (!images || total === 0) return null;

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const distance = endX - touchStartX.current;
    if (distance > 55) previous();
    if (distance < -55) next();
    touchStartX.current = null;
  };

  return (
    <div
      className="image-modal"
      role="dialog"
      aria-modal="true"
      aria-label={`Full-screen project gallery.${portrait ? " Use up and down to scroll the image, and left and right to change images." : " Use left and right to change images."}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="modal-shell">
        <header className="modal-topbar">
          <div>
            <span className="modal-eyebrow">Full-resolution view</span>
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
          ref={imageContainerRef}
          className={`modal-image-container ${isZoomed ? "zoomed" : ""} ${portrait ? "portrait-navigation" : ""}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {total > 1 && (
            <>
              <button
                type="button"
                className="modal-side-control modal-side-control-previous"
                onClick={previous}
                aria-label={`Previous image, ${index === 0 ? `wrap to image ${total}` : `image ${index}`}`}
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                className="modal-side-control modal-side-control-next"
                onClick={next}
                aria-label={`Next image, ${index === total - 1 ? "wrap to image 1" : `image ${index + 2}`}`}
              >
                <span aria-hidden="true">→</span>
              </button>
            </>
          )}
          {!imageLoaded && (
            <div className="modal-image-loader" aria-label="Loading full-resolution image">
              <div className="spinner" />
            </div>
          )}
          <button
            type="button"
            className="modal-image-button"
            onClick={() => setIsZoomed((current) => !current)}
            aria-label={isZoomed ? "Zoom image out" : "Zoom image in"}
          >
            <img
              key={images[index]}
              src={images[index]}
              alt={`Project screenshot ${index + 1} of ${total}`}
              className={`modal-image ${isZoomed ? "zoomed" : ""}`}
              onLoad={() => setImageLoaded(true)}
              style={{ opacity: imageLoaded ? 1 : 0 }}
            />
          </button>
        </div>

        <footer className="modal-controls">
          <button type="button" onClick={previous} disabled={total < 2} aria-label="Previous image">
            <span aria-hidden="true">←</span> Previous
          </button>
          <span>
            {isZoomed
              ? "Click image to fit"
              : total > 1
                ? portrait ? "↑ ↓ scroll image · ← → browse" : "Use ← → keys to browse"
                : "Click image to inspect"}
          </span>
          <button type="button" onClick={next} disabled={total < 2} aria-label="Next image">
            Next <span aria-hidden="true">→</span>
          </button>
        </footer>
      </div>
    </div>
  );
}

export default ImageModal;
