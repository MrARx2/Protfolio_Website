import React, { useState } from 'react';

function FrostedCard({ project, onClick }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Info for each project
  let info;
  if (project.type === 'modeling') {
    info = [
      { icon: '⏳', label: 'Time', value: project.time || '—' },
      { icon: '🛠️', label: 'Software', value: project.software || '—' }
    ];
  } else {
    info = [
      { icon: '👤', label: 'Role', value: project.role || 'Programmer' },
      { icon: '👥', label: 'Team', value: project.team || '—' },
      { icon: '⏳', label: 'Time', value: project.time || '—' },
      { icon: '🛠️', label: 'Engine', value: project.engine || '—' }
    ];
  }

  const imageSrc = project.type === 'modeling'
    ? (project.renders?.[0] || project.references?.[0])
    : project.images[0];

  return (
    <div
      className="frosted-card"
      onClick={() => onClick(project)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(project);
        }
      }}
      tabIndex={0}
      role="button"
      aria-pressed="false"
      aria-label={`View details for ${project.title}`}
    >
      <div className="card-image-wrapper">
        {!imageLoaded && (
          <div className="skeleton-loader" aria-label="Loading image"></div>
        )}
        <img
          src={imageSrc}
          alt={project.title}
          onLoad={() => setImageLoaded(true)}
          style={{ opacity: imageLoaded ? 1 : 0 }}
          loading="lazy"
        />
      </div>
      <h2>{project.title}</h2>
      <p>{project.summary}</p>
      <div className="card-footer">
        {project.tags && project.tags.map((tag, i) => (
          <span className="tag" key={i}>{tag}</span>
        ))}
      </div>
      <div className="project-meta project-meta-bottom">
        <ul className="project-meta-list">
          {info.map((item, idx) => (
            <li className="project-meta-list-item" key={idx} title={item.label}>
              <span className="project-meta-icon" aria-hidden="true">{item.icon}</span>
              <span className="project-meta-label">{item.label}</span>
              <span className="project-meta-value">{item.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FrostedCard;
