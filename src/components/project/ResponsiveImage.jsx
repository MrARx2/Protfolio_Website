import React, { useEffect, useState } from "react";
import { responsiveImageProps } from "../../utils/responsiveImages";

export default function ResponsiveImage({ src, sizes = "(max-width: 768px) 94vw, 70vw", alt, onError, ...props }) {
  const [useOriginal, setUseOriginal] = useState(false);
  useEffect(() => setUseOriginal(false), [src]);
  const responsive = useOriginal ? { src } : responsiveImageProps(src, sizes);
  return <img {...responsive} {...props} alt={alt} decoding="async" onError={(event) => {
    if (!useOriginal && responsive.src !== src) setUseOriginal(true);
    else onError?.(event);
  }} />;
}
