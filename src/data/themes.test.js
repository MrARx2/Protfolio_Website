import { applyTheme, getInitialTheme } from './themes';

beforeEach(() => {
  localStorage.clear();
  document.head.innerHTML = `<meta name="theme-color" content="#071015">
    <link rel="icon" data-theme-icon data-icon-ice="/favicon-ice.svg" data-icon-amber="/favicon-amber.svg" href="/favicon-ice.svg">
    <link rel="icon" data-theme-icon data-icon-ice="/favicon-ice-32.png" data-icon-amber="/favicon-amber-32.png" href="/favicon-ice-32.png">`;
});
afterEach(() => jest.restoreAllMocks());

test('new visitors use Ice, saved Amber is restored, retired themes fall back to Ice', () => {
  expect(getInitialTheme()).toBe('ice');
  localStorage.setItem('portfolio-theme', 'amber');
  expect(getInitialTheme()).toBe('amber');
  localStorage.setItem('portfolio-theme', 'violet');
  expect(getInitialTheme()).toBe('ice');
});

test('switching themes keeps the page, browser chrome and every favicon in sync', () => {
  for (const [theme, color] of [['amber', '#090a0b'], ['ice', '#071015']]) {
    applyTheme(theme);
    expect(document.documentElement.dataset.theme).toBe(theme);
    expect(document.querySelector('meta[name="theme-color"]').content).toBe(color);
    expect(localStorage.getItem('portfolio-theme')).toBe(theme);
    document.querySelectorAll('[data-theme-icon]').forEach(icon => {
      expect(icon.getAttribute('href')).toBe(icon.getAttribute(`data-icon-${theme}`));
    });
  }
});

test('blocked preference storage does not prevent changing the page or favicon', () => {
  jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Storage unavailable'); });
  applyTheme('amber');
  expect(document.documentElement.dataset.theme).toBe('amber');
  expect(document.querySelector('[data-theme-icon]').getAttribute('href')).toBe('/favicon-amber.svg');
});
