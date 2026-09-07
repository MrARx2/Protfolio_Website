import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import useDialog from "../../hooks/useDialog";
import { personalInfo } from "../../data/personalInfo";
import { themes } from "../../data/themes";

export default function MobileMenu({ onClose, returnFocusRef, categories, onSelectCategory, theme, onThemeChange, onResume }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  useDialog({ panelRef, initialFocusRef: closeRef, onClose, backgroundSelector: ".portfolio-page", returnFocusRef });
  useEffect(() => {
    const query = window.matchMedia("(min-width: 769px)");
    const resize = () => { if (query.matches) onClose(); };
    query.addEventListener("change", resize);
    return () => query.removeEventListener("change", resize);
  }, [onClose]);
  const navigate = (action) => {
    onClose(action);
  };
  return createPortal(
    <div className="mobile-menu-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="mobile-menu-panel" id="mobile-navigation" role="dialog" aria-modal="true" aria-labelledby="mobile-menu-title" ref={panelRef}>
        <header className="mobile-menu-header">
          <span id="mobile-menu-title">Explore the portfolio</span>
          <button ref={closeRef} type="button" className="modal-close-btn" aria-label="Close menu" onClick={onClose}>×</button>
        </header>
        <nav className="mobile-menu-sections" aria-label="Portfolio sections">
          {categories.map((category) => <button key={category.id} type="button" onClick={() => navigate(() => onSelectCategory(category.id))}>
            <span>{category.label}</span><span className="mobile-menu-count">{category.count} {category.count === 1 ? "project" : "projects"} <span aria-hidden="true">↗</span></span>
          </button>)}
          <button type="button" onClick={() => navigate(() => document.getElementById("contact")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }))}>Contact <span aria-hidden="true">↗</span></button>
        </nav>
        <div className="mobile-menu-links">
          <button className="button button-primary" type="button" onClick={onResume}>View resume</button>
          <a href={personalInfo.social.linkedin.url} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <a href={personalInfo.social.github.url} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a href={personalInfo.social.x.url} target="_blank" rel="noopener noreferrer">X ↗</a>
        </div>
        <fieldset className="mobile-menu-themes"><legend>Color theme</legend>
          {themes.map((option) => <button key={option.id} type="button" aria-pressed={theme === option.id} onClick={() => onThemeChange(option.id)}><span style={{ background: option.swatch }} aria-hidden="true" />{option.label}{theme === option.id && <span aria-hidden="true">✓</span>}</button>)}
        </fieldset>
      </div>
    </div>, document.body
  );
}
