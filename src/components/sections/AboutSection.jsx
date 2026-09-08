import React, { useEffect, useRef, useState } from "react";
import { personalInfo } from "../../data/personalInfo";

const DESKTOP_HERO_QUERY = "(min-width: 901px) and (hover: hover) and (pointer: fine)";

function AboutSection({ onExplore, paused = false }) {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia(DESKTOP_HERO_QUERY).matches);
  const [shouldRenderVideo, setShouldRenderVideo] = useState(false);
  const videoSrc = process.env.PUBLIC_URL + (isDesktop
    ? "/Videos/hero-desktop.mp4"
    : "/Videos/hero-mobile.mp4");
  const posterSrc = process.env.PUBLIC_URL + (isDesktop
    ? "/Images/hero-desktop-poster.webp"
    : "/Images/hero-mobile-poster.webp");

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_HERO_QUERY);
    const updateVariant = () => setIsDesktop(mediaQuery.matches);
    updateVariant();
    mediaQuery.addEventListener?.("change", updateVariant);
    return () => mediaQuery.removeEventListener?.("change", updateVariant);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    let idleId;
    let timeoutId;

    const updateVideoEligibility = () => {
      if (idleId) window.cancelIdleCallback?.(idleId);
      if (timeoutId) window.clearTimeout(timeoutId);
      if (mediaQuery.matches || connection?.saveData) {
        setShouldRenderVideo(false);
        return;
      }
      const enableVideo = () => setShouldRenderVideo(true);
      if ("requestIdleCallback" in window) idleId = window.requestIdleCallback(enableVideo, { timeout: 700 });
      else timeoutId = window.setTimeout(enableVideo, 180);
    };

    updateVideoEligibility();
    mediaQuery.addEventListener?.("change", updateVideoEligibility);
    connection?.addEventListener?.("change", updateVideoEligibility);
    return () => {
      mediaQuery.removeEventListener?.("change", updateVideoEligibility);
      connection?.removeEventListener?.("change", updateVideoEligibility);
      if (idleId) window.cancelIdleCallback?.(idleId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (!shouldRenderVideo || !heroRef.current) return undefined;
    const video = videoRef.current;
    let heroVisible = false;
    const hasBlockingOverlay = () => Boolean(document.querySelector(
      ".project-detail-backdrop, .resume-modal-backdrop, .image-modal, .mechanic-modal-backdrop, .mobile-menu-backdrop"
    ));
    const syncPlayback = () => {
      if (!video) return;
      if (paused || document.hidden || !heroVisible || hasBlockingOverlay()) video.pause();
      else if (video.paused) video.play().catch(() => {});
    };
    const observer = new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting && entry.intersectionRatio >= 0.08;
      syncPlayback();
    }, { threshold: 0.08 });

    observer.observe(heroRef.current);
    const overlayObserver = new MutationObserver(syncPlayback);
    overlayObserver.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      observer.disconnect();
      overlayObserver.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      video?.pause();
    };
  }, [paused, shouldRenderVideo, videoSrc]);

  return (
    <section className="hero-section" id="about" ref={heroRef}>
      <img className="hero-poster-bg" src={posterSrc} alt="" aria-hidden="true" decoding="async" />
      {shouldRenderVideo && (
        <video
          key={videoSrc}
          ref={videoRef}
          className={`hero-video-bg${isDesktop ? " hero-video-bg--desktop" : ""}`}
          src={videoSrc}
          poster={posterSrc}
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      )}

      <div className="hero-overlay" />
      <div className="hero-grain" aria-hidden="true" />

      <div className="hero-content">
        <div className="hero-copy">
          <div className="hero-kicker">
            <span className="hero-kicker-dot" aria-hidden="true" />
            Game developer · Programmer · Technical artist
          </div>

          <h1 className="hero-name">
            <span className="hero-name-primary">Ariel</span>
            <span className="hero-name-secondary">
              Cohen<span className="hero-name-dot">.</span>
            </span>
          </h1>

          <div className="hero-intro">
            <p className="hero-value-prop">{personalInfo.bio}</p>
            <div className="hero-actions">
              <button className="button button-primary" type="button" onClick={onExplore}>
                Explore my work <span aria-hidden="true">↓</span>
              </button>
              <a className="button button-secondary" href={personalInfo.resume} target="_blank" rel="noopener noreferrer">
                Open resume PDF <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>

        <div className="hero-bottom-bar">
          <span>Unity · Unreal Engine · Maya</span>
          <button className="hero-scroll-indicator" type="button" onClick={onExplore} aria-label="Scroll to selected work">
            <span>Selected work</span>
            <span className="hero-scroll-line" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
