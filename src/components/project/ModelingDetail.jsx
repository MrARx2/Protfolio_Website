import React from "react";
import ProjectGallery from "./ProjectGallery";

function ModelingDetail({ project, onImageClick }) {
  const collections = [
    {
      id: "renders",
      label: "Final renders",
      images: project.renders || []
    },
    {
      id: "paintwork",
      label: "Paintwork",
      images: project.paintwork || []
    },
    {
      id: "progression",
      label: "Progression",
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
      <header className="modeling-detail-header">
        <span className="project-eyebrow">3D modeling case study</span>
        <h1 className="modeling-detail-title">{project.title}</h1>
        <p className="modeling-detail-summary">{project.summary}</p>

        <div className="modeling-meta-info">
          <div className="modeling-meta-item">
            <span className="meta-label">Duration</span>
            <span className="meta-value">{project.time}</span>
          </div>
          <div className="modeling-meta-item">
            <span className="meta-label">Software</span>
            <span className="meta-value">{project.software}</span>
          </div>
          {project.render && (
            <div className="modeling-meta-item">
              <span className="meta-label">Rendered in</span>
              <span className="meta-value">{project.render}</span>
            </div>
          )}
        </div>

        {project.tags?.length > 0 && (
          <div className="modeling-tags-container">
            {project.tags.map((tag) => <span className="tag modeling-tag" key={tag}>{tag}</span>)}
          </div>
        )}
      </header>

      {project.details && (
        <section className="case-study-section modeling-overview-section">
          <div className="section-header">
            <span className="section-kicker">The project</span>
            <h2 className="section-title">About the work</h2>
          </div>
          <p className="modeling-details-text">{project.details}</p>
        </section>
      )}

      <ProjectGallery
        title="Modeling process"
        description="Move between final renders, material work, development stages, and references without losing your place in the case study."
        projectTitle={project.title}
        collections={collections}
        onImageClick={onImageClick}
      />
    </div>
  );
}

export default ModelingDetail;
