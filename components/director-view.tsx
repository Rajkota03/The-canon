"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import type { Director } from "@/content/canon";
import { getDirectorBySlug, subscribeCanon } from "@/lib/canon-store";
import { FilmTile } from "@/components/film-tile";

export function DirectorView({ slug }: { slug: string }) {
  const [director, setDirector] = useState<Director | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const resolve = () => setDirector(getDirectorBySlug(slug) ?? null);
    resolve();
    setHydrated(true);
    return subscribeCanon(resolve);
  }, [slug]);

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!director) {
    return (
      <div className="pt-16 max-w-xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
        >
          ← Back to the Canon
        </Link>
        <h1 className="mt-8 font-display text-4xl leading-tight">
          This director isn't in your Canon yet.
        </h1>
        <p className="mt-4 text-foreground/70">
          Either the link is wrong, or this director was generated in another
          browser. Return to the Canon and summon them again.
        </p>
      </div>
    );
  }

  return (
    <>
      <Link
        href="/"
        className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors"
      >
        ← Back to the Canon
      </Link>

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

        <div className="mt-10 sm:mt-12 grid gap-8 sm:gap-12 sm:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="font-display text-[20px] sm:text-[22px] leading-[1.4] text-foreground">
              “{director.quote}”
            </p>
            <div className="mt-8 sm:mt-10 prose-canon">
              <p>{director.why}</p>
              <p>{director.portrait}</p>
            </div>
          </div>
          <aside className="rounded-2xl bg-[color:var(--lavender)]/60 p-6 sm:p-7 self-start relative overflow-hidden">
            <div className="grain" />
            <h3 className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/70">
              Signature moves
            </h3>
            <ul className="mt-5 space-y-3">
              {director.signatureMoves.map((m, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-[13px] text-ink/85 leading-[1.55]"
                >
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

      <section className="pt-12 sm:pt-16">
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

        <div className="mt-8 sm:mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {director.films.map((film) => (
            <FilmTile
              key={film.slug}
              directorSlug={director.slug}
              film={film}
            />
          ))}
        </div>
      </section>
    </>
  );
}
