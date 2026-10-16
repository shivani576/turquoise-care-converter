import { useRef, useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CLINIC } from "@/lib/site";
import { track } from "@/lib/track";
import { submitLead } from "@/lib/lead.functions";
import { getAttribution } from "@/lib/utm";
import { cn } from "@/lib/utils";

export const FORM_BUTTON_LABEL = "Request a Free 15-Minute Appointment";
/** Heading on every form on the page (pop-up and closing section). */
export const FORM_HEADING = "Book a direct appointment with a doctor.";

const field =
  "h-12 w-full rounded-xl border border-input bg-card px-4 text-base text-foreground placeholder:text-muted-foreground/70 focus-visible:border-primary-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40";

interface LeadFormProps {
  /** Where the form sits, for analytics ("modal-hero", "final") */
  location: string;
  /** Page context saved with the lead in the CRM (not shown as a field) */
  concern?: string | undefined;
  className?: string;
  heading?: string;
  headingId?: string;
  /** Inside the pop-up: no card frame of its own */
  bare?: boolean;
}

/** "Jane Mary Doe" → first "Jane", last "Mary Doe" (GoHighLevel stores them separately). */
function splitName(full: string): { firstName: string; lastName: string } {
  const parts = full.trim().split(/\s+/);
  return { firstName: parts[0] ?? "", lastName: parts.slice(1).join(" ") };
}

/**
 * Three-field lead form: Full Name, Phone, Email (all required). Only reports a
 * conversion (and goes to /thank-you) when the lead actually reached the CRM;
 * otherwise the visitor is asked to call, so no lead is silently lost and ad
 * platforms aren't fed false conversions.
 */
export function LeadForm({
  location,
  concern = "",
  className,
  heading,
  headingId,
  bare = false,
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
    setSubmitting(true);
    setFailed(false);
    // No concern/contact details in the dataLayer: GTM tags could forward them to ad
    // platforms, and the condition a visitor is interested in is health information.
    track("form_submit", { form: "consultation", location });

    let synced = false;
    try {
      const res = await sendLead({
        data: {
          ...splitName(String(fd.get("fullName") ?? "")),
          email: String(fd.get("email") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          concern,
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
    track("appointment_request", { form: "consultation", location, event_id: newEventId() });
    await navigate({ to: "/thank-you" });
  };

  return (
    <div
      className={cn(
        !bare && "rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-7",
        className,
      )}
    >
      {heading ? (
        <h2
          id={headingId}
          className="pr-10 font-display text-xl leading-tight text-heading sm:text-2xl"
        >
          {heading}
        </h2>
      ) : null}
      <p className={cn("text-sm text-muted-foreground", heading && "mt-1.5")}>
        Takes 30 seconds. Our team will call you to find a time that works.
      </p>
      <form
        id={`consultation-form-${location}`}
        onSubmit={onSubmit}
        onFocusCapture={onStart}
        className="mt-5 space-y-3.5"
      >
        <div>
          <label htmlFor={`${idp}-name`} className="mb-1.5 block text-sm font-medium">
            Full Name
          </label>
          <input
            id={`${idp}-name`}
            name="fullName"
            autoComplete="name"
            required
            minLength={2}
            maxLength={160}
            className={field}
          />
        </div>
        <div>
          <label htmlFor={`${idp}-phone`} className="mb-1.5 block text-sm font-medium">
            Phone
          </label>
          <input
            id={`${idp}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            minLength={7}
            maxLength={40}
            className={field}
          />
        </div>
        <div>
          <label htmlFor={`${idp}-email`} className="mb-1.5 block text-sm font-medium">
            Email
          </label>
          <input
            id={`${idp}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            maxLength={200}
            className={field}
          />
        </div>

        <Button
          type="submit"
          id={`cta-form-submit-${location}`}
          variant="cta"
          size="xl"
          disabled={submitting}
          className="h-auto min-h-14 w-full whitespace-normal py-3 text-center"
          data-track="form_submit"
        >
          {submitting ? "Sending…" : FORM_BUTTON_LABEL}
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
