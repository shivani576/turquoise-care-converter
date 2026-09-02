import { MapPin, Navigation, Phone, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CLINIC, FAQS, SERVICE_AREAS } from "@/lib/site";
import { track } from "@/lib/track";
import { BookCta } from "./Ctas";

export function Local() {
  const { address } = CLINIC;
  return (
    <section id="location" className="section-pad bg-sand">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <p className="eyebrow eyebrow-dash">Local to you</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            Conveniently Serving Patients Across MetroWest &amp; Greater Boston
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Our office is in downtown Natick — minutes from Wellesley, Weston and Newton, and an easy
            drive from Wayland, Sudbury, Sherborn, Lincoln, Concord and Lexington. Patients from the
            02494 Needham area regularly visit us as well.
          </p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Communities we serve">
            {SERVICE_AREAS.map((town) => (
              <li key={town} className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-semibold text-foreground/80">
                {town}, MA
              </li>
            ))}
            <li className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-semibold text-foreground/80">
              02494
            </li>
          </ul>

          <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-start gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-mint text-primary-deep">
                <MapPin className="size-5" aria-hidden="true" />
              </span>
              <address className="not-italic">
                <p className="font-display text-lg font-semibold text-foreground">{CLINIC.name}</p>
                <p className="mt-1 text-foreground/80">
                  {address.street}
                  <br />
                  {address.city}, {address.state} {address.zip}
                </p>
                <a
                  href={`tel:${CLINIC.phoneTel}`}
                  className="js-track-call mt-2 inline-flex items-center gap-2 font-bold text-primary-deep"
                  data-track="phone_click"
                  data-location="location"
                  onClick={() => track("phone_click", { location: "location" })}
                >
                  <Phone className="size-4" aria-hidden="true" /> {CLINIC.phoneDisplay}
                </a>
              </address>
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Video className="size-4 text-primary" aria-hidden="true" />
              Telemedicine consultations available for appropriate patients.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <BookCta location="location" size="default" className="h-12 px-6" />
              <Button asChild variant="callOutline" className="js-track-directions h-12 px-6">
                <a
                  href={CLINIC.directionsUrl}
                  target="_blank"
                  rel="noopener"
                  id="cta-directions-location"
                  data-track="directions_click"
                  onClick={() => track("directions_click", { location: "location" })}
                >
                  <Navigation aria-hidden="true" /> Get Directions
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft">
          <iframe
            title="Map to Turquoise Institute, 10 Union St Suite 2D, Natick MA 01760"
            src={CLINIC.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="h-[22rem] w-full grayscale-[35%] lg:h-full lg:min-h-[34rem]"
          />
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" className="section-pad bg-background">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow eyebrow-dash">Common questions</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            Everything You Need to Know Before Booking
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Still have a question? Call us at{" "}
            <a
              href={`tel:${CLINIC.phoneTel}`}
              className="js-track-call font-bold text-primary-deep"
              data-track="phone_click"
              data-location="faq"
              onClick={() => track("phone_click", { location: "faq" })}
            >
              {CLINIC.phoneDisplay}
            </a>{" "}
            — our team is happy to help before your appointment.
          </p>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`faq-${i}`}
              className="rounded-2xl border border-border bg-card px-6 shadow-card data-[state=open]:border-primary/40"
            >
              <AccordionTrigger className="py-5 text-left text-base font-bold text-foreground hover:no-underline [&>svg]:text-primary">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-[15px] leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
