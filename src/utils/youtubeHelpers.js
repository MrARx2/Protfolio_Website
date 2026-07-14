function getYouTubeVideoId(url) {
  if (!url) return "";

  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) {
      if (u.pathname.startsWith("/shorts/")) {
        return u.pathname.split("/")[2] || "";
      }

      return u.searchParams.get("v") || "";
    }

    if (u.hostname === "youtu.be") {
      return u.pathname.slice(1).split("/")[0];
    }
  } catch {
    return "";
  }

  return "";
}

// Convert YouTube watch, Shorts, or youtu.be URLs to the standard embed player.
export function toEmbedUrl(url) {
  const id = getYouTubeVideoId(url);
  if (!id) {
    return url;
  }

  return `https://www.youtube.com/embed/${id}?rel=0`;
}

export function isYouTubeShortUrl(url) {
  if (!url) return false;

  try {
    return new URL(url).pathname.startsWith("/shorts/");
  } catch {
    return false;
  }
}
