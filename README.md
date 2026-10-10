# Shoal landing page

Website for [Shoal](https://github.com/Dangalcan/shoal), the desktop app for
Kubernetes clusters. It is served at <https://shoal.dangalcan.com>.

Built with Expo (React Native + react-native-web) and exported as a static
site. The same code also runs on Android and iOS through Expo, but the web
export is the only target that is deployed.

## Run

```bash
npm install

npm run web        # browser (dev server)
npm run export     # static site in dist/ (also writes dist/404.html)
```

## Deploy

**GitHub Pages.** Every push to `main` (or a manual run) triggers
`.github/workflows/deploy-pages.yml`, which exports the site and deploys it
to Pages. `public/CNAME` sets the custom domain, and Expo copies `public/`
into `dist/` on export. The site lives at the domain root, so no `BASE_URL`
is set. The workflow skips itself while the repository is private, because
Pages on the Free plan needs a public repository.

One-time setup in the repository settings: Pages source "GitHub Actions",
custom domain `shoal.dangalcan.com`, and Enforce HTTPS once the certificate
is ready. DNS needs a `CNAME` record from `shoal` to `dangalcan.github.io`.

**Docker.** A multi-stage build that exports the site and serves it with
nginx (route fallbacks, real 404s, immutable caching for hashed bundles):

```bash
docker build -t shoal-site .
docker run --rm -p 8080:80 shoal-site
```

`app.config.js` still reads `BASE_URL` for builds under a subpath
(`--build-arg BASE_URL=/some/path`). Do not set it from Git Bash on
Windows, which rewrites `/path` into a Windows path.

## Structure

```
src/app/              expo-router routes
  +html.tsx           root HTML for the web export (title, Open Graph tags)
  _layout.tsx         root stack + navigation theme
  (tabs)/             Home · Developers
src/components/ui.tsx shared building blocks (Card, Button, Notice, Logo, …)
src/config.ts         repo URL, app version, site URL, link helpers
src/theme.ts          light/dark design tokens (teal accent from the app icon)
src/hooks/            hydration-safe color scheme hook
assets/images/        app icon, favicon, splash and Android icons
assets/screenshots/   WebP copies of the app screenshots
public/               copied as is into the export (CNAME, og.png)
```

## Common edits

- **New release**: bump `appVersion` in `src/config.ts`. Download buttons
  point at `/releases/latest`, which skips prereleases, so they only work
  once a stable release exists.
- **New screenshots**: regenerate them in the app repo with
  `npm run screenshots` (see its `docs/E2E-TESTS.md`), then convert the
  `docs/images/*.png` files you need to WebP in `assets/screenshots/`.
- **New icon**: the icons in `assets/images/` and `public/og.png` are
  rendered from the app's `public/icon.svg`.

## History

The plugin marketplace screen (live catalog from kdMarket with an offline
snapshot) was removed for the 0.9 beta. It returns with Shoal 1.0; the code
is in commit `c5a334b` (`src/app/(tabs)/marketplace.tsx`,
`src/lib/marketplace.ts`, `src/data/catalog.ts`).

## License

LGPL-3.0-or-later, like the app. See [COPYRIGHT](COPYRIGHT) and
[LICENSE](LICENSE).
