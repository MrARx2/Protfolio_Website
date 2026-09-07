import { decodeRoutePart } from "../../utils/routeHelpers";
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { mechanicsData } from "../../data/projects";
import { isYouTubeShortUrl } from "../../utils/youtubeHelpers";
import ModelingDetail from "./ModelingDetail";
import SceneDetail from "./SceneDetail";
import ProjectGallery from "./ProjectGallery";
import ProjectEntryCover from "./ProjectEntryCover";
import MechanicModal from "../modals/MechanicModal";
import { usePageScrollLock } from "../../hooks/useDialog";
import VideoPreview from "./VideoPreview";
import CaseStudyNav from "./CaseStudyNav";

function ProjectDetail({ project, backLabel, entryPreview, isGalleryOpen = false, onBack, onImageClick }) {
  usePageScrollLock();
  const backdropRef = useRef(null);
  const backButtonRef = useRef(null);
  const mechanicTriggerRef = useRef(null);
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const mechanics = mechanicsData[project.id] || [];
  const isPortraitTrailer = isYouTubeShortUrl(project.youtube);
  const portraitVideoStyle = isPortraitTrailer
    ? { "--video-aspect-ratio": project.videoAspectRatio || "9 / 16" }
    : undefined;

  const openMechanic = useCallback((mechanic, trigger) => {
    mechanicTriggerRef.current = trigger;
    window.history.pushState(
      {
        ...(window.history.state || {}),
        kind: "mechanic",
        project: project.id,
        mechanic: mechanic.label,
        canGoBack: true
      },
      "",
      `#project/${encodeURIComponent(project.id)}/mechanic/${encodeURIComponent(mechanic.label)}`
    );
    setSelectedMechanic(mechanic);
  }, [project.id]);

  const clearMechanic = useCallback(() => {
    setSelectedMechanic(null);
    const trigger = mechanicTriggerRef.current;
    mechanicTriggerRef.current = null;
    window.requestAnimationFrame(() => { if (trigger?.isConnected && !trigger.closest("[inert]")) trigger.focus({ preventScroll: true }); });
  }, []);

  const closeMechanic = useCallback(() => {
    const historyState = window.history.state;
    if (historyState?.kind === "mechanic" && historyState?.project === project.id && historyState?.canGoBack) {
      window.history.back();
      return;
    }
    clearMechanic();
    window.history.replaceState(
      { ...(historyState || {}), kind: "project", project: project.id },
      "",
      `#project/${encodeURIComponent(project.id)}`
    );
  }, [clearMechanic, project.id]);

  useEffect(() => {
    const handlePopState = (event) => {
      const hashParts = window.location.hash.replace(/^#/, "").split("/");
      const hashMechanic = hashParts[0] === "project"
        && decodeRoutePart(hashParts[1] || "") === String(project.id)
        && hashParts[2] === "mechanic"
        ? decodeRoutePart(hashParts.slice(3).join("/"))
        : null;
      const mechanicLabel = event.state?.project === project.id && event.state?.kind === "mechanic"
        ? event.state?.mechanic || hashMechanic
        : hashMechanic;
      if (mechanicLabel) {
        const mechanic = mechanics.find((item) => item.label === mechanicLabel);
        if (mechanic) setSelectedMechanic(mechanic);
        return;
      }
      clearMechanic();
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [clearMechanic, mechanics, project.id]);

  useEffect(() => {
    const hashParts = window.location.hash.replace(/^#/, "").split("/");
    if (hashParts[0] !== "project" || hashParts[2] !== "mechanic") return;
    const mechanicLabel = decodeRoutePart(hashParts.slice(3).join("/"));
    const mechanic = mechanics.find((item) => item.label === mechanicLabel);
    if (mechanic) setSelectedMechanic(mechanic);
  }, [mechanics, project.id]);

  useLayoutEffect(() => {
    const backdrop = backdropRef.current;
    if (!backdrop) return;

    backdrop.scrollTop = 0;
    const frame = window.requestAnimationFrame(() => backButtonRef.current?.focus({ preventScroll: true }));
    return () => window.cancelAnimationFrame(frame);
  }, [project.id]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !isGalleryOpen && !selectedMechanic) onBack();
      if (event.key !== "Tab" || isGalleryOpen || selectedMechanic) return;

      const focusable = Array.from(backdropRef.current?.querySelectorAll(
        'button:not([disabled]), [href], iframe, [tabindex]:not([tabindex="-1"])'
      ) || []).filter((element) => element.getAttribute("aria-hidden") !== "true");
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isGalleryOpen, onBack, selectedMechanic]);

  const handleBackdropClick = (event) => {
    if (event.target === backdropRef.current) onBack();
  };

  const isAcademicProject = project.type !== "scene";
  const showEntryCover = project.id !== "path-of-embers" && Boolean(project.cardPreview);
  const caseStudySections = useMemo(() => {
    if (project.type === "modeling") {
      return [
        { id: "case-study-overview", label: "Overview" },
        ...(project.details ? [{ id: "case-study-about", label: "About" }] : []),
        { id: "case-study-gallery", label: "Gallery" }
      ];
    }

    if (project.type === "scene") {
      return [
        { id: "case-study-overview", label: "Overview" },
        ...(project.videoUrl ? [{ id: "case-study-video", label: "Video" }] : []),
        ...(project.details ? [{ id: "case-study-about", label: "Story" }] : []),
        { id: "case-study-gallery", label: "Gallery" },
        ...(project.coolFeatures?.length ? [{ id: "case-study-technical", label: "Technical" }] : [])
      ];
    }

    return [
      { id: "case-study-overview", label: "Overview" },
      ...(project.youtube ? [{ id: "case-study-video", label: isPortraitTrailer ? "Trailer" : "Video" }] : []),
      ...(project.details ? [{ id: "case-study-about", label: "About" }] : []),
      ...(mechanics.length ? [{ id: "case-study-mechanics", label: "Systems" }] : []),
      { id: "case-study-gallery", label: "Gallery" },
      ...(project.teamCredits ? [{ id: "case-study-team", label: "Team" }] : [])
    ];
  }, [isPortraitTrailer, mechanics.length, project.coolFeatures?.length, project.details, project.teamCredits, project.type, project.videoUrl, project.youtube]);

  return (
    <div
      className="project-detail-backdrop"
      onClick={handleBackdropClick}
      ref={backdropRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
      tabIndex={-1}
    >
      <article className="project-detail">
        <div className="case-study-toolbar">
          <button ref={backButtonRef} className="back-btn" onClick={onBack} type="button" aria-label={backLabel}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m15 18-6-6 6-6" />
            </svg>
            <span>{backLabel}</span>
          </button>
          <CaseStudyNav sections={caseStudySections} scrollRootRef={backdropRef} />
          <span className="case-study-toolbar-label">Case study</span>
        </div>

        {project.type === "modeling" ? (
          <ModelingDetail project={project} entryPreview={entryPreview} onImageClick={onImageClick} />
        ) : project.type === "scene" ? (
          <SceneDetail project={project} entryPreview={entryPreview} onImageClick={onImageClick} />
        ) : (
          <div className="game-case-study">
            <header id="case-study-overview" className={`case-study-hero${showEntryCover ? " project-detail-header-with-cover" : ""}`}>
              {showEntryCover && <ProjectEntryCover project={project} previewFrame={entryPreview} />}
              <div className="case-study-title-block">
                <span className="project-eyebrow">{isAcademicProject ? "Academic game project" : "Game project"}</span>
                <h1 className="game-detail-title">
                  {project.title}
                </h1>
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
                id="case-study-video"
                className={`case-study-section case-study-video-section${isPortraitTrailer ? " case-study-video-portrait" : ""}`}
                style={portraitVideoStyle}
              >
                <div className="section-header">
                  <span className="section-kicker">Watch it in motion</span>
                  <h2 className="section-title">{isPortraitTrailer ? "Mobile gameplay trailer" : "Gameplay preview"}</h2>
                  <p className="section-description">
                    {isPortraitTrailer
                      ? "Combat, talents, and progression captured on a phone."
                      : "A closer look at the game's pace, systems, and player feedback."}
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
                <VideoPreview url={project.youtube} title={`${project.title} gameplay preview`} poster={project.thumbnail || project.images?.[0]} portrait={isPortraitTrailer} />
              </section>
            )}

            {project.details && (
              <section id="case-study-about" className="case-study-section case-study-overview">
                <div className="section-header">
                  <span className="section-kicker">The project</span>
                  <h2 className="section-title">About the game</h2>
                </div>
                <div className="detail-body">
                  {project.details.split("\n").filter(Boolean).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                </div>
              </section>
            )}

            {mechanics.length > 0 && (
              <section id="case-study-mechanics" className="case-study-section mechanics-section">
                <div className="section-header">
                  <span className="section-kicker">Systems & interaction</span>
                  <h2 className="section-title">Core mechanics</h2>
                  <p className="section-description">The features that shape the moment-to-moment experience.</p>
                </div>
                <div className="mechanics-list-grid">
                  {mechanics.map((mechanic) => (
                    <button
                      className="mechanic-item"
                      key={mechanic.label}
                      type="button"
                      aria-haspopup="dialog"
                      onClick={(event) => openMechanic(mechanic, event.currentTarget)}
                    >
                      <span className="mechanic-icon" aria-hidden="true">{mechanic.icon}</span>
                      <h3>{mechanic.label}</h3>
                      <p className="mechanic-desc">{mechanic.desc}</p>
                      <span className="mechanic-open-cue">
                        Explore system <span aria-hidden="true">↗</span>
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            )}

            <ProjectGallery
              sectionId="case-study-gallery"
              title="Selected gallery"
              description={project.galleryPresentation === "phone-showcase"
                ? "Move through the complete mobile experience—from combat and exploration to progression and interface design."
                : "Gameplay and interface screenshots. Select an image to enlarge it."}
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
              <section id="case-study-team" className="case-study-section team-section">
                <div className="section-header">
                  <span className="section-kicker">Built together</span>
                  <h2 className="section-title">Team collaboration</h2>
                </div>
                <p className="team-intro">{project.teamCredits.intro}</p>
                <div className={`team-grid${project.teamCredits.members.length === 1 ? " team-grid-single" : ""}`}>
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

      {selectedMechanic && (
        <MechanicModal mechanic={selectedMechanic} onClose={closeMechanic} />
      )}
    </div>
  );
}

export default ProjectDetail;
