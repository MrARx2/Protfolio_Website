import React, { useRef } from "react";
import { projectTransitionStyle } from "../../utils/projectTransitions";
import ProjectPreviewMedia from "./ProjectPreviewMedia";

function SceneCard({ project, onClick, activeProjectId = null }) {
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
      className="scene-card living-project-card"
      id={`project-card-${project.id}`}
      onClick={openProject}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View case study for ${project.title}`}
      style={{ "--project-glow": project.cardPreview?.glow || "242, 163, 58" }}
    >
      <ProjectPreviewMedia
        className="scene-image-wrap"
        project={project}
        badge="Environment · Unreal Engine"
        paused={Boolean(activeProjectId)}
        ref={previewRef}
        transitionEnabled={transitionEnabled}
      />
      <div className="scene-gradient" aria-hidden="true" />

      <div className="scene-card-content living-card-content">
        <div className="card-compact-meta" aria-label="Project details">
          <span>{project.time}</span>
          <span>{project.tags?.includes("Nanite") ? "Nanite" : project.engine}</span>
        </div>
        <h3
          className="scene-card-title"
          style={projectTransitionStyle(project, "title", transitionEnabled)}
        >
          {project.title}
        </h3>
        <p className="scene-card-summary">{project.summary}</p>

        <p className="project-contribution">
          <span>My focus</span>
          {project.cardPreview?.contribution || "Environment and real-time presentation"}
        </p>

        <div className="living-card-action-row">
          <span className="case-study-depth">{project.cardPreview?.depth}</span>
          <span className="project-card-link project-card-cta">
            {project.cardPreview?.cta || "Explore environment"} <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </article>
  );
}

export default SceneCard;
