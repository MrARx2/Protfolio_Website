import React, { useState } from 'react';

function SceneCard({ project, onClick }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className="scene-card"
      onClick={() => onClick(project)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(project);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title}`}
    >
      <div className="scene-image-wrap">
        {!imageLoaded && (
          <div className="skeleton-loader" aria-label="Loading image"></div>
        )}
        <img
          src={project.images?.[0]}
          alt={project.title}
          onLoad={() => setImageLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: imageLoaded ? 1 : 0
          }}
          loading="lazy"
        />
        <div className="scene-overlay">
          <span className="scene-type-badge">Environment</span>
        </div>
      </div>
      <div className="scene-card-content">
        <h3 className="scene-card-title">{project.title}</h3>
        <p className="scene-card-summary">{project.summary}</p>
        <div className="scene-card-meta">
          <div className="scene-meta-item">
            <span className="meta-icon">⏱️</span>
            <span className="meta-value">{project.time}</span>
          </div>
          <div className="scene-meta-item">
            <span className="meta-icon">🎮</span>
            <span className="meta-value">{project.engine}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SceneCard;
