/**
 * Main Application Component
 * 
 * This is the root component that manages:
 * - Tab navigation (Games, Modeling, Scenes)
 * - Project selection and detail views
 * - Image modal/lightbox
 * - Browser history integration
 * 
 * @component
 */

import React, { useState, Suspense, useEffect } from "react";
import "./style.css";

// Layout Components
import ErrorBoundary from "./components/layout/ErrorBoundary";
import AnimatedDotsBg from "./components/layout/AnimatedDotsBg";
import Navbar from "./components/layout/Navbar";
import AboutSection from "./components/sections/AboutSection";

// Card Components (for grid display)
import FrostedCard from "./components/cards/FrostedCard";
import ModelingCard from "./components/cards/ModelingCard";
import SceneCard from "./components/cards/SceneCard";

// Detail Components (for individual project pages)
import ProjectDetail from "./components/project/ProjectDetail";
import ImageModal from "./components/modals/ImageModal";

// Project Data
import { gameProjects, modelingProjects, sceneProjects } from "./data/projects";

// Loading fallback component
function LoadingSpinner() {
  return (
    <div className="loading-spinner" aria-label="Loading">
      <div className="spinner"></div>
    </div>
  );
}

/**
 * Main App Component
 * Handles all application state and routing
 */
function App() {
  // State Management
  const [tab, setTab] = useState("games"); // Current active tab
  const [selected, setSelected] = useState(null); // Currently selected project
  const [modal, setModal] = useState(null); // Image modal state
  
  // Get projects based on active tab
  const projects = tab === "games" 
    ? gameProjects 
    : tab === "modeling" 
    ? modelingProjects 
    : sceneProjects;

  /**
   * Browser Back Button Support
   * Handles popstate events to enable browser navigation
   */
  useEffect(() => {
    const handlePopState = (event) => {
      if (modal) {
        // Close modal first
        setModal(null);
      } else if (selected) {
        // Then close project detail
        setSelected(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [selected, modal]);

  /**
   * Update URL when project is selected
   * Pushes project ID to browser history
   */
  useEffect(() => {
    if (selected) {
      window.history.pushState({ project: selected.id }, '', `#${selected.id}`);
    } else if (!modal) {
      window.history.pushState({}, '', '#projects');
    }
  }, [selected]);

  /**
   * Update URL when modal is opened
   * Maintains current hash while adding modal state
   */
  useEffect(() => {
    if (modal) {
      window.history.pushState({ modal: true }, '', window.location.hash);
    }
  }, [modal]);

  /**
   * Reset to home state
   * Called when clicking logo or home button
   */
  function goHome() {
    setTab('games');
    setSelected(null);
    setModal(null);
    window.history.pushState({}, '', '#projects');
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <AnimatedDotsBg />
        <Navbar onHomeClick={goHome} />
        <div className="container">
          {!selected && <AboutSection />}
          {!selected && <h1 id="projects">Creative Technology Showcase</h1>}
          {!selected && (
            <>
              <div className="tabs" role="tablist" aria-label="Project categories">
                <button
                  className={`tab-games ${tab === "games" ? "active" : ""}`}
                  onClick={() => setTab("games")}
                  role="tab"
                  aria-selected={tab === "games"}
                  aria-controls="projects-panel"
                >
                  Games
                </button>
                <button
                  className={`tab-modeling ${tab === "modeling" ? "active" : ""}`}
                  onClick={() => setTab("modeling")}
                  role="tab"
                  aria-selected={tab === "modeling"}
                  aria-controls="projects-panel"
                >
                  Modeling
                </button>
                <button
                  className={`tab-scenes ${tab === "scenes" ? "active" : ""}`}
                  onClick={() => setTab("scenes")}
                  role="tab"
                  aria-selected={tab === "scenes"}
                  aria-controls="projects-panel"
                >
                  <span className="tab-text-full">Scenes & Environments</span>
                  <span className="tab-text-mobile">Environments</span>
                </button>
              </div>
              <div id="projects-panel" role="tabpanel">
                {tab === 'games' ? (
                  <div className="card-grid">
                    {projects.map((project, idx) => (
                      <FrostedCard project={project} key={project.id || idx} onClick={setSelected} />
                    ))}
                  </div>
                ) : tab === 'modeling' ? (
                  <div className="modeling-grid">
                    {projects.map((project, idx) => (
                      <ModelingCard project={project} key={project.id || idx} onClick={setSelected} />
                    ))}
                  </div>
                ) : (
                  <div className="scene-grid">
                    {projects.map((project, idx) => (
                      <SceneCard project={project} key={project.id || idx} onClick={setSelected} />
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
          {selected && !modal && (
            <ProjectDetail
              project={selected}
              onBack={() => setSelected(null)}
              onImageClick={(images, idx) => setModal({ images, index: idx })}
            />
          )}
          {modal && (
            <ImageModal
              images={modal.images}
              initialIndex={modal.index}
              onClose={() => setModal(null)}
            />
          )}
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
