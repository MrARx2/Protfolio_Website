import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

function ResumeModal({ resumeUrl, onClose }) {
  const [isLoading, setIsLoading] = useState(true);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('resume-modal-backdrop')) {
      onClose();
    }
  };

  const modalContent = (
    <div className="resume-modal-backdrop" onClick={handleBackdropClick}>
      <div className="resume-modal-content frosted-card">
        <button 
          className="resume-close-btn" 
          onClick={onClose} 
          aria-label="Close modal"
        >
          ×
        </button>

        <div className="resume-modal-header">
          <h2 className="section-title" style={{ margin: 0, fontSize: '1.8rem', textAlign: 'center', width: '100%' }}>Resume Preview</h2>
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
