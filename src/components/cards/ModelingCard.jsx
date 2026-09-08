import React, { useRef } from "react";
import ProjectPreviewMedia from "./ProjectPreviewMedia";
import { ProjectCardMeta, ProjectCardContribution, ProjectCardFooter } from "./ProjectCardDetails";

function ModelingCard({ project, onClick, index = 0, activeProjectId = null }) {
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
      />

      <div className="modeling-card-content living-card-content">
        <ProjectCardMeta project={project} />
        <h3 className="modeling-card-title">
          {project.title}
        </h3>
        <p className="modeling-card-summary">{project.summary}</p>

        <ProjectCardContribution project={project} />
        <ProjectCardFooter project={project} />
      </div>
    </article>
  );
}

export default React.memo(ModelingCard);
