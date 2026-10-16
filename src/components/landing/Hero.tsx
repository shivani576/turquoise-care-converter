import { Check, Star } from "lucide-react";
import { GOOGLE_RATING } from "@/lib/site";
import type { PageCopy } from "@/lib/condition-pages";
import { BookCta } from "./Booking";

/**
 * Optional hero background photo: drop a real, licensed photo at
 * src/assets/hero/hero.webp (landscape, ~1920×1080) and, optionally, a portrait crop
 * for phones at src/assets/hero/hero-mobile.webp (~800×1200). A soft overlay keeps the
 * headline readable. Without a file the hero keeps its plain mint gradient.
 */
const HERO_PHOTOS = import.meta.glob<string>("../../assets/hero/*.webp", {
  eager: true,
  import: "default",
});
const heroPhoto = (name: string) =>
  Object.entries(HERO_PHOTOS).find(([path]) => path.endsWith(`/${name}.webp`))?.[1];
const HERO_DESKTOP = heroPhoto("hero");
const HERO_MOBILE = heroPhoto("hero-mobile") ?? HERO_DESKTOP;

function Headline({ text, highlight }: { text: string; highlight?: string | undefined }) {
  if (!highlight || !text.includes(highlight)) return <>{text}</>;
  const [before, after] = text.split(highlight);
  return (
    <>
      {before}
      <span className="text-primary">{highlight}</span>
      {after}
    </>
  );
}

/**
 * First fold, centred: headline, one sentence, short points, exactly one call to
 * action (opens the booking pop-up) and the Google rating. No doctor photo here —
 * Dr. Amir has his own section further down. No location — the practice serves
 * several areas.
 */
export function Hero({ page }: { page: PageCopy }) {
  const rating = GOOGLE_RATING.rating.toFixed(1);
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-mint via-background to-background"
    >
      {HERO_DESKTOP ? (
        <>
          <picture>
            {HERO_MOBILE !== HERO_DESKTOP ? (
              <source media="(max-width: 767px)" srcSet={HERO_MOBILE} />
            ) : null}
            <img
              src={HERO_DESKTOP}
              alt=""
              aria-hidden="true"
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 size-full object-cover object-center"
            />
          </picture>
          {/* Soft wash so the headline stays readable over any photo */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/75 to-background/95"
          />
        </>
      ) : null}
      <div className="container-page relative flex flex-col items-center py-12 text-center sm:py-16 lg:py-20">
        <h1 className="max-w-4xl text-balance text-[2.1rem] leading-[1.1] text-heading sm:text-5xl lg:text-[3.6rem]">
          <Headline text={page.headline} highlight={page.highlight} />
        </h1>
        <p className="mt-5 max-w-2xl text-pretty text-[1.08rem] leading-relaxed text-foreground/80 sm:text-lg">
          {page.subheadline}
        </p>
        {page.heroPoints.length > 0 ? (
          <ul className="mt-6 flex max-w-5xl flex-col items-start gap-2.5 text-left text-[15px] font-medium text-foreground sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:text-base">
            {page.heroPoints.map((p) => (
              <li
                key={p}
                className={
                  // The cash-pay model is highlighted in the first fold (client request).
                  /cash-pay/i.test(p)
                    ? "flex items-start gap-2 rounded-full bg-mint-deep px-3.5 py-1.5 font-semibold text-heading"
                    : "flex items-start gap-2 sm:py-1.5"
                }
              >
                <Check
                  className="mt-0.5 size-5 shrink-0 text-primary-deep"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
                {p}
              </li>
            ))}
          </ul>
        ) : null}
        <BookCta location="hero" className="mt-8 w-full sm:w-auto" />
        <p className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground">
          <span role="img" className="flex text-[#f5a623]" aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4 fill-current" aria-hidden="true" />
            ))}
          </span>
          <span>
            <strong className="font-semibold text-foreground">{rating}</strong> rating on Google
          </span>
        </p>
      </div>
    </section>
  );
}
