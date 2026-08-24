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
import useScrollReveal from "./hooks/useScrollReveal";
import { personalInfo } from "./data/personalInfo";
import { gameProjects, modelingProjects, sceneProjects } from "./data/projects";
import { applyTheme, getInitialTheme } from "./data/themes";

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
  all: "Back to all work",
  games: "Back to games",
  modeling: "Back to 3D modeling",
  scenes: "Back to environments"
};

function getProjectCategory(project) {
  if (project?.type === "modeling") return "modeling";
  if (project?.type === "scene") return "scenes";
  return "games";
}

const portfolioProjects = [...gameProjects, ...modelingProjects, ...sceneProjects];

function categoryFromHash(hash = window.location.hash) {
  const value = hash.replace(/^#/, "");
  if (value === "games" || value === "modeling" || value === "scenes") return value;
  return "all";
}

function projectRouteFromHash(hash = window.location.hash) {
  const parts = hash.replace(/^#/, "").split("/");
  if (parts[0] !== "project" || !parts[1]) return null;
  return {
    projectId: decodeURIComponent(parts[1]),
    overlay: parts[2] || null,
    overlayId: parts[3] ? decodeURIComponent(parts.slice(3).join("/")) : null
  };
}

function projectById(projectId) {
  return portfolioProjects.find((project) => String(project.id) === String(projectId)) || null;
}

function fallbackGalleryForProject(project) {
  if (!project) return null;
  const images = project.images || project.renders || [];
  if (!images.length) return null;
  return {
    images,
    index: 0,
    presentation: project.galleryPresentation === "phone-showcase" ? "phone-showcase" : undefined,
    portrait: project.galleryPresentation === "phone-showcase"
  };
}

function App() {
  const initialProjectRoute = useMemo(() => projectRouteFromHash(), []);
  const initialProject = useMemo(
    () => projectById(initialProjectRoute?.projectId),
    [initialProjectRoute]
  );
  const [theme, setTheme] = useState(getInitialTheme);
  const [activeCategory, setActiveCategory] = useState(() => (
    initialProject ? getProjectCategory(initialProject) : categoryFromHash()
  ));
  const [selected, setSelected] = useState(initialProject);
  const [selectedPreview, setSelectedPreview] = useState(null);
  const [projectReturnCategory, setProjectReturnCategory] = useState(
    initialProject ? getProjectCategory(initialProject) : null
  );
  const [modal, setModal] = useState(() => (
    initialProjectRoute?.overlay === "gallery" ? fallbackGalleryForProject(initialProject) : null
  ));
  const [scrollProgress, setScrollProgress] = useState(0);
  const savedScrollPosition = useRef(0);
  const openedProjectId = useRef(initialProject?.id || null);
  const portfolioPageRef = useRef(null);
  const projectActionRef = useRef(initialProject ? "open" : "closed");

  useScrollReveal(selected?.id || "portfolio");

  const allProjects = useMemo(() => portfolioProjects, []);

  const categories = useMemo(
    () => [
      { id: "all", label: "All work", count: allProjects.length, target: "projects" },
      { id: "games", label: "Games", count: gameProjects.length, target: "games-section" },
      { id: "modeling", label: "3D Modeling", count: modelingProjects.length, target: "modeling-section" },
      { id: "scenes", label: "Environments", count: sceneProjects.length, target: "scenes-section" }
    ],
    [allProjects.length]
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const commitProjectUpdate = useCallback((update, onFinished) => {
    update();
    onFinished?.();
  }, []);

  const restoreProjectCard = useCallback((projectId, scrollPosition = savedScrollPosition.current) => {
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: scrollPosition, behavior: "auto" });
      window.requestAnimationFrame(() => {
        const card = document.getElementById(`project-card-${projectId}`);
        const stickyNav = document.querySelector(".work-nav-shell");
        if (card && stickyNav) {
          const safeTop = stickyNav.getBoundingClientRect().bottom + 14;
          const cardTop = card.getBoundingClientRect().top;
          if (cardTop < safeTop) window.scrollBy({ top: cardTop - safeTop, behavior: "auto" });
        }
        card?.focus({ preventScroll: true });
      });
    });
  }, []);

  const scrollToSection = useCallback((category) => {
    const destination = categories.find((item) => item.id === category);
    const target = destination ? document.getElementById(destination.target) : null;
    if (!target) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    window.history.replaceState(
      { kind: "portfolio", category, scrollY: window.scrollY },
      "",
      category === "all" ? "#projects" : `#${category}`
    );
  }, [categories]);

  const openProject = useCallback((project, previewFrame = null) => {
    if (projectActionRef.current !== "closed") return;

    savedScrollPosition.current = window.scrollY;
    openedProjectId.current = project.id;
    const projectCategory = getProjectCategory(project);
    const returnCategory = activeCategory === "all" ? projectCategory : activeCategory;
    projectActionRef.current = "opening";

    window.history.replaceState(
      {
        kind: "portfolio",
        category: returnCategory,
        scrollY: savedScrollPosition.current
      },
      "",
      returnCategory === "all" ? "#projects" : `#${returnCategory}`
    );

    const update = () => {
      setProjectReturnCategory(returnCategory);
      setSelectedPreview(previewFrame);
      setSelected(project);
    };

    commitProjectUpdate(update, () => {
      projectActionRef.current = "open";
    });
    window.history.pushState(
      {
        kind: "project",
        project: project.id,
        returnCategory,
        scrollY: savedScrollPosition.current,
        canGoBack: true
      },
      "",
      `#project/${encodeURIComponent(project.id)}`
    );
  }, [activeCategory, commitProjectUpdate]);

  const finishClosingProject = useCallback((returnCategory, projectId, scrollPosition) => {
    projectActionRef.current = "closing";
    const update = () => {
      setModal(null);
      setSelected(null);
      setSelectedPreview(null);
      setProjectReturnCategory(null);
      setActiveCategory(returnCategory);
      openedProjectId.current = null;
    };

    const onFinished = () => {
      projectActionRef.current = "closed";
      if (projectId) restoreProjectCard(projectId, scrollPosition);
    };

    commitProjectUpdate(update, onFinished);
  }, [commitProjectUpdate, restoreProjectCard]);

  const closeProject = useCallback(() => {
    const projectId = selected?.id || openedProjectId.current;
    const currentState = window.history.state || {};
    const returnCategory = projectReturnCategory
      || currentState.returnCategory
      || (selected ? getProjectCategory(selected) : activeCategory);

    if (currentState.kind === "project" && currentState.project === projectId && currentState.canGoBack) {
      window.history.back();
      return;
    }

    finishClosingProject(returnCategory, projectId, currentState.scrollY ?? savedScrollPosition.current);
    window.history.replaceState(
      { kind: "portfolio", category: returnCategory, scrollY: savedScrollPosition.current },
      "",
      returnCategory === "all" ? "#projects" : `#${returnCategory}`
    );
  }, [activeCategory, finishClosingProject, projectReturnCategory, selected]);

  const openImageModal = useCallback((images, index, options = {}) => {
    if (!selected) return;
    const gallery = { images, index, ...options };
    window.history.pushState(
      {
        ...(window.history.state || {}),
        kind: "gallery",
        project: selected.id,
        gallery,
        canGoBack: true
      },
      "",
      `#project/${encodeURIComponent(selected.id)}/gallery`
    );
    setModal(gallery);
  }, [selected]);

  const closeImageModal = useCallback(() => {
    const currentState = window.history.state || {};
    if (currentState.kind === "gallery" && currentState.project === selected?.id && currentState.canGoBack) {
      window.history.back();
      return;
    }
    setModal(null);
    if (selected) {
      window.history.replaceState(
        { ...currentState, kind: "project", project: selected.id },
        "",
        `#project/${encodeURIComponent(selected.id)}`
      );
    }
  }, [selected]);

  useEffect(() => {
    const route = projectRouteFromHash();
    if (initialProject) {
      const gallery = route?.overlay === "gallery" ? fallbackGalleryForProject(initialProject) : null;
      window.history.replaceState(
        {
          kind: gallery ? "gallery" : "project",
          project: initialProject.id,
          returnCategory: getProjectCategory(initialProject),
          scrollY: 0,
          canGoBack: false,
          ...(gallery ? { gallery } : {})
        },
        "",
        window.location.hash
      );
      return;
    }

    const category = categoryFromHash();
    window.history.replaceState(
      { kind: "portfolio", category, scrollY: window.scrollY },
      "",
      window.location.hash || "#about"
    );
  }, [initialProject]);

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
          const sectionTop = section
            ? window.scrollY + section.getBoundingClientRect().top
            : Number.POSITIVE_INFINITY;
          if (sectionTop <= marker) nextCategory = category;
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
    const handlePopState = (event) => {
      const state = event.state || {};
      const route = projectRouteFromHash();
      const nextProject = projectById(state.project || route?.projectId);

      if (nextProject) {
        const nextGallery = state.kind === "gallery"
          ? state.gallery || fallbackGalleryForProject(nextProject)
          : route?.overlay === "gallery"
            ? fallbackGalleryForProject(nextProject)
            : null;
        const returnCategory = state.returnCategory || getProjectCategory(nextProject);

        setModal(nextGallery);
        setProjectReturnCategory(returnCategory);
        openedProjectId.current = nextProject.id;
        savedScrollPosition.current = state.scrollY ?? savedScrollPosition.current;

        if (selected?.id !== nextProject.id) {
          projectActionRef.current = "opening";
          const update = () => {
            setSelectedPreview(null);
            setSelected(nextProject);
          };
          commitProjectUpdate(update, () => { projectActionRef.current = "open"; });
        }
        return;
      }

      setModal(null);
      const returnCategory = state.category || categoryFromHash();
      const returnScroll = state.scrollY ?? savedScrollPosition.current;
      if (selected) {
        finishClosingProject(returnCategory, selected.id, returnScroll);
      } else {
        setActiveCategory(returnCategory);
        window.requestAnimationFrame(() => window.scrollTo({ top: returnScroll, behavior: "auto" }));
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [commitProjectUpdate, finishClosingProject, selected]);

  useEffect(() => {
    const portfolioPage = portfolioPageRef.current;
    if (portfolioPage) {
      portfolioPage.inert = Boolean(selected);
      if (selected) portfolioPage.setAttribute("aria-hidden", "true");
      else portfolioPage.removeAttribute("aria-hidden");
    }

    const projectBackdrop = document.querySelector(".project-detail-backdrop");
    if (projectBackdrop) {
      projectBackdrop.inert = Boolean(modal);
      if (modal) projectBackdrop.setAttribute("aria-hidden", "true");
      else projectBackdrop.removeAttribute("aria-hidden");
    }

    return () => {
      if (portfolioPage) {
        portfolioPage.inert = false;
        portfolioPage.removeAttribute("aria-hidden");
      }
      if (projectBackdrop) {
        projectBackdrop.inert = false;
        projectBackdrop.removeAttribute("aria-hidden");
      }
    };
  }, [modal, selected]);

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <div className="site-shell">
          <div className="site-progress" aria-hidden="true">
            <span style={{ transform: `scaleX(${scrollProgress})` }} />
          </div>

          <div className="portfolio-page" ref={portfolioPageRef}>
            <AnimatedDotsBg />
            <Navbar theme={theme} onThemeChange={setTheme} />
            <AboutSection onExplore={() => scrollToSection("all")} paused={Boolean(selected)} />

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
                  <FrostedCard project={gameProjects[0]} onClick={openProject} featured activeProjectId={selected?.id} />
                )}
                <div className="games-secondary-grid">
                  {gameProjects.slice(1).map((project) => (
                    <FrostedCard project={project} key={project.id} onClick={openProject} activeProjectId={selected?.id} />
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
                    activeProjectId={selected?.id}
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
                  <SceneCard project={project} key={project.id} onClick={openProject} activeProjectId={selected?.id} />
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
          </div>

          {selected && (
            <ProjectDetail
              project={selected}
              backLabel={backLabels[projectReturnCategory || getProjectCategory(selected)]}
              entryPreview={selectedPreview}
              isGalleryOpen={Boolean(modal)}
              onBack={closeProject}
              onImageClick={openImageModal}
            />
          )}

          {modal?.presentation === "phone-showcase" && (
            <PhoneImageModal
              images={modal.images}
              initialIndex={modal.index}
              onClose={closeImageModal}
            />
          )}

          {modal && modal.presentation !== "phone-showcase" && (
            <ImageModal
              images={modal.images}
              initialIndex={modal.index}
              portrait={modal.portrait}
              onClose={closeImageModal}
            />
          )}
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
