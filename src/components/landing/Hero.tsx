import { Check, Star } from "lucide-react";
import heroPhoto from "@/assets/photos/dr-amir-white-coat-portrait.jpg";
import { CLINIC, GOOGLE_RATING } from "@/lib/site";
import type { PageCopy } from "@/lib/condition-pages";
import { LeadForm } from "./LeadForm";

function Headline({ text, highlight }: { text: string; highlight?: string }) {
  if (!highlight || !text.includes(highlight)) return <>{text}</>;
  const [before, after] = text.split(highlight);
  return (
    <>
      {before}
      <span className="text-primary-deep">{highlight}</span>
      {after}
    </>
  );
}

export function Hero({ page }: { page: PageCopy }) {
  return (
    <section id="top" className="relative overflow-hidden bg-mint">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-neural opacity-60" />
      {/* Phones: headline → form → proof. Desktop: copy left, form right. */}
      <div className="container-page relative grid gap-7 pb-12 pt-8 [grid-template-areas:'copy'_'form'_'points'] sm:pt-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-x-12 lg:gap-y-0 lg:pb-20 lg:pt-16 lg:[grid-template-areas:'copy_form'_'points_form']">
        <div className="min-w-0 animate-fade-up [grid-area:copy]">
          <p className="eyebrow">{page.eyebrow}</p>
          <h1 className="mt-4 text-balance text-[2rem] leading-[1.12] text-foreground sm:text-5xl lg:text-[3.35rem]">
            <Headline text={page.headline} highlight={page.highlight} />
          </h1>
          <p className="mt-5 max-w-2xl text-[1.06rem] leading-relaxed text-foreground/80 sm:text-lg">
            {page.subheadline}
          </p>
        </div>

        <div className="min-w-0 [grid-area:points]">
          <ul className="mt-1 space-y-2.5 lg:mt-6">
            {page.heroPoints.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[15px] font-medium text-foreground sm:text-base">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary-deep text-white">
                  <Check className="size-3.5" aria-hidden="true" strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>

          {/* Doctor card: real photo, name, Google rating */}
          <div className="mt-8 flex items-center gap-4 rounded-2xl border border-border bg-card/90 p-3 pr-5 shadow-card sm:max-w-lg">
            <img
              src={heroPhoto}
              alt={`${CLINIC.doctor.name} in his Natick office`}
              width={404}
              height={718}
              className="h-28 w-24 shrink-0 rounded-xl object-cover object-top sm:h-32 sm:w-28"
              fetchPriority="high"
            />
            <div className="min-w-0">
              <p className="font-display text-lg leading-tight text-foreground">{CLINIC.doctor.name}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Interventional Pain &amp; Headache Specialist
              </p>
              <a
                href={CLINIC.googleMapsUrl}
                target="_blank"
                rel="noopener"
                className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary-deep"
              >
                <span className="flex text-[#f5a623]" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </span>
                {GOOGLE_RATING.rating.toFixed(1)} on Google
              </a>
            </div>
          </div>
        </div>

        <div id="consultation-top" className="min-w-0 [grid-area:form] lg:pt-2">
          <LeadForm location="hero" defaultConcern={page.formConcern} heading="Request an appointment" ctaLabel={page.ctaLabel} />
        </div>
      </div>
    </section>
  );
}
