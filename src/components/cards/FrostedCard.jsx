import React, { useRef } from "react";
import ProjectPreviewMedia from "./ProjectPreviewMedia";
import FeaturedProjectCard from "./FeaturedProjectCard";
import { ProjectCardMeta, ProjectCardContribution, ProjectCardFooter } from "./ProjectCardDetails";

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
        <ProjectCardMeta project={project} />
        <h3>{project.title}</h3>
        <p className="project-card-summary">{project.summary}</p>

        <ProjectCardContribution project={project} />
        <ProjectCardFooter project={project} />
      </div>
    </article>
  );
}
const MemoStandardGameCard = React.memo(StandardGameCard);

function FrostedCard({ featured = false, ...props }) {
  return featured ? <FeaturedProjectCard {...props} /> : <MemoStandardGameCard {...props} />;
}

export default React.memo(FrostedCard);
