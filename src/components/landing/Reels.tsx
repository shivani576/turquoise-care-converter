import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { REELS, type Reel } from "@/lib/site";
import { track } from "@/lib/track";

// Cover images are stills from Dr. Amir's own reels (WebP; Instagram's baked-in play
// button removed so no play icon shows until hover/focus). DaQ7Jkfvz58 (weather) is a
// designed thumbnail with his real headshot — its only still was too blurry.
const covers = import.meta.glob<string>("../../assets/reels/*.webp", {
  eager: true,
  import: "default",
});
const coverFor = (code: string) =>
  Object.entries(covers).find(([path]) => path.endsWith(`/${code}.webp`))?.[1];

// The reels as our own MP4 files (src/assets/reels/<code>.mp4, H.264, ~720×1280). A tap plays
// the file right here with the native player: one tap, no Instagram links (client rule).
// Instagram's own player is never used (it needs a second tap and links out), so a reel
// without an MP4 isn't shown, and the section is hidden until at least one MP4 exists.
const videos = import.meta.glob<string>("../../assets/reels/*.mp4", {
  eager: true,
  import: "default",
});
const videoFor = (code: string) =>
  Object.entries(videos).find(([path]) => path.endsWith(`/${code}.mp4`))?.[1];

/**
 * Horizontal row of Dr. Amir's reels. Only the cover images load with the page.
 * Tapping a cover plays our own MP4 right there in the row (no pop-up, no link out).
 */
export function Reels({ topics }: { topics?: Reel["topic"][] }) {
  const [playing, setPlaying] = useState<string | null>(null);
  const rail = useRef<HTMLUListElement>(null);

  const withVideo = REELS.filter((r) => videoFor(r.code));
  const ordered = topics?.length ? [...withVideo].sort((a, b) => rank(a) - rank(b)) : withVideo;
  function rank(r: Reel) {
    const i = topics!.indexOf(r.topic);
    return i === -1 ? 99 : i;
  }

  const scroll = (dir: 1 | -1) =>
    rail.current?.scrollBy({ left: dir * rail.current.clientWidth * 0.8, behavior: "smooth" });

  // No MP4s yet: hide the whole section rather than fall back to Instagram.
  if (ordered.length === 0) return null;

  return (
    <section className="section-pad overflow-hidden" id="videos">
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
        {ordered.map((r) =>
          playing === r.code ? (
            <li key={r.code} className="w-[min(88vw,22rem)] shrink-0 snap-start">
              <div className="relative overflow-hidden rounded-2xl border border-border bg-white shadow-card">
                <video
                  src={videoFor(r.code)}
                  poster={coverFor(r.code)}
                  title={r.title}
                  aria-label={r.title}
                  className="block aspect-[9/16] max-h-[min(80vh,40rem)] w-full bg-black object-contain"
                  controls
                  autoPlay
                  playsInline
                  preload="auto"
                  controlsList="nodownload"
                  onEnded={() => track("reel_complete", { reel: r.code })}
                />
                <button
                  type="button"
                  onClick={() => setPlaying(null)}
                  aria-label={`Stop video: ${r.title}`}
                  className="absolute right-2 top-2 flex size-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/75"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>
            </li>
          ) : (
            <li key={r.code} className="w-[62vw] max-w-[15rem] shrink-0 snap-start sm:w-[15rem]">
              <button
                type="button"
                onClick={() => {
                  setPlaying(r.code);
                  track("reel_open", { reel: r.code });
                }}
                aria-label={`Play video: ${r.title}`}
                className="group block w-full text-left"
              >
                <span className="relative block aspect-[9/16] overflow-hidden rounded-2xl bg-ink shadow-card">
                  <img
                    src={coverFor(r.code)}
                    alt="Still from one of Dr. Amir's videos"
                    width={360}
                    height={640}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  {/* Hidden until hover / keyboard focus; a tap plays straight away */}
                  <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Play className="ml-1 size-7 fill-current" aria-hidden="true" />
                  </span>
                  <span className="absolute inset-x-0 bottom-0 p-4 text-[15px] font-medium leading-snug text-white">
                    {r.title}
                  </span>
                </span>
              </button>
            </li>
          ),
        )}
      </ul>
    </section>
  );
}
