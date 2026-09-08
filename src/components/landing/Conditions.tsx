import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import migraine from "@/assets/conditions/migraine.jpg";
import botoxMigraine from "@/assets/conditions/botox-migraine.jpg";
import tmj from "@/assets/conditions/tmj.jpg";
import botulinum from "@/assets/conditions/botulinum-spasticity.jpg";
import prp from "@/assets/conditions/prp.jpg";
import shoulder from "@/assets/conditions/shoulder.jpg";
import joint from "@/assets/conditions/joint-osteoarthritis.jpg";
import { CONDITIONS, type ConditionId } from "@/lib/site";
import { track } from "@/lib/track";
import { CtaPair } from "./Ctas";

const IMAGES: Record<ConditionId, string> = {
  "migraine-treatment": migraine,
  "botox-for-migraine": botoxMigraine,
  "tmj-disorder": tmj,
  "botulinum-toxin-spasticity": botulinum,
  "prp-injections": prp,
  "shoulder-pain": shoulder,
  "joint-pain-osteoarthritis": joint,
};


export function Conditions() {
  return (
    <section id="conditions" className="section-pad bg-sand">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">Conditions we treat</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            Specialized Care for the Conditions Affecting Your Life
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Seven areas of focused expertise — each evaluated with the same careful, cause-first
            approach. Recognize your symptoms below and take the next step.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CONDITIONS.map((c, i) => (
            <li
              key={c.id}
              id={c.id}
              className={
                i === CONDITIONS.length - 1
                  ? "sm:col-span-2 lg:col-span-1 lg:col-start-2"
                  : undefined
              }
            >
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img
                    src={IMAGES[c.id]}
                    alt={c.alt}
                    width={900}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                  <div className="absolute inset-x-5 bottom-4">
                    <h3 className="font-display text-2xl font-semibold text-ink-foreground">{c.name}</h3>
                    <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
                      {c.scope}
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="leading-relaxed text-foreground/80">{c.description}</p>
                  <ul className="mt-4 space-y-1.5" aria-label={`Common ${c.name.toLowerCase()} symptoms`}>
                    {c.symptoms.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-sm font-medium text-foreground/75">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                        {s}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-4">
                    <a
                      href="#consultation"
                      className="js-track-book text-sm font-bold text-primary-deep underline-offset-4 hover:underline"
                      data-track="book_consultation_click"
                      data-location={`condition-${c.id}`}
                      onClick={() => track("book_consultation_click", { location: `condition-${c.id}`, condition: c.name })}
                    >
                      Book a consultation
                    </a>
                    <Link
                      to="/$condition"
                      params={{ condition: c.id }}
                      className="js-track-condition inline-flex items-center gap-1 rounded-full border border-border px-3.5 py-1.5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary-deep"
                      data-track="condition_card_click"
                      data-condition={c.id}
                      onClick={() => track("condition_card_click", { condition: c.name })}
                    >
                      Learn more <ArrowUpRight className="size-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex flex-col items-center gap-4 text-center">
          <p className="text-sm font-semibold text-muted-foreground">
            Not sure which category fits? Tell us what you're experiencing — we'll help.
          </p>
          <CtaPair location="conditions" />
        </div>
      </div>
    </section>
  );
}
