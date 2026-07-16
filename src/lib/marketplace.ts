import { CONFIG } from '@/config';
import { BUNDLED_CATALOG, PaginatedPlugins, Plugin } from '@/data/catalog';

export interface CatalogResult {
  plugins: Plugin[];
  /** 'live' when served by the kdMarket backend, 'bundled' when offline. */
  source: 'live' | 'bundled';
}

const FETCH_TIMEOUT_MS = 4000;

/**
 * Fetch the plugin catalog from the kdMarket backend; fall back to the
 * bundled snapshot when the backend is unreachable or answers garbage.
 */
export async function fetchCatalog(): Promise<CatalogResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(`${CONFIG.marketplaceUrl}/plugins?limit=100`, {
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = (await res.json()) as PaginatedPlugins;
    if (!Array.isArray(body.data)) throw new Error('unexpected payload');
    return { plugins: body.data, source: 'live' };
  } catch {
    return { plugins: BUNDLED_CATALOG, source: 'bundled' };
  } finally {
    clearTimeout(timeout);
  }
}
