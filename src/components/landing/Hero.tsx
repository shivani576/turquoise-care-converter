import { BadgeCheck, MapPin, Star } from "lucide-react";
import headshot from "@/assets/photos/dr-amir-headshot.jpg";
import { CLINIC, GOOGLE_RATING } from "@/lib/site";
import { track } from "@/lib/track";
import type { PageCopy } from "@/lib/condition-pages";
import { CtaPair } from "./Ctas";
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
 * First screen: headline, one sentence and the buttons on the left; the doctor
 * the visitor will actually see on the right. The form lives in the closing
 * section (#consultation), which every "Book" button scrolls to.
 */
export function Hero({ page }: { page: PageCopy }) {
  const town = useTown();
  // An ad for one town (…?town=wellesley) swaps "in Natick" for "near Wellesley".
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
          <CtaPair location="hero" label={page.ctaLabel} className="mt-8" />
          <p className="mt-5 flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            <span>
              {CLINIC.address.street}, {CLINIC.address.city}, MA ·{" "}
              {town && town !== "Natick"
                ? `A short drive from ${town}`
                : "Minutes from Wellesley, Framingham, Needham & Sherborn"}
            </span>
          </p>
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
                  Fellowship-trained in Headache &amp; Interventional Pain
                </li>
                <li className="flex items-start gap-2">
                  <BadgeCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  Trained at Yale &amp; Dartmouth
                </li>
              </ul>
              <a
                href={CLINIC.googleMapsUrl}
                target="_blank"
                rel="noopener"
                data-track="review_click"
                onClick={() => track("review_click", { location: "hero" })}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary-deep"
              >
                <span className="flex text-[#f5a623]" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </span>
                {GOOGLE_RATING.rating.toFixed(1)} on Google
              </a>
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
}
