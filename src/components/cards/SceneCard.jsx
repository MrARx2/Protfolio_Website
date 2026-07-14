import React, { useState } from "react";

function SceneCard({ project, onClick }) {
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
      className="scene-card"
      onClick={openProject}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View case study for ${project.title}`}
    >
      <div className="scene-image-wrap">
        {!imageLoaded && <div className="skeleton-loader" aria-label="Loading image" />}
        <img
          src={imageSrc}
          alt={`${project.title} environment`}
          onLoad={() => setImageLoaded(true)}
          style={{ opacity: imageLoaded ? 1 : 0 }}
          loading="lazy"
        />
        <div className="scene-gradient" aria-hidden="true" />
      </div>

      <div className="scene-card-content">
        <span className="project-eyebrow">Environment · Unreal Engine</span>
        <h3 className="scene-card-title">{project.title}</h3>
        <p className="scene-card-summary">{project.summary}</p>
        <div className="scene-card-meta">
          <span>{project.time}</span>
          <span>{project.tags?.includes("Nanite") ? "Nanite" : project.engine}</span>
        </div>
        <span className="project-card-link">Explore environment <span aria-hidden="true">↗</span></span>
      </div>
    </article>
  );
}

export default SceneCard;
