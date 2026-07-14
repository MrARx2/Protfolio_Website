import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./style.css";

import ErrorBoundary from "./components/layout/ErrorBoundary";
import AnimatedDotsBg from "./components/layout/AnimatedDotsBg";
import Navbar from "./components/layout/Navbar";
import AboutSection from "./components/sections/AboutSection";
import FrostedCard from "./components/cards/FrostedCard";
import ModelingCard from "./components/cards/ModelingCard";
import SceneCard from "./components/cards/SceneCard";
import ProjectDetail from "./components/project/ProjectDetail";
import ImageModal from "./components/modals/ImageModal";
import PhoneImageModal from "./components/modals/PhoneImageModal";
import { personalInfo } from "./data/personalInfo";
import { gameProjects, modelingProjects, sceneProjects } from "./data/projects";

function LoadingSpinner() {
  return (
    <div className="loading-spinner" aria-label="Loading">
      <div className="spinner" />
    </div>
  );
}

function SectionHeading({ title, description }) {
  return (
    <header className="work-section-heading">
      <h2>{title}</h2>
      <p>{description}</p>
    </header>
  );
}

const backLabels = {
  games: "Back to games",
  modeling: "Back to 3D modeling",
  scenes: "Back to environments"
};

function getProjectCategory(project) {
  if (project?.type === "modeling") return "modeling";
  if (project?.type === "scene") return "scenes";
  return "games";
}

