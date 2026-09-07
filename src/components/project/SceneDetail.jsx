import React from "react";
import VideoPreview from "./VideoPreview";
import ProjectGallery from "./ProjectGallery";
import ProjectEntryCover from "./ProjectEntryCover";

function SceneDetail({ project, entryPreview, onImageClick }) {
  const coolFeatures = project.coolFeatures || [];
  const collections = [
    {
      id: "environment",
      label: "Environment",
      images: project.images || []
    },
    {
      id: "technical",
      label: "Technical views",
      images: coolFeatures.map((feature) => feature.image).filter(Boolean)
    }
  ];

  return (
    <div className="scene-detail">
      <header id="case-study-overview" className="scene-detail-header project-detail-header-with-cover">
        <ProjectEntryCover project={project} previewFrame={entryPreview} />
        <span className="project-eyebrow">Environment case study</span>
        <h1 className="scene-detail-title">{project.title}</h1>
        <p className="scene-detail-summary">{project.summary}</p>

        <div className="scene-meta-info">
          <div className="scene-meta-item">
            <span className="meta-label">Duration</span>
            <span className="meta-value">{project.time}</span>
          </div>
          <div className="scene-meta-item">
            <span className="meta-label">Engine</span>
            <span className="meta-value">{project.engine}</span>
          </div>
        </div>

        {project.tags?.length > 0 && (
          <div className="scene-tags-container">
            {project.tags.map((tag) => <span className="tag scene-tag" key={tag}>{tag}</span>)}
          </div>
        )}
      </header>

      {project.videoUrl && (
        <section id="case-study-video" className="case-study-section scene-video-section">
          <div className="section-header">
            <span className="section-kicker">Watch it in motion</span>
            <h2 className="section-title">Video showcase</h2>
            <p className="section-description">A cinematic pass through the environment, lighting, and final composition.</p>
          </div>
          <VideoPreview url={project.videoUrl} title={`${project.title} showcase`} poster={project.thumbnail || project.images?.[0]} />
        </section>
      )}

      {project.details && (
        <section id="case-study-about" className="case-study-section scene-overview-section">
          <div className="section-header">
            <span className="section-kicker">The environment</span>
            <h2 className="section-title">Overview</h2>
          </div>
          <p className="scene-details-text">{project.details}</p>
        </section>
      )}

      <ProjectGallery
        sectionId="case-study-gallery"
        title="Environment gallery"
        description="Explore the finished scene and technical views. Select an image to enlarge it."
        projectTitle={project.title}
        collections={collections}
        onImageClick={onImageClick}
      />

      {coolFeatures.length > 0 && (
        <section id="case-study-technical" className="case-study-section cool-features-section">
          <div className="section-header">
            <span className="section-kicker">Technical focus</span>
            <h2 className="section-title">Under the surface</h2>
          </div>
          <div className="cool-features-grid">
            {coolFeatures.map((feature) => (
              <article className="cool-feature-card" key={feature.title}>
                <div className="cool-feature-header">
                  <span className="cool-feature-icon" aria-hidden="true">{feature.icon}</span>
                  <h3 className="cool-feature-title">{feature.title}</h3>
                </div>
                <p className="cool-feature-description">{feature.description}</p>
                {feature.image && <button type="button" className="technical-image-button" onClick={() => onImageClick([feature.image], 0)} aria-label={`Enlarge ${feature.title} visualization`}>
                  <img src={feature.image} alt={`${feature.title} visualization`} loading="lazy" />
                  <span>View full image ↗</span>
                </button>}
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default SceneDetail;
