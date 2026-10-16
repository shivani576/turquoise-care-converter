import { useEffect, type RefObject } from "react";

/**
 * Continuously scrolls a horizontal row whose items are rendered `copies` times,
 * jumping back one copy for a seamless loop. Pauses while hovered, touched or
 * focused, while `paused` is true, and when the row is off screen. Does nothing
 * for visitors who prefer reduced motion (they can still scroll by hand).
 */
export function useAutoScroll(
  ref: RefObject<HTMLElement | null>,
  { copies, paused = false, speed = 30 }: { copies: number; paused?: boolean; speed?: number },
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || paused) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    let raf = 0;
    let last = 0;
    let hovering = false;
    let pausedUntil = 0;
    let pos = el.scrollLeft;
    const hold = () => {
      pausedUntil = performance.now() + 3000;
    };
    const step = (t: number) => {
      raf = requestAnimationFrame(step);
      const dt = last ? Math.min(t - last, 64) : 0;
      last = t;
      if (hovering || t < pausedUntil) {
        pos = el.scrollLeft;
        return;
      }
      const copy = el.scrollWidth / copies;
      pos += (dt / 1000) * speed;
      if (pos >= copy) pos -= copy;
      el.scrollLeft = pos;
    };
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      last = 0;
      if (e?.isIntersecting) raf = requestAnimationFrame(step);
    });
    io.observe(el);
    // Hover pause for real mice only: a tap on a phone fires an emulated "enter" with no
    // matching "leave", which would otherwise stop the row for good.
    const enter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hovering = true;
    };
    const leave = () => (hovering = false);
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    el.addEventListener("touchstart", hold, { passive: true });
    el.addEventListener("wheel", hold, { passive: true });
    el.addEventListener("focusin", hold);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
      el.removeEventListener("touchstart", hold);
      el.removeEventListener("wheel", hold);
      el.removeEventListener("focusin", hold);
    };
  }, [ref, copies, paused, speed]);
}
