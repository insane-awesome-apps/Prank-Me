const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Set your target URL for redirection here
const targetUrl = "https://prank-me.onrender.com"; // Change this to your desired URL

// Set up the proxy middleware
app.use(
  "*",
  createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    secure: true,
    pathRewrite: {
      "^/": "/", // Modify path as necessary
    },
    onProxyReq: (proxyReq, req, res) => {
      console.log(`Requesting: ${req.url}`);
      // Log request headers for debugging
      console.log("Request Headers:", req.headers);
    },
    onError: (err, req, res) => {
      console.error("Proxy error:", err);
      res.status(500).send("Something went wrong.");
    },
  })
);

const PORT = 5321; // Change this port if needed
app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
