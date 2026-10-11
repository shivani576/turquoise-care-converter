import { CalendarCheck, Phone } from "lucide-react";
import logo from "@/assets/logo.webp";
import { CLINIC } from "@/lib/site";
import { track } from "@/lib/track";

/**
 * Slim ad-landing header styled like turquoiseinstitute.com: logo, mint phone
 * pill, teal "Schedule Now". No navigation menu, so visitors stay on the page.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-3 sm:h-[4.75rem]">
        <a href="/" className="flex shrink-0 items-center" aria-label="Turquoise Institute home">
          <img
            src={logo}
            alt="Turquoise Institute — Interventional Pain, Headache & Regenerative Medicine"
            width={244}
            height={112}
            className="h-11 w-auto sm:h-14"
          />
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${CLINIC.phoneTel}`}
            id="cta-call-header"
            className="js-track-call inline-flex h-10 items-center gap-2 rounded-[15px] bg-mint-deep px-3 font-label text-sm text-muted-foreground hover:bg-[#b7e3d7] sm:h-11 sm:px-4"
            data-track="phone_click"
            data-location="header"
            onClick={() => track("phone_click", { location: "header" })}
          >
            <Phone className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">{CLINIC.phoneDisplay}</span>
            <span className="sm:hidden">Call</span>
          </a>
          <a
            href="#consultation"
            id="cta-book-header"
            className="js-track-book inline-flex h-10 items-center gap-2 rounded-[15px] bg-cta px-3 font-label text-sm text-white shadow-cta hover:bg-cta-hover sm:h-11 sm:px-5"
            data-track="book_consultation_click"
            data-location="header"
            onClick={() => track("book_consultation_click", { location: "header" })}
          >
            <CalendarCheck className="size-4" aria-hidden="true" />
            Schedule Now
          </a>
        </div>
      </div>
    </header>
  );
}
