import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  ClipboardList,
  GraduationCap,
  HeartHandshake,
  Receipt,
  Stethoscope,
  Timer,
  X,
} from "lucide-react";
import headshot from "@/assets/photos/dr-amir-headshot.webp";
import officePhoto from "@/assets/photos/dr-amir-office-dartmouth.jpg";
import { CLINIC, CONDITIONS, CREDENTIALS } from "@/lib/site";
import type { PageCopy } from "@/lib/condition-pages";
import { track } from "@/lib/track";
import { CtaPair } from "./Ctas";

/** Thin credibility strip directly under the hero. */
export function ProofBar() {
  const items = [
    { icon: GraduationCap, label: "Fellowship-trained at Yale & Dartmouth" },
    { icon: BadgeCheck, label: "Board-certified physician" },
    { icon: Timer, label: "60-minute first visits" },
    { icon: CalendarCheck, label: "No referral needed" },
  ];
  return (
    <div className="border-y border-border bg-card">
      <ul className="container-page grid grid-cols-2 gap-x-4 gap-y-3 py-5 text-[13px] font-medium text-foreground/85 sm:text-sm lg:grid-cols-4">
        {items.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-2.5">
            <Icon className="size-5 shrink-0 text-primary-deep" aria-hidden="true" />
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PainPoints({ page }: { page: PageCopy }) {
  return (
    <section className="section-pad">
      <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
        <div>
          <h2 className="text-balance text-3xl leading-tight text-heading sm:text-4xl">
            {page.painTitle}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{page.painNote}</p>
          <CtaPair location="pain" className="mt-8" />
        </div>
        <ul className="space-y-3">
          {page.painPoints.map((p) => (
            <li
              key={p}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4 text-[15px] leading-relaxed text-foreground shadow-card sm:p-5 sm:text-base"
            >
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-mint-deep text-primary-deep">
                <X className="size-3.5" aria-hidden="true" strokeWidth={3} />
              </span>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Home page: "What brings you in?" — sends each visitor to their condition page. */
export function ConditionPicker() {
  return (
    <section className="section-pad bg-mint" id="conditions">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow">What brings you in?</p>
          <h2 className="mt-3 text-balance text-3xl leading-tight text-heading sm:text-4xl">
            Choose what's bothering you most
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See exactly how Dr. Amir approaches it — and what your options are.
          </p>
        </div>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CONDITIONS.map((c) => (
            <li key={c.id}>
              <Link
                to="/$condition"
                params={{ condition: c.id }}
                onClick={() => track("condition_card_click", { condition: c.id })}
                className="group flex h-full items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-card-hover"
              >
                <span>
                  <span className="block font-display text-lg text-foreground">{c.name}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{c.hook}</span>
                </span>
                <ArrowRight
                  className="size-5 shrink-0 text-primary-deep transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Options({ page }: { page: PageCopy }) {
  if (page.options.length === 0) return null;
  return (
    <section className="section-pad bg-mint" id="options">
      <div className="container-page">
        <div className="max-w-2xl">
          <h2 className="text-balance text-3xl leading-tight text-heading sm:text-4xl">
            {page.optionsTitle}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{page.optionsIntro}</p>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {page.options.map((o) => (
            <li key={o.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h3 className="font-display text-xl text-foreground">{o.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{o.text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-muted-foreground">
          Your options depend on your diagnosis — Dr. Amir will walk you through what makes sense
          for you at your first visit.
        </p>
        {page.whySpecialist ? (
          <div className="mt-8 flex items-start gap-4 rounded-2xl border border-primary/30 bg-card p-5 sm:p-6">
            <BadgeCheck className="mt-0.5 size-6 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <p className="font-display text-lg text-heading">Why see a specialist?</p>
              <p className="mt-1 leading-relaxed text-foreground/80">{page.whySpecialist}</p>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function MeetDoctor() {
  return (
    <section className="section-pad" id="dr-amir">
      <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <img
            src={headshot}
            alt={`${CLINIC.doctor.name}, Founder & Medical Director`}
            width={682}
            height={1024}
            loading="lazy"
            className="aspect-[4/5] w-full rounded-3xl object-cover object-[50%_20%] shadow-soft"
          />
          <img
            src={officePhoto}
            alt="Dr. Amir's diplomas in the Natick office"
            width={720}
            height={1100}
            loading="lazy"
            className="absolute -bottom-6 -right-4 hidden w-32 rounded-2xl border-4 border-background object-cover object-top shadow-soft [aspect-ratio:4/5] sm:block lg:-right-8 lg:w-40"
          />
        </div>
        <div>
          <p className="eyebrow">Meet your doctor</p>
          <h2 className="mt-3 text-balance text-3xl leading-tight text-heading sm:text-4xl">
            {CLINIC.doctor.name}
          </h2>
          <p className="font-script mt-2 text-xl text-primary-deep">
            Relief from pain. Renewal of life.
          </p>
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-foreground/80">
            <p>
              Dr. Amir is a board-certified physician with fellowship training in both Headache
              &amp; Facial Pain Medicine and Interventional Pain Medicine. He previously directed
              the Headache and Facial Pain Program at Tufts Medical Center.
            </p>
            <p>
              He founded Turquoise Institute so patients could get what's missing in most
              appointments: time. Your first visit is a full hour with him, and he explains what's
              going on in plain language before suggesting any treatment.
            </p>
          </div>
          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {CREDENTIALS.map((c) => (
              <li key={c} className="flex items-start gap-2.5 text-[15px] text-foreground">
                <BadgeCheck
                  className="mt-0.5 size-5 shrink-0 text-primary-deep"
                  aria-hidden="true"
                />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    {
      icon: ClipboardList,
      title: "Request your visit",
      text: "Send the form or call. Our team finds a time that suits you — no referral needed.",
    },
    {
      icon: Stethoscope,
      title: "Your 60-minute visit",
      text: "Dr. Amir hears your full story, examines you and reviews your scans. Bring your medication list.",
    },
    {
      icon: HeartHandshake,
      title: "Leave with a clear plan",
      text: "You'll know what's driving your pain and your options. Treatment can often start the same day.",
    },
  ];
  return (
    <section className="section-pad bg-ink text-ink-foreground" id="how-it-works">
      <div className="container-page">
        <h2 className="max-w-2xl text-balance text-3xl leading-tight text-ink-foreground sm:text-4xl">
          What happens next
        </h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-primary text-ink">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="font-label text-sm uppercase tracking-wider text-primary-soft">
                  Step {i + 1}
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl">{title}</h3>
              <p className="mt-2 leading-relaxed text-ink-muted">{text}</p>
            </li>
          ))}
        </ol>
        <CtaPair location="steps" tone="dark" className="mt-10" />
      </div>
    </section>
  );
}

/** Direct-pay explained up front, so the people who call are ready to book. */
export function CostUpfront() {
  return (
    <section className="py-14 sm:py-16">
      <div className="container-page">
        <div className="flex flex-col gap-6 rounded-3xl border border-border bg-mint p-6 sm:p-10 md:flex-row md:items-center">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-card text-primary-deep shadow-card">
            <Receipt className="size-7" aria-hidden="true" />
          </span>
          <div className="flex-1">
            <h2 className="text-2xl leading-tight text-heading sm:text-3xl">
              About cost &amp; insurance
            </h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-foreground/80">
              We're a direct-pay specialist practice. That means no referrals, no waiting on
              insurance approvals, and full visits instead of rushed ones. You'll get an itemized
              receipt to submit to your insurer for possible out-of-network reimbursement — and our
              team will go over costs with you before you book.
            </p>
          </div>
          <a
            href={CLINIC.insuranceUrl}
            target="_blank"
            rel="noopener"
            className="shrink-0 font-semibold text-primary-deep underline underline-offset-4"
          >
            Payment policy
          </a>
        </div>
      </div>
    </section>
  );
}
