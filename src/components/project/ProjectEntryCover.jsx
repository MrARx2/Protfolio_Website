import React from "react";
import { projectTransitionStyle } from "../../utils/projectTransitions";

function ProjectEntryCover({ project, previewFrame }) {
  const image = previewFrame?.src
    || project.thumbnail
    || project.images?.[0]
    || project.renders?.[0];

  if (!image) return null;

  return (
    <div
      className={`project-entry-cover project-entry-cover-${project.cardPreview?.presentation || "game"}`}
      style={projectTransitionStyle(project, "media")}
      aria-hidden="true"
    >
      <img src={image} alt="" />
      <div className="project-entry-cover-shade" />
      <div className="project-entry-cover-note">
        <span>Opening frame</span>
        <strong>{previewFrame?.label || project.cardPreview?.frames?.[0]?.label || "Project overview"}</strong>
      </div>
    </div>
  );
}

export default ProjectEntryCover;
