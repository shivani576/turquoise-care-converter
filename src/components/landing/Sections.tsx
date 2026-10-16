import { useRef } from "react";
import {
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  FlaskConical,
  GraduationCap,
  Landmark,
  Receipt,
  ScanLine,
  Syringe,
  Timer,
  Video,
  X,
  Zap,
} from "lucide-react";
import headshot from "@/assets/photos/dr-amir-headshot.webp";
import { CLINIC, CREDENTIALS } from "@/lib/site";
import type { PageCopy } from "@/lib/condition-pages";
import { PainMap, type PainArea } from "./PainMap";

/** Thin credibility strip directly under the hero. */
export function ProofBar() {
  const items = [
    { icon: GraduationCap, label: "Fellowships at Yale & Dartmouth" },
    { icon: Landmark, label: "Former director, Tufts headache & facial pain program" },
    { icon: Timer, label: "60-minute first visits" },
    { icon: Zap, label: "Same-day treatment often possible" },
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

/**
 * Services offered, with a real photo each. Facts only from the condition pages.
 * The section heading avoids condition names; the cards may name them.
 */
const SERVICES = [
  {
    name: "Migraine",
    area: "temples" as PainArea,
    text: "A clear diagnosis and a prevention plan built around your attack pattern, plus a plan for the attacks you still get.",
  },
  {
    name: "Headache",
    area: "head" as PainArea,
    text: "Many headaches are a mix of types. Sorting out exactly which you have changes which treatments work.",
  },
  {
    name: "Botox for chronic migraine",
    area: "head-neck" as PainArea,
    text: "For 15 or more headache days a month: quick injections about every 12 weeks, following the FDA-approved protocol.",
  },
  {
    name: "PRP injections",
    area: "shoulder-knee" as PainArea,
    text: "Your own platelets, prepared in the office and injected with image guidance into an injured tendon or joint.",
  },
  {
    name: "TMJ & facial pain",
    area: "jaw" as PainArea,
    text: "Jaw pain, clenching and jaw-related headaches assessed and treated together by a facial pain specialist.",
  },
  {
    name: "Nerve blocks",
    area: "occipital" as PainArea,
    text: "A quick in-office injection that can calm a stubborn stretch of headaches or irritated nerves.",
  },
  {
    name: "Neck spasms & cervical dystonia",
    area: "neck" as PainArea,
    text: "Targeted botulinum toxin injections (Botox, Xeomin or Dysport) for neck pulling, twisting and spasms.",
  },
  {
    name: "Shoulder & rotator cuff pain",
    area: "shoulder" as PainArea,
    text: "Image-guided injections and PRP for shoulder and tendon pain — non-surgical options first.",
  },
  {
    name: "Knee, hip & joint arthritis",
    area: "hip-knee" as PainArea,
    text: "Image-guided injections and PRP to ease arthritis pain and help you stay active.",
  },
];

function ServiceCard({ s }: { s: (typeof SERVICES)[number] }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card">
      <div className="bg-gradient-to-b from-mint to-card px-6 pt-4">
        <PainMap area={s.area} className="mx-auto block h-32 w-auto" />
      </div>
      <div className="p-4 pt-3 sm:p-5 sm:pt-3">
        <h3 className="font-display text-lg leading-snug text-heading">{s.name}</h3>
        <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">{s.text}</p>
      </div>
    </article>
  );
}

/**
 * Second fold on the home page: one horizontal row of services (no auto-scroll).
 * Arrows scroll it; on phones a right-hand arrow shows there are more.
 */
export function Services() {
  const rail = useRef<HTMLUListElement>(null);
  const scroll = (dir: 1 | -1) =>
    rail.current?.scrollBy({ left: dir * rail.current.clientWidth * 0.85, behavior: "smooth" });

  return (
    <section className="section-pad bg-mint" id="services" aria-labelledby="services-title">
      <div className="container-page flex items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="eyebrow">What we treat</p>
          <h2
            id="services-title"
            className="mt-3 text-balance text-3xl leading-tight text-heading sm:text-4xl"
          >
            Pain management services
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Every plan is built around your diagnosis, history and goals.
          </p>
        </div>
        <div className="hidden shrink-0 gap-2 md:flex">
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Previous services"
            className="flex size-11 items-center justify-center rounded-full border border-border bg-card hover:border-primary-deep"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="More services"
            className="flex size-11 items-center justify-center rounded-full border border-border bg-card hover:border-primary-deep"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="relative mt-6 sm:mt-8">
        <ul
          ref={rail}
          tabIndex={0}
          aria-label="Services (scroll sideways for more)"
          className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 sm:gap-4 sm:px-8 lg:px-[max(2rem,calc((100vw_-_76rem)/2_+_1.25rem))]"
        >
          {SERVICES.map((s) => (
            <li key={s.name} className="w-[78vw] max-w-[18rem] shrink-0 snap-start">
              <ServiceCard s={s} />
            </li>
          ))}
        </ul>
        {/* Phones: arrow to show there are more services */}
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="More services"
          className="absolute right-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-cta text-white shadow-cta md:hidden"
        >
          <ChevronRight className="size-6" aria-hidden="true" />
        </button>
      </div>
    </section>
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
              <h3 className="font-display text-lg text-heading">Why see a specialist?</h3>
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
        <div className="mx-auto w-full max-w-[15rem] sm:max-w-sm lg:max-w-none">
          <img
            src={headshot}
            alt={`${CLINIC.doctor.name}, Founder & Medical Director`}
            width={682}
            height={1024}
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full rounded-3xl object-cover object-[50%_20%] shadow-soft"
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
              Dr. Amir founded Turquoise Institute so patients could get what's missing in most
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

/**
 * The clinic and what's done in it. Only facts stated elsewhere on the site
 * (condition pages / FAQ): no invented rooms, brands or machines.
 */
export function Facilities() {
  const items = [
    {
      icon: Syringe,
      title: "Procedures done in the office",
      text: "Nerve blocks, Botox and other injections are given right in the clinic — and when it makes sense, treatment can often start the same day.",
    },
    {
      icon: ScanLine,
      title: "Image-guided injections",
      text: "For joint, tendon and shoulder injections, imaging is used to guide the needle so treatment goes exactly where it's needed.",
    },
    {
      icon: FlaskConical,
      title: "PRP prepared during your visit",
      text: "A small blood draw is spun in the office to concentrate your platelets, so the whole PRP treatment happens in one visit.",
    },
    {
      icon: Video,
      title: "Telemedicine visits",
      text: "Telemedicine visits are available for appropriate patients.",
    },
  ];
  return (
    <section className="section-pad bg-ink text-ink-foreground" id="clinic">
      <div className="container-page grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
        <div>
          <p className="font-label text-sm uppercase tracking-wider text-primary-soft">
            Our clinic
          </p>
          <h2 className="mt-3 text-balance text-3xl leading-tight text-ink-foreground sm:text-4xl">
            Specialist care, done in-house
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">
            Diagnosis, procedures and follow-up all happen with the same doctor, in one office.
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {items.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary text-ink">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-xl">{title}</h3>
              <p className="mt-2 leading-relaxed text-ink-muted">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Cash-pay explained in full (highlighted in the first fold as a bullet). */
export function CashPay() {
  const points = [
    "No insurance pre-approvals or referrals to wait on",
    "Full, unhurried visits — your first one is 60 minutes",
    "An itemized receipt you can submit to your insurer for possible out-of-network reimbursement",
    "Costs explained by our team before you book",
  ];
  return (
    <section className="section-pad" id="cash-pay">
      <div className="container-page">
        <div className="rounded-3xl border border-border bg-mint p-6 sm:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-card text-primary-deep shadow-card">
              <Receipt className="size-7" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-balance text-3xl leading-tight text-heading sm:text-4xl">
                A cash-pay clinic: what that means for you
              </h2>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-foreground/80">
                We don't bill commercial insurance, Medicare or Medicaid. Instead you pay the clinic
                directly — which lets us spend real time with you and start treatment without
                waiting on insurance approvals.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-foreground">
                    <ClipboardCheck
                      className="mt-0.5 size-5 shrink-0 text-primary-deep"
                      aria-hidden="true"
                    />
                    {p}
                  </li>
                ))}
              </ul>
              <a
                href={CLINIC.insuranceUrl}
                target="_blank"
                rel="noopener"
                className="mt-6 inline-block font-semibold text-primary-deep underline underline-offset-4"
              >
                Read our payment policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
