import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { CalendarCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/track";
import { cn } from "@/lib/utils";
import { LeadForm } from "./LeadForm";

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
              heading="Book a free 15-minute consultation"
              headingId="booking-title"
              bare
            />
          ) : (
            <h2 id="booking-title" className="sr-only">
              Book a free 15-minute consultation
            </h2>
          )}
        </div>
      </dialog>
      <StickyBookNow hidden={isOpen} />
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
 * Floating "Book Now": appears only once the visitor has scrolled past the
 * second fold (the [data-sticky-start] marker), and hides whenever a main
 * call to action ([data-main-cta]) is on screen or the pop-up is open.
 */
function StickyBookNow({ hidden }: { hidden: boolean }) {
  const { open } = useBooking();
  const [pastStart, setPastStart] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const start = document.querySelector("[data-sticky-start]");
    const ctas = Array.from(document.querySelectorAll("[data-main-cta]"));
    if (!start) return;

    // A scroll listener rather than an IntersectionObserver: a fast fling or jump can
    // carry the marker from below the screen to above it without it ever being "in
    // view", and an observer would never report that.
    let frame = 0;
    const checkStart = () => {
      frame = 0;
      setPastStart(start.getBoundingClientRect().top < 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(checkStart);
    };
    checkStart();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    const visible = new Set<Element>();
    const ctaObserver = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      setCtaVisible(visible.size > 0);
    });
    ctas.forEach((el) => ctaObserver.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
      ctaObserver.disconnect();
    };
  }, []);

  const show = pastStart && !ctaVisible && !hidden;
  return (
    <div
      id="sticky-book"
      aria-hidden={!show}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur transition-all duration-300 md:inset-x-auto md:bottom-6 md:right-6 md:rounded-full md:border md:p-1.5 md:shadow-soft",
        show
          ? "visible translate-y-0 opacity-100"
          : "pointer-events-none invisible translate-y-[150%] opacity-0",
      )}
    >
      <Button
        type="button"
        variant="cta"
        id="cta-book-sticky"
        data-track="book_consultation_click"
        data-location="sticky"
        aria-haspopup="dialog"
        className="js-track-book h-12 w-full text-[15px] md:w-auto md:rounded-full md:px-6"
        onClick={() => open("sticky")}
      >
        <CalendarCheck aria-hidden="true" /> Book Now
      </Button>
    </div>
  );
}
