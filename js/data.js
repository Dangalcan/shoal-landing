/**
 * Single source of truth for everything that changes between releases:
 * repo URL, version string, and the plugin catalog shown on the page.
 *
 * The catalog mirrors kdMarket's data/catalog.json — keep them in sync
 * when plugins are added or repriced.
 */
window.KD = {
  config: {
    repoUrl: 'https://github.com/dangalcan/kubernetes-desktop',
    version: '1.0.0',
  },

  categories: ['Monitoring', 'Security', 'DevTools', 'Networking', 'Logging', 'CI/CD'],

  plugins: [
    {
      id: 'helm-manager',
      name: 'Helm Manager',
      author: 'DevOps Toolbox',
      version: '2.0.1',
      price: 19,
      category: 'DevTools',
      icon: 'package',
      iconClass: 'a',
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
      icon: 'shield-check',
      iconClass: 'b',
      description:
        'Spot over-privileged roles, unused bindings, and cluster-admin subjects at a glance.',
    },
    {
      id: 'resource-monitor',
      name: 'Resource Monitor',
      author: 'K8s Desktop Team',
      version: '1.0.0',
      price: 0,
      category: 'Monitoring',
      icon: 'activity',
      iconClass: 'c',
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
      icon: 'scroll-text',
      iconClass: 'd',
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
      icon: 'key-round',
      iconClass: 'e',
      description:
        'Safely view, create, and rotate Secrets with base64 encode/decode and external vault sync.',
    },
    {
      id: 'ingress-inspector',
      name: 'Ingress Inspector',
      author: 'K8s Desktop Team',
      version: '1.1.0',
      price: 0,
      category: 'Networking',
      icon: 'network',
      iconClass: 'f',
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
      icon: 'git-branch',
      iconClass: 'g',
      description:
        'Visualize GitHub Actions, GitLab CI, and Argo CD runs directly alongside your cluster resources.',
    },
    {
      id: 'namespace-watcher',
      name: 'Namespace Watcher',
      author: 'K8s Desktop Team',
      version: '1.0.0',
      price: 0,
      category: 'Monitoring',
      icon: 'eye',
      iconClass: 'h',
      description:
        'Monitor namespaces with quick stats, alert thresholds, and configurable notification levels.',
    },
  ],
};
