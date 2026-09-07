import React, { useEffect, useRef, useState } from "react";
import { personalInfo } from "../../data/personalInfo";

function AboutSection({ onExplore, paused = false }) {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const heroVisibleRef = useRef(true);
  const [shouldRenderVideo, setShouldRenderVideo] = useState(false);

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
    const hasBlockingOverlay = () => Boolean(document.querySelector(
      ".project-detail-backdrop, .resume-modal-backdrop, .image-modal, .mechanic-modal-backdrop"
    ));
    const syncPlayback = () => {
      if (!video) return;
      if (paused || document.hidden || !heroVisibleRef.current || hasBlockingOverlay()) video.pause();
      else video.play().catch(() => {});
    };
    const observer = new IntersectionObserver(([entry]) => {
      heroVisibleRef.current = entry.isIntersecting;
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
  }, [paused, shouldRenderVideo]);

  return (
    <section className="hero-section" id="about" ref={heroRef}>
      {shouldRenderVideo && (
        <video
          ref={videoRef}
          className="hero-video-bg"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source
            src={process.env.PUBLIC_URL + "/Videos/herotrailer8_Compressed.mp4"}
            type="video/mp4"
          />
        </video>
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
