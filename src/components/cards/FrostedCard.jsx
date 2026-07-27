import React, { useRef } from "react";
import { projectTransitionStyle } from "../../utils/projectTransitions";
import ProjectPreviewMedia from "./ProjectPreviewMedia";

function FrostedCard({ project, onClick, featured = false, activeProjectId = null }) {
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

  if (featured) {
    return (
      <article
        className="project-card game-card game-card-featured"
        id={`project-card-${project.id}`}
        onClick={openProject}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`View case study for ${project.title}`}
      >
        <div className="project-card-media">
          <ProjectPreviewMedia
            className="featured-phone-preview"
            project={project}
            previewData={project.featuredPreview}
            paused={Boolean(activeProjectId)}
            eager
            ref={previewRef}
            transitionEnabled={false}
          />
          <span className="project-card-badge">Featured · Mobile</span>
        </div>

        <div className="project-card-content">
          <div className="project-card-topline">
            <span>{project.engine}</span>
            <span>{project.time}</span>
          </div>
          <h3>{project.title}</h3>
          <p className="project-card-summary">{project.summary}</p>

          <dl className="project-card-meta">
            <div><dt>Role</dt><dd>{project.role || "Programmer"}</dd></div>
            <div><dt>Team</dt><dd>{project.team || "—"}</dd></div>
            <div><dt>Focus</dt><dd>{project.tags?.[0] || "Gameplay"}</dd></div>
          </dl>

          <div className="project-card-footer">
            <div className="project-card-tags" aria-label="Project tags">
              {project.tags?.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <span className="project-card-link">View case study <span aria-hidden="true">↗</span></span>
          </div>
        </div>
      </article>
    );
  }

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
        transitionEnabled={transitionEnabled}
      />

      <div className="project-card-content living-card-content">
        <div className="project-card-topline">
          <span>{project.engine}</span>
          <span>{project.time}</span>
        </div>
        <h3 style={projectTransitionStyle(project, "title", transitionEnabled)}>{project.title}</h3>
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

export default FrostedCard;
