import { useRef, useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ChevronDown, Lock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CLINIC, CONDITIONS } from "@/lib/site";
import { track } from "@/lib/track";
import { submitLead } from "@/lib/lead.functions";
import { getAttribution } from "@/lib/utm";
import { cn } from "@/lib/utils";

const field =
  "h-12 w-full rounded-xl border border-input bg-card px-4 text-base text-foreground placeholder:text-muted-foreground/70 focus-visible:border-primary-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40";

const CALL_TIMES = ["Morning (9am–12pm)", "Afternoon (12–5pm)", "Telemedicine visit"];

const CONCERNS = [
  ...CONDITIONS.map((c) => ({ value: c.formLabel, label: c.name })),
  { value: "Other pain", label: "Something else" },
];

interface LeadFormProps {
  /** Where the form sits, for analytics ("hero", "final") */
  location: string;
  defaultConcern?: string | undefined;
  className?: string;
  heading?: string;
  /** Button text, e.g. "Book My Migraine Visit" */
  ctaLabel?: string | undefined;
}

/**
 * Short lead form. Only reports a conversion (and goes to /thank-you) when the
 * lead actually reached the CRM; otherwise the visitor is asked to call, so no
 * lead is silently lost and ad platforms aren't fed false conversions.
 */
export function LeadForm({
  location,
  defaultConcern = "",
  className,
  heading,
  ctaLabel = "Request My Appointment",
}: LeadFormProps) {
  const started = useRef(false);
  const [submitting, setSubmitting] = useState(false);
  const [failed, setFailed] = useState(false);
  const navigate = useNavigate();
  const sendLead = useServerFn(submitLead);
  const idp = `lf-${location}`;

  const onStart = () => {
    if (started.current) return;
    started.current = true;
    track("form_start", { form: "consultation", location });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const concern = String(fd.get("concern") ?? defaultConcern);
    setSubmitting(true);
    setFailed(false);
    track("form_submit", { form: "consultation", location, concern });

    let synced = false;
    try {
      const res = await sendLead({
        data: {
          firstName: String(fd.get("firstName") ?? ""),
          lastName: String(fd.get("lastName") ?? ""),
          email: String(fd.get("email") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          concern,
          preferredTime: String(fd.get("preferredTime") ?? ""),
          pagePath: window.location.pathname,
          attribution: getAttribution(),
        },
      });
      synced = Boolean(res?.synced);
    } catch (error) {
      console.error("Lead submission failed", error);
    }

    if (!synced) {
      track("form_error", { form: "consultation", location });
      setFailed(true);
      setSubmitting(false);
      return;
    }

    // event_id lets GTM dedupe the conversion (Google Ads transaction_id, Meta eventID).
    track("appointment_request", { concern, location, event_id: newEventId() });
    await navigate({ to: "/thank-you" });
  };

  return (
    <div
      className={cn("rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-7", className)}
    >
      {heading ? (
        <p className="font-display text-xl text-foreground sm:text-2xl">{heading}</p>
      ) : null}
      <p className={cn("text-sm text-muted-foreground", heading && "mt-1")}>
        Takes 30 seconds. Our team will call you to find a time that works.
      </p>
      <form
        id={`consultation-form-${location}`}
        onSubmit={onSubmit}
        onFocusCapture={onStart}
        className="mt-5 space-y-3.5"
      >
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="sr-only">First name</span>
            <input
              id={`${idp}-first`}
              name="firstName"
              autoComplete="given-name"
              required
              maxLength={80}
              placeholder="First name"
              className={field}
            />
          </label>
          <label className="block">
            <span className="sr-only">Last name</span>
            <input
              id={`${idp}-last`}
              name="lastName"
              autoComplete="family-name"
              required
              maxLength={80}
              placeholder="Last name"
              className={field}
            />
          </label>
        </div>
        <label className="block">
          <span className="sr-only">Phone</span>
          <input
            id={`${idp}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            minLength={7}
            maxLength={40}
            placeholder="Phone"
            className={field}
          />
        </label>
        <label className="block">
          <span className="sr-only">Email</span>
          <input
            id={`${idp}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            maxLength={200}
            placeholder="Email"
            className={field}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-foreground">
            What's bothering you most?
          </span>
          <span className="relative block">
            <select
              id={`${idp}-concern`}
              name="concern"
              defaultValue={defaultConcern}
              required
              className={cn(field, "appearance-none pr-10")}
            >
              <option value="" disabled>
                Choose one
              </option>
              {CONCERNS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-primary-deep"
              aria-hidden="true"
            />
          </span>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-foreground">
            Best time to call you{" "}
            <span className="font-normal text-muted-foreground">(optional)</span>
          </span>
          <span className="relative block">
            <select
              id={`${idp}-time`}
              name="preferredTime"
              defaultValue=""
              className={cn(field, "appearance-none pr-10")}
            >
              <option value="">Any time</option>
              {CALL_TIMES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-primary-deep"
              aria-hidden="true"
            />
          </span>
        </label>

        <Button
          type="submit"
          id={`cta-form-submit-${location}`}
          variant="cta"
          size="xl"
          disabled={submitting}
          className="w-full"
          data-track="form_submit"
        >
          {submitting ? "Sending…" : ctaLabel}
        </Button>

        {failed ? (
          <div
            role="alert"
            className="rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-foreground"
          >
            We couldn't send your request just now. Please call us at{" "}
            <a
              href={`tel:${CLINIC.phoneTel}`}
              className="js-track-call font-bold text-primary-deep underline"
              data-track="phone_click"
              data-location={`form-error-${location}`}
              onClick={() => track("phone_click", { location: `form-error-${location}` })}
            >
              {CLINIC.phoneDisplay}
            </a>{" "}
            and we'll book you directly.
          </div>
        ) : null}

        <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
          <Lock className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          <span>
            Your details are private and only used to contact you about your visit. Please don't
            include medical details here. By submitting you agree to be contacted by {CLINIC.name}.
            See our{" "}
            <a
              href={CLINIC.privacyUrl}
              target="_blank"
              rel="noopener"
              className="underline underline-offset-2"
            >
              privacy policy
            </a>
            .
          </span>
        </p>
      </form>

      <a
        href={`tel:${CLINIC.phoneTel}`}
        className="js-track-call mt-4 flex items-center justify-center gap-2 border-t border-border pt-4 text-sm font-semibold text-foreground hover:text-primary-deep"
        data-track="phone_click"
        data-location={`form-${location}`}
        onClick={() => track("phone_click", { location: `form-${location}` })}
      >
        <Phone className="size-4 text-primary-deep" aria-hidden="true" /> Prefer to talk? Call{" "}
        {CLINIC.phoneDisplay}
      </a>
    </div>
  );
}

function newEventId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }
}
