import { Check, Star } from "lucide-react";
import headshot from "@/assets/photos/dr-amir-headshot.jpg";
import { CLINIC, GOOGLE_RATING } from "@/lib/site";
import type { PageCopy } from "@/lib/condition-pages";
import { LeadForm } from "./LeadForm";

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
 * First screen: who you'll see (real headshot), one headline, one sentence,
 * three short reasons, and the form. Phones: copy → form → doctor.
 */
export function Hero({ page }: { page: PageCopy }) {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-mint via-background to-background">
      <div className="container-page relative grid gap-7 pb-12 pt-8 [grid-template-areas:'copy'_'form'_'doctor'] sm:pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-x-14 lg:gap-y-0 lg:pb-16 lg:pt-14 lg:[grid-template-areas:'copy_form'_'doctor_form']">
        <div className="min-w-0 [grid-area:copy]">
          <p className="eyebrow">{page.eyebrow}</p>
          <h1 className="mt-3 text-balance text-[2.05rem] leading-[1.1] text-heading sm:text-5xl lg:text-[3.2rem]">
            <Headline text={page.headline} highlight={page.highlight} />
          </h1>
          <p className="mt-4 max-w-xl text-[1.07rem] leading-relaxed text-foreground/80 sm:text-lg">
            {page.subheadline}
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
            {page.heroPoints.map((p) => (
              <li key={p} className="flex items-center gap-2 text-[15px] font-medium text-foreground">
                <Check className="size-4 shrink-0 text-primary" aria-hidden="true" strokeWidth={3} />
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Who you'll see: professional headshot, credentials, Google rating */}
        <div className="min-w-0 [grid-area:doctor] lg:mt-8">
          <div className="flex items-center gap-5 rounded-3xl border border-border bg-card p-4 shadow-card sm:max-w-xl sm:p-5">
            <img
              src={headshot}
              alt={`${CLINIC.doctor.name}, Founder & Medical Director of Turquoise Institute`}
              width={682}
              height={1024}
              className="h-36 w-28 shrink-0 rounded-2xl object-cover object-[50%_15%] sm:h-40 sm:w-32"
              fetchPriority="high"
            />
            <div className="min-w-0">
              <p className="font-label text-xs uppercase tracking-wider text-primary-deep">You'll see</p>
              <p className="mt-1 font-display text-xl leading-tight text-heading">{CLINIC.doctor.name}</p>
              <p className="mt-1 text-sm leading-snug text-muted-foreground">
                Fellowship-trained in Headache &amp; Interventional Pain · Yale &amp; Dartmouth
              </p>
              <a
                href={CLINIC.googleMapsUrl}
                target="_blank"
                rel="noopener"
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary-deep"
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

        <div id="consultation-top" className="min-w-0 scroll-mt-24 [grid-area:form]">
          <LeadForm location="hero" defaultConcern={page.formConcern} heading="Request an appointment" ctaLabel={page.ctaLabel} />
        </div>
      </div>
    </section>
  );
}
