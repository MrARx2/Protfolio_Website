import React, { useEffect, useState, useRef } from 'react';

function ImageModal({ images, initialIndex = 0, onClose }) {
  const [index, setIndex] = useState(initialIndex);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const modalRef = useRef(null);
  const total = images ? images.length : 0;

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Reset loaded state and zoom when image changes
    setImageLoaded(false);
    setIsZoomed(false);
  }, [index]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIndex(i => Math.min(i + 1, total - 1));
      if (e.key === 'ArrowLeft') setIndex(i => Math.max(i - 1, 0));
    }
    window.addEventListener('keydown', handleKey);
    
    // Focus trap
    if (modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      firstElement?.focus();
    }

    // Prevent body scroll and save scroll position
    const scrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    return () => {
      // Restore scroll position
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose, total]);

  if (!images || images.length === 0) return null;

  function prev() {
    setIndex(i => (i - 1 + total) % total);
  }

  function next() {
    setIndex(i => (i + 1) % total);
  }

  return (
    <div
      ref={modalRef}
      className="image-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery"
      onClick={(e) => {
        // Close when clicking overlay (desktop only)
        if (isMobile) return; // Disable background click on mobile
        const t = e.target;
        if (t.closest && (t.closest('.modal-image') || t.closest('.modal-nav-btn') || t.closest('.modal-close-btn'))) {
          return;
        }
        onClose();
      }}
    >
      <button
        className="modal-nav-btn modal-prev-btn"
        onClick={prev}
        aria-label="Previous image"
        disabled={index === 0}
      >
        ◀
      </button>
      <div className="modal-image-wrapper">
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close gallery"
        >
          ✕
        </button>
        <div className={`modal-image-container ${isZoomed ? 'zoomed' : ''}`}>
          {!imageLoaded && (
            <div className="modal-image-loader" aria-label="Loading image">
              <div className="spinner"></div>
            </div>
          )}
          <img
            src={images[index]}
            alt={`Screenshot ${index + 1} of ${total}`}
            className={`modal-image ${isZoomed ? 'zoomed' : ''}`}
            onLoad={() => setImageLoaded(true)}
            onClick={() => setIsZoomed(!isZoomed)}
            style={{ 
              opacity: imageLoaded ? 1 : 0,
              cursor: isZoomed ? 'zoom-out' : 'zoom-in'
            }}
            title={isZoomed ? "Click to zoom out" : "Click to zoom in"}
          />
        </div>
      </div>
      <div className="modal-indicator" aria-live="polite">
        {index + 1} / {total}
      </div>
      <button
        className="modal-nav-btn modal-next-btn"
        onClick={next}
        aria-label="Next image"
        disabled={index === total - 1}
      >
        ▶
      </button>
    </div>
  );
}

export default ImageModal;
