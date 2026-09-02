import { HeartHandshake, Microscope, Stethoscope, UserRound, Briefcase, Moon, Footprints, Brain, Home, Sparkles } from "lucide-react";
import consultation from "@/assets/consultation.jpg";

const TRUST_STRIP = [
  { icon: UserRound, title: "Personalized Care", text: "Concierge-style, unhurried visits built around you." },
  { icon: Stethoscope, title: "Experienced Clinical Team", text: "Board-certified, dual fellowship-trained leadership." },
  { icon: Microscope, title: "Comprehensive Evaluation", text: "Detailed history, exam and image-guided assessment." },
  { icon: HeartHandshake, title: "Patient-Centered Treatment", text: "Evidence-based, minimally invasive options." },
];

export function TrustStrip() {
  return (
    <section aria-label="Why patients trust Turquoise Institute" className="border-y border-border bg-card">
      <div className="container-page grid grid-cols-2 divide-border py-6 lg:grid-cols-4 lg:divide-x lg:py-7">
        {TRUST_STRIP.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-start gap-3 px-2 py-3 lg:px-6 lg:py-0 lg:first:pl-0">
            <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-mint text-primary-deep">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-bold text-foreground">{title}</p>
              <p className="mt-0.5 hidden text-xs leading-snug text-muted-foreground sm:block">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const IMPACTS = [
  { icon: Briefcase, label: "Work & focus" },
  { icon: Moon, label: "Sleep" },
  { icon: Footprints, label: "Mobility" },
  { icon: Brain, label: "Concentration" },
  { icon: Home, label: "Daily activities" },
  { icon: Sparkles, label: "Quality of life" },
];

export function Problem() {
  return (
    <section className="section-pad bg-background">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative order-2 lg:order-1">
          <div className="overflow-hidden rounded-[2rem] shadow-soft">
            <img
              src={consultation}
              alt="Patient smiling during an unhurried consultation with a clinician"
              width={756}
              height={640}
              loading="lazy"
              decoding="async"
              className="aspect-[6/5] w-full object-cover"
            />
          </div>
          <blockquote className="absolute -bottom-6 left-4 right-4 rounded-2xl border border-border bg-card p-5 shadow-card sm:left-auto sm:right-6 sm:max-w-xs">
            <p className="font-display text-lg font-semibold leading-snug text-foreground">
              "Your pain is real. We listen, we understand, and we're here to help."
            </p>
            <footer className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-primary-deep">
              Turquoise Institute
            </footer>
          </blockquote>
        </div>

        <div className="order-1 lg:order-2">
          <p className="eyebrow eyebrow-dash">We understand you</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            Pain Can Affect More Than Just Your Body.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Persistent pain rarely stays in one place. It follows you to work, keeps you up at night,
            and slowly narrows what you feel able to do. Many of our patients arrive after months — or
            years — of being told their pain is "normal" or hard to explain.
          </p>

          <ul className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {IMPACTS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-3.5 py-3 text-sm font-semibold text-foreground">
                <Icon className="size-4 text-primary" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>

          <div className="mt-9 rounded-2xl border-l-4 border-primary bg-mint/60 p-6">
            <h3 className="font-display text-xl font-semibold text-foreground">
              Understanding the Cause Is the First Step Toward Better Care.
            </h3>
            <p className="mt-3 leading-relaxed text-foreground/80">
              Turquoise Institute is built around careful evaluation and diagnosis. Rather than
              treating symptoms in isolation, we work to identify the underlying source of your pain
              and design an individualized plan — conservative, minimally invasive or regenerative —
              that fits your condition and your goals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
