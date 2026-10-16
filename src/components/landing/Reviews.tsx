import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ExternalLink, Star } from "lucide-react";
import { CLINIC, GOOGLE_RATING, GOOGLE_REVIEWS } from "@/lib/site";
import { getGoogleReviews, type ReviewsPayload } from "@/lib/reviews.functions";
import { track } from "@/lib/track";
import { useAutoScroll } from "./useAutoScroll";

const initial: ReviewsPayload = {
  source: "saved",
  rating: GOOGLE_RATING.rating,
  count: GOOGLE_RATING.count,
  reviews: GOOGLE_REVIEWS.map(({ author, rating, when, text }) => ({ author, rating, when, text })),
};

function Stars({ value, className = "size-4" }: { value: number; className?: string }) {
  return (
    <span role="img" className="flex text-[#f5a623]" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${className} ${i < Math.round(value) ? "fill-current" : "opacity-30"}`}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

function GoogleG() {
  return (
    <svg viewBox="0 0 48 48" className="size-6" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"
      />
    </svg>
  );
}

/**
 * One review. Shows the first three lines; "Read more" expands the text in place
 * (no link out). Collapsed cards are all the same height.
 */
function ReviewCard({
  review: r,
  copy,
  onToggle,
}: {
  review: ReviewsPayload["reviews"][number];
  /** 0 = the real card; >0 = a visual duplicate for the auto-scroll loop */
  copy: number;
  onToggle: (expanded: boolean) => void;
}) {
  const text = useRef<HTMLQuoteElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [clamped, setClamped] = useState(false);

  // Only offer "Read more" when the text is actually cut off.
  useLayoutEffect(() => {
    const el = text.current;
    if (!el) return;
    const check = () => !expanded && setClamped(el.scrollHeight > el.clientHeight + 1);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [expanded, r.text]);

  const id = `review-${r.author.replace(/\W+/g, "-").toLowerCase()}-${copy}`;
  return (
    <article className="flex h-full w-[80vw] max-w-[22rem] flex-col rounded-2xl border border-border bg-card p-6 shadow-card">
      <div className="flex items-center justify-between">
        <Stars value={r.rating} />
        <GoogleG />
      </div>
      <blockquote
        ref={text}
        id={id}
        className={`mt-4 min-h-[4.875em] leading-relaxed text-foreground/85 ${expanded ? "" : "line-clamp-3"}`}
      >
        “{r.text}”
      </blockquote>
      {clamped || expanded ? (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={id}
          tabIndex={copy > 0 ? -1 : undefined}
          onClick={() => {
            onToggle(!expanded);
            setExpanded((v) => !v);
            if (!expanded) track("review_click", { location: "read-more" });
          }}
          className="mt-2 self-start text-sm font-semibold text-primary-deep underline underline-offset-4"
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      ) : null}
      <div className="mt-auto pt-5">
        <p className="font-semibold text-foreground">{r.author}</p>
        {r.when ? <p className="text-sm text-muted-foreground">{r.when} · Google</p> : null}
      </div>
    </article>
  );
}

// The row is rendered several times so it can loop seamlessly at any screen width.
const COPIES = 4;

/** Real Google reviews — live from the Places API when configured. */
export function Reviews() {
  const [data, setData] = useState(initial);
  const load = useServerFn(getGoogleReviews);
  const rail = useRef<HTMLDivElement>(null);
  const [openCount, setOpenCount] = useState(0);
  const onToggle = (expanded: boolean) => setOpenCount((n) => Math.max(0, n + (expanded ? 1 : -1)));
  const reviews = data.reviews.slice(0, 6);
  useAutoScroll(rail, { copies: COPIES, paused: openCount > 0 });

  useEffect(() => {
    load()
      .then((d) => setData(d))
      .catch(() => undefined);
  }, [load]);

  return (
    <section className="section-pad bg-mint" id="reviews">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Patient reviews</p>
            <h2 className="mt-3 text-balance text-3xl leading-tight text-heading sm:text-4xl">
              What patients say
            </h2>
          </div>
          <div className="flex items-center gap-3 self-start rounded-2xl border border-border bg-card px-5 py-3 shadow-card">
            <GoogleG />
            <span>
              <span className="flex items-center gap-2">
                <span className="text-xl font-bold text-foreground">{data.rating.toFixed(1)}</span>
                <Stars value={data.rating} />
              </span>
              <span className="block text-sm text-muted-foreground">
                {data.count} Google {data.count === 1 ? "review" : "reviews"}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Auto-scrolling row (pauses on hover, touch, focus or while a review is open) */}
      <div
        ref={rail}
        className="no-scrollbar mt-8 overflow-x-auto sm:mt-10"
        role="region"
        aria-label="Patient reviews (scroll automatically)"
        tabIndex={0}
      >
        <ul className="flex w-max items-start gap-4 px-5 sm:px-8">
          {Array.from({ length: COPIES }).flatMap((_, copy) =>
            reviews.map((r) => (
              <li key={`${copy}-${r.author}${r.when}`} aria-hidden={copy > 0 || undefined}>
                <ReviewCard review={r} copy={copy} onToggle={onToggle} />
              </li>
            )),
          )}
        </ul>
      </div>

      <div className="container-page">
        <a
          href={CLINIC.googleMapsUrl}
          target="_blank"
          rel="noopener"
          onClick={() => track("review_click", { location: "footer-link" })}
          className="mt-8 inline-flex items-center gap-2 font-semibold text-primary-deep underline underline-offset-4"
        >
          Read all reviews on Google <ExternalLink className="size-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
