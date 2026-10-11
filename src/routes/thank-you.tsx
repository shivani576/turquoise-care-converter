import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/FinalAndFooter";
import { CLINIC, SITE_URL } from "@/lib/site";
import { track } from "@/lib/track";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Thank You — Request Received | Turquoise Institute" },
      {
        name: "description",
        content:
          "Thanks for reaching out to Turquoise Institute in Natick, MA. Our team will contact you shortly to confirm your consultation.",
      },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: "Thank You — Request Received | Turquoise Institute" },
      {
        property: "og:description",
        content: "Our team will contact you shortly to confirm your consultation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/thank-you` }],
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  return (
    <>
      <Header />
      <main className="relative overflow-hidden bg-mint/60">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-neural opacity-70"
        />
        <div className="container-page relative flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-card text-primary-deep shadow-soft">
            <CheckCircle2 className="size-9" aria-hidden="true" />
          </span>
          <h1 className="mt-8 text-balance text-3xl font-semibold leading-tight text-heading sm:text-4xl">
            Thanks for reaching out — our team will be in touch shortly.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            We've received your consultation request at {CLINIC.name}. A member of our team will
            call to confirm a time that works for you. If your need is urgent, please reach us
            directly.
          </p>

          <div className="mt-10 grid w-full max-w-2xl gap-4 text-left sm:grid-cols-2">
            <a
              href={`tel:${CLINIC.phoneTel}`}
              data-track="phone_click"
              onClick={() => track("phone_click", { location: "thank-you" })}
              className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft"
            >
              <Phone className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              <span>
                <span className="block text-sm text-muted-foreground">Call us</span>
                <span className="font-semibold text-foreground">{CLINIC.phoneDisplay}</span>
              </span>
            </a>
            <a
              href={`mailto:${CLINIC.email}`}
              data-track="email_click"
              onClick={() => track("email_click", { location: "thank-you" })}
              className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft"
            >
              <Mail className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              <span>
                <span className="block text-sm text-muted-foreground">Email</span>
                <span className="font-semibold text-foreground">{CLINIC.email}</span>
              </span>
            </a>
            <a
              href={CLINIC.directionsUrl}
              data-track="directions_click"
              onClick={() => track("directions_click", { location: "thank-you" })}
              target="_blank"
              rel="noopener"
              className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft sm:col-span-2"
            >
              <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              <span>
                <span className="block text-sm text-muted-foreground">Visit</span>
                <span className="font-semibold text-foreground">
                  {CLINIC.address.street}, {CLINIC.address.city}, {CLINIC.address.state}{" "}
                  {CLINIC.address.zip}
                </span>
              </span>
            </a>
          </div>

          <Link
            to="/"
            className="mt-10 inline-block font-bold text-primary-deep underline underline-offset-4"
          >
            Return to Turquoise Institute
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
