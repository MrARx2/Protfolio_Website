import React, { useState } from 'react';

function ModelingDetail({ project, onBack, onImageClick }) {
  const [imagesLoaded, setImagesLoaded] = useState({});

  const handleImageLoad = (key) => {
    setImagesLoaded(prev => ({ ...prev, [key]: true }));
  };

  const renders = project.renders || [];
  const paintwork = project.paintwork || [];
  const progression = project.progression || [];
  const references = project.references || [];
  const allImages = [...renders, ...paintwork, ...progression, ...references];

  return (
    <div className="modeling-detail">
      {/* Back Button */}
      <button
        className="back-btn modeling-back-btn"
        onClick={onBack}
        aria-label="Go back to modeling projects"
      >
        &larr; Back
      </button>

      {/* Header Section */}
      <div className="modeling-detail-header">
        <h1 className="modeling-detail-title">{project.title}</h1>
        <p className="modeling-detail-summary">{project.summary}</p>

        {/* Meta Info */}
        <div className="modeling-meta-info">
          <div className="modeling-meta-item">
            <div className="meta-row">
              <span className="meta-icon" aria-hidden="true">⏳</span>
              <span className="meta-label">Time:</span>
            </div>
            <span className="meta-value">{project.time}</span>
          </div>
          <div className="modeling-meta-item">
            <div className="meta-row">
              <span className="meta-icon" aria-hidden="true">🛠️</span>
              <span className="meta-label">Software:</span>
            </div>
            <span className="meta-value">{project.software}</span>
          </div>
          {project.render && (
            <div className="modeling-meta-item">
              <div className="meta-row">
                <span className="meta-icon" aria-hidden="true">🎬</span>
                <span className="meta-label">Render:</span>
              </div>
              <span className="meta-value">{project.render}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="modeling-tags-container">
            {project.tags.map((tag, i) => (
              <span className="tag modeling-tag" key={i}>{tag}</span>
            ))}
          </div>
        )}
      </div>

      {/* Renders Section */}
      {renders.length > 0 && (
        <section className="modeling-section">
          <div className="section-header">
            <h2 className="section-title">Final Renders</h2>
            <div className="section-divider"></div>
          </div>
          <div className="modeling-gallery renders-gallery">
            {renders.map((img, idx) => (
              <div 
                key={`render-${idx}`} 
                className="modeling-photo-card"
                onClick={() => onImageClick(allImages, idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onImageClick(allImages, idx);
                  }
                }}
                aria-label={`View ${project.title} render ${idx + 1} in full screen`}
              >
                <div className="photo-wrapper">
                  {!imagesLoaded[`render-${idx}`] && (
                    <div className="skeleton-loader" aria-label="Loading image"></div>
                  )}
                  <img
                    src={img}
                    alt={`${project.title} final render ${idx + 1}`}
                    className="modeling-photo"
                    onLoad={() => handleImageLoad(`render-${idx}`)}
                    style={{ opacity: imagesLoaded[`render-${idx}`] ? 1 : 0 }}
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

      {/* Paint Work in Substance Section */}
      {paintwork.length > 0 && (
        <section className="modeling-section">
          <div className="section-header">
            <h2 className="section-title">Paint Work in Substance</h2>
            <div className="section-divider"></div>
            <p className="section-description">
              Texturing and material work created in Substance Painter
            </p>
          </div>
          <div className="modeling-gallery paintwork-gallery">
            {paintwork.map((img, idx) => (
              <div 
                key={`paint-${idx}`} 
                className="modeling-photo-card paintwork-card"
                onClick={() => onImageClick(allImages, renders.length + idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onImageClick(allImages, renders.length + idx);
                  }
                }}
                aria-label={`View ${project.title} paintwork ${idx + 1} in full screen`}
              >
                <div className="photo-wrapper">
                  {!imagesLoaded[`paint-${idx}`] && (
                    <div className="skeleton-loader" aria-label="Loading image"></div>
                  )}
                  <img
                    src={img}
                    alt={`${project.title} paint work ${idx + 1}`}
                    className="modeling-photo"
                    onLoad={() => handleImageLoad(`paint-${idx}`)}
                    style={{ opacity: imagesLoaded[`paint-${idx}`] ? 1 : 0 }}
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

      {/* Progression & Topology Section */}
      {progression.length > 0 && (
        <section className="modeling-section">
          <div className="section-header">
            <h2 className="section-title">Progression & Topology</h2>
            <div className="section-divider"></div>
            <p className="section-description">
              Development stages showing the modeling process and topology work
            </p>
          </div>
          <div className="modeling-gallery progression-gallery">
            {progression.map((img, idx) => (
              <div 
                key={`prog-${idx}`} 
                className="modeling-photo-card progression-card"
                onClick={() => onImageClick(allImages, renders.length + paintwork.length + idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onImageClick(allImages, renders.length + paintwork.length + idx);
                  }
                }}
                aria-label={`View ${project.title} progression ${idx + 1} in full screen`}
              >
                <div className="photo-wrapper">
                  {!imagesLoaded[`prog-${idx}`] && (
                    <div className="skeleton-loader" aria-label="Loading image"></div>
                  )}
                  <img
                    src={img}
                    alt={`${project.title} progression stage ${idx + 1}`}
                    className="modeling-photo"
                    onLoad={() => handleImageLoad(`prog-${idx}`)}
                    style={{ opacity: imagesLoaded[`prog-${idx}`] ? 1 : 0 }}
                    loading="lazy"
                  />
                  <div className="photo-overlay">
                    <span className="zoom-icon">🔍</span>
                    <span className="photo-label">Stage {idx + 1}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Reference Photos Section */}
      {references.length > 0 && (
        <section className="modeling-section">
          <div className="section-header">
            <h2 className="section-title">Reference Photos</h2>
            <div className="section-divider"></div>
            <p className="section-description">
              Source images and references used during the modeling process
            </p>
          </div>
          <div className="modeling-gallery references-gallery">
            {references.map((img, idx) => (
              <div 
                key={`ref-${idx}`} 
                className="modeling-photo-card reference-card"
                onClick={() => onImageClick(allImages, renders.length + paintwork.length + progression.length + idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onImageClick(allImages, renders.length + paintwork.length + progression.length + idx);
                  }
                }}
                aria-label={`View ${project.title} reference ${idx + 1} in full screen`}
              >
                <div className="photo-wrapper">
                  {!imagesLoaded[`ref-${idx}`] && (
                    <div className="skeleton-loader" aria-label="Loading image"></div>
                  )}
                  <img
                    src={img}
                    alt={`${project.title} reference photo ${idx + 1}`}
                    className="modeling-photo"
                    onLoad={() => handleImageLoad(`ref-${idx}`)}
                    style={{ opacity: imagesLoaded[`ref-${idx}`] ? 1 : 0 }}
                    loading="lazy"
                  />
                  <div className="photo-overlay">
                    <span className="zoom-icon">🔍</span>
                    <span className="photo-label">Reference</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Details Section */}
      {project.details && (
        <section className="modeling-section modeling-details-section">
          <div className="section-header">
            <h2 className="section-title">About This Project</h2>
            <div className="section-divider"></div>
          </div>
          <p className="modeling-details-text">{project.details}</p>
        </section>
      )}
    </div>
  );
}

export default ModelingDetail;
