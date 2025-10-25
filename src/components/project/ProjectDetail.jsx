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

  // Check if this is an academic project (all game projects except specific ones)
  const isAcademicProject = project.id !== 'star-wars-scene';
  
  // Team credit info
  const hasTeamCredit = project.team === '2' && isAcademicProject;

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

        {/* Meta Info - matching modeling project style */}
        <div className="modeling-meta-info" style={{ marginTop: '1.5em', marginBottom: '1em' }}>
          <div className="modeling-meta-item">
            <div className="meta-row">
              <span className="meta-icon" aria-hidden="true">👤</span>
              <span className="meta-label">Role:</span>
            </div>
            <span className="meta-value">{project.role || 'Programmer'}</span>
          </div>
          <div className="modeling-meta-item">
            <div className="meta-row">
              <span className="meta-icon" aria-hidden="true">👥</span>
              <span className="meta-label">Team:</span>
            </div>
            <span className="meta-value">{project.team || '—'}</span>
          </div>
          <div className="modeling-meta-item">
            <div className="meta-row">
              <span className="meta-icon" aria-hidden="true">⏳</span>
              <span className="meta-label">Time:</span>
            </div>
            <span className="meta-value">{project.time || '—'}</span>
          </div>
          <div className="modeling-meta-item">
            <div className="meta-row">
              <span className="meta-icon" aria-hidden="true">🛠️</span>
              <span className="meta-label">Engine:</span>
            </div>
            <span className="meta-value">{project.engine || '—'}</span>
          </div>
        </div>

        {/* Academic Project Label */}
        {isAcademicProject && (
          <div style={{ 
            display: 'inline-block',
            padding: '8px 16px',
            background: 'rgba(0, 234, 255, 0.1)',
            border: '1px solid rgba(0, 234, 255, 0.3)',
            borderRadius: '8px',
            marginBottom: '1.5em',
            fontSize: '0.9rem',
            color: '#00eaff'
          }}>
            <span style={{ marginRight: '6px' }}>🎓</span>
            Academic Project
          </div>
        )}

        {/* Tags */}
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

        {/* Team Credits Section */}
        {hasTeamCredit && (
          <div style={{
            marginTop: '3em',
            padding: '1.5em',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            textAlign: 'left'
          }}>
            <h3 style={{
              color: '#00eaff',
              fontSize: '1.2rem',
              marginBottom: '0.8em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5em'
            }}>
              <span>🤝</span>
              Team Collaboration
            </h3>
            <p style={{
              color: '#b6b6d6',
              lineHeight: '1.6',
              marginBottom: '0.8em'
            }}>
              This project was created in collaboration with my talented colleague <strong style={{ color: '#00eaff' }}>Jack Lavy</strong>, 
              who brought the game to life through his exceptional work in art design, sound design, and visual effects. 
              Jack crafted the game's visual identity, audio atmosphere, and polished UI elements including menus, transitions, 
              and effects that enhance the overall player experience.
            </p>
            <a 
              href="https://www.linkedin.com/in/jack-lavy-144bb812b/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5em',
                color: '#00bfff',
                textDecoration: 'none',
                fontSize: '0.95rem',
                padding: '0.5em 1em',
                background: 'rgba(0, 191, 255, 0.1)',
                borderRadius: '6px',
                border: '1px solid rgba(0, 191, 255, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 191, 255, 0.2)';
                e.currentTarget.style.borderColor = 'rgba(0, 191, 255, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0, 191, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(0, 191, 255, 0.3)';
              }}
            >
              <span>🔗</span>
              Connect with Jack on LinkedIn
            </a>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
