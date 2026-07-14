import React, { useState } from "react";

function FrostedCard({ project, onClick, featured = false }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageSrc = project.thumbnail || project.images?.[0];

  const openProject = () => onClick(project);
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject();
    }
  };

  return (
    <article
      className={`project-card game-card ${featured ? "game-card-featured" : ""}`}
      onClick={openProject}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View case study for ${project.title}`}
    >
      <div className="project-card-media">
        {!imageLoaded && <div className="skeleton-loader" aria-label="Loading image" />}
        <img
          src={imageSrc}
          alt={`${project.title} gameplay`}
          onLoad={() => setImageLoaded(true)}
          style={{ opacity: imageLoaded ? 1 : 0 }}
          loading={featured ? "eager" : "lazy"}
        />
        <span className="project-card-badge">{featured ? "Featured · Mobile" : "Game"}</span>
      </div>

      <div className="project-card-content">
        <div className="project-card-topline">
          <span>{project.engine}</span>
          <span>{project.time}</span>
        </div>
        <h3>{project.title}</h3>
        <p className="project-card-summary">{project.summary}</p>

        <dl className="project-card-meta">
          <div>
            <dt>Role</dt>
            <dd>{project.role || "Programmer"}</dd>
          </div>
          <div>
            <dt>Team</dt>
            <dd>{project.team || "—"}</dd>
          </div>
          <div>
            <dt>Focus</dt>
            <dd>{project.tags?.[0] || "Gameplay"}</dd>
          </div>
        </dl>

        <div className="project-card-footer">
          <div className="project-card-tags" aria-label="Project tags">
            {project.tags?.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <span className="project-card-link">View case study <span aria-hidden="true">↗</span></span>
        </div>
      </div>
    </article>
  );
}

export default FrostedCard;
