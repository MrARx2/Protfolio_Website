import CaseStudyMeta from "./CaseStudyMeta";
import React from "react";
import ProjectGallery from "./ProjectGallery";
import ProjectEntryCover from "./ProjectEntryCover";

function ModelingDetail({ project, entryPreview, onImageClick }) {
  const collections = [
    {
      id: "renders",
      label: "Final renders",
      images: project.renders || []
    },
    {
      id: "paintwork",
      label: "Materials",
      images: project.paintwork || []
    },
    {
      id: "progression",
      label: "Work in progress",
      images: project.progression || []
    },
    {
      id: "references",
      label: "References",
      images: project.references || []
    }
  ];

  return (
    <div className="modeling-detail">
      <header id="case-study-overview" className="modeling-detail-header project-detail-header-with-cover">
        <ProjectEntryCover project={project} previewFrame={entryPreview} />
        <span className="project-eyebrow">3D modeling case study</span>
        <h1 className="modeling-detail-title">{project.title}</h1>
        <p className="modeling-detail-summary">{project.summary}</p>

        <CaseStudyMeta project={project} />

        {project.tags?.length > 0 && (
          <div className="modeling-tags-container">
            {project.tags.map((tag) => <span className="tag modeling-tag" key={tag}>{tag}</span>)}
          </div>
        )}
      </header>

      {project.details && (
        <section id="case-study-about" className="case-study-section modeling-overview-section">
          <div className="section-header">
            <span className="section-kicker">The project</span>
            <h2 className="section-title">About the work</h2>
          </div>
          <p className="modeling-details-text">{project.details}</p>
        </section>
      )}

      <ProjectGallery
        sectionId="case-study-gallery"
        title="Modeling process"
        description="Explore the final renders and how they were made. Select an image to enlarge it."
        projectTitle={project.title}
        collections={collections}
        onImageClick={onImageClick}
      />
    </div>
  );
}

export default ModelingDetail;
