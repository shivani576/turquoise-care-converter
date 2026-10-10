import { Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { CLINIC } from "@/lib/site";
import { track } from "@/lib/track";

/** Slim ad-landing header: logo, click-to-call, one CTA. No navigation menu. */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-3 sm:h-[4.5rem]">
        <a href="/" className="flex shrink-0 items-center" aria-label="Turquoise Institute home">
          <img
            src={logo}
            alt="Turquoise Institute — Interventional Pain, Headache & Regenerative Medicine"
            width={430}
            height={197}
            className="h-10 w-auto sm:h-12"
          />
        </a>

        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href={`tel:${CLINIC.phoneTel}`}
            id="cta-call-header"
            className="js-track-call flex items-center gap-2 rounded-full px-2 py-2 text-sm font-bold text-foreground hover:text-primary-deep sm:text-base"
            data-track="phone_click"
            data-location="header"
            onClick={() => track("phone_click", { location: "header" })}
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-mint text-primary-deep">
              <Phone className="size-4" aria-hidden="true" />
            </span>
            <span className="hidden sm:inline">{CLINIC.phoneDisplay}</span>
            <span className="sr-only sm:hidden">Call {CLINIC.phoneDisplay}</span>
          </a>
          <Button asChild variant="cta" className="js-track-book hidden h-11 px-5 sm:inline-flex">
            <a
              href="#consultation"
              id="cta-book-header"
              data-track="book_consultation_click"
              data-location="header"
              onClick={() => track("book_consultation_click", { location: "header" })}
            >
              Book a Visit
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
