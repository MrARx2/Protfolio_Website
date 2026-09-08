import React, { useRef } from "react";
import ProjectPreviewMedia from "./ProjectPreviewMedia";
import "./FeaturedProjectCard.css";

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
      <div className="featured-project-intro">
        <div className="featured-project-overline">
          <span className="featured-project-kicker"><i aria-hidden="true" />Featured project</span>
          <span>{project.engine} · Mobile</span>
        </div>
        <h3>{titleWords.join(" ")} <span>{accentWord}</span></h3>
        <p className="featured-project-summary">{project.summary}</p>
      </div>

      <div className="featured-project-stage">
        <div className="featured-project-orbit" aria-hidden="true" />
        <span className="featured-project-stage-label" aria-hidden="true">Mobile roguelike</span>
        <ProjectPreviewMedia className="featured-project-phone" project={project}
          previewData={project.featuredPreview} paused={Boolean(activeProjectId)} eager ref={previewRef}
          imageSizes="(max-width: 360px) 153px, (max-width: 768px) 171px, 208px" />
        <div className="featured-project-caption" aria-hidden="true"><span />In-game capture<span /></div>
      </div>

      <div className="featured-project-details">
        <dl className="featured-project-facts">
          <div className="featured-project-role"><dt>My role</dt><dd>{project.role || "Programmer"}</dd></div>
          <div><dt>Team</dt><dd>{project.team}-person team</dd></div>
          <div><dt>Development</dt><dd>{project.time}</dd></div>
        </dl>
        <div className="featured-project-footer">
          <span className="featured-project-cta">Explore case study <span aria-hidden="true">↗</span></span>
          <span className="featured-project-contents">Gameplay, systems<br />&amp; the making of the game</span>
        </div>
      </div>
    </article>
  );
}

export default React.memo(FeaturedProjectCard);
