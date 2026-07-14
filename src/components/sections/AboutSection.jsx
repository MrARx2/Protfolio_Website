import React from "react";
import { personalInfo } from "../../data/personalInfo";

function AboutSection({ onExplore }) {
  return (
    <section className="hero-section" id="about">
      <video
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
                View resume <span aria-hidden="true">↗</span>
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
