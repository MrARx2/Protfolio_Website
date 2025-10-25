import React, { useState } from 'react';
import { personalInfo } from '../../data/personalInfo';

function Navbar({ onHomeClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="navbar navbar-glass" role="navigation" aria-label="Main navigation">
      <div className="navbar-left">
        <span
          className="navbar-title"
          role="button"
          tabIndex={0}
          onClick={() => {
            onHomeClick && onHomeClick();
            setMobileMenuOpen(false);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onHomeClick && onHomeClick();
              setMobileMenuOpen(false);
            }
          }}
          aria-label="Go to homepage"
        >
          {personalInfo.name}
          <span className="navbar-role">{personalInfo.role}</span>
        </span>
      </div>

      {/* Mobile menu toggle */}
      <button
        className="mobile-menu-toggle"
        onClick={toggleMobileMenu}
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileMenuOpen}
      >
        <span className="hamburger-icon">
          {mobileMenuOpen ? '✕' : '☰'}
        </span>
      </button>

      {/* Navigation links */}
      <div className={`navbar-right ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        {/* Mobile menu header */}
        <div className="mobile-menu-header">
          <h2 className="mobile-menu-name">Ariel Cohen</h2>
          <p className="mobile-menu-role">Game Developer</p>
        </div>
        
        <a
          href={personalInfo.social.github.url}
          className="nav-icon-link frosted-icon"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={personalInfo.social.github.label}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="icon-frosted-wrapper">
            {/* GitHub SVG */}
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.58 2 12.26c0 4.48 2.87 8.28 6.84 9.63.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.36 9.36 0 0 1 12 6.84c.85.004 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .26.18.57.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
              />
            </svg>
          </div>
          <span className="nav-link-text">GitHub</span>
        </a>
        <a
          href={personalInfo.social.linkedin.url}
          className="nav-icon-link frosted-icon"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={personalInfo.social.linkedin.label}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="icon-frosted-wrapper">
            {/* LinkedIn SVG */}
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.88v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"
              />
            </svg>
          </div>
          <span className="nav-link-text">LinkedIn</span>
        </a>
        <a
          href={personalInfo.social.x.url}
          className="nav-icon-link frosted-icon"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={personalInfo.social.x.label}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="icon-frosted-wrapper">
            {/* X (formerly Twitter) SVG */}
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
              />
            </svg>
          </div>
          <span className="nav-link-text">X</span>
        </a>
        <a
          href={personalInfo.resume}
          className="nav-link nav-resume-btn"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMobileMenuOpen(false)}
        >
          <span role="img" aria-label="Download" style={{ filter: 'grayscale(1)', fontSize: '1.1em', marginRight: '0.5em' }}>
            🡇
          </span>
          Resume
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
