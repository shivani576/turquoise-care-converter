import { MapPin, Navigation } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CLINIC, SERVICE_AREAS } from "@/lib/site";
import { track } from "@/lib/track";

export function Faq({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <section className="section-pad" id="faq">
      <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <p className="eyebrow">Questions</p>
          <h2 className="mt-3 text-balance text-3xl leading-tight text-heading sm:text-4xl">
            Before you book
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Still unsure? Call{" "}
            <a
              href={`tel:${CLINIC.phoneTel}`}
              className="js-track-call font-semibold text-primary-deep underline underline-offset-4"
              data-track="phone_click"
              data-location="faq"
              onClick={() => track("phone_click", { location: "faq" })}
            >
              {CLINIC.phoneDisplay}
            </a>{" "}
            — we're happy to answer questions before you commit.
          </p>
        </div>
        <Accordion
          type="single"
          collapsible
          className="divide-y divide-border rounded-2xl border border-border bg-card px-5 sm:px-7"
        >
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`q${i}`} className="border-0">
              <AccordionTrigger className="py-5 text-left text-base font-semibold text-foreground hover:no-underline sm:text-[17px]">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export function Location() {
  const { address } = CLINIC;
  return (
    <section className="pb-16 sm:pb-24" id="location">
      <div className="container-page grid gap-6 lg:grid-cols-[1fr_1.3fr] lg:items-stretch">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
          <p className="eyebrow">Visit us in Natick</p>
          <address className="mt-4 not-italic">
            <p className="font-display text-xl text-foreground">{CLINIC.name}</p>
            <p className="mt-1 flex items-start gap-2 text-foreground/80">
              <MapPin className="mt-1 size-4 shrink-0 text-primary-deep" aria-hidden="true" />
              <span>
                {address.street}, {address.city}, {address.state} {address.zip}
              </span>
            </p>
          </address>
          <p className="mt-4 text-[15px] text-muted-foreground">
            Patients come to us from {SERVICE_AREAS.slice(1).join(", ")} and across MetroWest.
            Telemedicine follow-ups are available for appropriate patients.
          </p>
          <a
            href={CLINIC.directionsUrl}
            target="_blank"
            rel="noopener"
            className="mt-6 inline-flex items-center gap-2 font-semibold text-primary-deep underline underline-offset-4"
            data-track="directions_click"
            onClick={() => track("directions_click", { location: "location" })}
          >
            <Navigation className="size-4" aria-hidden="true" /> Get directions
          </a>
        </div>
        <div className="min-h-64 overflow-hidden rounded-3xl border border-border shadow-card">
          <iframe
            title={`Map to ${CLINIC.name}, ${address.street}, ${address.city}`}
            src={CLINIC.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="size-full min-h-64"
          />
        </div>
      </div>
    </section>
  );
}
