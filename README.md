# Kubernetes Desktop — Landing Page

Static landing page for [Kubernetes Desktop](https://github.com/dangalcan/kubernetes-desktop).
No build step, no external dependencies — plain HTML/CSS/JS that also works
when opened directly from the filesystem.

## Structure

```
index.html      Markup + inline SVG icon sprite (lucide, ISC license)
css/main.css    All styles; design tokens at the top, dark mode included
js/data.js      Content that changes between releases: repo URL, version,
                plugin catalog (mirror of kdMarket's data/catalog.json)
js/main.js      Behavior: rendering, theme toggle, mobile menu, filters,
                preview panel cycling, OS-aware download label
assets/         App icons (favicon / OG image)
```

## Preview

Open `index.html` in a browser, or serve the folder:

```
python -m http.server 9000
```

## Common edits

- **New release**: bump `version` in `js/data.js`. Every `data-version`
  element on the page updates automatically.
- **Repo moved**: change `repoUrl` in `js/data.js`. Every `data-gh` link
  resolves from it (`data-gh="/releases"` → `<repoUrl>/releases`).
- **Plugin added/repriced**: edit the `plugins` array in `js/data.js`
  (keep in sync with kdMarket's `data/catalog.json`). The marketplace
  grid, category chips, and the app-preview marketplace panel all render
  from it.
- **New icon**: add a `<symbol id="i-NAME">` to the sprite in
  `index.html`, then reference it with
  `<svg class="ic" aria-hidden="true"><use href="#i-NAME"/></svg>`.
  Icon paths come from [lucide](https://lucide.dev).
- **Colors / dark mode**: edit the token blocks at the top of
  `css/main.css`. Light tokens live in `:root`, dark tokens in the
  `prefers-color-scheme` media query and `[data-theme='dark']` (keep the
  two dark blocks identical).

## Responsive breakpoints

- `960px` — tablet: 2-column grids, hamburger nav, preview sidebar hidden
- `620px` — phone: 1-column grids, full-width CTAs, trimmed nav
- `pointer: coarse` — larger touch targets
