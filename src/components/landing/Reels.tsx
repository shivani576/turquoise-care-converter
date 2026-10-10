import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Instagram, Play, X } from "lucide-react";
import { CLINIC, REELS, type Reel } from "@/lib/site";
import { track } from "@/lib/track";

// Cover images are stills from Dr. Amir's own reels.
const covers = import.meta.glob<string>("@/assets/reels/*.jpg", { eager: true, import: "default" });
const coverFor = (code: string) =>
  Object.entries(covers).find(([path]) => path.endsWith(`/${code}.jpg`))?.[1];

/**
 * Horizontal row of Dr. Amir's Instagram reels. Only the cover images load
 * with the page; the Instagram player loads when someone taps a reel, so the
 * page stays fast for ad traffic.
 */
export function Reels({ topics }: { topics?: Reel["topic"][] }) {
  const [open, setOpen] = useState<Reel | null>(null);
  const rail = useRef<HTMLUListElement>(null);

  const ordered = topics?.length
    ? [...REELS].sort((a, b) => rank(a) - rank(b))
    : REELS;
  function rank(r: Reel) {
    const i = topics!.indexOf(r.topic);
    return i === -1 ? 99 : i;
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const scroll = (dir: 1 | -1) =>
    rail.current?.scrollBy({ left: dir * rail.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <section className="section-pad overflow-hidden" id="videos">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="eyebrow">Hear it from Dr. Amir</p>
            <h2 className="mt-3 text-balance text-3xl leading-tight text-foreground sm:text-4xl">
              Short answers to the questions patients ask most
            </h2>
          </div>
          <div className="hidden gap-2 md:flex">
            <button type="button" onClick={() => scroll(-1)} aria-label="Scroll videos left" className="flex size-11 items-center justify-center rounded-full border border-border bg-card hover:border-primary-deep">
              <ChevronLeft className="size-5" />
            </button>
            <button type="button" onClick={() => scroll(1)} aria-label="Scroll videos right" className="flex size-11 items-center justify-center rounded-full border border-border bg-card hover:border-primary-deep">
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>

      <ul
        ref={rail}
        className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:px-8 lg:px-[max(2rem,calc((100vw-76rem)/2+2rem))]"
        aria-label="Instagram videos from Dr. Amir"
      >
        {ordered.map((r) => (
          <li key={r.code} className="w-[62vw] max-w-[15rem] shrink-0 snap-start sm:w-[15rem]">
            <button
              type="button"
              onClick={() => {
                setOpen(r);
                track("reel_open", { reel: r.code });
              }}
              className="group block w-full text-left"
            >
              <span className="relative block aspect-[9/16] overflow-hidden rounded-2xl bg-ink shadow-card">
                <img
                  src={coverFor(r.code)}
                  alt=""
                  width={360}
                  height={640}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                {/* Sits over the play icon baked into some Instagram covers */}
                <span className="absolute left-1/2 top-1/2 flex size-[4.5rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary-deep text-white shadow-cta transition-transform group-hover:scale-110">
                  <Play className="ml-1 size-7 fill-current" aria-hidden="true" />
                </span>
                <span className="absolute inset-x-0 bottom-0 p-4 text-[15px] font-medium leading-snug text-white">
                  {r.title}
                </span>
              </span>
            </button>
          </li>
        ))}
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

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setOpen(null)}
        >
          <div className="relative w-full max-w-[400px]" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setOpen(null)}
              className="absolute -top-12 right-0 flex size-10 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
              aria-label="Close video"
            >
              <X className="size-5" />
            </button>
            <div className="max-h-[80vh] overflow-y-auto rounded-2xl bg-white">
              <iframe
                title={open.title}
                src={`https://www.instagram.com/reel/${open.code}/embed/`}
                className="block h-[min(78vh,720px)] w-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
