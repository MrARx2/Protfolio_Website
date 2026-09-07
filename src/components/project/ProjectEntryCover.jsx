import ResponsiveImage from "./ResponsiveImage";
import React from "react";

function ProjectEntryCover({ project, previewFrame }) {
  const curatedHero = project.caseStudyHero;
  const image = curatedHero?.src
    || project.thumbnail
    || previewFrame?.src
    || project.images?.[0]
    || project.renders?.[0];
  const label = curatedHero?.label
    || project.cardPreview?.frames?.find((frame) => frame.src === image)?.label
    || previewFrame?.label
    || "Project overview";

  if (!image) return null;

  return (
    <div
      className={`project-entry-cover project-entry-cover-${project.cardPreview?.presentation || "game"}`}
      aria-hidden="true"
    >
      <ResponsiveImage
        src={image}
        sizes="94vw"
        alt=""
        style={{ objectPosition: curatedHero?.position || "center" }}
      />
      <div className="project-entry-cover-shade" />
      <div className="project-entry-cover-note">
        <span>Opening frame</span>
        <strong>{label}</strong>
      </div>
    </div>
  );
}

export default ProjectEntryCover;
