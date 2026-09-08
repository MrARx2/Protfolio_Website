import React from "react";
import ResponsiveImage from "./ResponsiveImage";

export default function CaseStudyEnding({ nextProject, onNextProject, onViewWork, onContact }) {
  return <footer className="case-study-ending" aria-label="Continue exploring">
    {nextProject ? <button className="next-project-link" type="button" onClick={onNextProject} aria-label={`Next project: ${nextProject.title}`}>
      <ResponsiveImage src={nextProject.thumbnail || nextProject.renders?.[0]} sizes="(max-width: 600px) 88px, 160px" alt="" loading="lazy" />
      <span><span className="section-kicker">Next project</span><strong>{nextProject.title}</strong></span>
      <span className="next-project-arrow" aria-hidden="true">→</span>
    </button> : <div className="case-study-contact">
      <div><span className="section-kicker">Have a project in mind?</span><h2>Let’s build together.</h2></div>
      <button className="button button-primary" type="button" onClick={onContact}>Get in touch <span aria-hidden="true">→</span></button>
    </div>}
    <button className="case-study-return" type="button" onClick={onViewWork}><span aria-hidden="true">←</span> Back to all work</button>
  </footer>;
}
