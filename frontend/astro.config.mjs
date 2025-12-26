import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

const enableImageOptimizer = process.env.ENABLE_IMAGE_OPTIMIZER === "true";

export default defineConfig({
  output: "server",
  srcDir: "src",
  adapter: vercel(),
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: true,
    }),
  ],
  vite: {
    plugins: [
      enableImageOptimizer
        ? ViteImageOptimizer({
            includePublic: true,
            logStats: false,
          })
        : null,
    ].filter(Boolean),
  },
});
