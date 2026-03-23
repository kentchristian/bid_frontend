import { defineConfig, loadEnv } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

const { parsed } = loadEnv();
const rawBackend =
  parsed.PUBLIC_BACKEND ?? process.env.PUBLIC_BACKEND ?? 'http://localhost:8000';
const backend = rawBackend.replace(/\/+$/, '');

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [pluginReact()],
  html: {
    title: "BID",
    favicon: "./public/favIcon.svg",
  },
  server: {
    proxy: [
      {
        context: ['/api', '/auth'],
        target: backend,
        changeOrigin: true,
        secure: false,
      },
    ],
  },
});
