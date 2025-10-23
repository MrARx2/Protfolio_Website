import React, { useState } from 'react';
import { toEmbedUrl } from '../../utils/youtubeHelpers';

function SceneDetail({ project, onBack, onImageClick }) {
  const [imagesLoaded, setImagesLoaded] = useState({});

  const handleImageLoad = (key) => {
    setImagesLoaded(prev => ({ ...prev, [key]: true }));
  };

  const images = project.images || [];
  const coolFeatures = project.coolFeatures || [];

  return (
    <div className="scene-detail">
      {/* Back Button */}
      <button
        className="back-btn scene-back-btn"
        onClick={onBack}
        aria-label="Go back to scenes"
      >
        &larr; Back
      </button>

      {/* Header */}
      <div className="scene-detail-header">
        <h1 className="scene-detail-title">{project.title}</h1>
        <p className="scene-detail-summary">{project.summary}</p>

        {/* Meta Info */}
        <div className="scene-meta-info">
          <div className="scene-meta-item">
            <div className="meta-row">
              <span className="meta-icon" aria-hidden="true">⏱️</span>
              <span className="meta-label">Time:</span>
            </div>
            <span className="meta-value">{project.time}</span>
          </div>
          <div className="scene-meta-item">
            <div className="meta-row">
              <span className="meta-icon" aria-hidden="true">🎮</span>
              <span className="meta-label">Engine:</span>
            </div>
            <span className="meta-value">{project.engine}</span>
          </div>
        </div>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="scene-tags-container">
            {project.tags.map((tag, i) => (
              <span className="tag scene-tag" key={i}>{tag}</span>
            ))}
          </div>
        )}
      </div>

      {/* Main Gallery */}
      {images.length > 0 && (
        <section className="scene-section">
          <div className="section-header">
            <h2 className="section-title">Environment Showcase</h2>
            <div className="section-divider"></div>
            <p className="section-description">
              High-resolution screenshots capturing the atmosphere and detail of this environment
            </p>
          </div>
          <div className="scene-gallery">
            {images.map((img, idx) => (
              <div 
                key={`img-${idx}`} 
                className="scene-photo-card"
                onClick={() => onImageClick(images, idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onImageClick(images, idx);
                  }
                }}
                aria-label={`View ${project.title} image ${idx + 1} in full screen`}
              >
                <div className="photo-wrapper">
                  {!imagesLoaded[`img-${idx}`] && (
                    <div className="skeleton-loader" aria-label="Loading image"></div>
                  )}
                  <img
                    src={img}
                    alt={`${project.title} screenshot ${idx + 1}`}
                    className="scene-photo"
                    onLoad={() => handleImageLoad(`img-${idx}`)}
                    style={{ opacity: imagesLoaded[`img-${idx}`] ? 1 : 0 }}
                    loading="lazy"
                  />
                  <div className="photo-overlay">
                    <span className="zoom-icon">🔍</span>
                    <span className="photo-label">Click to enlarge</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Cool Features Section */}
      {coolFeatures.length > 0 && (
        <section className="scene-section cool-features-section">
          <div className="section-header">
            <h2 className="section-title">
              <span className="cool-badge">✨ Cool Features</span>
            </h2>
            <div className="section-divider section-divider-special"></div>
            <p className="section-description">
              Advanced technologies and techniques that bring this environment to life
            </p>
          </div>
          {coolFeatures.map((feature, idx) => (
            <div key={`feature-${idx}`} className="cool-feature-card">
              <div className="cool-feature-header">
                <span className="cool-feature-icon">{feature.icon}</span>
                <h3 className="cool-feature-title">{feature.title}</h3>
              </div>
              <p className="cool-feature-description">{feature.description}</p>
              {feature.image && (
                <div 
                  className="cool-feature-image-wrap"
                  onClick={() => onImageClick([feature.image], 0)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onImageClick([feature.image], 0);
                    }
                  }}
                  aria-label={`View ${feature.title} visualization`}
                >
                  {!imagesLoaded[`feature-${idx}`] && (
                    <div className="skeleton-loader" aria-label="Loading image"></div>
                  )}
                  <img
                    src={feature.image}
                    alt={`${feature.title} visualization`}
                    className="cool-feature-image"
                    onLoad={() => handleImageLoad(`feature-${idx}`)}
                    style={{ opacity: imagesLoaded[`feature-${idx}`] ? 1 : 0 }}
                    loading="lazy"
                  />
                  <div className="photo-overlay">
                    <span className="zoom-icon">🔍</span>
                    <span className="photo-label">Click to enlarge</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Video Section */}
      {project.videoUrl && (
        <section className="scene-section">
          <div className="section-header">
            <h2 className="section-title">Video Showcase</h2>
            <div className="section-divider"></div>
            <p className="section-description">
              Watch the environment come to life in this cinematic walkthrough
            </p>
          </div>
          <div className="video-wrapper">
            <iframe
              src={toEmbedUrl(project.videoUrl)}
              title={`${project.title} video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </section>
      )}

      {/* Details Section */}
      {project.details && (
        <section className="scene-details-section">
          <p className="scene-details-text">{project.details}</p>
        </section>
      )}
    </div>
  );
}

export default SceneDetail;
