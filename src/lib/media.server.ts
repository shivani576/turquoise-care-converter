import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

/**
 * Serves the reel MP4s with HTTP Range support (206 Partial Content) on the Node server
 * (Railway). Nitro's static file handler ignores Range, and iPhone Safari refuses to play
 * a video from a server that doesn't support it. Vercel's CDN supports Range itself, so
 * there the page links the files directly (see `mediaUrl` in Reels.tsx).
 *
 * URL: /media/assets/<hashed-name>.mp4 → .output/public/assets/<hashed-name>.mp4
 */
const MEDIA_PATH = /^\/media\/assets\/([\w-]+\.mp4)$/;

function publicDir() {
  const main = (globalThis as { __nitro_main__?: string }).__nitro_main__;
  return main ? resolve(dirname(fileURLToPath(main)), "../public") : resolve(".output/public");
}

export async function serveMedia(request: Request): Promise<Response | undefined> {
  const { pathname } = new URL(request.url);
  const name = MEDIA_PATH.exec(pathname)?.[1];
  if (!name) return undefined;
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response(null, { status: 405, headers: { allow: "GET, HEAD" } });
  }

  const file = resolve(publicDir(), "assets", name);
  let size: number;
  try {
    size = (await stat(file)).size;
  } catch {
    return new Response("Not found", { status: 404 });
  }

  const headers = new Headers({
    "content-type": "video/mp4",
    "accept-ranges": "bytes",
    // Hashed file names: safe to cache for a year.
    "cache-control": "public, max-age=31536000, immutable",
  });

  let start = 0;
  let end = size - 1;
  let status = 200;
  const range = request.headers.get("range");
  if (range) {
    const m = /^bytes=(\d*)-(\d*)$/.exec(range.trim());
    const valid = Boolean(m && (m[1] || m[2]));
    if (m && valid) {
      if (m[1]) {
        start = Number(m[1]);
        end = m[2] ? Math.min(Number(m[2]), size - 1) : size - 1;
      } else {
        // Suffix range: the last N bytes.
        start = Math.max(size - Number(m[2]), 0);
      }
    }
    if (!valid || start > end || start >= size) {
      headers.set("content-range", `bytes */${size}`);
      return new Response(null, { status: 416, headers });
    }
    status = 206;
    headers.set("content-range", `bytes ${start}-${end}/${size}`);
  }
  headers.set("content-length", String(end - start + 1));

  if (request.method === "HEAD") return new Response(null, { status, headers });
  const body = Readable.toWeb(createReadStream(file, { start, end })) as ReadableStream;
  return new Response(body, { status, headers });
}
