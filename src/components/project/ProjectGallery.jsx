import ResponsiveImage from "./ResponsiveImage";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PhoneShowcaseGallery from "./PhoneShowcaseGallery";

function StandardProjectGallery({
  sectionId,
  title = "Selected gallery",
  description,
  collections = [],
  portrait = false,
  projectTitle,
  onImageClick
}) {
  const availableCollections = useMemo(
    () => collections.filter((collection) => collection.images?.length > 0),
    [collections]
  );
  const [activeCollectionId, setActiveCollectionId] = useState(availableCollections[0]?.id || "");
  const [activeIndex, setActiveIndex] = useState(0);
  const galleryStageRef = useRef(null);
  const activeImageRef = useRef(null);
  const thumbnailRailRef = useRef(null);

  const activeCollection = availableCollections.find(
    (collection) => collection.id === activeCollectionId
  ) || availableCollections[0];
  const images = activeCollection?.images || [];
  const total = images.length;

  const previous = useCallback(() => {
    if (total < 2) return;
    setActiveIndex((index) => (index - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    if (total < 2) return;
    setActiveIndex((index) => (index + 1) % total);
  }, [total]);

  const scrollPortraitImage = useCallback((direction) => {
    const imageViewport = activeImageRef.current;
    if (!imageViewport) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    imageViewport.scrollBy({
      top: direction * Math.max(140, imageViewport.clientHeight * 0.38),
      behavior: reduceMotion ? "auto" : "smooth"
    });
  }, []);

  useEffect(() => {
    if (!availableCollections.some((collection) => collection.id === activeCollectionId)) {
      setActiveCollectionId(availableCollections[0]?.id || "");
      setActiveIndex(0);
    }
  }, [activeCollectionId, availableCollections]);

  useEffect(() => {
    const rail = thumbnailRailRef.current;
    const activeThumbnail = rail?.querySelector(`[data-gallery-index="${activeIndex}"]`);
    if (!rail || !activeThumbnail) return;

    const centeredLeft = activeThumbnail.offsetLeft
      - (rail.clientWidth / 2)
      + (activeThumbnail.offsetWidth / 2);

    rail.scrollTo({
      left: Math.max(0, centeredLeft),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });
  }, [activeIndex, activeCollectionId]);

  if (!activeCollection || total === 0) return null;

  const selectCollection = (id) => {
    setActiveCollectionId(id);
    setActiveIndex(0);
  };

  const handleKeys = (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      previous();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    }
    if (portrait && event.key === "ArrowUp") {
      event.preventDefault();
      scrollPortraitImage(-1);
    }
    if (portrait && event.key === "ArrowDown") {
      event.preventDefault();
      scrollPortraitImage(1);
    }
  };

  const visibleIndexes = [activeIndex];

  return (
    <section id={sectionId} className={`case-study-section adaptive-gallery-section ${portrait ? "adaptive-gallery-portrait" : "adaptive-gallery-landscape"}`}>
      <div className="gallery-heading-row">
        <div className="section-header">
          <span className="section-kicker">Visual development</span>
          <h2 className="section-title">{title}</h2>
          {description && <p className="section-description">{description}</p>}
        </div>

        {availableCollections.length > 1 && (
          <div className="gallery-collection-tabs" role="tablist" aria-label={`${projectTitle} image collections`}>
            {availableCollections.map((collection) => (
              <button
                type="button"
                role="tab"
                id={`${sectionId}-tab-${collection.id}`}
                aria-controls={`${sectionId}-panel`}
                tabIndex={collection.id === activeCollection.id ? 0 : -1}
                onKeyDown={(event) => {
                  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
                  const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
                  if (!keys.includes(event.key)) return;
                  event.preventDefault();
                  const current = availableCollections.findIndex((item) => item.id === collection.id);
                  const index = event.key === "Home" ? 0 : event.key === "End" ? availableCollections.length - 1 : (current + (event.key === "ArrowLeft" ? -1 : 1) + availableCollections.length) % availableCollections.length;
                  const nextId = availableCollections[index].id;
                  selectCollection(nextId);
                  document.getElementById(`${sectionId}-tab-${nextId}`)?.focus({ preventScroll: true });
                }}
                aria-selected={collection.id === activeCollection.id}
                className={collection.id === activeCollection.id ? "active" : ""}
                key={collection.id}
                onClick={() => selectCollection(collection.id)}
              >
                {collection.label}
                <sup>{String(collection.images.length).padStart(2, "0")}</sup>
              </button>
            ))}
          </div>
        )}
      </div>

      <div
        ref={galleryStageRef}
        className={`gallery-stage ${portrait ? "gallery-stage-portrait" : "gallery-stage-landscape"}`}
        role={availableCollections.length > 1 ? "tabpanel" : "region"}
        id={`${sectionId}-panel`}
        aria-labelledby={availableCollections.length > 1 ? `${sectionId}-tab-${activeCollection.id}` : undefined}
        tabIndex={0}
        onKeyDown={handleKeys}
        aria-label={`${activeCollection.label}, image ${activeIndex + 1} of ${total}.${portrait ? " Use up and down to scroll the image, and left and right to change images." : " Use left and right to change images."}`}
      >
        <div className="gallery-stage-media">
          {visibleIndexes.map((imageIndex, position) => (
            <button
              ref={position === 0 ? activeImageRef : undefined}
              className={`gallery-stage-image ${position === 1 ? "gallery-stage-image-secondary" : ""}`}
              type="button"
              key={`${activeCollection.id}-${imageIndex}`}
              onClick={() => onImageClick(images, imageIndex, { portrait, onIndexChange: setActiveIndex })}
              aria-label={`Open ${projectTitle} ${activeCollection.label.toLowerCase()} image ${imageIndex + 1} full screen`}
            >
              <ResponsiveImage
                src={images[imageIndex]}
                alt={`${projectTitle} ${activeCollection.label.toLowerCase()} ${imageIndex + 1}`}
                loading={position === 0 ? "eager" : "lazy"}
              />
              <span className="gallery-expand-label">Expand image <span aria-hidden="true">⤢</span></span>
            </button>
          ))}
        </div>

        <div className="gallery-stage-controls">
          <button type="button" onClick={previous} disabled={total < 2} aria-label="Previous image">
            <span aria-hidden="true">←</span> Previous
          </button>
          <span className="gallery-image-count" aria-live="polite" aria-atomic="true">{activeIndex + 1} / {total}</span>
          <button type="button" onClick={next} disabled={total < 2} aria-label="Next image">
            Next <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div className="gallery-thumbnail-rail" ref={thumbnailRailRef} aria-label={`${activeCollection.label} thumbnails`}>
        {images.map((image, index) => (
          <button
            type="button"
            key={image}
            data-gallery-index={index}
            aria-current={index === activeIndex ? "true" : undefined}
            aria-label={`Show image ${index + 1} of ${total}`}
            className={index === activeIndex ? "active" : ""}
            onClick={() => setActiveIndex(index)}
          >
            <ResponsiveImage src={image} sizes="96px" alt="" loading="lazy" />
            <span>{String(index + 1).padStart(2, "0")}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function ProjectGallery(props) {
  if (props.presentation === "phone-showcase") {
    return <PhoneShowcaseGallery {...props} />;
  }

  return <StandardProjectGallery {...props} />;
}

export default ProjectGallery;
