import { BadgeCheck, Check, Star } from "lucide-react";
import headshot from "@/assets/photos/dr-amir-headshot.webp";
import { CLINIC, GOOGLE_RATING } from "@/lib/site";
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
 * First fold: headline, one sentence, a few short points and exactly one call
 * to action (opens the booking pop-up). The doctor the visitor will see is on
 * the right. No location here — the practice serves several areas.
 */
export function Hero({ page }: { page: PageCopy }) {
  const town = useTown();
  // Ad-group pages: an ad for one town (…?town=wellesley) swaps "in Natick" for "near Wellesley".
  const headline =
    town && town !== "Natick" ? page.headline.replace("in Natick", `near ${town}`) : page.headline;
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-mint via-background to-background"
    >
      <div className="container-page relative grid items-center gap-10 pb-12 pt-10 sm:pt-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pb-16 lg:pt-16">
        <div className="min-w-0">
          <h1 className="text-balance text-[2.1rem] leading-[1.1] text-heading sm:text-5xl lg:text-[3.4rem]">
            <Headline text={headline} highlight={page.highlight} />
          </h1>
          <p className="mt-5 max-w-xl text-[1.08rem] leading-relaxed text-foreground/80 sm:text-lg">
            {page.subheadline}
          </p>
          {page.heroPoints.length > 0 ? (
            <ul className="mt-5 space-y-2 text-[15px] font-medium text-foreground sm:text-base">
              {page.heroPoints.map((p) => (
                <li key={p} className="flex items-start gap-2.5">
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
        </div>

        {/* Who you'll see */}
        <figure className="min-w-0 rounded-3xl border border-border bg-card p-4 shadow-soft sm:p-5 lg:mx-0 lg:w-full lg:max-w-xs lg:justify-self-end">
          <div className="flex items-center gap-5 lg:block">
            <img
              src={headshot}
              alt={`${CLINIC.doctor.name}, Founder & Medical Director of Turquoise Institute`}
              width={682}
              height={1024}
              className="h-40 w-32 shrink-0 rounded-2xl object-cover object-[50%_15%] sm:h-48 sm:w-40 lg:aspect-square lg:h-auto lg:w-full"
              fetchPriority="high"
            />
            <figcaption className="min-w-0 lg:mt-5">
              <p className="font-label text-xs uppercase tracking-wider text-primary-deep">
                You'll meet
              </p>
              <p className="mt-1 font-display text-xl leading-tight text-heading sm:text-2xl">
                {CLINIC.doctor.name}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {CLINIC.doctor.title}, {CLINIC.name}
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <BadgeCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  Dual fellowship trained in Headache &amp; Interventional Pain
                </li>
                <li className="flex items-start gap-2">
                  <BadgeCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  Trained at Yale &amp; Dartmouth
                </li>
              </ul>
              <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <span
                  role="img"
                  className="flex text-[#f5a623]"
                  aria-label={`${GOOGLE_RATING.rating.toFixed(1)} out of 5 stars`}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" aria-hidden="true" />
                  ))}
                </span>
                {GOOGLE_RATING.rating.toFixed(1)} on Google
              </p>
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
}
