import { CanonMark } from "./canon-mark";

export function SiteHeader() {
  return (
    <header className="relative z-10">
      <div className="mx-auto max-w-6xl px-6 py-6 flex items-center justify-between">
        <CanonMark />
        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
            A rite of passage
          </span>
        </nav>
      </div>
    </header>
  );
}
