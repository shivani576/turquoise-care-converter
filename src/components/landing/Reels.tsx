import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, VolumeX } from "lucide-react";
import { REELS, type Reel } from "@/lib/site";
import { track } from "@/lib/track";

// Cover images are stills from Dr. Amir's own reels (WebP, shown until a video plays).
const covers = import.meta.glob<string>("../../assets/reels/*.webp", {
  eager: true,
  import: "default",
});
const coverFor = (code: string) =>
  Object.entries(covers).find(([path]) => path.endsWith(`/${code}.webp`))?.[1];

// The reels as our own MP4 files (src/assets/reels/<code>.mp4, H.264 + AAC, 540×960,
// faststart). They play right here with the native player: no Instagram player, no links
// out, never a second tap (client rule). A reel without an MP4 isn't shown, and the section
// is hidden until at least one MP4 exists.
const videos = import.meta.glob<string>("../../assets/reels/*.mp4", {
  eager: true,
  import: "default",
});
const videoFor = (code: string) =>
  Object.entries(videos).find(([path]) => path.endsWith(`/${code}.mp4`))?.[1];
// On the Node server (Railway) videos go through /media, which supports Range requests
// (iPhone Safari needs them; src/lib/media.server.ts). Vercel's CDN and the dev server
// support Range on the plain asset URL.
const mediaUrl = (url: string | undefined) =>
  url && !__ON_VERCEL__ && !import.meta.env.DEV && url.startsWith("/assets/")
    ? `/media${url}`
    : url;

/** Muted autoplay is skipped for visitors who asked for less motion or less data. */
function autoplayAllowed() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return !conn?.saveData;
}

/**
 * Horizontal row of Dr. Amir's videos. Only the covers load with the page.
 * - When the section scrolls into view, the first video starts playing, muted (browsers only
 *   allow autoplay without sound), with a "Tap for sound" badge.
 * - One tap on any video plays it from the start with sound and the native controls.
 * - Scrolling the section out of view pauses whatever is playing; coming back resumes it.
 */
export function Reels({ topics }: { topics?: Reel["topic"][] }) {
  const section = useRef<HTMLElement>(null);
  const rail = useRef<HTMLUListElement>(null);
  const players = useRef(new Map<string, HTMLVideoElement>());
  // The video that's playing (or was, before the section scrolled away) and whether the
  // visitor chose it (sound + controls) or it's the muted autoplay preview.
  const [active, setActive] = useState<{ code: string; sound: boolean } | null>(null);
  const activeRef = useRef(active);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const withVideo = REELS.filter((r) => videoFor(r.code));
  const ordered = topics?.length ? [...withVideo].sort((a, b) => rank(a) - rank(b)) : withVideo;
  function rank(r: Reel) {
    const i = topics!.indexOf(r.topic);
    return i === -1 ? 99 : i;
  }
  const first = ordered[0]?.code;

  useEffect(() => {
    const el = section.current;
    if (!el || !first) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const current = activeRef.current;
        if (entry?.isIntersecting) {
          if (current) {
            void players.current
              .get(current.code)
              ?.play()
              .catch(() => undefined);
          } else if (autoplayAllowed()) {
            const video = players.current.get(first);
            if (!video) return;
            video.muted = true;
            void video
              .play()
              .then(() => setActive({ code: first, sound: false }))
              .catch(() => undefined);
          }
        } else if (current) {
          players.current.get(current.code)?.pause();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [first]);

  /** A tap: this video, from the start, with sound. Runs inside the tap so sound is allowed. */
  function playWithSound(code: string) {
    players.current.forEach((v, c) => {
      if (c !== code) v.pause();
    });
    const video = players.current.get(code);
    if (!video) return;
    video.muted = false;
    video.currentTime = 0;
    void video.play().catch(() => undefined);
    setActive({ code, sound: true });
    track("reel_open", { reel: code });
  }

  const scroll = (dir: 1 | -1) =>
    rail.current?.scrollBy({ left: dir * rail.current.clientWidth * 0.8, behavior: "smooth" });

  // No MP4s yet: hide the whole section rather than fall back to Instagram.
  if (ordered.length === 0) return null;

  return (
    <section ref={section} className="section-pad overflow-hidden" id="videos">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="eyebrow">Hear it from Dr. Amir</p>
            <h2 className="mt-3 text-balance text-3xl leading-tight text-heading sm:text-4xl">
              Short answers to the questions patients ask most
            </h2>
          </div>
          <div className="hidden gap-2 md:flex">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Scroll videos left"
              className="flex size-11 items-center justify-center rounded-full border border-border bg-card hover:border-primary-deep"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Scroll videos right"
              className="flex size-11 items-center justify-center rounded-full border border-border bg-card hover:border-primary-deep"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>

      <ul
        ref={rail}
        className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:px-8 lg:px-[max(2rem,calc((100vw_-_76rem)/2_+_2rem))]"
        aria-label="Videos from Dr. Amir"
      >
        {ordered.map((r) => {
          const isActive = active?.code === r.code;
          const withSound = isActive && active.sound;
          return (
            <li key={r.code} className="w-[64vw] max-w-[16rem] shrink-0 snap-start sm:w-[16rem]">
              <div className="group relative aspect-[9/16] overflow-hidden rounded-2xl bg-ink shadow-card">
                <video
                  ref={(v) => {
                    if (v) players.current.set(r.code, v);
                    else players.current.delete(r.code);
                  }}
                  src={mediaUrl(videoFor(r.code))}
                  poster={coverFor(r.code)}
                  aria-label={r.title}
                  className="size-full object-cover"
                  preload="none"
                  playsInline
                  muted={!withSound}
                  loop={isActive && !withSound}
                  controls={withSound}
                  controlsList="nodownload noplaybackrate"
                  disablePictureInPicture
                  onEnded={() => {
                    track("reel_complete", { reel: r.code });
                    setActive(null);
                  }}
                />
                {withSound ? null : (
                  <button
                    type="button"
                    onClick={() => playWithSound(r.code)}
                    aria-label={`Play video with sound: ${r.title}`}
                    className="absolute inset-0 block text-left"
                  >
                    <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    {isActive ? (
                      <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-sm font-medium text-white">
                        <VolumeX className="size-4" aria-hidden="true" /> Tap for sound
                      </span>
                    ) : (
                      // Hidden until hover / keyboard focus; a tap plays straight away
                      <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
                        <Play className="ml-1 size-7 fill-current" aria-hidden="true" />
                      </span>
                    )}
                    <span className="absolute inset-x-0 bottom-0 p-4 text-[15px] font-medium leading-snug text-white">
                      {r.title}
                    </span>
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
