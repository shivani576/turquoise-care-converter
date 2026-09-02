import { CalendarCheck, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CLINIC } from "@/lib/site";
import { track } from "@/lib/track";
import { cn } from "@/lib/utils";

interface CtaProps {
  location: string; // e.g. "hero", "conditions", "final"
  className?: string;
  size?: "default" | "xl";
  tone?: "light" | "dark";
}

/** Primary CTA — BOOK A CONSULTATION (scrolls to the form) */
export function BookCta({ location, className, size = "xl", tone = "light" }: CtaProps) {
  return (
    <Button
      asChild
      variant={tone === "dark" ? "ctaLight" : "cta"}
      size={size}
      className={cn("js-track-book", className)}
    >
      <a
        href="#consultation"
        id={`cta-book-${location}`}
        data-track="book_consultation_click"
        data-location={location}
        onClick={() => track("book_consultation_click", { location })}
      >
        <CalendarCheck aria-hidden="true" />
        Book a Consultation
      </a>
    </Button>
  );
}

/** Secondary CTA — CALL NOW */
export function CallCta({ location, className, size = "xl", tone = "light" }: CtaProps) {
  return (
    <Button
      asChild
      variant={tone === "dark" ? "callLight" : "callOutline"}
      size={size}
      className={cn("js-track-call", className)}
    >
      <a
        href={`tel:${CLINIC.phoneTel}`}
        id={`cta-call-${location}`}
        data-track="phone_click"
        data-location={location}
        onClick={() => track("phone_click", { location })}
      >
        <Phone aria-hidden="true" />
        Call {CLINIC.phoneDisplay}
      </a>
    </Button>
  );
}

export function CtaPair({
  location,
  tone = "light",
  className,
}: {
  location: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row sm:items-center", className)}>
      <BookCta location={location} tone={tone} />
      <CallCta location={location} tone={tone} />
    </div>
  );
}
