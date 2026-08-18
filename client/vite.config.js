import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd(), "");
  const VITE_API_URL = env.VITE_API_URL;


  return {
    plugins: [react()],

    server: {
      proxy: {
        "/api": {
          target:  VITE_API_URL,
          changeOrigin: true,
        },
        "/auth": {
          target:  VITE_API_URL,
          changeOrigin: true,
        },
      },
    },

    build: {
      outDir: "../server/dist",
      emptyOutDir: true,
      assetsDir: "assets",
    },
  };
});