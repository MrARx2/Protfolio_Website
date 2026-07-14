import React, { useState } from "react";

function ModelingCard({ project, onClick, index = 0 }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageSrc = project.thumbnail || project.renders?.[0] || project.references?.[0];

  const openProject = () => onClick(project);
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject();
    }
  };

  return (
    <article
      className={`modeling-card ${index % 2 === 1 ? "modeling-card-reversed" : ""}`}
      onClick={openProject}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View case study for ${project.title}`}
    >
      <div className="modeling-image-wrap">
        {!imageLoaded && <div className="skeleton-loader" aria-label="Loading image" />}
        <img
          src={imageSrc}
          alt={`${project.title} final render`}
          onLoad={() => setImageLoaded(true)}
          style={{ opacity: imageLoaded ? 1 : 0 }}
          loading="lazy"
        />
        <span className="modeling-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
      </div>

      <div className="modeling-card-content">
        <span className="project-eyebrow">3D study</span>
        <h3 className="modeling-card-title">{project.title}</h3>
        <p className="modeling-card-summary">{project.summary}</p>
        <dl className="modeling-card-meta">
          <div><dt>Software</dt><dd>{project.software}</dd></div>
          <div><dt>Rendered in</dt><dd>{project.render || "—"}</dd></div>
          <div><dt>Duration</dt><dd>{project.time}</dd></div>
        </dl>
        <div className="project-card-tags">
          {project.tags?.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <span className="project-card-link">Explore the process <span aria-hidden="true">↗</span></span>
      </div>
    </article>
  );
}

export default ModelingCard;
