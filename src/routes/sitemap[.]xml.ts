import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/site";
import { SITEMAP_PATHS } from "@/lib/seo";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const urls = SITEMAP_PATHS.map(
          (path) => `  <url><loc>${SITE_URL}${path === "/" ? "/" : path}</loc></url>`,
        ).join("\n");
        const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
        return new Response(body, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
