/**
 * Single source of truth for values that change between releases.
 */
export const CONFIG = {
  /** GitHub repository for the desktop app. All outbound links derive from it. */
  repoUrl: 'https://github.com/Dangalcan/shoal',

  /** Version of the desktop app advertised on the Home screen. */
  appVersion: '0.9.0',

  /** Public URL of this site (canonical link and Open Graph tags). */
  siteUrl: 'https://shoal.dangalcan.com/',

  /** Home page title, also used for Open Graph and Twitter cards. */
  siteTitle: 'Shoal · A desktop app for your Kubernetes clusters',

  /** Meta description, also used for Open Graph and Twitter cards. */
  siteDescription:
    'Create local kind and k3d clusters, browse resources, apply manifests and forward ports from one native app. Free and open source beta for Windows and Linux.',
} as const;

export function ghUrl(path = ''): string {
  return CONFIG.repoUrl + path;
}

/** Latest stable release. Release candidates are prereleases and never show here. */
export function releasesUrl(): string {
  return ghUrl('/releases/latest');
}

/** Plugin developer guide in the app repository. */
export function docsUrl(): string {
  return ghUrl('/blob/master/docs/PLUGINS_GUIDE.md');
}
