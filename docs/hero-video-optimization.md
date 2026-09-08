# Hero video delivery — 8 September 2026

The supplied Premiere exports remain the source masters. Optimize from those exports, not from the already compressed website copies.

| Variant | Resolution | FPS | Duration | Original bytes | Delivered bytes | Reduction | Mean VMAF |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Desktop | 1920 × 1080 | 60 | 23.300 s | 26,204,451 | 19,967,434 | 23.8% | 95.51 |
| Mobile | 720 × 1560 | 60 | 26.033 s | 19,618,448 | 15,988,804 | 18.5% | 95.34 |

Both copies use H.264 High, level 4.2, 8-bit 4:2:0 and retain BT.709 limited-range color. Frame counts, duration and resolution match the exports. No audio is included, and MP4 metadata is placed before the video payload for progressive playback.

## Encoding

FFmpeg 9.0.1 with libx264, `slow` preset, CRF 21 for desktop and CRF 20 for mobile:

```text
ffmpeg -i INPUT.mp4 -map 0:v:0 -c:v libx264 -preset slow -crf 21 -threads 6 -pix_fmt yuv420p -profile:v high -level:v 4.2 -an -map_metadata -1 -movflags +faststart OUTPUT.mp4
```

Change `-crf 21` to `-crf 20` for mobile. These settings were selected for these particular clips; compare again for future edits. Avoid repeatedly recompressing the delivered files.

## Verification and limits

- Compared every frame with the supplied export using FFmpeg's default `vmaf_v0.6.1` model, with timestamps aligned. VMAF is a quality estimate, not a percentage of quality preserved or a guarantee of visual equivalence.
- Inspected matching native-resolution crops across the fade, star field, neon arena, Path of Embers and tunnel racer scenes. Rejected the smaller CRF 21 mobile candidate in favor of CRF 20.
- This is lossy compression with a small visual tradeoff, not mathematically lossless compression. The original exports on the user's recording drive are untouched.
- The hero selects one device-appropriate video, retains its loading poster, and pauses when offscreen or covered by a dialog. Reduced-motion and data-saving settings retain the poster without loading the video.
- Source URLs use `?v=2` to refresh previously cached clips. Increment that version when replacing the assets again.
- The poster and video share a fixed 1.05 scale for the requested closer framing. There is no continuous zoom animation.

Smaller files reduce download traffic; they do not guarantee proportionally lower decoding cost. Both clips still decode at 60 fps and their original resolutions.
