import React, { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

function ResumeModal({ resumeUrl, onClose }) {
  const [isLoading, setIsLoading] = useState(true);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const titleId = useId();

  // Lock body scroll when modal is open
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const portfolioPage = document.querySelector('.portfolio-page');
    const previousOverflow = document.body.style.overflow;
    if (portfolioPage) {
      portfolioPage.inert = true;
      portfolioPage.setAttribute('aria-hidden', 'true');
    }
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = Array.from(modalRef.current?.querySelectorAll(
        'button:not([disabled]), [href], iframe, [tabindex]:not([tabindex="-1"])'
      ) || []);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      if (portfolioPage) {
        portfolioPage.inert = false;
        portfolioPage.removeAttribute('aria-hidden');
      }
      window.requestAnimationFrame(() => {
        if (previouslyFocused?.isConnected) previouslyFocused.focus({ preventScroll: true });
      });
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('resume-modal-backdrop')) {
      onClose();
    }
  };

  const modalContent = (
    <div className="resume-modal-backdrop" onMouseDown={handleBackdropClick}>
      <div
        className="resume-modal-content frosted-card"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button 
          ref={closeButtonRef}
          className="resume-close-btn" 
          onClick={onClose} 
          aria-label="Close modal"
        >
          ×
        </button>

        <div className="resume-modal-header">
          <h2 id={titleId} className="section-title" style={{ margin: 0, fontSize: '1.8rem', textAlign: 'center', width: '100%' }}>Resume Preview</h2>
        </div>
        
        <div className="resume-preview-container">
          {isLoading && (
            <div className="skeleton-loader" aria-label="Loading resume preview" style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1 }}></div>
          )}
          <iframe 
            src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`} 
            title="Resume Preview"
            className="resume-iframe"
            onLoad={() => setIsLoading(false)}
            style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.3s' }}
          />
        </div>

        <div className="resume-modal-footer">
          <div className="section-divider" style={{ margin: '0 auto 20px auto' }}></div>
          <a href={resumeUrl} download="Ariel_Cohen_Resume.pdf" className="resume-download-btn">
            <span role="img" aria-label="Download" style={{ filter: 'grayscale(1)', marginRight: '8px' }}>🡇</span>
            Download Resume
          </a>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default ResumeModal;
