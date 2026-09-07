import React, { useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import useDialog from '../../hooks/useDialog';

export default function ResumeModal({ resumeUrl, onClose, returnFocusRef }) {
  const [isLoading, setIsLoading] = useState(true);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const titleId = useId();
  useDialog({ panelRef: modalRef, initialFocusRef: closeButtonRef, onClose, backgroundSelector: '.portfolio-page', returnFocusRef });
  return createPortal(
    <div className="resume-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="resume-modal-content" ref={modalRef} role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <header className="resume-modal-header">
          <div><span className="section-kicker">Ariel Cohen</span><h2 id={titleId}>Resume</h2></div>
          <button ref={closeButtonRef} type="button" className="modal-close-btn" onClick={onClose} aria-label="Close resume">×</button>
        </header>
        <div className="resume-modal-actions">
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="button button-primary">Open PDF <span aria-hidden="true">↗</span></a>
          <a href={resumeUrl} download="Ariel_Cohen_Resume.pdf" className="button button-secondary">Download PDF <span aria-hidden="true">↓</span></a>
        </div>
        <p className="resume-preview-note">For a larger view, open the PDF in a new tab.</p>
        <div className="resume-preview-container">
          {isLoading && <div className="modal-image-loader" role="status" aria-label="Loading resume preview"><div className="spinner" /></div>}
          <iframe src={`${resumeUrl}#view=FitH`} title="Ariel Cohen resume preview" className="resume-iframe" onLoad={() => setIsLoading(false)} />
        </div>
      </div>
    </div>, document.body
  );
}
