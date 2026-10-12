/**
 * Extends app.json. BASE_URL lets a build serve the site under a subpath,
 * which only the Docker image uses (`--build-arg BASE_URL=/some/path`).
 * The deployed site lives at the root of shoal.dangalcan.com, so CI and
 * local exports leave it unset.
 */
module.exports = ({ config }) => ({
  ...config,
  experiments: {
    ...config.experiments,
    baseUrl: process.env.BASE_URL ?? '',
  },
});
