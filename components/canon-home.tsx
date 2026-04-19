"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Loader2, Sparkles, AlertCircle } from "lucide-react";
import type { Director, Film } from "@/content/canon";
import {
  getAllDirectors,
  addGeneratedDirector,
  subscribeCanon,
} from "@/lib/canon-store";
import { isDirectorArcComplete, subscribe as subscribeProgress } from "@/lib/progress";
import { DirectorRow } from "@/components/director-row";

function isArcComplete(director: Director): boolean {
  return isDirectorArcComplete(
    director.slug,
    director.films.map((f) => f.slug)
  );
}

export function CanonHome() {
  const [directors, setDirectors] = useState<Director[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [summoning, setSummoning] = useState(false);
  const [summonError, setSummonError] = useState<string | null>(null);
  const summonInFlight = useRef(false);

  const refresh = useCallback(() => {
    setDirectors(getAllDirectors());
  }, []);

  useEffect(() => {
    refresh();
    setHydrated(true);
    const unsubCanon = subscribeCanon(refresh);
    const unsubProgress = subscribeProgress(refresh);
    return () => {
      unsubCanon();
      unsubProgress();
    };
  }, [refresh]);

  const summonNext = useCallback(async () => {
    if (summonInFlight.current) return;
    summonInFlight.current = true;
    setSummoning(true);
    setSummonError(null);
    try {
      const current = getAllDirectors();
      const res = await fetch("/api/generate/director", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          existingSlugs: current.map((d) => d.slug),
          existingNames: current.map((d) => d.name),
          order: current.length + 1,
        }),
      });
      if (!res.ok) throw new Error(`Server ${res.status}`);
      const data = (await res.json()) as Omit<Director, "films"> & {
        films: Film[];
      };
      addGeneratedDirector({
        ...data,
        order: current.length + 1,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "unknown error";
      setSummonError(msg);
    } finally {
      summonInFlight.current = false;
      setSummoning(false);
    }
  }, []);

  // Auto-summon when the last director's arc is complete and nothing is in flight
  useEffect(() => {
    if (!hydrated) return;
    if (summoning || summonInFlight.current) return;
    if (directors.length === 0) return;
    const last = directors[directors.length - 1];
    if (isArcComplete(last) && directors.length < 12) {
      summonNext();
    }
  }, [hydrated, directors, summoning, summonNext]);

  const first = directors[0];

  return (
    <main className="mx-auto max-w-5xl px-5 sm:px-6 pb-24 sm:pb-32">
      {/* Hero */}
      <section className="pt-8 sm:pt-12 pb-16 sm:pb-24">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          A film-school rite of passage
        </span>
        <h1 className="mt-5 sm:mt-6 font-display text-[42px] sm:text-[64px] lg:text-[76px] leading-[0.98] sm:leading-[0.95] tracking-tight text-foreground max-w-3xl">
          Learn cinema from the masters — one film at a time.
        </h1>
        <p className="mt-6 sm:mt-8 max-w-xl text-[15px] sm:text-[17px] leading-[1.6] text-foreground/75">
          Each week, meet a director. Watch one of their films. Pass the{" "}
          <span className="italic">Gate</span> — a single question that proves
          you actually watched. Then the film teaches you: writing, directing,
          cinematography, editing, sound, performance. You earn the craft. The
          next director summons itself when you're ready.
        </p>
        {first && (
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href={`/d/${first.slug}`}
              className="group inline-flex items-center gap-2.5 whitespace-nowrap rounded-full bg-foreground px-5 sm:px-6 py-3 sm:py-3.5 text-[14px] font-medium text-background transition-all hover:opacity-90"
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
        )}
      </section>

      {/* Canon list */}
      <section className="border-t border-border pt-10 sm:pt-12">
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="font-display text-3xl">The Canon</h2>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {directors.length} director{directors.length === 1 ? "" : "s"}
          </span>
        </div>

        <div className="space-y-6">
          {directors.map((d) => (
            <DirectorRow key={d.slug} director={d} />
          ))}

          {summoning && (
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <div className="inline-flex items-center gap-3 rounded-full bg-[color:var(--lavender)]/60 px-4 py-2">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-ink" />
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink">
                  Summoning director {directors.length + 1}
                </span>
              </div>
              <p className="mt-5 font-display text-[22px] text-foreground">
                The Canon is choosing your next master.
              </p>
              <p className="mt-2 text-[14px] text-foreground/60">
                Usually 15–30 seconds.
              </p>
            </div>
          )}

          {summonError && !summoning && (
            <div className="rounded-2xl border border-[color:var(--blush)] bg-[color:var(--blush)]/40 p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 mt-0.5 text-ink" />
                <div>
                  <p className="font-display text-[18px] text-ink">
                    The Canon's next door is stuck.
                  </p>
                  <p className="mt-1 text-[14px] text-ink/80">
                    {summonError}. Try again.
                  </p>
                  <button
                    onClick={summonNext}
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-[13px] text-background"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    Retry
                  </button>
                </div>
              </div>
            </div>
          )}

          {!summoning && !summonError && hydrated && directors.length > 0 && (
            <div className="rounded-2xl border border-dashed border-border bg-card/40 p-6 text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Unlock the current arc to summon the next director
              </p>
              <button
                onClick={summonNext}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-[12px] font-mono uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
              >
                <Sparkles className="h-3 w-3" /> Or summon one now
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
