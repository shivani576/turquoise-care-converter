import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/95 backdrop-blur-md">
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-4">
        <a href="/" className="flex items-center" aria-label="Turquoise Institute home">
          <img
            src={logo}
            alt="Turquoise Institute — Interventional Pain, Headache & Regenerative Medicine"
            width={430}
            height={197}
            className="h-12 w-auto sm:h-[3.4rem]"
          />
        </a>

        <Button asChild variant="cta" className="js-track-book h-11 px-5">
          <a
            href="/#consultation"
            id="cta-book-header"
            data-track="book_consultation_click"
            data-location="header"
            onClick={() => track("book_consultation_click", { location: "header" })}
          >
            Book a Consultation
          </a>
        </Button>
      </div>
    </header>
  );
}
