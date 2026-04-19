import Link from "next/link";
import { directors } from "@/content/canon";
import { SiteHeader } from "@/components/site-header";

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
              {directors.length} / 52 directors
            </span>
          </div>

          <div className="space-y-6">
            {directors.map((d) => (
              <Link
                key={d.slug}
                href={`/d/${d.slug}`}
                className="group block rounded-2xl border border-border bg-card p-8 transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-[0_12px_40px_-16px_rgba(30,20,60,0.15)]"
              >
                <div className="flex items-start justify-between gap-8">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                      Director {String(d.order).padStart(2, "0")} · {d.era}
                    </span>
                    <h3 className="mt-3 font-display text-4xl leading-tight">
                      {d.name}
                    </h3>
                    <p className="mt-2 text-[14px] text-muted-foreground">
                      {d.role} · {d.lifespan}
                    </p>
                    <p className="mt-5 max-w-xl text-[15px] leading-[1.65] text-foreground/80">
                      {d.why.split(". ").slice(0, 2).join(". ") + "."}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground group-hover:text-foreground transition-colors">
                      Enter →
                    </span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-border flex flex-wrap gap-x-6 gap-y-2">
                  {d.films.map((f) => (
                    <span
                      key={f.slug}
                      className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground"
                    >
                      <span className="italic normal-case tracking-normal text-foreground/70">
                        {f.title}
                      </span>{" "}
                      · {f.year}
                    </span>
                  ))}
                </div>
              </Link>
            ))}

            <div className="rounded-2xl border border-dashed border-border bg-card/40 p-8 text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                More directors arriving
              </p>
              <p className="mt-3 text-[14px] text-foreground/60 max-w-sm mx-auto">
                Kubrick, Kurosawa, Bergman, PTA, Villeneuve, Bong, and 46 more.
                The Canon opens one door at a time.
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
