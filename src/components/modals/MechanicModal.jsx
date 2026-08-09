import React, { useEffect, useId, useRef } from "react";

function MechanicModal({ mechanic, onClose }) {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = Array.from(modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) || []).filter((element) => !element.disabled && element.getAttribute("aria-hidden") !== "true");

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

    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus({ preventScroll: true });
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="mechanic-modal-backdrop"
      onClick={(event) => {
        event.stopPropagation();
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="mechanic-modal-shell"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <header className="mechanic-modal-header">
          <div className="mechanic-modal-heading">
            <span className="mechanic-modal-icon" aria-hidden="true">{mechanic.icon}</span>
            <div>
              <span className="section-kicker">System breakdown</span>
              <h2 id={titleId}>{mechanic.label}</h2>
            </div>
          </div>
          <button
            ref={closeButtonRef}
            className="modal-close-btn"
            onClick={onClose}
            aria-label={`Close ${mechanic.label} breakdown`}
            type="button"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="mechanic-modal-body">
          <p className="mechanic-modal-purpose" id={descriptionId}>{mechanic.purpose || mechanic.desc}</p>

          {mechanic.visualFlow?.length > 0 && (
            <section className="mechanic-visual-flow" aria-labelledby={`${titleId}-visual-flow`}>
              <div className="mechanic-visual-flow-heading">
                <span>System in game</span>
                <h3 id={`${titleId}-visual-flow`}>{mechanic.visualFlowTitle || "System in action"}</h3>
              </div>
              <div className="mechanic-visual-flow-grid">
                {mechanic.visualFlow.map((item, index) => (
                  <figure className="mechanic-visual-step" key={item.label}>
                    <div className="mechanic-visual-media">
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading="lazy"
                        style={{ objectFit: item.fit || "cover", objectPosition: item.position || "center" }}
                      />
                    </div>
                    <figcaption>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <div>
                        <strong>{item.label}</strong>
                        <p>{item.caption}</p>
                      </div>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}

          <div className="mechanic-modal-grid">
            <section className="mechanic-structure" aria-labelledby={`${titleId}-structure`}>
              <div className="mechanic-modal-section-heading">
                <span>01</span>
                <h3 id={`${titleId}-structure`}>Structural design</h3>
              </div>
              <div className="mechanic-structure-list">
                {(mechanic.structure || []).map((part, index) => (
                  <article key={part.label || part}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      {part.label && <h4>{part.label}</h4>}
                      <p>{part.detail || part}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <div className="mechanic-modal-side">
              <section className="mechanic-flow" aria-labelledby={`${titleId}-flow`}>
                <div className="mechanic-modal-section-heading">
                  <span>02</span>
                  <h3 id={`${titleId}-flow`}>Runtime flow</h3>
                </div>
                <ol>
                  {(mechanic.flow || []).map((step) => <li key={step}>{step}</li>)}
                </ol>
              </section>

              <aside className="mechanic-value">
                <span className="mechanic-value-label">Why this design</span>
                <p>{mechanic.value || mechanic.desc}</p>
              </aside>
            </div>
          </div>
        </div>

        <footer className="mechanic-modal-footer">
          <span>Technical design overview</span>
          <span>Press Esc, go back, or click outside to close</span>
        </footer>
      </div>
    </div>
  );
}

export default MechanicModal;
