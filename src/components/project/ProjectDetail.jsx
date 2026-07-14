import React, { useEffect, useLayoutEffect, useRef } from "react";
import { mechanicsData } from "../../data/projects";
import { isYouTubeShortUrl, toEmbedUrl } from "../../utils/youtubeHelpers";
import ModelingDetail from "./ModelingDetail";
import SceneDetail from "./SceneDetail";
import ProjectGallery from "./ProjectGallery";

function ProjectDetail({ project, backLabel, isGalleryOpen = false, onBack, onImageClick }) {
  const backdropRef = useRef(null);
  const backButtonRef = useRef(null);
  const mechanics = mechanicsData[project.id] || [];
  const isPortraitTrailer = isYouTubeShortUrl(project.youtube);
  const portraitVideoStyle = isPortraitTrailer
    ? { "--video-aspect-ratio": project.videoAspectRatio || "9 / 16" }
    : undefined;

  useLayoutEffect(() => {
    const backdrop = backdropRef.current;
    if (!backdrop) return;

    backdrop.scrollTop = 0;
    backButtonRef.current?.focus({ preventScroll: true });
  }, [project.id]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !isGalleryOpen) onBack();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isGalleryOpen, onBack]);

  const handleBackdropClick = (event) => {
    if (event.target === backdropRef.current) onBack();
  };

  const isAcademicProject = project.type !== "scene";

  return (
    <div
      className="project-detail-backdrop"
      onClick={handleBackdropClick}
      ref={backdropRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
    >
      <article className="project-detail">
        <div className="case-study-toolbar">
          <button ref={backButtonRef} className="back-btn" onClick={onBack} type="button" aria-label={backLabel}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m15 18-6-6 6-6" />
            </svg>
            <span>{backLabel}</span>
          </button>
          <span className="case-study-toolbar-label">Case study</span>
        </div>

        {project.type === "modeling" ? (
          <ModelingDetail project={project} onImageClick={onImageClick} />
        ) : project.type === "scene" ? (
          <SceneDetail project={project} onImageClick={onImageClick} />
        ) : (
          <div className="game-case-study">
            <header className="case-study-hero">
              <div className="case-study-title-block">
                <span className="project-eyebrow">{isAcademicProject ? "Academic game project" : "Game project"}</span>
                <h1 className="game-detail-title">{project.title}</h1>
                <p className="game-detail-summary">{project.summary}</p>
              </div>

              <dl className="case-study-meta">
                <div><dt>Role</dt><dd>{project.role || "Programmer"}</dd></div>
                <div><dt>Team</dt><dd>{project.team || "—"}</dd></div>
                <div><dt>Duration</dt><dd>{project.time || "—"}</dd></div>
                <div><dt>Engine</dt><dd>{project.engine || "—"}</dd></div>
              </dl>

              <div className="case-study-tags">
                {project.tags?.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </header>

            {project.youtube && (
              <section
                className={`case-study-section case-study-video-section${isPortraitTrailer ? " case-study-video-portrait" : ""}`}
                style={portraitVideoStyle}
              >
                <div className="section-header">
                  <span className="section-kicker">Watch it in motion</span>
                  <h2 className="section-title">{isPortraitTrailer ? "Mobile gameplay trailer" : "Gameplay preview"}</h2>
                  <p className="section-description">
                    {isPortraitTrailer
                      ? "A portrait-first look at the combat, progression, and moment-to-moment mobile experience."
                      : "A closer look at the game&apos;s pace, systems, and player feedback."}
                  </p>
                  {isPortraitTrailer && (
                    <div
                      className="video-format-note"
                      aria-label={`${project.videoAspectLabel || "9:16"} portrait video captured on Galaxy S24+`}
                    >
                      <span>{project.videoAspectLabel || "9:16"}</span>
                      <span>{project.videoCaptureLabel || "Optimized for mobile viewing"}</span>
                    </div>
                  )}
                </div>
                <div className={`video-wrapper${isPortraitTrailer ? " video-wrapper-portrait" : ""}`}>
                  <iframe
                    title={`${project.title} gameplay preview`}
                    src={toEmbedUrl(project.youtube)}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </section>
            )}

            {project.details && (
              <section className="case-study-section case-study-overview">
                <div className="section-header">
                  <span className="section-kicker">The project</span>
                  <h2 className="section-title">Overview</h2>
                </div>
                <div className="detail-body">
                  {project.details.split("\n").filter(Boolean).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                </div>
              </section>
            )}

            {mechanics.length > 0 && (
              <section className="case-study-section mechanics-section">
                <div className="section-header">
                  <span className="section-kicker">Systems & interaction</span>
                  <h2 className="section-title">Core mechanics</h2>
                  <p className="section-description">The features that shape the moment-to-moment experience.</p>
                </div>
                <div className="mechanics-list-grid">
                  {mechanics.map((mechanic) => (
                    <article className="mechanic-item" key={mechanic.label}>
                      <span className="mechanic-icon" aria-hidden="true">{mechanic.icon}</span>
                      <h3>{mechanic.label}</h3>
                      <p className="mechanic-desc">{mechanic.desc}</p>
                    </article>
                  ))}
                </div>
              </section>
            )}

            <ProjectGallery
              title="Selected gallery"
              description={project.galleryPresentation === "phone-showcase"
                ? "Move through the complete mobile experience—from combat and exploration to progression and interface design."
                : "Gameplay, interface, and key moments—kept compact here and available in full resolution when you want a closer look."}
              projectTitle={project.title}
              presentation={project.galleryPresentation}
              groups={project.galleryGroups}
              collections={[{
                id: "project-images",
                label: project.galleryPresentation === "phone-showcase" ? "Mobile showcase" : "Game showcase",
                images: project.images
              }]}
              onImageClick={onImageClick}
            />

            {project.teamCredits && (
              <section className="case-study-section team-section">
                <div className="section-header">
                  <span className="section-kicker">Built together</span>
                  <h2 className="section-title">Team collaboration</h2>
                </div>
                <p className="team-intro">{project.teamCredits.intro}</p>
                <div className="team-grid">
                  {project.teamCredits.members.map((member) => (
                    <article className="team-member" key={member.name}>
                      <h3>{member.name}</h3>
                      <p>{member.description}</p>
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                          Connect on LinkedIn <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </article>
    </div>
  );
}

export default ProjectDetail;
