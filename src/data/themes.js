export const themes = [
  { id: "amber", label: "Amber", swatch: "#ffb454" },
  { id: "violet", label: "Violet", swatch: "#c39aff" },
  { id: "ice", label: "Ice", swatch: "#72d8f7" }
];

export const defaultTheme = "amber";
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

  try {
    window.localStorage.setItem(themeStorageKey, nextTheme);
  } catch {
    // The selected theme still applies when storage is unavailable.
  }
}
