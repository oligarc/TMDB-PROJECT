import { defineConfig } from "vite";

export default defineConfig({
  root: "./src", // src is the root dir for this project
  build: {
    outDir: "../docs", // run build will default to /docs, ready for github pages
  },
  server: {// When the json-server loads data into /api, it will change to localhost:3000
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
