/**
 * Single source of truth for values that change between releases.
 */
export const CONFIG = {
  /** GitHub repository for the desktop app. All outbound links derive from it. */
  repoUrl: 'https://github.com/Dangalcan/shoal',

  /** Version of the desktop app advertised on the Home screen. */
  appVersion: '0.9.0',

  /** Day the stable 0.9.0 release is published, shown until STABLE_RELEASED is true. */
  stableReleaseDate: '2 November 2026',

  /** Public URL of this site (canonical link and Open Graph tags). */
  siteUrl: 'https://shoal.dangalcan.com/',

  /** Home page title, also used for Open Graph and Twitter cards. */
  siteTitle: 'Shoal · A desktop app for your Kubernetes clusters',

  /** Meta description, also used for Open Graph and Twitter cards. */
  siteDescription:
    'Create local kind and k3d clusters, browse resources, apply manifests and forward ports from one native app. Free and open source beta for Windows and Linux.',
} as const;

/**
 * True while GitHub's /releases/latest points at a stable Shoal release. Set
 * it to false for a prerelease-only period (release candidates are
 * prereleases, so /releases/latest has nothing to show): the download
 * buttons then open the releases list and the Home screen says when the
 * stable version ships (stableReleaseDate).
 */
export const STABLE_RELEASED: boolean = true;

export function ghUrl(path = ''): string {
  return CONFIG.repoUrl + path;
}

/** Latest stable release, or the releases list while there is none. */
export function releasesUrl(): string {
  return ghUrl(STABLE_RELEASED ? '/releases/latest' : '/releases');
}

/** Plugin developer guide in the app repository. */
export function docsUrl(): string {
  return ghUrl('/blob/master/docs/PLUGINS_GUIDE.md');
}
