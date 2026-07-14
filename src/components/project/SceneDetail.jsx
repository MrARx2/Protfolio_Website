import React from "react";
import { toEmbedUrl } from "../../utils/youtubeHelpers";
import ProjectGallery from "./ProjectGallery";

function SceneDetail({ project, onImageClick }) {
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
      <header className="scene-detail-header">
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
        <section className="case-study-section scene-video-section">
          <div className="section-header">
            <span className="section-kicker">Watch it in motion</span>
            <h2 className="section-title">Video showcase</h2>
            <p className="section-description">A cinematic pass through the environment, lighting, and final composition.</p>
          </div>
          <div className="video-wrapper">
            <iframe
              src={toEmbedUrl(project.videoUrl)}
              title={`${project.title} video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </section>
      )}

      {project.details && (
        <section className="case-study-section scene-overview-section">
          <div className="section-header">
            <span className="section-kicker">The environment</span>
            <h2 className="section-title">Overview</h2>
          </div>
          <p className="scene-details-text">{project.details}</p>
        </section>
      )}

      <ProjectGallery
        title="Environment gallery"
        description="A focused viewer for the finished scene and its technical visualization. Open any frame when you want the full-resolution detail."
        projectTitle={project.title}
        collections={collections}
        onImageClick={onImageClick}
      />

      {coolFeatures.length > 0 && (
        <section className="case-study-section cool-features-section">
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
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default SceneDetail;
