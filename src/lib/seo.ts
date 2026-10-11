import { CONDITIONS, SITE_URL } from "./site";

const CANONICAL_HOST = new URL(SITE_URL).host;

/**
 * True only when the request reached the real domain. Vercel previews, the
 * *.vercel.app alias and localhost are kept out of search results so Google
 * never indexes a duplicate copy of the site.
 */
export function isCanonicalHost(request: Request): boolean {
  const host = request.headers.get("x-forwarded-host") ?? new URL(request.url).host;
  return host.split(",")[0]!.trim().toLowerCase() === CANONICAL_HOST;
}

/** Indexable pages, for sitemap.xml. /thank-you is noindex and left out. */
export const SITEMAP_PATHS = ["/", ...CONDITIONS.map((c) => `/${c.id}`)];
