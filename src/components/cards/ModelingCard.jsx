import React, { useRef } from "react";
import { projectTransitionStyle } from "../../utils/projectTransitions";
import ProjectPreviewMedia from "./ProjectPreviewMedia";

function ModelingCard({ project, onClick, index = 0, activeProjectId = null }) {
  const previewRef = useRef(null);
  const transitionEnabled = activeProjectId !== project.id;

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
      className={`modeling-card living-project-card ${index % 2 === 1 ? "modeling-card-reversed" : ""}`}
      id={`project-card-${project.id}`}
      onClick={openProject}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View case study for ${project.title}`}
      style={{ "--project-glow": project.cardPreview?.glow || "242, 163, 58" }}
    >
      <ProjectPreviewMedia
        className="modeling-image-wrap"
        project={project}
        badge={`3D study · ${String(index + 1).padStart(2, "0")}`}
        paused={Boolean(activeProjectId)}
        ref={previewRef}
        transitionEnabled={transitionEnabled}
      />

      <div className="modeling-card-content living-card-content">
        <div className="card-compact-meta" aria-label="Project details">
          <span>{project.software}</span>
          <span>{project.render || "Real-time render"}</span>
          <span>{project.time}</span>
        </div>
        <h3
          className="modeling-card-title"
          style={projectTransitionStyle(project, "title", transitionEnabled)}
        >
          {project.title}
        </h3>
        <p className="modeling-card-summary">{project.summary}</p>

        <p className="project-contribution">
          <span>My focus</span>
          {project.cardPreview?.contribution || "Modeling and presentation"}
        </p>

        <div className="project-card-tags" aria-label="Project tags">
          {project.tags?.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}
        </div>

        <div className="living-card-action-row">
          <span className="case-study-depth">{project.cardPreview?.depth}</span>
          <span className="project-card-link project-card-cta">
            {project.cardPreview?.cta || "Explore the process"} <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </article>
  );
}

export default ModelingCard;
