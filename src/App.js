/**
 * Main Application Component
 * 
 * This is the root component that manages:
 * - Filter navigation (All, Games, Modeling, Scenes)
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
 * Category Section Component
 * Renders a section header + card grid for a project category
 */
function CategorySection({ id, icon, title, children, accentClass }) {
  return (
    <section className={`category-section ${accentClass || ''}`} id={id}>
      <div className="category-header">
        <span className="category-icon">{icon}</span>
        <h2 className="category-title">{title}</h2>
        <div className="category-divider"></div>
      </div>
      {children}
    </section>
  );
}

/**
 * Main App Component
 * Handles all application state and routing
 */
function App() {
  // State Management
  const [filter, setFilter] = useState("all"); // Current active filter
  const [selected, setSelected] = useState(null); // Currently selected project
  const [modal, setModal] = useState(null); // Image modal state

  // Determine which sections to show
  const showGames = filter === "all" || filter === "games";
  const showModeling = filter === "all" || filter === "modeling";
  const showScenes = filter === "all" || filter === "scenes";

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
    setFilter('all');
    setSelected(null);
    setModal(null);
    window.history.pushState({}, '', '#projects');
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <AnimatedDotsBg />
        <Navbar onHomeClick={goHome} />
        {!selected && <AboutSection />}
        <div className="container">
          {!selected && <h1 id="projects">Creative Technology Showcase</h1>}
          {!selected && (
            <>
              <div className="tabs" role="tablist" aria-label="Project filters">
                <button
                  className={`tab-all ${filter === "all" ? "active" : ""}`}
                  onClick={() => setFilter("all")}
                  role="tab"
                  aria-selected={filter === "all"}
                >
                  All
                </button>
                <button
                  className={`tab-games ${filter === "games" ? "active" : ""}`}
                  onClick={() => setFilter("games")}
                  role="tab"
                  aria-selected={filter === "games"}
                >
                  Games
                </button>
                <button
                  className={`tab-modeling ${filter === "modeling" ? "active" : ""}`}
                  onClick={() => setFilter("modeling")}
                  role="tab"
                  aria-selected={filter === "modeling"}
                >
                  3D Modeling
                </button>
                <button
                  className={`tab-scenes ${filter === "scenes" ? "active" : ""}`}
                  onClick={() => setFilter("scenes")}
                  role="tab"
                  aria-selected={filter === "scenes"}
                >
                  Scenes
                </button>
              </div>

              <div id="projects-panel" role="tabpanel">
                {/* Games Section */}
                {showGames && (
                  <CategorySection id="games-section" icon="🎮" title="Games" accentClass="accent-games">
                    <div className="card-grid">
                      {gameProjects.map((project, idx) => (
                        <FrostedCard project={project} key={project.id || idx} onClick={setSelected} />
                      ))}
                    </div>
                  </CategorySection>
                )}

                {/* 3D Modeling Section */}
                {showModeling && (
                  <CategorySection id="modeling-section" icon="🧊" title="3D Modeling" accentClass="accent-modeling">
                    <div className="modeling-grid">
                      {modelingProjects.map((project, idx) => (
                        <ModelingCard project={project} key={project.id || idx} onClick={setSelected} />
                      ))}
                    </div>
                  </CategorySection>
                )}

                {/* Scenes Section */}
                {showScenes && (
                  <CategorySection id="scenes-section" icon="🌌" title="Scenes & Environments" accentClass="accent-scenes">
                    <div className="scene-grid">
                      {sceneProjects.map((project, idx) => (
                        <SceneCard project={project} key={project.id || idx} onClick={setSelected} />
                      ))}
                    </div>
                  </CategorySection>
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
