import React, { useState } from "react";
import { toEmbedUrl } from "../../utils/youtubeHelpers";

export default function VideoPreview({ url, title, poster, portrait = false }) {
  const [playing, setPlaying] = useState(false);
  const embed = toEmbedUrl(url);
  return <div className={`video-preview-block${portrait ? " video-preview-block-portrait" : ""}`}>
    <div className={`video-wrapper${portrait ? " video-wrapper-portrait" : ""}`}>
      {playing ? <iframe title={title} src={`${embed}${embed.includes("?") ? "&" : "?"}autoplay=1&playsinline=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /> :
        <button className="video-play-preview" type="button" onClick={() => setPlaying(true)} aria-label={`Play ${title}`}>
          <img src={poster} alt="" loading="lazy" />
          <span className="video-play-label"><span className="video-play-icon" aria-hidden="true">▶</span>Play video</span>
        </button>}
    </div>
    <a className="video-external-link" href={url} target="_blank" rel="noopener noreferrer">Watch on YouTube <span aria-hidden="true">↗</span></a>
  </div>;
}
