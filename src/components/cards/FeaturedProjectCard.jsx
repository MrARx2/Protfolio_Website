import React, { useRef } from "react";
import ProjectPreviewMedia from "./ProjectPreviewMedia";
import "./FeaturedProjectCard.css";
import { ProjectCardMeta, ProjectCardContribution, ProjectCardFooter } from "./ProjectCardDetails";

function FeaturedProjectCard({ project, onClick, activeProjectId }) {
  const previewRef = useRef(null);
  const titleWords = project.title.split(" ");
  const accentWord = titleWords.pop();
  const openProject = () => onClick(project, previewRef.current?.getCurrentFrame());

  return (
    <article className="project-card featured-project" id={`project-card-${project.id}`}
      role="button" tabIndex={0} aria-label={`View case study for ${project.title}`}
      onClick={openProject} onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openProject(); }
      }}>
      <div className="featured-project-stage">
        <div className="featured-project-orbit" aria-hidden="true" />
        <span className="project-preview-badge">Featured · Mobile</span>
        <ProjectPreviewMedia className="featured-project-phone" project={project}
          previewData={project.featuredPreview} paused={Boolean(activeProjectId)} eager ref={previewRef}
          imageSizes="(max-width: 360px) 120px, (max-width: 768px) 130px, 185px" />
        <div className="featured-project-caption" aria-hidden="true"><span />In-game capture<span /></div>
      </div>

      <div className="featured-project-content">
      <div className="featured-project-intro">
        <ProjectCardMeta project={project} />
        <h3>{titleWords.join(" ")} <span>{accentWord}</span></h3>
        <p className="featured-project-summary">{project.summary}</p>
      </div>

      <div className="featured-project-details">
        <ProjectCardContribution project={project} />
        <ProjectCardFooter project={project} />
      </div>
      </div>
    </article>
  );
}

export default React.memo(FeaturedProjectCard);
