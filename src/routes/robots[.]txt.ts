import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/site";
import { isCanonicalHost } from "@/lib/seo";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const body = isCanonicalHost(request)
          ? `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
          : // Previews and *.vercel.app: keep crawlers out entirely.
            "User-agent: *\nDisallow: /\n";
        return new Response(body, {
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
