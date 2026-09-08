import React from 'react';

/**
 * The project category pill.
 *
 * Two instances exist at once. The "inline" one is the pill's home at the top
 * of the work area and scrolls away with the page; the "docked" one lives in
 * the navbar and takes over once the inline one tucks under it. Exactly one is
 * active at a time — the inactive one is hidden from assistive tech and taken
 * out of the tab order so the duplicate never reaches a keyboard or screen
 * reader user.
 */
function CategoryNav({
  categories = [],
  activeCategory,
  onSelect,
  variant,
  active = true,
  animateArrival = true,
  isContextSource = false
}) {
  if (categories.length === 0) return null;

  const className = [
    'work-nav',
    `work-nav-${variant}`,
    active ? 'is-visible' : '',
    active && animateArrival ? 'is-arriving' : '',
    isContextSource ? 'is-context-source' : ''
  ].filter(Boolean).join(' ');

  return (
    <nav
      className={className}
      aria-label="Project categories"
      aria-hidden={active ? undefined : 'true'}
    >
      {categories.map((category) => (
        <a
          key={category.id}
          aria-label={`${category.label}, ${category.count} ${category.count === 1 ? "project" : "projects"}`}
          href={category.id === "all" ? "#projects" : `#${category.id}`}
          tabIndex={active ? undefined : -1}
          className={activeCategory === category.id ? 'active' : ''}
          aria-current={activeCategory === category.id ? 'true' : undefined}
          onClick={(event) => {
            if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            onSelect?.(category.id);
          }}
        >
          <span className="category-label-full">{category.label}</span>
          <span className="category-label-compact" aria-hidden="true">{({ modeling: "Models", scenes: "Scenes" })[category.id] || category.label}</span>
          <sup>{String(category.count).padStart(2, '0')}</sup>
        </a>
      ))}
    </nav>
  );
}

export default CategoryNav;
