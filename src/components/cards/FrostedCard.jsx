import React, { useRef } from "react";
import ProjectPreviewMedia from "./ProjectPreviewMedia";
import FeaturedProjectCard from "./FeaturedProjectCard";

function StandardGameCard({ project, onClick, activeProjectId = null }) {
  const previewRef = useRef(null);

  const openProject = () => {
    onClick(project, previewRef.current?.getCurrentFrame());
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject();
    }
  };


  return (
    <article
      className="project-card game-card living-project-card"
      id={`project-card-${project.id}`}
      onClick={openProject}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View case study for ${project.title}`}
      style={{ "--project-glow": project.cardPreview?.glow || "242, 163, 58" }}
    >
      <ProjectPreviewMedia
        className="project-card-media"
        project={project}
        badge="Game"
        paused={Boolean(activeProjectId)}
        ref={previewRef}
      />

      <div className="project-card-content living-card-content">
        <div className="project-card-topline">
          <span>{project.engine}</span>
          <span>{project.time}</span>
        </div>
        <h3>{project.title}</h3>
        <p className="project-card-summary">{project.summary}</p>

        <p className="project-contribution">
          <span>My focus</span>
          {project.cardPreview?.contribution || project.role || "Gameplay development"}
        </p>

        <div className="living-card-action-row">
          <span className="case-study-depth">{project.cardPreview?.depth}</span>
          <span className="project-card-link project-card-cta">
            {project.cardPreview?.cta || "View case study"} <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </article>
  );
  }
const MemoStandardGameCard = React.memo(StandardGameCard);

function FrostedCard({ featured = false, ...props }) {
  return featured ? <FeaturedProjectCard {...props} /> : <MemoStandardGameCard {...props} />;
}

export default React.memo(FrostedCard);
