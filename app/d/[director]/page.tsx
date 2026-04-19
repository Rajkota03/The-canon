import Link from "next/link";
import { notFound } from "next/navigation";
import { getDirector, directors } from "@/content/canon";
import { SiteHeader } from "@/components/site-header";
import { FilmTile } from "@/components/film-tile";

export function generateStaticParams() {
  return directors.map((d) => ({ director: d.slug }));
}

export default async function DirectorPage({
  params,
}: {
  params: Promise<{ director: string }>;
}) {
  const { director: slug } = await params;
  const director = getDirector(slug);
  if (!director) notFound();

  return (
    <div className="relative">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-5 sm:px-6 pb-24 sm:pb-32">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to the Canon
        </Link>

        {/* Director portrait */}
        <section className="pt-8 sm:pt-10 pb-16 sm:pb-20 border-b border-border">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Director {String(director.order).padStart(2, "0")} · {director.era}
          </span>
          <h1 className="mt-5 sm:mt-6 font-display text-[44px] sm:text-[72px] lg:text-[88px] leading-[0.96] sm:leading-[0.9] tracking-tight">
            {director.name}
          </h1>
          <p className="mt-4 text-[15px] font-mono uppercase tracking-[0.15em] text-muted-foreground">
            {director.role} · {director.lifespan}
          </p>

          <div className="mt-12 grid gap-12 sm:grid-cols-[1.5fr_1fr]">
            <div>
              <p className="font-display text-[22px] leading-[1.4] text-foreground">
                “{director.quote}”
              </p>
              <div className="mt-10 prose-canon">
                <p>{director.why}</p>
                <p>{director.portrait}</p>
              </div>
            </div>
            <aside className="rounded-2xl bg-[color:var(--lavender)]/60 p-7 self-start relative overflow-hidden">
              <div className="grain" />
              <h3 className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/70">
                Signature moves
              </h3>
              <ul className="mt-5 space-y-3">
                {director.signatureMoves.map((m, i) => (
                  <li key={i} className="flex gap-3 text-[13px] text-ink/85 leading-[1.55]">
                    <span className="font-mono text-[10px] text-ink/50 pt-[3px]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        {/* Films */}
        <section className="pt-16">
          <div className="flex items-baseline justify-between mb-2">
            <h2 className="font-display text-3xl">The assignment</h2>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {director.films.length} essential films
            </span>
          </div>
          <p className="max-w-xl text-[15px] text-foreground/70 leading-[1.6]">
            Pick one. Watch it all the way through. Come back and pass the Gate.
            Order does not matter — start where you're drawn.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {director.films.map((film) => (
              <FilmTile
                key={film.slug}
                directorSlug={director.slug}
                film={film}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
