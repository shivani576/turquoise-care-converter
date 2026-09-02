import { Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { CLINIC } from "@/lib/site";
import { track } from "@/lib/track";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-4">
        <a href="#top" className="flex items-center" aria-label="Turquoise Institute home">
          <img
            src={logo}
            alt="Turquoise Institute — Interventional Pain, Headache & Regenerative Medicine"
            width={360}
            height={168}
            className="h-11 w-auto sm:h-12"
          />
        </a>

        <nav aria-label="Page sections" className="hidden items-center gap-7 text-sm font-semibold text-foreground/70 lg:flex">
          <a href="#conditions" className="transition-colors hover:text-primary-deep">Conditions</a>
          <a href="#why" className="transition-colors hover:text-primary-deep">Why Us</a>
          <a href="#approach" className="transition-colors hover:text-primary-deep">Our Approach</a>
          <a href="#location" className="transition-colors hover:text-primary-deep">Location</a>
          <a href="#faq" className="transition-colors hover:text-primary-deep">FAQ</a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${CLINIC.phoneTel}`}
            id="cta-call-header"
            data-track="phone_click"
            data-location="header"
            onClick={() => track("phone_click", { location: "header" })}
            className="js-track-call hidden items-center gap-2 text-sm font-bold text-foreground transition-colors hover:text-primary-deep md:inline-flex"
          >
            <Phone className="size-4 text-primary" aria-hidden="true" />
            {CLINIC.phoneDisplay}
          </a>
          <Button asChild variant="cta" className="js-track-book h-11 px-5">
            <a
              href="#consultation"
              id="cta-book-header"
              data-track="book_consultation_click"
              data-location="header"
              onClick={() => track("book_consultation_click", { location: "header" })}
            >
              Book a Consultation
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
