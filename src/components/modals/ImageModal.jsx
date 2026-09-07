import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import useDialog from "../../hooks/useDialog";
import { fitImageSize, isGallerySwipe } from "../../utils/galleryGeometry";

export default function ImageModal({ images = [], initialIndex = 0, onClose, onIndexChange }) {
  const [index, setIndex] = useState(initialIndex);
  const [naturalSize, setNaturalSize] = useState(null);
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const [failed, setFailed] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [retry, setRetry] = useState(0);
  const closeButtonRef = useRef(null);
  const modalShellRef = useRef(null);
  const imageContainerRef = useRef(null);
  const gestureRef = useRef(null);
  const suppressClickUntil = useRef(0);
  const total = images.length;
  useDialog({ panelRef: modalShellRef, initialFocusRef: closeButtonRef, onClose });
  const changeImage = useCallback((step) => {
    if (total > 1) setIndex((current) => (current + step + total) % total);
  }, [total]);
  useEffect(() => { setIndex(initialIndex); }, [images, initialIndex]);
  useEffect(() => {
    setNaturalSize(null);
    setFailed(false);
    setIsZoomed(false);
    imageContainerRef.current?.scrollTo({ left: 0, top: 0, behavior: "instant" });
    onIndexChange?.(index);
  }, [index, onIndexChange]);
  useLayoutEffect(() => {
    const viewport = imageContainerRef.current;
    if (!viewport) return undefined;
    const measure = () => setViewportSize({ width: viewport.clientWidth, height: viewport.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const handleKey = (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        changeImage(event.key === "ArrowLeft" ? -1 : 1);
      }
      if (event.key === "Home" || event.key === "End") {
        event.preventDefault();
        setIndex(event.key === "Home" ? 0 : total - 1);
      }
      if (isZoomed && (event.key === "ArrowUp" || event.key === "ArrowDown")) {
        event.preventDefault();
        imageContainerRef.current?.scrollBy({ top: (event.key === "ArrowUp" ? -1 : 1) * 160, behavior: "instant" });
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [changeImage, isZoomed, total]);
  const toggleZoom = () => {
    if (!naturalSize) return;
    const zoom = !isZoomed;
    setIsZoomed(zoom);
    requestAnimationFrame(() => {
      const viewport = imageContainerRef.current;
      viewport?.scrollTo({ left: zoom ? (viewport.scrollWidth - viewport.clientWidth) / 2 : 0,
        top: zoom ? (viewport.scrollHeight - viewport.clientHeight) / 2 : 0, behavior: "instant" });
    });
  };
  if (!total) return null;
  const fitted = fitImageSize(naturalSize, viewportSize);
  const size = { width: fitted.width * (isZoomed ? 2 : 1), height: fitted.height * (isZoomed ? 2 : 1) };
  return (
    <div className="image-modal" role="dialog" aria-modal="true" aria-label="Full-screen project gallery" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="modal-shell" ref={modalShellRef}>
        <header className="modal-topbar">
          <div><span className="modal-eyebrow">Image gallery</span><span className="modal-counter" aria-live="polite">{index + 1} / {total}</span></div>
          <button ref={closeButtonRef} className="modal-close-btn" onClick={onClose} aria-label="Close gallery" type="button">×</button>
        </header>
        <div ref={imageContainerRef} className={`modal-image-container fitted-image-viewport${isZoomed ? " zoomed" : ""}`}
          onTouchStart={(event) => {
            const touch = !isZoomed && event.touches.length === 1 ? event.touches[0] : null;
            gestureRef.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
          }}
          onTouchEnd={(event) => {
            const touch = event.changedTouches[0];
            const start = gestureRef.current;
            gestureRef.current = null;
            if (!start || !touch || isZoomed) return;
            const dx = touch.clientX - start.x;
            const dy = touch.clientY - start.y;
            if (Math.abs(dx) + Math.abs(dy) > 12) suppressClickUntil.current = Date.now() + 500;
            if (isGallerySwipe(dx, dy)) changeImage(dx > 0 ? -1 : 1);
          }}
          onTouchCancel={() => { gestureRef.current = null; }}
          onPointerDown={(event) => {
            if (event.pointerType !== "mouse" || !isZoomed) return;
            gestureRef.current = { x: event.clientX, y: event.clientY, left: event.currentTarget.scrollLeft, top: event.currentTarget.scrollTop };
          }}
          onPointerMove={(event) => {
            if (event.pointerType !== "mouse" || !event.buttons || !isZoomed || !gestureRef.current) return;
            const start = gestureRef.current;
            const dx = event.clientX - start.x, dy = event.clientY - start.y;
            if (Math.abs(dx) + Math.abs(dy) < 5) return;
            event.currentTarget.scrollLeft = start.left - dx;
            event.currentTarget.scrollTop = start.top - dy;
            suppressClickUntil.current = Date.now() + 500;
          }}>
          {!naturalSize && !failed && <div className="modal-image-loader" role="status" aria-label="Loading image"><div className="spinner" /></div>}
          {failed ? <div className="gallery-image-error"><p>This image couldn’t load.</p><button type="button" onClick={() => { setFailed(false); setRetry((value) => value + 1); }}>Try again</button><a href={images[index]} target="_blank" rel="noopener noreferrer">Open original ↗</a></div> :
            <div className="modal-image-canvas" style={{ width: Math.max(viewportSize.width, size.width), height: Math.max(viewportSize.height, size.height) }}>
              <button type="button" className="modal-image-button" style={{ ...size, visibility: naturalSize ? "visible" : "hidden" }}
                onClick={() => { if (Date.now() > suppressClickUntil.current) toggleZoom(); }} aria-label={isZoomed ? "Fit image to screen" : "Zoom image in"}>
                <img key={`${images[index]}-${retry}`} src={images[index]} alt={`Project image ${index + 1} of ${total}`} className="modal-image" draggable="false"
                  onLoad={(event) => setNaturalSize({ width: event.currentTarget.naturalWidth, height: event.currentTarget.naturalHeight })} onError={() => setFailed(true)} />
              </button>
            </div>}
        </div>
        <footer className="modal-controls fitted-image-controls">
          <button type="button" onClick={() => changeImage(-1)} disabled={total < 2} aria-label="Previous image">← <span>Previous</span></button>
          <button type="button" onClick={toggleZoom} disabled={!naturalSize || failed} aria-pressed={isZoomed}>{isZoomed ? "Fit image" : "Zoom in"}</button>
          <button type="button" onClick={() => changeImage(1)} disabled={total < 2} aria-label="Next image"><span>Next</span> →</button>
        </footer>
      </div>
    </div>
  );
}
