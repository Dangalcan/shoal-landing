/**
 * Single source of truth for values that change between releases.
 */
export const CONFIG = {
  /** GitHub repository for the desktop app. All outbound links derive from it. */
  repoUrl: 'https://github.com/Dangalcan/shoal',

  /** Version of the desktop app advertised on the Home screen. */
  appVersion: '1.0.0',

  /**
   * kdMarket backend base URL. The Marketplace screen fetches the live
   * catalog from `${marketplaceUrl}/plugins` and falls back to the bundled
   * snapshot when the backend is unreachable.
   *
   * Note: on the Android emulator, localhost is the emulator itself —
   * use http://10.0.2.2:3001 there.
   */
  marketplaceUrl: 'http://localhost:3001',
} as const;

export function ghUrl(path = ''): string {
  return CONFIG.repoUrl + path;
}
