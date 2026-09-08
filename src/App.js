import { decodeRoutePart } from "./utils/routeHelpers";
import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import "./style.css";
import "./performance.css";

import ErrorBoundary from "./components/layout/ErrorBoundary";
import AnimatedDotsBg from "./components/layout/AnimatedDotsBg";
import Navbar from "./components/layout/Navbar";
import ScrollProgress from "./components/layout/ScrollProgress";
import CategoryNav from "./components/layout/CategoryNav";
import AboutSection from "./components/sections/AboutSection";
import FrostedCard from "./components/cards/FrostedCard";
import ModelingCard from "./components/cards/ModelingCard";
import SceneCard from "./components/cards/SceneCard";
import ProjectDetail from "./components/project/ProjectDetail";
import ImageModal from "./components/modals/ImageModal";
import PhoneImageModal from "./components/modals/PhoneImageModal";
import useScrollReveal from "./hooks/useScrollReveal";
import usePortfolioScroll from "./hooks/usePortfolioScroll";
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
    projectId: decodeRoutePart(parts[1]),
    overlay: parts[2] || null,
    overlayId: parts[3] ? decodeRoutePart(parts.slice(3).join("/")) : null
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
  const [showCategoryNav, setShowCategoryNav] = useState(false);
  const [categoryNavHandedOff, setCategoryNavHandedOff] = useState(false);
  const categoryScrollFrame = useRef(null);
  const galleryIndexCallback = useRef(null);
  const savedScrollPosition = useRef(0);
  const openedProjectId = useRef(initialProject?.id || null);
  const portfolioPageRef = useRef(null);
  const projectActionRef = useRef(initialProject ? "open" : "closed");
  const projectTransitionTokenRef = useRef(0);
  const projectArrivalTimerRef = useRef(null);

  useScrollReveal(selected?.id || "portfolio");
  usePortfolioScroll({
    enabled: !selected,
    docked: showCategoryNav,
    activeCategory,
    animationRef: categoryScrollFrame,
    onDockChange: setShowCategoryNav,
    onCategoryChange: setActiveCategory
  });

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
    document.title = selected ? `${selected.title} — Ariel Cohen` : "Ariel Cohen - Game Developer Portfolio | Unity & Unreal Engine";
  }, [selected]);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // The in-page pill is the resting state, so its arrival cue must not fire on
  // first paint — only once it has actually been handed back from the navbar.
  useEffect(() => {
    if (showCategoryNav) setCategoryNavHandedOff(true);
  }, [showCategoryNav]);

  // Opening or closing a case study swaps which nav is on screen; it does not
  // move one. The outgoing nav is simply unmounted and the incoming one plays
  // the shared arrival cue, the same way the category pill hands off to the
  // navbar. No view transition and no cloned ghost nodes to animate.
  const commitProjectUpdate = useCallback((update, onFinished, direction = "open") => {
    const token = projectTransitionTokenRef.current + 1;
    projectTransitionTokenRef.current = token;
    window.clearTimeout(projectArrivalTimerRef.current);
    delete document.documentElement.dataset.projectRouteArrival;

    flushSync(update);

    document.documentElement.dataset.projectRouteArrival = direction;
    projectArrivalTimerRef.current = window.setTimeout(() => {
      if (projectTransitionTokenRef.current === token) {
        delete document.documentElement.dataset.projectRouteArrival;
      }
    }, 520);

    onFinished?.();
  }, []);

  useEffect(() => () => {
    window.clearTimeout(projectArrivalTimerRef.current);
    delete document.documentElement.dataset.projectRouteArrival;
  }, []);

  const restoreProjectCard = useCallback((projectId, scrollPosition = savedScrollPosition.current) => {
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: scrollPosition, behavior: "auto" });
      window.requestAnimationFrame(() => {
        const card = document.getElementById(`project-card-${projectId}`);
        const stickyNav = document.querySelector(".navbar");
        if (card && stickyNav) {
          const safeTop = stickyNav.getBoundingClientRect().bottom + 14;
          const cardTop = card.getBoundingClientRect().top;
          if (card.getBoundingClientRect().bottom < safeTop || cardTop > window.innerHeight) window.scrollBy({ top: cardTop - safeTop, behavior: "instant" });
        }
        card?.focus({ preventScroll: true });
      });
    });
  }, []);

  const scrollToSection = useCallback((category) => {
    const destination = categories.find((item) => item.id === category);
    const target = destination ? document.getElementById(destination.target) : null;
    if (!target) return;

    if (categoryScrollFrame.current) cancelAnimationFrame(categoryScrollFrame.current);
    setActiveCategory(category);
    flushSync(() => setShowCategoryNav(category !== "all"));
    const header = document.querySelector(".navbar");
    const anchor = target.querySelector(".work-section-heading") || target;
    const offset = (header?.getBoundingClientRect().height || 72) + 20;
    const destinationY = Math.max(0, Math.min(window.scrollY + anchor.getBoundingClientRect().top - offset,
      document.documentElement.scrollHeight - window.innerHeight));
    window.history.replaceState({ kind: "portfolio", category, scrollY: destinationY }, "", category === "all" ? "#projects" : `#${category}`);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const startY = window.scrollY;
    const startTime = performance.now();
    const duration = reduceMotion ? 0 : Math.min(520, Math.max(280, Math.abs(destinationY - startY) * .12));
    const animate = (now) => {
      const progress = duration ? Math.min(1, (now - startTime) / duration) : 1;
      window.scrollTo({ top: startY + (destinationY - startY) * (1 - Math.pow(1 - progress, 3)), behavior: "instant" });
      categoryScrollFrame.current = progress < 1 ? requestAnimationFrame(animate) : null;
    };
    categoryScrollFrame.current = requestAnimationFrame(animate);
  }, [categories]);

  useEffect(() => {
    const cancel = (event) => {
      if (event.type === "keydown" && !["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) return;
      if (categoryScrollFrame.current) cancelAnimationFrame(categoryScrollFrame.current);
      categoryScrollFrame.current = null;
    };
    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("touchstart", cancel, { passive: true });
    window.addEventListener("keydown", cancel);
    return () => {
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("keydown", cancel);
      if (categoryScrollFrame.current) cancelAnimationFrame(categoryScrollFrame.current);
    };
  }, []);

  const openProject = useCallback((project, previewFrame = null) => {
    if (projectActionRef.current === "opening" || projectActionRef.current === "open") return;

    savedScrollPosition.current = window.scrollY;
    openedProjectId.current = project.id;
    const projectCategory = getProjectCategory(project);
    const returnCategory = projectCategory;
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
    }, "open");
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
  }, [commitProjectUpdate]);

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

    commitProjectUpdate(update, onFinished, "close");
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
    const { onIndexChange, ...galleryOptions } = options;
    galleryIndexCallback.current = onIndexChange || null;
    const gallery = { images, index, ...galleryOptions };
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

  const syncGalleryIndex = useCallback((index) => {
    galleryIndexCallback.current?.(index);
    const state = window.history.state;
    if (state?.kind === "gallery" && state.gallery) {
      window.history.replaceState({ ...state, gallery: { ...state.gallery, index } }, "", window.location.hash);
    }
  }, []);

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

    if (window.location.hash === "#resume") return;
    const category = categoryFromHash();
    window.history.replaceState(
      { kind: "portfolio", category, scrollY: window.scrollY },
      "",
      window.location.hash || "#about"
    );
  }, [initialProject]);

  useEffect(() => {
    if (initialProject || !["#games", "#modeling", "#scenes", "#projects"].includes(window.location.hash)) return undefined;
    const frame = requestAnimationFrame(() => scrollToSection(categoryFromHash()));
    return () => cancelAnimationFrame(frame);
  }, [initialProject, scrollToSection]);

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
          commitProjectUpdate(update, () => { projectActionRef.current = "open"; }, "open");
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
        // The portfolio stayed mounted beneath the menu/resume; preserve its live position.
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [commitProjectUpdate, finishClosingProject, selected]);

  useEffect(() => {
    const page = portfolioPageRef.current;
    if (!selected || !page) return undefined;
    const wasInert = page.inert;
    page.inert = true;
    page.setAttribute("aria-hidden", "true");
    return () => {
      page.inert = wasInert;
      page.removeAttribute("aria-hidden");
    };
  }, [selected]);

  useEffect(() => {
    const backdrop = document.querySelector(".project-detail-backdrop");
    if (!modal || !backdrop) return undefined;
    const wasInert = backdrop.inert;
    backdrop.inert = true;
    backdrop.setAttribute("aria-hidden", "true");
    return () => {
      backdrop.inert = wasInert;
      backdrop.removeAttribute("aria-hidden");
    };
  }, [modal, selected]);

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <div className="site-shell">
          <ScrollProgress projectId={selected?.id} />

          <div className={`portfolio-page${selected ? " project-route-open" : ""}`} ref={portfolioPageRef}>
            <a href="#projects" className="skip-to-content" onClick={(event) => {
              event.preventDefault();
              scrollToSection("all");
              document.getElementById("main-content")?.focus({ preventScroll: true });
            }}>Skip to main content</a>
            <AnimatedDotsBg />
            <Navbar
              theme={theme}
              onThemeChange={setTheme}
              categories={categories}
              activeCategory={activeCategory}
              onSelectCategory={scrollToSection}
              showCategories={showCategoryNav}
            />
            <AboutSection onExplore={() => scrollToSection("all")} paused={Boolean(selected)} />

            <main className="work-main" id="main-content" tabIndex={-1}>
            <div className="work-nav-shell" id="projects">
              <CategoryNav
                variant="inline"
                categories={categories}
                activeCategory={activeCategory}
                onSelect={scrollToSection}
                active={!showCategoryNav}
                animateArrival={categoryNavHandedOff}
                isContextSource={!showCategoryNav}
              />
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
                description="Environment studies focused on atmosphere, composition, lighting, and real-time rendering."
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
                Open resume PDF <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="footer-meta">
              <span>© {new Date().getFullYear()} Ariel Cohen</span>
              <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}>
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
              onIndexChange={syncGalleryIndex}
              onClose={closeImageModal}
            />
          )}

          {modal && modal.presentation !== "phone-showcase" && (
            <ImageModal
              images={modal.images}
              initialIndex={modal.index}
              onIndexChange={syncGalleryIndex}
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
