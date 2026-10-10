/**
 * Plugin catalog types matching kdMarket's /plugins response, plus a bundled
 * snapshot used when the backend is unreachable. Keep the snapshot in sync
 * with kdMarket's data/catalog.json.
 */
export interface Plugin {
  id: string;
  name: string;
  author: string;
  version: string;
  price: number;
  category: string;
  description: string;
}

export interface PaginatedPlugins {
  data: Plugin[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const CATEGORIES = [
  'Monitoring',
  'Security',
  'DevTools',
  'Networking',
  'Logging',
  'CI/CD',
] as const;

/** Icon + accent color per category, used by the plugin cards. */
export const CATEGORY_STYLE: Record<string, { icon: string; color: string; soft: string }> = {
  Monitoring: { icon: 'chart-line', color: '#0f766e', soft: '#ccfbf1' },
  Security: { icon: 'shield-check-outline', color: '#6d28d9', soft: '#ede9fe' },
  DevTools: { icon: 'package-variant-closed', color: '#1d4ed8', soft: '#dbeafe' },
  Networking: { icon: 'lan', color: '#15803d', soft: '#dcfce7' },
  Logging: { icon: 'script-text-outline', color: '#b45309', soft: '#fef3c7' },
  'CI/CD': { icon: 'source-branch', color: '#b91c1c', soft: '#fee2e2' },
};

export const BUNDLED_CATALOG: Plugin[] = [
  {
    id: 'helm-manager',
    name: 'Helm Manager',
    author: 'DevOps Toolbox',
    version: '2.0.1',
    price: 19,
    category: 'DevTools',
    description:
      'Browse, install, upgrade, and rollback Helm charts with a full values editor and diff view.',
  },
  {
    id: 'rbac-visualizer',
    name: 'RBAC Visualizer',
    author: 'SecureK8s Labs',
    version: '1.2.0',
    price: 29,
    category: 'Security',
    description:
      'Spot over-privileged roles, unused bindings, and cluster-admin subjects at a glance.',
  },
  {
    id: 'resource-monitor',
    name: 'Resource Monitor',
    author: 'Shoal Team',
    version: '1.0.0',
    price: 0,
    category: 'Monitoring',
    description:
      'Track pod restart counts across namespaces with threshold alerts and desktop notifications.',
  },
  {
    id: 'log-aggregator',
    name: 'Log Aggregator',
    author: 'ObservabilityStack',
    version: '3.0.0',
    price: 49,
    category: 'Logging',
    description:
      'Stream, search, and filter logs from multiple pods with regex support and export to file.',
  },
  {
    id: 'secret-manager',
    name: 'Secret Manager',
    author: 'SecureK8s Labs',
    version: '1.3.0',
    price: 39,
    category: 'Security',
    description:
      'Safely view, create, and rotate Secrets with base64 encode/decode and external vault sync.',
  },
  {
    id: 'ingress-inspector',
    name: 'Ingress Inspector',
    author: 'Shoal Team',
    version: '1.1.0',
    price: 0,
    category: 'Networking',
    description:
      'Debug Ingress rules, TLS certs, and backend routing in one unified panel with SSL expiry alerts.',
  },
  {
    id: 'ci-pipeline-view',
    name: 'CI Pipeline View',
    author: 'DevOps Toolbox',
    version: '1.0.0',
    price: 0,
    category: 'CI/CD',
    description:
      'Visualize GitHub Actions, GitLab CI, and Argo CD runs directly alongside your cluster resources.',
  },
  {
    id: 'namespace-watcher',
    name: 'Namespace Watcher',
    author: 'Shoal Team',
    version: '1.0.0',
    price: 0,
    category: 'Monitoring',
    description:
      'Monitor namespaces with quick stats, alert thresholds, and configurable notification levels.',
  },
];
