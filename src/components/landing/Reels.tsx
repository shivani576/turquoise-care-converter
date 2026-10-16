import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Instagram, Play, X } from "lucide-react";
import { CLINIC, REELS, type Reel } from "@/lib/site";
import { track } from "@/lib/track";
import { PainMap } from "./PainMap";

// Cover images are stills from Dr. Amir's own reels (WebP; Instagram's baked-in play
// button removed so no play icon shows until hover/focus).
const covers = import.meta.glob<string>("../../assets/reels/*.webp", {
  eager: true,
  import: "default",
});
const coverFor = (code: string) =>
  Object.entries(covers).find(([path]) => path.endsWith(`/${code}.webp`))?.[1];

/**
 * Horizontal row of Dr. Amir's Instagram reels. Only the cover images load with
 * the page. Tapping a cover swaps it for the Instagram player right there in the
 * row (no pop-up), so the page stays fast and the visitor stays on the page.
 */
export function Reels({ topics }: { topics?: Reel["topic"][] }) {
  const [playing, setPlaying] = useState<string | null>(null);
  const rail = useRef<HTMLUListElement>(null);

  const ordered = topics?.length ? [...REELS].sort((a, b) => rank(a) - rank(b)) : REELS;
  function rank(r: Reel) {
    const i = topics!.indexOf(r.topic);
    return i === -1 ? 99 : i;
  }

  const scroll = (dir: 1 | -1) =>
    rail.current?.scrollBy({ left: dir * rail.current.clientWidth * 0.8, behavior: "smooth" });

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
        aria-label="Instagram videos from Dr. Amir"
      >
        {ordered.map((r) =>
          playing === r.code ? (
            <li key={r.code} className="w-[min(88vw,22rem)] shrink-0 snap-start">
              <div className="relative overflow-hidden rounded-2xl border border-border bg-white shadow-card">
                <iframe
                  title={r.title}
                  src={`https://www.instagram.com/reel/${r.code}/embed/`}
                  className="block h-[min(80vh,40rem)] w-full"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
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
                  {r.designedCover ? (
                    <span className="flex size-full items-center justify-center bg-gradient-to-b from-[#1f5a4b] to-ink px-8 pb-20 pt-6 text-primary-soft">
                      <PainMap area="temples" className="h-full max-h-52 w-auto" />
                    </span>
                  ) : (
                    <img
                      src={coverFor(r.code)}
                      alt="Still from one of Dr. Amir's videos"
                      width={360}
                      height={640}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  )}
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
        <li className="flex w-[62vw] max-w-[15rem] shrink-0 snap-start sm:w-[15rem]">
          <a
            href={CLINIC.instagram}
            target="_blank"
            rel="noopener"
            className="flex aspect-[9/16] w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-primary/40 bg-mint p-6 text-center text-primary-deep hover:border-primary-deep"
          >
            <Instagram className="size-9" aria-hidden="true" />
            <span className="font-semibold">More videos on Instagram</span>
            <span className="text-sm text-muted-foreground">{CLINIC.instagramHandle}</span>
          </a>
        </li>
      </ul>
    </section>
  );
}