function App() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selected, setSelected] = useState(null);
  const [projectReturnCategory, setProjectReturnCategory] = useState(null);
  const [modal, setModal] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const savedScrollPosition = useRef(0);

  const allProjects = useMemo(
    () => [...gameProjects, ...modelingProjects, ...sceneProjects],
    []
  );

  const categories = useMemo(
    () => [
      { id: "all", label: "All work", count: allProjects.length, target: "projects" },
      { id: "games", label: "Games", count: gameProjects.length, target: "games-section" },
      { id: "modeling", label: "3D Modeling", count: modelingProjects.length, target: "modeling-section" },
      { id: "scenes", label: "Environments", count: sceneProjects.length, target: "scenes-section" }
    ],
    [allProjects.length]
  );

  const scrollToSection = useCallback((category) => {
    const destination = categories.find((item) => item.id === category);
    const target = destination ? document.getElementById(destination.target) : null;
    if (!target) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    window.history.replaceState({}, "", category === "all" ? "#projects" : `#${category}`);
  }, [categories]);

  const goHome = useCallback(() => {
    setSelected(null);
    setProjectReturnCategory(null);
    setModal(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.replaceState({}, "", "#about");
  }, []);

  const openProject = useCallback((project) => {
    savedScrollPosition.current = window.scrollY;
    setProjectReturnCategory(activeCategory === "all" ? getProjectCategory(project) : activeCategory);
    setSelected(project);
    window.history.pushState({ project: project.id }, "", `#project/${project.id}`);
  }, [activeCategory]);

  const closeProject = useCallback(() => {
    setModal(null);
    setSelected(null);
    setProjectReturnCategory(null);
    window.history.replaceState({}, "", activeCategory === "all" ? "#projects" : `#${activeCategory}`);
    window.requestAnimationFrame(() => window.scrollTo({ top: savedScrollPosition.current, behavior: "auto" }));
  }, [activeCategory]);

  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);

      if (!selected) {
        const marker = window.scrollY + Math.min(window.innerHeight * 0.32, 300);
        const sections = [
          { id: "games-section", category: "games" },
          { id: "modeling-section", category: "modeling" },
          { id: "scenes-section", category: "scenes" }
        ];
        let nextCategory = "all";
        sections.forEach(({ id, category }) => {
          const section = document.getElementById(id);
          if (section && section.offsetTop <= marker) nextCategory = category;
        });
        setActiveCategory((current) => current === nextCategory ? current : nextCategory);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateScrollState);
      }
    };

    updateScrollState();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [selected]);

  useEffect(() => {
    const handlePopState = () => {
      if (modal) {
        setModal(null);
        return;
      }
      if (selected) {
        setSelected(null);
        setProjectReturnCategory(null);
        window.requestAnimationFrame(() => window.scrollTo({ top: savedScrollPosition.current, behavior: "auto" }));
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [modal, selected]);

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <div className="site-shell">
          <div className="site-progress" aria-hidden="true">
            <span style={{ transform: `scaleX(${scrollProgress})` }} />
          </div>

          <AnimatedDotsBg />
          <Navbar onHomeClick={goHome} />
          <AboutSection onExplore={() => scrollToSection("all")} />

          <main className="work-main" id="main-content">
            <div className="work-nav-shell" id="projects">
              <nav className="work-nav" aria-label="Project categories">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    className={activeCategory === category.id ? "active" : ""}
                    aria-current={activeCategory === category.id ? "true" : undefined}
                    onClick={() => scrollToSection(category.id)}
                  >
                    <span>{category.label}</span>
                    <sup>{String(category.count).padStart(2, "0")}</sup>
                  </button>
                ))}
              </nav>
            </div>

            <section className="work-section games-section" id="games-section" data-category="games">
              <SectionHeading
                title="Games"
                description="Systems-driven projects built around responsive controls, readable feedback, and a strong core loop."
              />
              <div className="games-showcase">
                {gameProjects[0] && (
                  <FrostedCard project={gameProjects[0]} onClick={openProject} featured />
                )}
                <div className="games-secondary-grid">
                  {gameProjects.slice(1).map((project) => (
                    <FrostedCard project={project} key={project.id} onClick={openProject} />
                  ))}
                </div>
              </div>
            </section>

            <section className="work-section modeling-section" id="modeling-section" data-category="modeling">
              <SectionHeading
                title="3D Modeling"
                description="Hard-surface studies developed from modeling and topology through texturing and final real-time presentation."
              />
              <div className="modeling-showcase">
                {modelingProjects.map((project, index) => (
                  <ModelingCard
                    project={project}
                    key={project.id}
                    index={index}
                    onClick={openProject}
                  />
                ))}
              </div>
            </section>

            <section className="work-section scenes-section" id="scenes-section" data-category="scenes">
              <SectionHeading
                title="Scenes & Environments"
                description="Cinematic spaces that explore atmosphere, composition, and next-generation rendering workflows."
              />
              <div className="scene-showcase">
                {sceneProjects.map((project) => (
                  <SceneCard project={project} key={project.id} onClick={openProject} />
                ))}
              </div>
            </section>
          </main>

          <footer className="contact-section" id="contact">
            <div className="contact-glow" aria-hidden="true" />
            <span className="section-kicker">Let&apos;s connect</span>
            <h2>Let&apos;s build something interactive.</h2>
            <p>
              I&apos;m always interested in thoughtful game projects, technical challenges,
              and opportunities to create memorable player experiences.
            </p>
            <div className="contact-actions">
              <a className="button button-primary" href={personalInfo.social.linkedin.url} target="_blank" rel="noopener noreferrer">
                Connect on LinkedIn <span aria-hidden="true">↗</span>
              </a>
              <a className="button button-secondary" href={personalInfo.social.github.url} target="_blank" rel="noopener noreferrer">
                View GitHub <span aria-hidden="true">↗</span>
              </a>
              <a className="button button-quiet" href={personalInfo.resume} target="_blank" rel="noopener noreferrer">
                Resume <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="footer-meta">
              <span>© {new Date().getFullYear()} Ariel Cohen</span>
              <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                Back to top <span aria-hidden="true">↑</span>
              </button>
            </div>
          </footer>

          {selected && (
            <ProjectDetail
              project={selected}
              backLabel={backLabels[projectReturnCategory || getProjectCategory(selected)]}
              isGalleryOpen={Boolean(modal)}
              onBack={closeProject}
              onImageClick={(images, index, options = {}) => setModal({ images, index, ...options })}
            />
          )}

          {modal?.presentation === "phone-showcase" && (
            <PhoneImageModal
              images={modal.images}
              initialIndex={modal.index}
              onClose={() => setModal(null)}
            />
          )}

          {modal && modal.presentation !== "phone-showcase" && (
            <ImageModal
              images={modal.images}
              initialIndex={modal.index}
              portrait={modal.portrait}
              onClose={() => setModal(null)}
            />
          )}
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
