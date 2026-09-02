import { BadgeCheck, Clock3, GraduationCap, Star } from "lucide-react";
import drTolebeyan from "@/assets/dr-tolebeyan.jpg";
import { CtaPair } from "./Ctas";
import { CLINIC, CONDITIONS } from "@/lib/site";

const TRUST = [
  { icon: BadgeCheck, label: "Board-certified physician" },
  { icon: GraduationCap, label: "Fellowship-trained: Yale & Dartmouth" },
  { icon: Clock3, label: "60-minute new patient consultations" },
  { icon: Star, label: "No referral required" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-neural">
      <div className="container-page grid items-center gap-12 pb-16 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-24 lg:pt-20">
        <div className="animate-fade-up">
          <p className="eyebrow eyebrow-dash">Pain, Headache &amp; Nerve Specialists · Natick, MA</p>
          <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.08] text-foreground sm:text-5xl lg:text-[3.6rem]">
            Specialized Care for Persistent Pain &amp; Neurological Conditions
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Turquoise Institute provides personalized evaluation and treatment for spine pain,
            migraine, headache, sciatica, neuropathy, facial pain and TMJ pain — focused on finding
            the cause, not just masking the symptoms. Serving patients throughout MetroWest &amp;
            Greater Boston.
          </p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Conditions treated">
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

          <CtaPair location="hero" className="mt-8" />

          <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-3 text-sm font-semibold text-foreground/80 sm:grid-cols-2">
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

        {/* Visual composition */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-mint via-transparent to-mint-deep/70 blur-2xl"
          />
          <div className="relative overflow-hidden rounded-[2rem] bg-mint shadow-soft">
            <img
              src={drTolebeyan}
              alt={`${CLINIC.doctor.name}, Founder and Medical Director of Turquoise Institute`}
              width={682}
              height={1024}
              fetchPriority="high"
              decoding="async"
              className="aspect-[4/5] w-full object-cover object-top lg:aspect-[3/3.4]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent p-6 pt-24 text-ink-foreground">
              <p className="font-display text-xl font-semibold">{CLINIC.doctor.name}</p>
              <p className="mt-1 text-sm text-ink-muted">
                {CLINIC.doctor.title} · Interventional Pain &amp; Headache/Facial Pain Medicine
              </p>
            </div>
          </div>

          {/* Floating credential card */}
          <div className="absolute -left-3 top-8 hidden max-w-[15rem] rounded-2xl border border-border bg-card/95 p-4 shadow-card backdrop-blur animate-float sm:block lg:-left-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary-deep">
              Former Director
            </p>
            <p className="mt-1 text-sm font-semibold leading-snug text-foreground">
              Headache &amp; Facial Pain Program, Tufts Medical Center
            </p>
          </div>

          {/* Neural motif */}
          <svg
            aria-hidden="true"
            viewBox="0 0 200 200"
            className="absolute -bottom-10 -right-8 -z-0 hidden h-44 w-44 text-primary/25 lg:block"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            <circle cx="100" cy="100" r="96" />
            <circle cx="100" cy="100" r="70" />
            <circle cx="100" cy="100" r="44" />
            <circle cx="100" cy="100" r="18" />
            <path d="M100 4v192M4 100h192M32 32l136 136M168 32L32 168" />
          </svg>
        </div>
      </div>
    </section>
  );
}
