import { BadgeCheck, Clock3, GraduationCap, Star } from "lucide-react";
import { CtaPair } from "./Ctas";
import { CONDITIONS } from "@/lib/site";

const TRUST = [
  { icon: BadgeCheck, label: "Board-certified physician" },
  { icon: GraduationCap, label: "Fellowship-trained: Yale & Dartmouth" },
  { icon: Clock3, label: "60-minute new patient consultations" },
  { icon: Star, label: "No referral required" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-neural">
      <div className="container-page pb-14 pt-14 lg:pb-20 lg:pt-20">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-20">
          <div className="animate-fade-up">
          <p className="eyebrow eyebrow-dash">Pain, Headache &amp; Nerve Specialists · Natick, MA</p>
          <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.08] text-foreground sm:text-5xl lg:text-[4.25rem]">
            Find the Source of Your Pain. Move Forward With Confidence.
          </h1>
          </div>

          <div className="border-l-2 border-primary pl-6 lg:mb-2 lg:pl-8">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Personalized evaluation and treatment for persistent pain, migraine, headache and
              nerve conditions — with the time and expertise to understand what is really happening.
            </p>
            <CtaPair location="hero" className="mt-7" />
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

        <ul className="mt-7 flex flex-wrap gap-2" aria-label="Conditions treated">
          {CONDITIONS.map((c) => (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                className="inline-flex rounded-full border border-primary/25 bg-card/80 px-3.5 py-1.5 text-xs font-bold text-primary-deep transition-colors hover:border-primary hover:bg-mint"
              >
                {c.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
