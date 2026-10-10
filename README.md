# Shoal — Cross-platform site & marketplace app

Expo (React Native + react-native-web) app for
[Shoal](https://github.com/Dangalcan/shoal).
One codebase, three targets: **web**, **Android**, and **iOS**.

The Marketplace tab fetches the live plugin catalog from the kdMarket
backend (`GET /plugins`) and falls back to a bundled snapshot when the
backend is offline.

## Run

```bash
npm install

npm run web        # browser (dev server)
npm run android    # Android emulator / device (via Expo)
npm run ios        # iOS simulator (macOS) — or use Expo Go on a device
```

To publish the web build as static files:

```bash
npx expo export --platform web   # output in dist/
```

## Deploy

**GitHub Pages** — publishing a GitHub release (or running the workflow
manually) triggers `.github/workflows/deploy-pages.yml`, which exports
the web build and deploys it to Pages. Enable Pages once in the repo
settings (Source: GitHub Actions). Project sites are served from
`/<repo-name>/`, which the workflow handles via the `BASE_URL` env var
read by `app.config.js` — remove it if deploying to a custom domain.

**Docker** — a multi-stage build that exports the site and serves it
with nginx (route fallbacks, real 404s, immutable caching for hashed
bundles):

```bash
docker build -t shoal-site .
docker run --rm -p 8080:80 shoal-site
```

## Structure

```
src/app/            expo-router routes
  _layout.tsx       root stack + navigation theme
  (tabs)/           Home · Marketplace · Developers
src/components/ui.tsx  shared building blocks (Card, Button, Chip, …)
src/config.ts       repo URL, app version, marketplace backend URL
src/data/catalog.ts plugin types + bundled catalog snapshot
src/lib/marketplace.ts  live catalog fetch with offline fallback
src/theme.ts        light/dark design tokens (from the app's variables.scss)
src/hooks/          hydration-safe color scheme hook
```

## Common edits

- **New release**: bump `appVersion` in `src/config.ts`.
- **Repo moved**: change `repoUrl` in `src/config.ts`.
- **Backend moved**: change `marketplaceUrl` in `src/config.ts`
  (Android emulator: use `http://10.0.2.2:3001`).
- **Catalog changed**: the Marketplace tab picks up backend changes
  automatically; also refresh the snapshot in `src/data/catalog.ts`
  so the offline fallback stays current.

## Notes

- Dark mode follows the OS color scheme.
- The app is open source (LGPL-3.0); there is no pricing page. Commercial
  plugins are sold through the marketplace, Odoo-style, with revenue
  shared with plugin developers.
