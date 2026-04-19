import { CanonMark } from "./canon-mark";
import { SiteNav } from "./site-nav";

export function SiteHeader() {
  return (
    <header className="relative z-10 border-b border-border/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-3 sm:gap-6">
        <CanonMark />
        <SiteNav />
      </div>
    </header>
  );
}
