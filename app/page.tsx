import { SiteHeader } from "@/components/site-header";
import { CanonHome } from "@/components/canon-home";

export default function Home() {
  return (
    <div className="relative">
      <SiteHeader />
      <CanonHome />
      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 py-10 flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            The Canon
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Watch. Pass. Unlock.
          </span>
        </div>
      </footer>
    </div>
  );
}
