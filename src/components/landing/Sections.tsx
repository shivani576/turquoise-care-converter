import { useEffect, useRef } from "react";
import {
  BadgeCheck,
  CalendarCheck,
  ClipboardCheck,
  FlaskConical,
  GraduationCap,
  Receipt,
  ScanLine,
  Syringe,
  Timer,
  Video,
  X,
} from "lucide-react";
import headshot from "@/assets/photos/dr-amir-headshot.webp";
import officePhoto from "@/assets/photos/dr-amir-office-dartmouth.webp";
import procedurePhoto from "@/assets/services/nerve-blocks.webp";
import imgMigraine from "@/assets/services/migraine.webp";
import imgHeadache from "@/assets/services/headache.webp";
import imgBotox from "@/assets/services/botox.webp";
import imgPrp from "@/assets/services/prp.webp";
import imgTmj from "@/assets/services/tmj.webp";
import imgNerve from "@/assets/services/nerve-blocks.webp";
import imgNeck from "@/assets/services/neck.webp";
import imgShoulder from "@/assets/services/shoulder.webp";
import imgJoint from "@/assets/services/joint.webp";
import { CLINIC, CREDENTIALS } from "@/lib/site";
import type { PageCopy } from "@/lib/condition-pages";
import { BookCta } from "./Booking";

