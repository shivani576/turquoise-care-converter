import { useEffect } from "react";
import { Instagram, Mail, MapPin, Phone, Printer } from "lucide-react";
import logo from "@/assets/logo.webp";
import { CLINIC } from "@/lib/site";
import { track } from "@/lib/track";
import { FORM_HEADING, LeadForm } from "./LeadForm";

/** Closing section with the inline form (same three fields as the pop-up). */
export function FinalCta({ heading, concern }: { heading: string; concern?: string | undefined }) {
  return (
    <section
      id="consultation"
      data-main-cta=""
      className="section-pad relative overflow-hidden bg-ink bg-ink-glow text-ink-foreground"
    >
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16">
        <div>
          <h2 className="max-w-xl text-balance text-3xl leading-tight text-ink-foreground sm:text-4xl lg:text-5xl">
            {heading}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
            Your free 15-minute consultation is with the doctor, so you can ask your questions
            before you book a full visit. No referral needed.
          </p>
        </div>
        <div className="text-foreground">
          <LeadForm location="final" concern={concern} heading={FORM_HEADING} />
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { address } = CLINIC;
  return (
    <footer className="border-t border-border bg-card py-10 md:py-12">
      <div className="container-page grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <img
            src={logo}
            alt="Turquoise Institute"
            width={244}
            height={112}
            loading="lazy"
            className="h-12 w-auto"
          />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {CLINIC.fullName}. Diagnosing and treating headaches, facial pain and complex pain
            conditions so you can get back to living the life you love.
          </p>
          <a
            href={CLINIC.instagram}
            target="_blank"
            rel="noopener"
            aria-label="Turquoise Institute on Instagram"
            className="mt-4 inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-primary hover:text-primary-deep"
          >
            <Instagram className="size-4" aria-hidden="true" />
          </a>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary-deep">Contact</p>
          <address className="mt-4 space-y-3 text-sm not-italic text-foreground/80">
            <p className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>
                {address.street}
                <br />
                {address.city}, {address.state} {address.zip}
              </span>
            </p>
            <p>
              <a
                href={`tel:${CLINIC.phoneTel}`}
                className="js-track-call flex items-center gap-2.5 font-semibold hover:text-primary-deep"
                data-track="phone_click"
                data-location="footer"
                onClick={() => track("phone_click", { location: "footer" })}
              >
                <Phone className="size-4 text-primary" aria-hidden="true" /> {CLINIC.phoneDisplay}
              </a>
            </p>
            <p className="flex items-center gap-2.5">
              <Printer className="size-4 text-primary" aria-hidden="true" /> Fax: {CLINIC.fax}
            </p>
            <p>
              <a
                href={`mailto:${CLINIC.email}`}
                id="cta-email-footer"
                className="js-track-email flex items-center gap-2.5 hover:text-primary-deep"
                data-track="email_click"
                onClick={() => track("email_click", { location: "footer" })}
              >
                <Mail className="size-4 text-primary" aria-hidden="true" /> {CLINIC.email}
              </a>
            </p>
          </address>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary-deep">
            Information
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-foreground/80">
            <li>
              <a
                href={CLINIC.website}
                target="_blank"
                rel="noopener"
                className="hover:text-primary-deep"
              >
                turquoiseinstitute.com
              </a>
            </li>
            <li>
              <a
                href={CLINIC.insuranceUrl}
                target="_blank"
                rel="noopener"
                className="hover:text-primary-deep"
              >
                Insurance &amp; Payment Policy
              </a>
            </li>
            <li>
              <a
                href={CLINIC.privacyUrl}
                target="_blank"
                rel="noopener"
                className="hover:text-primary-deep"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href={CLINIC.termsUrl}
                target="_blank"
                rel="noopener"
                className="hover:text-primary-deep"
              >
                Terms and Conditions
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-page mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
        <p>
          © {new Date().getFullYear()} {CLINIC.name}. All rights reserved. This page is for
          informational purposes and does not constitute medical advice. If you are experiencing a
          medical emergency, call 911.
        </p>
      </div>
    </footer>
  );
}

/** Pushes scroll-depth milestones (25/50/75/100) to the dataLayer. */
export function ScrollDepthTracker() {
  useEffect(() => {
    const fired = new Set<number>();
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = Math.round((window.scrollY / max) * 100);
      for (const m of [25, 50, 75, 100]) {
        if (pct >= m && !fired.has(m)) {
          fired.add(m);
          track("scroll_depth", { percent: m });
        }
      }
      if (fired.size === 4) window.removeEventListener("scroll", onScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return null;
}
