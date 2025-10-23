// Convert YouTube watch URL (or short URL) to embed URL
export function toEmbedUrl(url) {
  if (!url) return '';
  try {
    const u = new URL(url);
    let id = '';
    if (u.hostname.includes('youtube.com')) {
      id = u.searchParams.get('v');
    } else if (u.hostname === 'youtu.be') {
      id = u.pathname.slice(1);
    }
    if (!id) return url;
    return `https://www.youtube.com/embed/${id}`;
  } catch (e) {
    return url;
  }
}
