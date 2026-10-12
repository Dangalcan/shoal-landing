/**
 * Runs after `expo export --platform web` (see the `export` script):
 * copies the router's not-found page to the 404.html GitHub Pages serves,
 * then checks that the export has what the site needs. A failing check
 * exits with 1, so CI stops before deploying a broken site.
 */
const fs = require('fs');
const path = require('path');

const dist = path.resolve(__dirname, '..', 'dist');
const read = (name) => fs.readFileSync(path.join(dist, name), 'utf8');

fs.copyFileSync(path.join(dist, '+not-found.html'), path.join(dist, '404.html'));

const index = read('index.html');
const developers = read('developers.html');
const notFound = read('404.html');
const releaseLinks = (
  index.match(/href="https:\/\/github\.com\/Dangalcan\/shoal\/releases/g) || []
).length;

const checks = [
  [releaseLinks >= 2, `index.html has ${releaseLinks} release links (need 2)`],
  [index.includes('target="_blank"'), 'index.html opens external links in a new tab'],
  [index.includes('property="og:url"'), 'index.html has og:url'],
  [developers.includes('property="og:url"'), 'developers.html has og:url'],
  [/<title[^>]*>Page not found/.test(notFound), '404.html has its title'],
  [!fs.existsSync(path.join(dist, '_sitemap.html')), 'no _sitemap.html in the export'],
  [fs.existsSync(path.join(dist, 'CNAME')), 'CNAME copied'],
  [fs.existsSync(path.join(dist, 'robots.txt')), 'robots.txt copied'],
  [fs.existsSync(path.join(dist, 'apple-touch-icon.png')), 'apple-touch-icon.png copied'],
  [fs.existsSync(path.join(dist, 'og.png')), 'og.png copied'],
];

let failed = false;
for (const [ok, label] of checks) {
  console.log(`${ok ? 'ok ' : 'FAIL'} ${label}`);
  if (!ok) failed = true;
}
if (failed) {
  console.error('The web export is incomplete.');
  process.exit(1);
}
