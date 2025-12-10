module.exports = function override(config, env) {
  // Fix for webpack dev server allowedHosts issue
  if (env === 'development') {
    config.devServer = {
      ...config.devServer,
      allowedHosts: 'all'
    };
  }
  return config;
};