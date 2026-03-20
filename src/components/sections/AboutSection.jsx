import React, { useEffect, useRef } from 'react';
import { personalInfo } from '../../data/personalInfo';

function AboutSection() {
  const isScrollingRef = useRef(false);
  const touchStartY = useRef(0);
  const mouseStartY = useRef(0);
  const isMouseDownRef = useRef(false);

  const scrollToProjects = () => {
    if (isScrollingRef.current) return;
    isScrollingRef.current = true;
    
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      const yOffset = -90; 
      const y = projectsSection.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 800);
  };

  useEffect(() => {
    const handleGlobalWheel = (e) => {
      if (isScrollingRef.current) return;
      const projectsSection = document.getElementById('projects');
      if (!projectsSection) return;

      const yOffset = -90; 
      const projectsY = projectsSection.getBoundingClientRect().top + window.scrollY + yOffset;
      
      if (window.scrollY < 50 && e.deltaY > 10) {
        isScrollingRef.current = true;
        window.scrollTo({ top: projectsY, behavior: 'smooth' });
        setTimeout(() => { isScrollingRef.current = false; }, 800);
      }
      else if (window.scrollY > 0 && window.scrollY <= projectsY + 50 && e.deltaY < -10) {
        isScrollingRef.current = true;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => { isScrollingRef.current = false; }, 800);
      }
    };

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      handleSwipe(touchStartY.current, e.changedTouches[0].clientY);
    };

    const handlePointerDown = (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      isMouseDownRef.current = true;
      mouseStartY.current = e.clientY;
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'grabbing';
    };

    const handlePointerUp = (e) => {
      if (!isMouseDownRef.current) return;
      isMouseDownRef.current = false;
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
      handleSwipe(mouseStartY.current, e.clientY);
    };

    const handleDragStart = (e) => {
      if (isMouseDownRef.current) e.preventDefault();
    };

    const handleSwipe = (startY, endY) => {
      if (isScrollingRef.current) return;
      const projectsSection = document.getElementById('projects');
      if (!projectsSection) return;

      const yOffset = -90; 
      const projectsY = projectsSection.getBoundingClientRect().top + window.scrollY + yOffset;
      const swipeDistance = startY - endY;

      // Swipe Up (Scroll Down)
      if (window.scrollY < 50 && swipeDistance > 40) {
        isScrollingRef.current = true;
        window.scrollTo({ top: projectsY, behavior: 'smooth' });
        setTimeout(() => { isScrollingRef.current = false; }, 800);
      }
      // Swipe Down (Scroll Up)
      else if (window.scrollY > 0 && window.scrollY <= projectsY + 50 && swipeDistance < -40) {
        isScrollingRef.current = true;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => { isScrollingRef.current = false; }, 800);
      }
    };

    window.addEventListener('wheel', handleGlobalWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('dragstart', handleDragStart);
    
    return () => {
      window.removeEventListener('wheel', handleGlobalWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('dragstart', handleDragStart);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, []);

  return (
    <section className="hero-section" id="about">
      <video className="hero-video-bg" autoPlay loop muted playsInline>
        <source src={process.env.PUBLIC_URL + "/Videos/herotrailer8_Compressed.mp4"} type="video/mp4" />
      </video>
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        <div className="hero-titles">
          <h1 className="hero-name">{personalInfo.name}</h1>
          <h2 className="hero-role">{personalInfo.role}</h2>
        </div>
        <p className="hero-value-prop">{personalInfo.bio}</p>
      </div>
      
      <div className="hero-scroll-indicator" onClick={scrollToProjects} style={{ cursor: 'pointer' }}>
        <div className="hero-mouse"></div>
      </div>
    </section>
  );
}

export default AboutSection;
