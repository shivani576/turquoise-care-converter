import { Crosshair, GraduationCap, Hourglass, ScanLine, Dna } from "lucide-react";
import drTolebeyan from "@/assets/dr-tolebeyan.jpg";
import { CtaPair } from "./Ctas";
import { CLINIC } from "@/lib/site";

const DIFFERENTIATORS = [
  {
    icon: Crosshair,
    title: "Root-cause focused, not symptom-masking",
    text: "We identify the underlying source of your pain so treatment can be targeted — rather than cycling through medications that only cover it up.",
  },
  {
    icon: GraduationCap,
    title: "Dual fellowship-trained specialist expertise",
    text: "Dr. Tolebeyan is board-certified with fellowship training in both Interventional Pain Medicine and Headache & Facial Pain Medicine (Yale and Dartmouth), and formerly directed the Headache and Facial Pain Program at Tufts Medical Center.",
  },
  {
    icon: Hourglass,
    title: "Unhurried, concierge-style care",
    text: "New patient visits are typically 60 minutes. You are listened to, examined thoroughly and never rushed — with support available between visits.",
  },
  {
    icon: ScanLine,
    title: "Evidence-based, minimally invasive procedures",
    text: "Image- and ultrasound-guided options such as peripheral nerve blocks, trigger point and joint injections, and migraine procedures — often available the same day as your consultation.",
  },
  {
    icon: Dna,
    title: "Regenerative options when appropriate",
    text: "Orthobiologic therapies such as PRP may be considered to support your body's own healing for suitable spine, joint and tendon conditions.",
  },
];

export function Why() {
  return (
    <section id="why" className="section-pad relative overflow-hidden bg-ink bg-ink-glow text-ink-foreground">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow eyebrow-dash text-primary-soft">Why Turquoise Institute</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.75rem]">
              Care Built Around You — Not Just Your Symptoms.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">
              An independent, physician-led practice designed to give complex pain the time and
              expertise it requires.
            </p>
            <div className="relative mt-8 overflow-hidden rounded-3xl border border-ink-foreground/10">
              <img
                src={drTolebeyan}
                alt={`${CLINIC.doctor.name}, Founder and Medical Director of Turquoise Institute`}
                width={682}
                height={1024}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/80 to-transparent p-6 pt-24">
                <p className="font-display text-2xl font-semibold text-ink-foreground">{CLINIC.doctor.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                  {CLINIC.doctor.title} · Board-Certified · Fellowship-Trained at Yale &amp; Dartmouth
                </p>
              </div>
            </div>
            <p className="mt-4 border-l-2 border-primary pl-4 text-sm leading-relaxed text-ink-muted">
              Former Director of the Headache &amp; Facial Pain Program at Tufts Medical Center.
            </p>
          </div>

          <ol className="space-y-4">
            {DIFFERENTIATORS.map(({ icon: Icon, title, text }, i) => (
              <li
                key={title}
                className="flex gap-5 rounded-3xl border border-ink-foreground/10 bg-ink-foreground/[0.04] p-6 backdrop-blur-sm transition-colors hover:bg-ink-foreground/[0.07]"
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/20 text-primary-soft">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="font-display text-xs text-ink-muted">0{i + 1}</span>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold leading-snug">{title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-muted">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-14 flex justify-center">
          <CtaPair location="why" tone="dark" />
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  {
    n: "01",
    title: "Understand",
    text: "Your first visit is typically 60 minutes. We listen closely to your symptoms, how they affect your life, your medical history and what you've already tried — without rushing.",
  },
  {
    n: "02",
    title: "Evaluate",
    text: "A comprehensive examination and review of any imaging (MRI, CT, X-ray), with image-guided or ultrasound assessment when helpful, to pinpoint the likely source of your pain.",
  },
  {
    n: "03",
    title: "Treat",
    text: "A personalized plan built around your diagnosis and goals — conservative care, minimally invasive procedures, or regenerative options. In many cases treatment can begin the same day, with telemedicine available for follow-up.",
  },
];

export function Approach() {
  return (
    <section id="approach" className="section-pad bg-background">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">What to expect</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            How Turquoise Institute Approaches Care
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            No referral is needed. Here is exactly what happens when you reach out.
          </p>
        </div>

        <ol className="relative mt-14 grid gap-6 lg:grid-cols-3">
          <div aria-hidden="true" className="absolute left-0 right-0 top-14 hidden h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent lg:block" />
          {STEPS.map((s) => (
            <li key={s.n} className="relative rounded-3xl border border-border bg-card p-8 shadow-card">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-mint font-display text-xl font-semibold text-primary-deep">
                {s.n}
              </span>
              <h3 className="mt-6 font-display text-2xl font-semibold text-foreground">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-col items-center gap-4">
          <CtaPair location="approach" />
        </div>
      </div>
    </section>
  );
}
