import { CONDITIONS, SITE_URL } from "./site";

const CANONICAL_HOST = new URL(SITE_URL).host;

function requestHost(request: Request): string {
  const host = request.headers.get("x-forwarded-host") ?? new URL(request.url).host;
  return host.split(",")[0]!.trim().toLowerCase();
}

/**
 * True only when the request reached the real domain. Vercel previews, the
 * *.vercel.app alias and localhost are kept out of search results so Google
 * never indexes a duplicate copy of the site.
 */
export function isCanonicalHost(request: Request): boolean {
  return requestHost(request) === CANONICAL_HOST;
}

/** www.turquoiseinstitute.com/… → 301 to turquoiseinstitute.com/… (one public address). */
export function wwwRedirect(request: Request): Response | undefined {
  if (requestHost(request) !== `www.${CANONICAL_HOST}`) return undefined;
  const url = new URL(request.url);
  return new Response(null, {
    status: 301,
    headers: { location: `${SITE_URL}${url.pathname}${url.search}` },
  });
}

/** Indexable pages, for sitemap.xml. /thank-you is noindex and left out. */
export const SITEMAP_PATHS = ["/", ...CONDITIONS.map((c) => `/${c.id}`)];
