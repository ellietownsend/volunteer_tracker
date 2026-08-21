import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd(), "");
  const VITE_SERVER_URL = env.VITE_SERVER_URL;


  return {
    plugins: [react()],

    server: {
      proxy: {
        "/api": {
          target:  VITE_SERVER_URL,
          changeOrigin: true,
        },
        "/auth": {
          target:  VITE_SERVER_URL,
          changeOrigin: true,
        },
      },
    },

    build: {
      outDir: "dist",
      emptyOutDir: true,
      assetsDir: "assets",
    },
  };
});