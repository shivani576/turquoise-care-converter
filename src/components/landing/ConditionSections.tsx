import { BadgeCheck, Check, Clock3, GraduationCap, Star, Stethoscope } from "lucide-react";
import spine from "@/assets/conditions/spine.jpg";
import facial from "@/assets/conditions/facial.jpg";
import headache from "@/assets/conditions/headache.jpg";
import migraine from "@/assets/conditions/migraine.jpg";
import sciatica from "@/assets/conditions/sciatica.jpg";
import neuropathy from "@/assets/conditions/neuropathy.jpg";
import tmj from "@/assets/conditions/tmj.jpg";
import { CtaPair } from "./Ctas";
import type { Condition, ConditionId } from "@/lib/site";
import type { ConditionPage } from "@/lib/condition-pages";

export const CONDITION_IMAGES: Record<ConditionId, string> = {
  "spine-pain": spine,
  "facial-pain": facial,
  headache,
  migraine,
  sciatica,
  neuropathy,
  "tmj-pain": tmj,
};

const TRUST = [
  { icon: BadgeCheck, label: "Board-certified physician" },
  { icon: GraduationCap, label: "Fellowship-trained: Yale & Dartmouth" },
  { icon: Clock3, label: "60-minute new patient consultations" },
  { icon: Star, label: "No referral required" },
];

export function ConditionHero({ condition, page }: { condition: Condition; page: ConditionPage }) {
  return (
    <section id="top" className="relative overflow-hidden bg-neural">
      <div className="container-page pb-14 pt-14 lg:pb-20 lg:pt-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
          <div className="animate-fade-up">
            <p className="eyebrow eyebrow-dash">{page.eyebrow}</p>
            <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.08] text-foreground sm:text-5xl lg:text-[4rem]">
              {page.headline}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{page.subheadline}</p>
            <CtaPair location="hero" className="mt-7" />
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/50 bg-card shadow-soft">
            <img
              src={CONDITION_IMAGES[condition.id]}
              alt={condition.alt}
              width={900}
              height={600}
              className="h-full w-full object-cover"
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/60 to-transparent p-5 pt-16">
              <p className="text-sm font-semibold text-ink-foreground">
                Specialized {condition.name.toLowerCase()} care in Natick, MA
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-7 lg:mt-16">
          <ul className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm font-semibold text-foreground/80 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2.5">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-mint text-primary-deep">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function ConditionSigns({ condition, page }: { condition: Condition; page: ConditionPage }) {
  return (
    <section id="symptoms" className="section-pad bg-background">
      <div className="container-page grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow eyebrow-dash">Does this sound like you?</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            Common Signs of {condition.name}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{condition.description}</p>
          <ul className="mt-7 space-y-3" aria-label={`${condition.name} signs and symptoms`}>
            {page.signs.map((s) => (
              <li key={s} className="flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3 text-foreground">
                <Check className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <span className="font-medium">{s}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[2rem] border-l-4 border-primary bg-mint/60 p-7 lg:sticky lg:top-28 lg:p-9">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-card text-primary-deep shadow-card">
            <Stethoscope className="size-6" aria-hidden="true" />
          </span>
          <h3 className="mt-5 font-display text-2xl font-semibold text-foreground">
            How We Evaluate {condition.name}
          </h3>
          <p className="mt-3 leading-relaxed text-foreground/80">{page.evaluation}</p>
          <p className="mt-5 text-sm font-semibold text-primary-deep">{page.whySpecialist}</p>
          <CtaPair location="symptoms" className="mt-7" />
        </div>
      </div>
    </section>
  );
}

export function ConditionTreatments({ condition, page }: { condition: Condition; page: ConditionPage }) {
  return (
    <section id="treatment" className="section-pad bg-sand">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">Treatment options</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            A Personalized Plan for Your {condition.name}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Every plan is built after your evaluation — conservative, minimally invasive or
            regenerative, matched to your condition and your goals.
          </p>
        </div>
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {page.treatments.map((t, i) => (
            <li key={t.title} className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-card">
              <span className="font-display text-3xl font-semibold text-primary">0{i + 1}</span>
              <h3 className="mt-4 text-lg font-bold text-foreground">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="text-sm font-semibold text-muted-foreground">
            Not sure if {condition.name.toLowerCase()} is what you have? Tell us what you're
            experiencing — we'll help.
          </p>
          <CtaPair location="treatment" />
        </div>
      </div>
    </section>
  );
}
