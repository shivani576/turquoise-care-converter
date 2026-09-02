import { useRef, useState, type FormEvent } from "react";
import { Lock, Phone, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CLINIC, CONDITIONS } from "@/lib/site";
import { track } from "@/lib/track";

const TIMES = ["Morning (9am–12pm)", "Afternoon (12pm–5pm)", "First available", "Telemedicine visit"];

const fieldClass =
  "h-12 rounded-xl border-input bg-card px-4 text-base shadow-none focus-visible:ring-2 focus-visible:ring-primary md:text-[15px]";

export function ConsultationForm() {
  const started = useRef(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const onStart = () => {
    if (started.current) return;
    started.current = true;
    track("form_start", { form: "consultation" });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const concern = String(fd.get("concern") ?? "");
    const preferredTime = String(fd.get("preferredTime") ?? "");
    setSubmitting(true);
    track("form_submit", { form: "consultation", concern });
    // TODO: connect to the practice's CRM / scheduling endpoint (e.g. LeadConnector).
    await new Promise((r) => setTimeout(r, 600));
    track("appointment_request", { concern, preferredTime });
    setSubmitting(false);
    setDone(true);
    toast.success("Request received — our team will contact you shortly.");
  };

  return (
    <section id="consultation" className="section-pad relative overflow-hidden bg-mint/60">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-neural opacity-70" />
      <div className="container-page relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="eyebrow eyebrow-dash">Request a consultation</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            Take the First Step Toward Understanding Your Pain
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Share a few details and our team will reach out to schedule your consultation. No
            referral needed. Prefer to talk now?
          </p>
          <a
            href={`tel:${CLINIC.phoneTel}`}
            id="cta-call-form"
            className="js-track-call mt-4 inline-flex items-center gap-2 font-display text-2xl font-semibold text-primary-deep"
            data-track="phone_click"
            data-location="form"
            onClick={() => track("phone_click", { location: "form" })}
          >
            <Phone className="size-5" aria-hidden="true" /> {CLINIC.phoneDisplay}
          </a>
          <ul className="mt-8 space-y-3 text-sm text-foreground/80">
            <li className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              Your information is private and used only to contact you about your appointment.
            </li>
            <li className="flex items-start gap-3">
              <Lock className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              Please do not include detailed medical history here — we'll cover that together during
              your visit.
            </li>
          </ul>
        </div>

        <div className="rounded-[2rem] border border-border bg-card p-6 shadow-soft sm:p-8">
          {done ? (
            <div className="flex min-h-[26rem] flex-col items-center justify-center text-center" role="status">
              <span className="flex size-16 items-center justify-center rounded-full bg-mint text-primary-deep">
                <ShieldCheck className="size-8" aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-display text-2xl font-semibold text-foreground">
                Thank you — we've received your request.
              </h3>
              <p className="mt-3 max-w-sm text-muted-foreground">
                A member of the Turquoise Institute team will contact you to confirm a time. If your
                need is urgent, please call {CLINIC.phoneDisplay}.
              </p>
            </div>
          ) : (
            <form id="consultation-form" onSubmit={onSubmit} onFocusCapture={onStart} className="space-y-5" noValidate={false}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" name="firstName" autoComplete="given-name" required className={fieldClass} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" name="lastName" autoComplete="family-name" required className={fieldClass} />
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required className={fieldClass} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" inputMode="email" autoComplete="email" required className={fieldClass} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="concern">What can we help you with?</Label>
                <select
                  id="concern"
                  name="concern"
                  required
                  defaultValue=""
                  className={`${fieldClass} w-full appearance-none border bg-[url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%231f8f78' stroke-width='2' viewBox='0 0 24 24'><path d='m6 9 6 6 6-6'/></svg>")] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10 text-foreground focus-visible:outline-none`}
                >
                  <option value="" disabled>
                    Select a condition
                  </option>
                  {CONDITIONS.map((c) => (
                    <option key={c.id} value={c.formLabel}>
                      {c.formLabel}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredTime">Preferred appointment time</Label>
                <select
                  id="preferredTime"
                  name="preferredTime"
                  defaultValue=""
                  className={`${fieldClass} w-full appearance-none border bg-[url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%231f8f78' stroke-width='2' viewBox='0 0 24 24'><path d='m6 9 6 6 6-6'/></svg>")] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10 text-foreground focus-visible:outline-none`}
                >
                  <option value="" disabled>
                    Select a preference
                  </option>
                  {TIMES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <Button
                type="submit"
                id="cta-form-submit"
                variant="cta"
                size="xl"
                disabled={submitting}
                className="w-full"
                data-track="form_submit"
              >
                {submitting ? "Sending…" : "Request a Consultation"}
              </Button>
              <p className="text-center text-xs leading-relaxed text-muted-foreground">
                By submitting, you agree to be contacted by Turquoise Institute about your request.
                See our{" "}
                <a href={CLINIC.privacyUrl} target="_blank" rel="noopener" className="underline underline-offset-2">
                  privacy policy
                </a>
                .
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
