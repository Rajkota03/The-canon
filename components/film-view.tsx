"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import type { Director, Film } from "@/content/canon";
import { getFilmBySlug, subscribeCanon } from "@/lib/canon-store";
import { FilmExperience } from "@/components/film-experience";

export function FilmView({
  directorSlug,
  filmSlug,
}: {
  directorSlug: string;
  filmSlug: string;
}) {
  const [found, setFound] = useState<{ director: Director; film: Film } | null>(
    null
  );
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const resolve = () =>
      setFound(getFilmBySlug(directorSlug, filmSlug) ?? null);
    resolve();
    setHydrated(true);
    return subscribeCanon(resolve);
  }, [directorSlug, filmSlug]);

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!found) {
    return (
      <div className="pt-16 max-w-xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
        >
          ← Back to the Canon
        </Link>
        <h1 className="mt-8 font-display text-4xl leading-tight">
          This film isn't in your Canon yet.
        </h1>
        <p className="mt-4 text-foreground/70">
          Return to the Canon and open the right director first.
        </p>
      </div>
    );
  }

  return <FilmExperience director={found.director} film={found.film} />;
}
