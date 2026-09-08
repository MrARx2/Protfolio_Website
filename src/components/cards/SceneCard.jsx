import React, { useRef } from "react";
import ProjectPreviewMedia from "./ProjectPreviewMedia";
import { ProjectCardMeta, ProjectCardContribution, ProjectCardFooter } from "./ProjectCardDetails";

function SceneCard({ project, onClick, activeProjectId = null }) {
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
        badge="Environment"
        paused={Boolean(activeProjectId)}
        ref={previewRef}
      />
      <div className="scene-card-content living-card-content">
        <ProjectCardMeta project={project} />
        <h3 className="scene-card-title">
          {project.title}
        </h3>
        <p className="scene-card-summary">{project.summary}</p>

        <ProjectCardContribution project={project} />
        <ProjectCardFooter project={project} />
      </div>
    </article>
  );
}

export default React.memo(SceneCard);
