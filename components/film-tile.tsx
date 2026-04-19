"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Lock, Eye, CheckCircle2 } from "lucide-react";
import { getFilmState, subscribe, type FilmState } from "@/lib/progress";
import type { Film } from "@/content/canon";

const accentBg: Record<Film["accent"], string> = {
  lavender: "bg-[color:var(--lavender)]",
  blush: "bg-[color:var(--blush)]",
  sage: "bg-[color:var(--sage)]",
};

export function FilmTile({
  directorSlug,
  film,
}: {
  directorSlug: string;
  film: Film;
}) {
  const [state, setState] = useState<FilmState>("summoned");

  useEffect(() => {
    setState(getFilmState(directorSlug, film.slug));
    return subscribe(() => setState(getFilmState(directorSlug, film.slug)));
  }, [directorSlug, film.slug]);

  const stateLabel = {
    summoned: "Unseen",
    watched: "Ready for the Gate",
    unlocked: "Unlocked",
  }[state];

  const StateIcon = state === "unlocked" ? CheckCircle2 : state === "watched" ? Eye : Lock;

  return (
    <Link
      href={`/d/${directorSlug}/${film.slug}`}
      className="group relative block overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-16px_rgba(30,20,60,0.15)]"
    >
      <div
        className={`relative aspect-[4/5] ${accentBg[film.accent]} overflow-hidden`}
      >
        <div className="absolute inset-0 grain" />
        <div className="absolute inset-0 flex flex-col justify-between p-6">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55">
              Film {String(film.order).padStart(2, "0")}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55">
              {film.year}
            </span>
          </div>
          <div>
            <h3 className="font-display text-[28px] leading-[1.05] text-ink">
              {film.title}
            </h3>
            <p className="mt-2 text-[13px] text-ink/70 italic">
              {film.tagline}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center gap-2">
          <StateIcon className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {stateLabel}
          </span>
        </div>
        <span className="font-mono text-[11px] text-muted-foreground">
          {film.runtime}
        </span>
      </div>
    </Link>
  );
}
