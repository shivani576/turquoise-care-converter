import { Quote } from "lucide-react";
import lifeFamily from "@/assets/life-family.jpg";
import { CLINIC, TESTIMONIALS } from "@/lib/site";
import { CtaPair } from "./Ctas";

const GOALS = [
  "Working comfortably through a full day",
  "Sleeping through the night",
  "Moving without bracing for pain",
  "Being present with family and friends",
  "Returning to the activities you've put on hold",
];

export function Journey() {
  return (
    <section className="section-pad bg-mint/50">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow eyebrow-dash">Your goals, our focus</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            Get Back to the Things That Matter.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Treatment is never the end goal — your life is. Every plan we build starts with a simple
            question: what would you do more of if pain got in the way less?
          </p>
          <ul className="mt-7 space-y-3">
            {GOALS.map((g) => (
              <li key={g} className="flex items-center gap-3 text-foreground">
                <span className="size-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                <span className="font-medium">{g}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">
            Every patient and condition is different; outcomes vary and are discussed honestly during
            your evaluation.
          </p>
        </div>
        <div className="relative">
          <div className="overflow-hidden rounded-[2rem] shadow-soft">
            <img
              src={lifeFamily}
              alt="A mother laughing while walking with her teenage children and their dog on a tree-lined New England street"
              width={1200}
              height={912}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div aria-hidden="true" className="absolute -bottom-5 -left-5 -z-10 h-40 w-40 rounded-full bg-primary/15 blur-2xl" />
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="section-pad bg-background">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">Patient reviews</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            Real Stories From Our Patients
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Reviews shared by patients of {CLINIC.name}.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <li key={t.name} className="flex flex-col rounded-3xl border border-border bg-card p-7 shadow-card">
              <Quote className="size-8 text-primary/40" aria-hidden="true" />
              <blockquote className="mt-4 flex-1">
                <p className="leading-relaxed text-foreground/85">"{t.quote}"</p>
              </blockquote>
              <footer className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <span className="flex size-10 items-center justify-center rounded-full bg-mint font-display text-base font-semibold text-primary-deep" aria-hidden="true">
                  {t.name.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-bold text-foreground">{t.name}</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-deep">{t.context}</p>
                </div>
              </footer>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <CtaPair location="testimonials" />
        </div>
      </div>
    </section>
  );
}
