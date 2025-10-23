import React, { useState } from 'react';

function ModelingCard({ project, onClick }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className="modeling-card"
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
      <div className="modeling-image-wrap">
        {!imageLoaded && (
          <div className="skeleton-loader" aria-label="Loading image"></div>
        )}
        <img
          src={project.renders?.[0] || project.references?.[0]}
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
      </div>
      <div className="modeling-card-content">
        <h3 className="modeling-card-title">{project.title}</h3>
        <p className="modeling-card-summary">{project.summary}</p>
        <div className="modeling-card-meta">
          <div className="modeling-meta-item">
            <div className="meta-row">
              <span className="meta-icon">⏳</span>
              <span className="meta-label">Time</span>
            </div>
            <span className="meta-value">{project.time}</span>
          </div>
          <div className="modeling-meta-item">
            <div className="meta-row">
              <span className="meta-icon">🛠️</span>
              <span className="meta-label">Software</span>
            </div>
            <span className="meta-value">{project.software}</span>
          </div>
          {project.render && (
            <div className="modeling-meta-item">
              <div className="meta-row">
                <span className="meta-icon">🎬</span>
                <span className="meta-label">Render</span>
              </div>
              <span className="meta-value">{project.render}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ModelingCard;
