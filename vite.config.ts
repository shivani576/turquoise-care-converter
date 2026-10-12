import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

// Deploy target is chosen by Nitro. Railway (and local builds) use the default Node
// server in .output/ (`npm start`); Vercel needs NITRO_PRESET=vercel.
const onVercel = Boolean(process.env["VERCEL"]) || process.env["NITRO_PRESET"] === "vercel";
export default defineConfig({
  server: { port: 3000 },
  // Vite resolves the "@/…" aliases from tsconfig.json itself.
  resolve: { tsconfigPaths: true },
  define: { __ON_VERCEL__: JSON.stringify(onVercel) },
  plugins: [
    tailwindcss(),
    tanstackStart({ server: { entry: "server" } }),
    nitro({
      // Pre-compressed .br/.gz copies of JS/CSS/fonts, served by the Node server.
      // Hosts like Railway don't compress responses at the edge.
      compressPublicAssets: { gzip: true, brotli: true },
    }),
    viteReact(),
  ],
});
