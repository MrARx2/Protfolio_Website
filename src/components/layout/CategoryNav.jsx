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
        <button
          key={category.id}
          type="button"
          tabIndex={active ? undefined : -1}
          className={activeCategory === category.id ? 'active' : ''}
          aria-current={activeCategory === category.id ? 'true' : undefined}
          onClick={() => onSelect?.(category.id)}
        >
          <span>{category.label}</span>
          <sup>{String(category.count).padStart(2, '0')}</sup>
        </button>
      ))}
    </nav>
  );
}

export default CategoryNav;
