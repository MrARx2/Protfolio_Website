import React from "react";
import "./ProjectCardDetails.css";

export function ProjectCardMeta({ project }) {
  const tools = project.software ? [project.software, project.render].filter(Boolean).join(" · ") : project.engine;
  return <div className="project-card-meta-line" aria-label="Project details"><span>{tools}</span><span>{project.time}</span></div>;
}

export function ProjectCardContribution({ project }) {
  const contribution = project.featuredPreview?.contribution || project.cardPreview?.contribution || project.role;
  return (
    <div className="project-card-contribution-block">
      <div className="project-card-contribution-label"><span>My contribution</span>{project.team && <span>Team of {project.team}</span>}</div>
      <p>{contribution}</p>
    </div>
  );
}

export function ProjectCardFooter({ project }) {
  return (
    <div className="project-card-footer-row">
      <span className="project-card-preview-note">{project.featuredPreview?.depth || project.cardPreview?.depth}</span>
      <span className="project-card-action">View case study <span aria-hidden="true">→</span></span>
    </div>
  );
}
