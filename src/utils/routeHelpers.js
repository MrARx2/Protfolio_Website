// Invalid percent-encoding in a pasted link must not blank the entire app.
export function decodeRoutePart(value) {
  try { return decodeURIComponent(value); } catch { return null; }
}
