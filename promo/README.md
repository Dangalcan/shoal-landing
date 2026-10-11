# Promo video

A 37-second animated walkthrough of Shoal, built as a React page and
exported to MP4. It shows only what the 0.9 beta ships: local kind and k3d
clusters, the resource views, the terminal, the two bundled example plugins
and the Windows and Linux builds.

| File                        | What it is                                                  |
| --------------------------- | ----------------------------------------------------------- |
| `promo.mp4`                 | Full video, 1920×1080, 30 fps, H.264                       |
| `promo-short.mp4`           | 14.5-second cut for social posts (intro, dashboard, outro) |
| `Promo Video.html`          | The page that plays the timeline                            |
| `animations.jsx`            | Stage, sprites, easing and the `?render` mode               |
| `shell.jsx`, `scenes-*.jsx` | The mocked app window and the seven scenes                  |
| `export-video.cjs`          | Frame-by-frame MP4 export                                   |

## Preview

The page loads its `.jsx` files with Babel in the browser, so serve the
folder over HTTP instead of opening the file directly:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000/Promo%20Video.html>. Space plays or pauses,
the arrow keys seek, and the playhead is remembered between reloads.

## Export

```bash
node export-video.cjs <dir with node_modules/playwright> --fps 30
```

Any checkout with Playwright and its Chromium installed works, for example
the Shoal app repository. The script also needs `ffmpeg` on the `PATH` and
network access, because React, Babel and the fonts load from CDNs. It opens
the page with `?render` (canvas at 1:1, no playback bar, no autoplay),
renders every frame through `window.__setTime(t)` and pipes the PNGs into
ffmpeg. It takes about four minutes and overwrites both MP4 files.

Scene timing lives in `Promo Video.html`; the short cut's segments are
`SHORT_SEGMENTS` in `export-video.cjs`.

## Keeping it truthful

The video mocks the app UI, so update it when the app changes what it
shows: no macOS window chrome, no marketplace, no plugin ratings, no
"Running" badge on cluster cards, and versions in `shell.jsx` that match the
release.
