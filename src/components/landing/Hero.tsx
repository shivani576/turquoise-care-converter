import { Check, Star } from "lucide-react";
import { GOOGLE_RATING } from "@/lib/site";
import type { PageCopy } from "@/lib/condition-pages";
import { BookCta } from "./Booking";
import { useTown } from "./useTown";

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
  const town = useTown();
  // Ad-group pages: an ad for one town (…?town=wellesley) swaps "in Natick" for "near Wellesley".
  const headline =
    town && town !== "Natick" ? page.headline.replace("in Natick", `near ${town}`) : page.headline;
  const rating = GOOGLE_RATING.rating.toFixed(1);
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-mint via-background to-background"
    >
      <div className="container-page relative flex flex-col items-center py-12 text-center sm:py-16 lg:py-20">
        <h1 className="max-w-4xl text-balance text-[2.1rem] leading-[1.1] text-heading sm:text-5xl lg:text-[3.6rem]">
          <Headline text={headline} highlight={page.highlight} />
        </h1>
        <p className="mt-5 max-w-2xl text-pretty text-[1.08rem] leading-relaxed text-foreground/80 sm:text-lg">
          {page.subheadline}
        </p>
        {page.heroPoints.length > 0 ? (
          <ul className="mt-6 flex max-w-5xl flex-col items-start gap-2.5 text-left text-[15px] font-medium text-foreground sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:text-base">
            {page.heroPoints.map((p) => (
              <li key={p} className="flex items-start gap-2">
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
