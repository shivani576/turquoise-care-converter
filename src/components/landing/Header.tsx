import logo from "@/assets/logo.webp";

/**
 * Slim header styled like turquoiseinstitute.com: logo only. The first fold has
 * exactly one call to action (the hero button), so there are no header buttons.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-md">
      <div className="container-page flex h-16 items-center sm:h-[4.75rem]">
        <a href="/" className="flex shrink-0 items-center" aria-label="Turquoise Institute home">
          <img
            src={logo}
            alt="Turquoise Institute — Interventional Pain, Headache & Regenerative Medicine"
            width={244}
            height={112}
            className="h-11 w-auto sm:h-14"
          />
        </a>
      </div>
    </header>
  );
}
