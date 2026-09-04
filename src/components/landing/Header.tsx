import { Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { CLINIC } from "@/lib/site";
import { track } from "@/lib/track";

const HOME_NAV = [
  { href: "#conditions", label: "Conditions" },
  { href: "#why", label: "Why Us" },
  { href: "#approach", label: "Our Approach" },
  { href: "#location", label: "Location" },
  { href: "#faq", label: "FAQ" },
];

const CONDITION_NAV = [
  { href: "#symptoms", label: "Symptoms" },
  { href: "#treatment", label: "Treatment" },
  { href: "#why", label: "Why Us" },
  { href: "#location", label: "Location" },
  { href: "#faq", label: "FAQ" },
  { href: "/#conditions", label: "All Conditions" },
];

export function Header({ variant = "home" }: { variant?: "home" | "condition" }) {
  const nav = variant === "condition" ? CONDITION_NAV : HOME_NAV;
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/95 backdrop-blur-md">
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-4">
        <a href={variant === "condition" ? "/" : "#top"} className="flex items-center" aria-label="Turquoise Institute home">
          <img
            src={logo}
            alt="Turquoise Institute — Interventional Pain, Headache & Regenerative Medicine"
            width={430}
            height={197}
            className="h-12 w-auto sm:h-[3.4rem]"
          />
        </a>

        <nav aria-label="Page sections" className="hidden items-center gap-7 text-sm font-semibold text-foreground/70 lg:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="transition-colors hover:text-primary-deep">
              {n.label}
            </a>
          ))}
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
