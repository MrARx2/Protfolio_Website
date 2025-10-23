import React from 'react';
import { personalInfo } from '../../data/personalInfo';

function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="about-glass about-glass-row">
        <div className="about-left">
          <div className="about-avatar-wrapper">
            <img
              src={personalInfo.avatar}
              alt={personalInfo.name}
              className="about-avatar"
              loading="eager"
            />
          </div>
          <div className="about-spacer">
            <div className="about-spacer-line"></div>
          </div>
          <div className="about-interests">
            {personalInfo.skills.map((skill, i) => (
              <span className="tag about-tag" key={i}>{skill}</span>
            ))}
          </div>
        </div>
        <div className="about-content about-content-right">
          <h2 className="about-name-glow">{personalInfo.name}</h2>
          <p>{personalInfo.bio}</p>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
