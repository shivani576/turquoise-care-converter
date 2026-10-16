import logo from "@/assets/logo.webp";
import { HeaderActions } from "./Booking";

/**
 * Sticky header styled like turquoiseinstitute.com: the logo and, on landing pages
 * (`actions`), the phone number, always visible (mobile too). "Book a Consultation"
 * is the sticky bottom bar after the first fold.
 */
export function Header({ actions = false }: { actions?: boolean }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-2 sm:h-[4.75rem]">
        <a href="/" className="flex shrink-0 items-center" aria-label="Turquoise Institute home">
          <img
            src={logo}
            alt="Turquoise Institute: Interventional Pain, Headache & Regenerative Medicine"
            width={244}
            height={112}
            className="h-9 w-auto min-[400px]:h-11 sm:h-14"
          />
        </a>
        {actions ? <HeaderActions /> : null}
      </div>
    </header>
  );
}
