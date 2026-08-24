import React, { useCallback, useEffect, useRef, useState } from 'react';
import { personalInfo } from '../../data/personalInfo';
import { themes } from '../../data/themes';
import ResumeModal from './ResumeModal';

function Navbar({ theme, onThemeChange }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showResume, setShowResume] = useState(() => window.location.hash === '#resume');
  const [isScrolled, setIsScrolled] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const themePickerRef = useRef(null);
  const resumeTriggerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileToggleRef = useRef(null);
  const currentTheme = themes.find(({ id }) => id === theme) || themes[0];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const backgroundRegions = ['#about', '#main-content', '#contact']
      .map((selector) => document.querySelector(selector))
      .filter(Boolean);
    backgroundRegions.forEach((region) => {
      region.inert = true;
      region.setAttribute('aria-hidden', 'true');
    });

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
      if (event.key !== 'Tab') return;
      const menuItems = Array.from(mobileMenuRef.current?.querySelectorAll(
        'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
      ) || []).filter((element) => element.offsetParent !== null);
      const focusable = [mobileToggleRef.current, ...menuItems].filter(Boolean);
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

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    window.requestAnimationFrame(() => {
      mobileMenuRef.current?.querySelector('button, [href]')?.focus({ preventScroll: true });
    });
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
      backgroundRegions.forEach((region) => {
        region.inert = false;
        region.removeAttribute('aria-hidden');
      });
      window.requestAnimationFrame(() => mobileToggleRef.current?.focus({ preventScroll: true }));
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!themeMenuOpen) return undefined;

    const closeOnOutsideClick = (event) => {
      if (!themePickerRef.current?.contains(event.target)) setThemeMenuOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setThemeMenuOpen(false);
    };

    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [themeMenuOpen]);

  useEffect(() => {
    if (window.location.hash === '#resume' && window.history.state?.kind !== 'resume') {
      window.history.replaceState(
        { ...(window.history.state || {}), kind: 'resume', overlay: 'resume', canGoBack: false },
        '',
        '#resume'
      );
    }

    const handlePopState = (event) => {
      const shouldShow = event.state?.kind === 'resume' || window.location.hash === '#resume';
      setShowResume(shouldShow);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const openResume = useCallback(() => {
    window.history.pushState(
      { ...(window.history.state || {}), kind: 'resume', overlay: 'resume', canGoBack: true },
      '',
      '#resume'
    );
    setShowResume(true);
    setMobileMenuOpen(false);
  }, []);

  const closeResume = useCallback(() => {
    const state = window.history.state || {};
    if (state.kind === 'resume' && state.canGoBack) {
      window.history.back();
      return;
    }
    setShowResume(false);
    window.history.replaceState(
      { kind: 'portfolio', category: 'all', scrollY: window.scrollY },
      '',
      '#about'
    );
    window.requestAnimationFrame(() => resumeTriggerRef.current?.focus({ preventScroll: true }));
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((open) => {
      if (open) setThemeMenuOpen(false);
      return !open;
    });
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-glass' : 'navbar-transparent'}`} role="navigation" aria-label="Main navigation">
      {/* Mobile menu toggle */}
      <button
        ref={mobileToggleRef}
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
      <div ref={mobileMenuRef} className={`navbar-right ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        <div className="theme-picker" ref={themePickerRef}>
          <button
            className="theme-toggle"
            type="button"
            aria-label={`Change color theme. Current theme: ${currentTheme.label}`}
            aria-haspopup="menu"
            aria-expanded={themeMenuOpen}
            onClick={() => setThemeMenuOpen((open) => !open)}
          >
            <span className="theme-toggle-swatch" style={{ backgroundColor: currentTheme.swatch }} aria-hidden="true" />
            <span className="theme-toggle-label">Theme</span>
            <span className="theme-toggle-current">{currentTheme.label}</span>
          </button>

          {themeMenuOpen && (
            <div className="theme-menu" role="menu" aria-label="Choose color theme">
              <span className="theme-menu-title">Color theme</span>
              {themes.map((option) => (
                <button
                  className={`theme-option${option.id === theme ? ' active' : ''}`}
                  key={option.id}
                  type="button"
                  role="menuitemradio"
                  aria-checked={option.id === theme}
                  onClick={() => {
                    onThemeChange(option.id);
                    setThemeMenuOpen(false);
                  }}
                >
                  <span className="theme-option-swatch" style={{ backgroundColor: option.swatch }} aria-hidden="true" />
                  <span>{option.label}</span>
                  <span className="theme-option-check" aria-hidden="true">{option.id === theme ? '✓' : ''}</span>
                </button>
              ))}
            </div>
          )}
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
          ref={resumeTriggerRef}
          href={personalInfo.resume}
          className="nav-link nav-resume-btn"
          onClick={(e) => {
            e.preventDefault();
            openResume();
          }}
        >
          <img 
            src="/Images/Icons/icons8-document-100.png" 
            alt="Document Icon" 
            style={{ width: '22px', height: '22px' }} 
          />
          Resume
        </a>
      </div>
      
      {showResume && (
        <ResumeModal 
          resumeUrl={personalInfo.resume} 
          onClose={closeResume}
        />
      )}
    </nav>
  );
}

export default Navbar;
