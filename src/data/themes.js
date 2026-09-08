export const themes = [
  { id: "ice", label: "Ice", swatch: "#72d8f7" },
  { id: "amber", label: "Amber", swatch: "#ffb454" }
];

export const defaultTheme = "ice";
export const themeStorageKey = "portfolio-theme";

export function getInitialTheme() {
  if (typeof window === "undefined") return defaultTheme;

  try {
    const storedTheme = window.localStorage.getItem(themeStorageKey);
    return themes.some(({ id }) => id === storedTheme) ? storedTheme : defaultTheme;
  } catch {
    return defaultTheme;
  }
}

export function applyTheme(theme) {
  if (typeof document === "undefined") return;

  const nextTheme = themes.some(({ id }) => id === theme) ? theme : defaultTheme;
  document.documentElement.dataset.theme = nextTheme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    "content", nextTheme === "ice" ? "#071015" : "#090a0b"
  );

  try {
    window.localStorage.setItem(themeStorageKey, nextTheme);
  } catch {
    // The selected theme still applies when storage is unavailable.
  }
}
