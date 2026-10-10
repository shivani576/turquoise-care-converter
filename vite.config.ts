import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

// Deploy target is chosen by Nitro: set NITRO_PRESET=vercel (or netlify) in the
// host's build settings. Locally it builds a Node server in .output/.
export default defineConfig({
  server: { port: 3000 },
  plugins: [
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart({ server: { entry: "server" } }),
    nitro(),
    viteReact(),
  ],
});
