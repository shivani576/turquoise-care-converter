import { BadgeCheck, Clock3, GraduationCap, Star } from "lucide-react";
import { CtaPair } from "./Ctas";
import { CONDITIONS } from "@/lib/site";
import heroTreatmentImg from "@/assets/hero-treatment.jpg";

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
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
          <div className="animate-fade-up">
            <p className="eyebrow eyebrow-dash">Pain, Headache &amp; Nerve Specialists · Natick, MA</p>
            <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.08] text-foreground sm:text-5xl lg:text-[4.25rem]">
              Find the Source of Your Pain. Move Forward With Confidence.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Personalized evaluation and treatment for persistent pain, migraine, headache and
              nerve conditions — with the time and expertise to understand what is really happening.
            </p>
            <CtaPair location="hero" className="mt-7" />
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/50 bg-card shadow-soft">
              <img
                src={heroTreatmentImg}
                alt="Physician examining a patient during a pain consultation at Turquoise Institute in Natick, MA"
                width={1344}
                height={896}
                className="h-full w-full object-cover"
                fetchPriority="high"
                decoding="async"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/60 to-transparent p-5 pt-16">
                <p className="text-sm font-semibold text-white/95">
                  Expert, hands-on evaluation for lasting relief
                </p>
              </div>
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
