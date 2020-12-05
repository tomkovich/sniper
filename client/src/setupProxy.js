const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(createProxyMiddleware('/auth/google', { target: 'http://localhost:5000/', changeOrigin: true }));
};
