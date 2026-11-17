import React from "react";

// SVG controls remain readable when a platform font lacks arrow glyphs.
export default function InterfaceIcon({ name, className = "" }) {
  const paths = {
    external: <path d="M7 17 17 7M7 7h10v10" />,
    expand: <path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5M3 3l6 6m12-6-6 6M3 21l6-6m12 6-6-6" />,
    pause: <><path d="M8 5v14M16 5v14" /></>,
    play: <path d="m8 5 11 7-11 7Z" />
  };
  return <svg className={`interface-icon ${className}`.trim()} width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true" focusable="false">{paths[name]}</svg>;
}
