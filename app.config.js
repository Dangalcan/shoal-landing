/**
 * Extends app.json. BASE_URL lets CI export the web build under a subpath
 * (GitHub Pages project sites serve from /<repo-name>/). Unset locally.
 */
module.exports = ({ config }) => ({
  ...config,
  experiments: {
    ...config.experiments,
    baseUrl: process.env.BASE_URL ?? '',
  },
});
