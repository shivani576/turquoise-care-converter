import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { serveMedia } from "./lib/media.server";
import { isCanonicalHost, wwwRedirect } from "./lib/seo";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

// Previews, *.vercel.app and localhost must never be indexed (duplicate content).
function withRobotsHeader(request: Request, response: Response): Response {
  if (isCanonicalHost(request)) return response;
  const headers = new Headers(response.headers);
  headers.set("x-robots-tag", "noindex, nofollow");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

const COMPRESSIBLE = /^(text\/|application\/(json|xml|javascript)|image\/svg)/;

// Gzip HTML and other text responses when the host doesn't (Railway, plain Node).
// Static JS/CSS/fonts are pre-compressed at build time (compressPublicAssets).
function compress(request: Request, response: Response): Response {
  if (__ON_VERCEL__ || !response.body || response.headers.has("content-encoding")) {
    return response;
  }
  if (!/\bgzip\b/.test(request.headers.get("accept-encoding") ?? "")) return response;
  if (!COMPRESSIBLE.test(response.headers.get("content-type") ?? "")) return response;
  const headers = new Headers(response.headers);
  headers.set("content-encoding", "gzip");
  headers.delete("content-length");
  headers.append("vary", "Accept-Encoding");
  return new Response(response.body.pipeThrough(new CompressionStream("gzip")), {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const redirect = wwwRedirect(request);
      if (redirect) return redirect;
      // Reel videos with Range support (Node/Railway only; Vercel's CDN serves them itself).
      if (!__ON_VERCEL__) {
        const media = await serveMedia(request);
        if (media) return withRobotsHeader(request, media);
      }
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return compress(
        request,
        withRobotsHeader(request, await normalizeCatastrophicSsrResponse(response)),
      );
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