/** Thin credibility strip directly under the hero. */
export function ProofBar() {
  const items = [
    { icon: GraduationCap, label: "Dual fellowship trained (Yale & Dartmouth)" },
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

/**
 * Services offered, with a real photo each. Facts only from the condition pages.
 * The section heading avoids condition names; the cards may name them.
 */
const SERVICES = [
  {
    name: "Migraine",
    img: imgMigraine,
    alt: "Dr. Amir explaining migraine patterns in one of his videos",
    text: "A clear diagnosis and a prevention plan built around your attack pattern, plus a plan for the attacks you still get.",
  },
  {
    name: "Headache",
    img: imgHeadache,
    alt: "Dr. Amir in his office explaining types of headache",
    text: "Many headaches are a mix of types. Sorting out exactly which you have changes which treatments work.",
  },
  {
    name: "Botox for chronic migraine",
    img: imgBotox,
    alt: "Botox for chronic migraine poster in the treatment room",
    text: "For 15 or more headache days a month: quick injections about every 12 weeks, following the FDA-approved protocol.",
  },
  {
    name: "PRP injections",
    img: imgPrp,
    alt: "Tube of separated platelet-rich plasma",
    text: "Your own platelets, prepared in the office and injected with image guidance into an injured tendon or joint.",
  },
  {
    name: "TMJ & facial pain",
    img: imgTmj,
    alt: "Gloved hands preparing an in-office injection near the head",
    text: "Jaw pain, clenching and jaw-related headaches assessed and treated together by a facial pain specialist.",
  },
  {
    name: "Nerve blocks",
    img: imgNerve,
    alt: "Dr. Amir preparing an in-office procedure",
    text: "A quick in-office injection that can calm a stubborn stretch of headaches or irritated nerves.",
  },
  {
    name: "Neck spasms & cervical dystonia",
    img: imgNeck,
    alt: "Targeted injection given in the treatment room",
    text: "Targeted botulinum toxin injections (Botox, Xeomin or Dysport) for neck pulling, twisting and spasms.",
  },
  {
    name: "Shoulder & rotator cuff pain",
    img: imgShoulder,
    alt: "Dr. Amir preparing an injection in the procedure room",
    text: "Image-guided injections and PRP for shoulder and tendon pain — non-surgical options first.",
  },
  {
    name: "Knee, hip & joint arthritis",
    img: imgJoint,
    alt: "Anatomy poster in the treatment room",
    text: "Image-guided injections and PRP to ease arthritis pain and help you stay active.",
  },
];

function ServiceCard({ s }: { s: (typeof SERVICES)[number] }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card">
      <img
        src={s.img}
        alt={s.alt}
        width={400}
        height={250}
        loading="lazy"
        decoding="async"
        className="aspect-[16/10] w-full object-cover"
      />
      <div className="p-4 sm:p-5">
        <h3 className="font-display text-lg leading-snug text-heading">{s.name}</h3>
        <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">{s.text}</p>
      </div>
    </article>
  );
}

/**
 * Second fold on the home page. Phones: one row that scrolls itself
 * continuously (pauses while touched; can also be swiped). Tablet/desktop: grid.
 */
export function Services() {
  const rail = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const mobile = window.matchMedia("(max-width: 767px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let last = 0;
    let pausedUntil = 0;
    let pos = el.scrollLeft;
    const pause = () => {
      pausedUntil = performance.now() + 2500;
    };
    const step = (t: number) => {
      raf = requestAnimationFrame(step);
      const dt = last ? Math.min(t - last, 64) : 0;
      last = t;
      if (!mobile.matches || reduced.matches || t < pausedUntil) {
        pos = el.scrollLeft;
        return;
      }
      // The list is rendered twice; jump back by one copy for a seamless loop.
      const half = el.scrollWidth / 2;
      pos += dt * 0.035; // ≈35 px per second
      if (pos >= half) pos -= half;
      el.scrollLeft = pos;
    };
    // Only animate while the section is on screen.
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      last = 0;
      if (e?.isIntersecting) raf = requestAnimationFrame(step);
    });
    io.observe(el);
    el.addEventListener("pointerdown", pause, { passive: true });
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("wheel", pause, { passive: true });
    el.addEventListener("focusin", pause);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", pause);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("wheel", pause);
      el.removeEventListener("focusin", pause);
    };
  }, []);

  return (
    <section className="section-pad bg-mint" id="services" aria-labelledby="services-title">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow">What we treat</p>
          <h2
            id="services-title"
            className="mt-3 text-balance text-3xl leading-tight text-heading sm:text-4xl"
          >
            Pain management services
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Every plan is built around your diagnosis, history and goals.
          </p>
        </div>

        {/* Tablet / desktop grid */}
        <ul className="mt-10 hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <li key={s.name}>
              <ServiceCard s={s} />
            </li>
          ))}
        </ul>
      </div>

      {/* Phone: auto-scrolling row (the only horizontal scroll on the page) */}
      <div
        ref={rail}
        className="no-scrollbar mt-8 overflow-x-auto md:hidden"
        aria-label="Services (scrolls automatically; swipe to browse)"
        role="region"
        tabIndex={0}
      >
        <ul className="flex w-max gap-3 px-4">
          {[...SERVICES, ...SERVICES].map((s, i) => (
            <li
              key={`${s.name}-${i}`}
              className="w-[72vw] max-w-[17rem] shrink-0"
              aria-hidden={i >= SERVICES.length || undefined}
            >
              <ServiceCard s={s} />
            </li>
          ))}
        </ul>
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
        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <img
            src={headshot}
            alt={`${CLINIC.doctor.name}, Founder & Medical Director`}
            width={682}
            height={1024}
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full rounded-3xl object-cover object-[50%_20%] shadow-soft"
          />
          <img
            src={officePhoto}
            alt="Dr. Amir's diplomas in his office"
            width={360}
            height={550}
            loading="lazy"
            decoding="async"
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
              Dr. Amir is a board-certified, dual fellowship trained physician — in Headache &amp;
              Facial Pain Medicine and in Interventional Pain Medicine. He previously directed the
              Headache and Facial Pain Program at Tufts Medical Center.
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
      <div className="container-page grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
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
          <img
            src={procedurePhoto}
            alt="Dr. Amir preparing a procedure in the clinic"
            width={400}
            height={250}
            loading="lazy"
            decoding="async"
            className="mt-8 aspect-[16/10] w-full max-w-sm rounded-2xl object-cover"
          />
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

/** Cash-pay explained in full. Holds the one in-page CTA before the closing form. */
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
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <BookCta location="cash-pay" className="w-full sm:w-auto" />
                <a
                  href={CLINIC.insuranceUrl}
                  target="_blank"
                  rel="noopener"
                  className="font-semibold text-primary-deep underline underline-offset-4"
                >
                  Read our payment policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
