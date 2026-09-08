import React from "react";
import CaseStudyMeta from "./CaseStudyMeta";
import ProjectEntryCover from "./ProjectEntryCover";
import VideoPreview from "./VideoPreview";
import { isYouTubeShortUrl } from "../../utils/youtubeHelpers";

export default function GameOverview({ project, entryPreview }) {
  const portrait = isYouTubeShortUrl(project.youtube);
  const introduction = <>
    <span className="project-eyebrow">Academic game project</span>
    <h1 className="game-detail-title">{project.title}</h1>
    <p className="game-detail-summary">{project.summary}</p>
    <CaseStudyMeta project={project} />
    <div className="case-study-tags">{project.tags?.map(tag => <span key={tag}>{tag}</span>)}</div>
  </>;

  if (portrait) return <header id="case-study-overview" className="game-overview-featured" style={{ "--video-aspect-ratio": project.videoAspectRatio || "9 / 16" }}>
    <div className="game-overview-copy">{introduction}</div>
    <div className="game-overview-media" id="case-study-video">
      <VideoPreview url={project.youtube} title={`${project.title} gameplay preview`} poster={project.thumbnail} portrait />
      <p className="game-overview-caption">Gameplay captured on mobile</p>
    </div>
  </header>;

  return <>
    <header id="case-study-overview" className="case-study-hero project-detail-header-with-cover">
      <ProjectEntryCover project={project} previewFrame={entryPreview} />
      {introduction}
    </header>
    {project.youtube && <section id="case-study-video" className="case-study-section case-study-video-section">
      <div className="section-header">
        <span className="section-kicker">See it in motion</span>
        <h2 className="section-title">Gameplay</h2>
        <p className="section-description">{project.id === "Ricochet" ? "Switch between striker and goalie in a neon arena." : "Build speed through close planetary flybys."}</p>
      </div>
      <VideoPreview url={project.youtube} title={`${project.title} gameplay preview`} poster={project.thumbnail || project.images?.[0]} />
    </section>}
  </>;
}
