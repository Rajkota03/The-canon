import Link from "next/link";
import { directors } from "@/content/canon";
import { SiteHeader } from "@/components/site-header";
import { DirectorRow } from "@/components/director-row";

export default function Home() {
  const first = directors[0];

  return (
    <div className="relative">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-6 pb-32">
        {/* Hero */}
        <section className="pt-12 pb-24">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            A film-school rite of passage
          </span>
          <h1 className="mt-6 font-display text-[56px] sm:text-[76px] leading-[0.95] tracking-tight text-foreground max-w-3xl">
            Learn cinema from the masters — one film at a time.
          </h1>
          <p className="mt-8 max-w-xl text-[17px] leading-[1.6] text-foreground/75">
            Each week, meet a director. Watch one of their films. Pass the{" "}
            <span className="italic">Gate</span> — a single question that proves
            you actually watched. Then the film teaches you: writing, directing,
            cinematography, editing, sound, performance. You earn the craft.
          </p>
          <div className="mt-10 flex items-center gap-4">
            <Link
              href={`/d/${first.slug}`}
              className="group inline-flex items-center gap-3 rounded-full bg-foreground px-6 py-3.5 text-[14px] font-medium text-background transition-all hover:opacity-90"
            >
              Begin with {first.name.split(" ").slice(-1)[0]}
              <span className="font-mono text-[11px] opacity-70 group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </Link>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Director 01 of the Canon
            </span>
          </div>
        </section>

        {/* Canon list */}
        <section className="border-t border-border pt-12">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="font-display text-3xl">The Canon</h2>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {directors.length} / 52 · {directors.length} door{directors.length === 1 ? "" : "s"} open
            </span>
          </div>

          <div className="space-y-6">
            {directors.map((d) => (
              <DirectorRow key={d.slug} director={d} />
            ))}

            <div className="rounded-2xl border border-dashed border-border bg-card/40 p-8 text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                More directors arriving
              </p>
              <p className="mt-3 text-[14px] text-foreground/60 max-w-sm mx-auto">
                Kurosawa, Bergman, PTA, Villeneuve, Bong, and 45 more. The Canon
                opens one door at a time.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-10 flex items-center justify-between">
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
