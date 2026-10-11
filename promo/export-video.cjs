// Exports "Promo Video.html" to MP4, frame by frame.
//
//   node export-video.cjs <dir containing node_modules/playwright> [--fps 30]
//
// Serves this folder over HTTP, opens the page in ?render mode (see
// animations.jsx), steps window.__setTime(t) through the timeline, and pipes
// one PNG per frame into ffmpeg (libx264, yuv420p). Writes:
//   promo.mp4        the full video, 1920x1080
//   promo-short.mp4  intro + dashboard + outro, for social posts
// Needs ffmpeg on PATH and network access (React, Babel and fonts load from
// CDNs).

const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const [playwrightRoot, ...rest] = process.argv.slice(2);
if (!playwrightRoot) {
  console.error('usage: node export-video.cjs <dir with node_modules/playwright> [--fps 30]');
  process.exit(1);
}
const { chromium } = require(path.join(playwrightRoot, 'node_modules', 'playwright'));
const fps = Number(rest[rest.indexOf('--fps') + 1]) || 30;
const ROOT = __dirname;
const WIDTH = 1920;
const HEIGHT = 1080;
// Short cut: [start, end] seconds of the full timeline (see Promo Video.html).
const SHORT_SEGMENTS = [[0, 9.5], [32, 37]];

const MIME = { '.html': 'text/html', '.jsx': 'text/babel', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png' };

function serve() {
  const server = http.createServer((req, res) => {
    const file = path.join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
    if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404).end();
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server)));
}

function run(cmd, args, input) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: [input ? 'pipe' : 'ignore', 'ignore', 'inherit'] });
    child.on('error', reject);
    child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} exited with ${code}`))));
    if (input) input(child.stdin);
  });
}

(async () => {
  const server = await serve();
  const url = `http://127.0.0.1:${server.address().port}/Promo%20Video.html?render`;
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT }, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => typeof window.__setTime === 'function', null, { timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  // Frames are rendered out of real time: freeze CSS transitions/animations.
  await page.addStyleTag({ content: '*,*::before,*::after{transition:none!important;animation:none!important}' });
  const duration = await page.evaluate(() => window.__duration);
  const frames = Math.round(duration * fps);

  const full = path.join(ROOT, 'promo.mp4');
  await run('ffmpeg', [
    '-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-i', '-',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', full,
  ], async (stdin) => {
    for (let i = 0; i < frames; i++) {
      await page.evaluate((t) => window.__setTime(t), i / fps);
      stdin.write(await page.screenshot({ type: 'png' }));
      if (i % fps === 0) process.stdout.write(`\r${(i / fps).toFixed(0)}s / ${duration}s`);
    }
    stdin.end();
  });
  process.stdout.write(`\rwrote ${full}\n`);
  await browser.close();
  server.close();

  const trims = SHORT_SEGMENTS.map(([s, e], i) => `[0:v]trim=${s}:${e},setpts=PTS-STARTPTS[v${i}]`);
  const concat = SHORT_SEGMENTS.map((_, i) => `[v${i}]`).join('') + `concat=n=${SHORT_SEGMENTS.length}:v=1[out]`;
  const short = path.join(ROOT, 'promo-short.mp4');
  await run('ffmpeg', [
    '-y', '-loglevel', 'error', '-i', full, '-filter_complex', [...trims, concat].join(';'), '-map', '[out]',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', short,
  ]);
  console.log(`wrote ${short}`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
