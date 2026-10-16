import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { CalendarCheck, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CLINIC } from "@/lib/site";
import { track } from "@/lib/track";
import { cn } from "@/lib/utils";
import { FORM_HEADING, LeadForm } from "./LeadForm";

export const PRIMARY_CTA_LABEL = "Book a Free 15-Minute Consultation";

interface BookingContextValue {
  open: (location: string) => void;
}

const BookingContext = createContext<BookingContextValue>({ open: () => undefined });

/**
 * Owns the booking pop-up. Every "Book" button opens it in place — the page
 * never scrolls. Uses the native <dialog> element: focus is trapped, Esc and
 * the close button dismiss it, and the page behind can't scroll (styles.css).
 */
export function BookingProvider({
  concern,
  children,
}: {
  /** Page context stored with the lead (e.g. "Botox for Migraine"); not a form field */
  concern?: string | undefined;
  children: ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [location, setLocation] = useState("modal");
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback((from: string) => {
    track("book_consultation_click", { location: from });
    setLocation(from);
    setIsOpen(true);
    if (!dialog.current?.open) dialog.current?.showModal();
  }, []);

  const close = () => dialog.current?.close();

  return (
    <BookingContext.Provider value={{ open }}>
      {children}
      <dialog
        ref={dialog}
        aria-labelledby="booking-title"
        onClose={() => setIsOpen(false)}
        // A click on the backdrop (outside the panel) closes the pop-up.
        onClick={(e) => e.target === e.currentTarget && close()}
        className="booking-dialog m-0 mt-auto max-h-[100dvh] w-full max-w-none overflow-y-auto rounded-t-3xl bg-card p-0 text-foreground shadow-soft backdrop:bg-black/60 sm:m-auto sm:max-h-[calc(100dvh-2rem)] sm:max-w-md sm:rounded-3xl"
      >
        <div className="relative p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:p-7">
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-3 top-3 flex size-10 items-center justify-center rounded-full text-muted-foreground hover:bg-mint hover:text-foreground"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
          {isOpen ? (
            <LeadForm
              location={`modal-${location}`}
              concern={concern}
              heading={FORM_HEADING}
              headingId="booking-title"
              bare
            />
          ) : (
            <h2 id="booking-title" className="sr-only">
              {FORM_HEADING}
            </h2>
          )}
        </div>
      </dialog>
    </BookingContext.Provider>
  );
}

function useBooking() {
  return useContext(BookingContext);
}

/** The primary call to action. Opens the booking pop-up; never scrolls the page. */
export function BookCta({
  location,
  className,
  label = PRIMARY_CTA_LABEL,
}: {
  location: string;
  className?: string;
  label?: string;
}) {
  const { open } = useBooking();
  return (
    <Button
      type="button"
      variant="cta"
      size="xl"
      id={`cta-book-${location}`}
      data-track="book_consultation_click"
      data-location={location}
      data-main-cta=""
      aria-haspopup="dialog"
      className={cn("js-track-book whitespace-normal text-center", className)}
      onClick={() => open(location)}
    >
      <CalendarCheck aria-hidden="true" />
      {label}
    </Button>
  );
}

/**
 * Header phone number + sticky "Book a Consultation" (the header is sticky).
 * Hidden in the first fold — they appear once the hero's CTA has scrolled up
 * out of view, so the first fold keeps exactly one call to action.
 */
export function HeaderActions() {
  const { open } = useBooking();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const heroCta = document.getElementById("cta-book-hero");
    const header = document.querySelector("header");
    // Scroll listener (not IntersectionObserver) so a fast fling past the CTA is never missed.
    let frame = 0;
    const check = () => {
      frame = 0;
      const limit = header?.getBoundingClientRect().bottom ?? 0;
      setShow(heroCta ? heroCta.getBoundingClientRect().bottom < limit : window.scrollY > 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      id="header-actions"
      aria-hidden={!show}
      className={cn(
        "flex items-center gap-2 transition-all duration-300 sm:gap-3",
        show ? "visible opacity-100" : "pointer-events-none invisible -translate-y-1 opacity-0",
      )}
    >
      <a
        href={`tel:${CLINIC.phoneTel}`}
        id="cta-call-header"
        className="js-track-call inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-[15px] bg-mint-deep px-2.5 font-label text-[13px] text-muted-foreground hover:bg-[#b7e3d7] sm:h-11 sm:px-4 sm:text-sm"
        data-track="phone_click"
        data-location="header"
        onClick={() => track("phone_click", { location: "header" })}
      >
        <Phone className="size-4 shrink-0" aria-hidden="true" />
        {CLINIC.phoneDisplay}
      </a>
      <Button
        type="button"
        variant="cta"
        id="cta-book-header"
        data-track="book_consultation_click"
        data-location="header"
        aria-haspopup="dialog"
        className="js-track-book h-10 whitespace-normal px-2.5 text-center text-[13px] leading-tight sm:h-11 sm:px-5 sm:text-sm"
        onClick={() => open("header")}
      >
        <CalendarCheck className="hidden sm:block" aria-hidden="true" />
        Book a Consultation
      </Button>
    </div>
  );
}
