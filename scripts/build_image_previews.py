"""Generate responsive WebP previews without altering any original gallery image.

Run with Python + Pillow after adding project images: python scripts/build_image_previews.py
Generated files are committed, so Vercel does not need Python or an image service.
"""
import hashlib
import json
import re
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "Images" / "previews"
OUTPUT.mkdir(parents=True, exist_ok=True)
paths = sorted(set(re.findall(r'''["'](/Images/[^"']+\.(?:png|jpg|jpeg))["']''',
                             (ROOT / "src/data/projects.js").read_text(encoding="utf-8"), re.I)))
manifest = {}
original_bytes = preview_bytes = 0
for url in paths:
    source = ROOT / "public" / url.lstrip("/")
    if not source.is_file():
        raise FileNotFoundError(source)
    source_hash = hashlib.sha256(source.read_bytes()).hexdigest()[:12]
    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened).convert("RGB")
        width, height = image.size
        sizes = sorted({min(width, size) for size in (320, 768, 1440)})
        variants = []
        for size in sizes:
            name = f"{source_hash}-{size}.webp"
            destination = OUTPUT / name
            if not destination.exists():
                resized = image.resize((size, round(height * size / width)), Image.Resampling.LANCZOS)
                resized.save(destination, "WEBP", quality=84, method=6)
            variants.append({"src": f"/Images/previews/{name}", "width": size})
        manifest[url] = {"width": width, "height": height, "variants": variants}
        original_bytes += source.stat().st_size
        preview_bytes += (OUTPUT / Path(variants[min(1, len(variants) - 1)]["src"]).name).stat().st_size

(ROOT / "src/data/responsiveImages.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
print(json.dumps({"images": len(manifest), "original_bytes": original_bytes,
                  "medium_preview_bytes": preview_bytes, "reduction_percent": round(100 * (1 - preview_bytes / original_bytes), 1)}))
