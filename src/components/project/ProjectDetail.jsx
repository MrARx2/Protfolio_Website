import React, { useState } from 'react';
import { mechanicsData } from '../../data/projects';
import { toEmbedUrl } from '../../utils/youtubeHelpers';
import ModelingDetail from './ModelingDetail';
import SceneDetail from './SceneDetail';

function ProjectDetail({ project, onBack, onImageClick }) {
  // If it's a modeling project, use the specialized ModelingDetail component
  if (project.type === 'modeling') {
    return <ModelingDetail project={project} onBack={onBack} onImageClick={onImageClick} />;
  }

  // If it's a scene project, use the specialized SceneDetail component
  if (project.type === 'scene') {
    return <SceneDetail project={project} onBack={onBack} onImageClick={onImageClick} />;
  }

  // Otherwise, render game project detail
  const [imagesLoaded, setImagesLoaded] = useState({});

  const handleBackdropClick = (e) => {
    // Only close if clicking the backdrop itself, not its children
    if (e.target.classList.contains('project-detail-backdrop')) {
      onBack();
    }
  };

  const handleImageLoad = (idx) => {
    setImagesLoaded(prev => ({ ...prev, [idx]: true }));
  };

  const mechanics = mechanicsData[project.id] || [];
  
  // Split mechanics into pairs for grid layout
  const mechanicPairs = [];
  for (let i = 0; i < mechanics.length; i += 2) {
    mechanicPairs.push(mechanics.slice(i, i + 2));
  }

  // Info for game projects
  const info = [
    { icon: '👤', label: 'Role', value: project.role || 'Programmer' },
    { icon: '👥', label: 'Team', value: project.team || '—' },
    { icon: '⏳', label: 'Time', value: project.time || '—' },
    { icon: '🛠️', label: 'Engine', value: project.engine || '—' }
  ];

  return (
    <div className="project-detail-backdrop" onClick={handleBackdropClick}>
      <div className="project-detail">
        <button
          className="back-btn"
          onClick={onBack}
          aria-label="Go back to projects"
        >
          &larr; Back
        </button>
      <div className="detail-header">
        <h2 className="game-detail-title">{project.title}</h2>
        <p className="game-detail-summary">
          {project.summary}
        </p>
        <div className="card-footer" style={{ justifyContent: 'center', marginBottom: '2em' }}>
          {project.tags && project.tags.map((tag, i) => (
            <span className="tag" key={i}>{tag}</span>
          ))}
        </div>
        <div className="detail-images">
          {project.images.map((img, idx) => (
            <div key={idx} className="detail-image-item">
              {!imagesLoaded[idx] && (
                <div className="skeleton-loader" aria-label="Loading image"></div>
              )}
              <img
                src={img}
                alt={`${project.title} screenshot ${idx + 1}`}
                className="detail-image"
                onClick={() => onImageClick(project.images, idx)}
                onLoad={() => handleImageLoad(idx)}
                style={{
                  cursor: "zoom-in",
                  opacity: imagesLoaded[idx] ? 1 : 0
                }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
        {project.youtube && (
          <div style={{ width: '100%', margin: '2em 0' }}>
            <div className="section-header">
              <h2 className="section-title">Game Preview</h2>
              <div className="section-divider"></div>
              <p className="section-description">
                Watch the gameplay in action
              </p>
            </div>
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(10px)',
              margin: '0 auto',
              maxWidth: '900px'
            }}>
              <div className="video-wrapper" style={{
                position: 'relative',
                width: '100%',
                paddingTop: '56.25%',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <iframe
                  title={`${project.title} preview`}
                  src={toEmbedUrl(project.youtube)}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    backgroundColor: 'transparent'
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        )}
        {project.details && (
          <div className="detail-body">{project.details}</div>
        )}
        {mechanics.length > 0 && (
          <div className="mechanics-section">
            <div className="section-header">
              <h2 className="section-title">Game Mechanics</h2>
              <div className="section-divider"></div>
              <p className="section-description">
                Core gameplay features and systems
              </p>
            </div>
            <div className="mechanics-list-grid">
              {mechanicPairs.map((pair, i) => (
                <div className="mechanics-row" key={i}>
                  {pair.map((m, j) => (
                    <div className="mechanic-item" key={j}>
                      <span className="mechanic-icon" aria-hidden="true">{m.icon}</span>
                      <div className="mechanic-label-row"><strong>{m.label}</strong></div>
                      <p className="mechanic-desc">{m.desc}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
