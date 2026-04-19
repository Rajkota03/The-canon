"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { Loader2, Lock, Eye, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import type { Director, Film } from "@/content/canon";
import {
  getFilmState,
  getAttempts,
  markWatched,
  incrementAttempt,
  unlock,
  subscribe,
  type FilmState,
} from "@/lib/progress";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const accentBg: Record<Film["accent"], string> = {
  lavender: "bg-[color:var(--lavender)]",
  blush: "bg-[color:var(--blush)]",
  sage: "bg-[color:var(--sage)]",
};

type GateResult = { passed: boolean; feedback: string };

export function FilmExperience({
  director,
  film,
}: {
  director: Director;
  film: Film;
}) {
  const [state, setState] = useState<FilmState>("summoned");
  const [hydrated, setHydrated] = useState(false);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    setState(getFilmState(director.slug, film.slug));
    setAttempts(getAttempts(director.slug, film.slug));
    setHydrated(true);
    return subscribe(() => {
      setState(getFilmState(director.slug, film.slug));
      setAttempts(getAttempts(director.slug, film.slug));
    });
  }, [director.slug, film.slug]);

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <>
      <FilmHero director={director} film={film} state={state} />

      {state !== "unlocked" && (
        <>
          <WhyWatchSection film={film} />
          <GateSection
            director={director}
            film={film}
            state={state}
            attempts={attempts}
            onWatched={() => markWatched(director.slug, film.slug)}
            onAttempt={() => incrementAttempt(director.slug, film.slug)}
            onPass={() => unlock(director.slug, film.slug)}
          />
        </>
      )}

      {state === "unlocked" && <AnalysisSection director={director} film={film} />}
    </>
  );
}

function FilmHero({
  director,
  film,
  state,
}: {
  director: Director;
  film: Film;
  state: FilmState;
}) {
  const stateLabel = {
    summoned: "Unseen",
    watched: "Ready for the Gate",
    unlocked: "Unlocked",
  }[state];
  const StateIcon = state === "unlocked" ? CheckCircle2 : state === "watched" ? Eye : Lock;

  return (
    <section className="pt-10 pb-16">
      <Link
        href={`/d/${director.slug}`}
        className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors"
      >
        ← {director.name}
      </Link>

      <div className="mt-10 grid gap-12 sm:grid-cols-[1fr_320px]">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Film {String(film.order).padStart(2, "0")} · {film.year} · {film.runtime}
          </span>
          <h1 className="mt-5 font-display text-[72px] sm:text-[96px] leading-[0.92] tracking-tight">
            {film.title}
          </h1>
          <p className="mt-4 italic text-[18px] text-foreground/75">
            {film.tagline}
          </p>
          <div className="mt-8 flex items-center gap-3">
            <StateIcon className="h-4 w-4 text-muted-foreground" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {stateLabel}
            </span>
          </div>
        </div>
        <div className={`relative aspect-[3/4] rounded-2xl ${accentBg[film.accent]} overflow-hidden`}>
          <div className="grain" />
          <div className="absolute inset-0 flex flex-col justify-between p-7">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55">
              {director.name}
            </span>
            <div>
              <p className="font-display text-[34px] leading-[1.02] text-ink">
                {film.title}
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55">
                {film.year}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyWatchSection({ film }: { film: Film }) {
  return (
    <section className="border-t border-border pt-16 pb-16">
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        Before you watch
      </span>
      <h2 className="mt-4 font-display text-[42px] leading-[1.05] max-w-2xl">
        Why this film.
      </h2>
      <div className="mt-8 prose-canon max-w-2xl">
        <p>{film.whyWatch}</p>
      </div>
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Find it on
        </span>
        <span className="rounded-full border border-border px-3 py-1 text-[12px] text-foreground/75">
          {film.whereToWatch}
        </span>
      </div>
    </section>
  );
}

function GateSection({
  director,
  film,
  state,
  attempts,
  onWatched,
  onAttempt,
  onPass,
}: {
  director: Director;
  film: Film;
  state: FilmState;
  attempts: number;
  onWatched: () => void;
  onAttempt: () => void;
  onPass: () => void;
}) {
  const [answer, setAnswer] = useState("");
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<GateResult | null>(null);
  const [showHint, setShowHint] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!answer.trim() || isPending) return;
    setResult(null);
    onAttempt();
    startTransition(async () => {
      try {
        const res = await fetch("/api/gate", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            directorSlug: director.slug,
            filmSlug: film.slug,
            answer,
          }),
        });
        const data = (await res.json()) as GateResult;
        setResult(data);
        if (data.passed) {
          setTimeout(() => onPass(), 1200);
        }
      } catch {
        setResult({
          passed: false,
          feedback:
            "The Gate couldn't judge your answer just now. Try again in a moment.",
        });
      }
    });
  }

  if (state === "summoned") {
    return (
      <section className="border-t border-border pt-16 pb-16">
        <div className="rounded-3xl bg-card border border-border p-10 text-center max-w-xl mx-auto">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-[color:var(--lavender)]">
            <Lock className="h-5 w-5 text-ink" />
          </div>
          <h3 className="mt-6 font-display text-3xl">The Gate awaits.</h3>
          <p className="mt-3 text-[15px] text-foreground/70 max-w-sm mx-auto leading-[1.6]">
            Watch the film. All the way through. Then return and prove you were
            there.
          </p>
          <Button onClick={onWatched} className="mt-8 h-11 px-6 rounded-full">
            I've watched it
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="border-t border-border pt-16 pb-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            The Gate
          </span>
          <h3 className="mt-3 font-display text-[42px] leading-[1.05]">
            One question.
          </h3>
          <p className="mt-3 text-[14px] text-muted-foreground">
            Answer in your own words. The Gate judges meaning, not spelling.
          </p>
        </div>

        <div className="rounded-3xl bg-card border border-border p-10">
          <p className="font-display text-[22px] leading-[1.45] text-foreground">
            {film.gate.question}
          </p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <Textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type what you remember from the film…"
              className="min-h-[120px] text-[15px] resize-none bg-background"
              disabled={isPending || result?.passed}
            />

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowHint((v) => !v)}
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors"
              >
                {showHint ? "Hide hint" : "Need a hint?"}
              </button>
              <Button
                type="submit"
                disabled={!answer.trim() || isPending || result?.passed}
                className="h-11 px-6 rounded-full"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Judging
                  </>
                ) : (
                  <>
                    Submit to the Gate
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>

            {showHint && (
              <p className="rounded-xl bg-[color:var(--blush)]/50 p-4 text-[13px] text-ink/80 italic">
                {film.gate.hint}
              </p>
            )}
          </form>

          {result && (
            <div
              className={`mt-6 rounded-xl border p-5 ${
                result.passed
                  ? "bg-[color:var(--sage)]/60 border-[color:var(--sage)]"
                  : "bg-[color:var(--blush)]/50 border-[color:var(--blush)]"
              }`}
            >
              <div className="flex items-start gap-3">
                {result.passed ? (
                  <CheckCircle2 className="h-5 w-5 mt-0.5 text-ink" />
                ) : (
                  <XCircle className="h-5 w-5 mt-0.5 text-ink/80" />
                )}
                <div>
                  <p className="font-display text-[18px] text-ink">
                    {result.passed ? "The Gate opens." : "Not quite."}
                  </p>
                  <p className="mt-1 text-[14px] text-ink/80 leading-[1.55]">
                    {result.feedback}
                  </p>
                </div>
              </div>
            </div>
          )}

          {attempts > 0 && (
            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground text-center">
              Attempts: {attempts}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

const craftLabels: Record<keyof Film["analysis"], string> = {
  writing: "The writing",
  directing: "The direction",
  cinematography: "The camera",
  editing: "The cut",
  sound: "The sound",
  performance: "The performance",
};

function AnalysisSection({
  director,
  film,
}: {
  director: Director;
  film: Film;
}) {
  const order: (keyof Film["analysis"])[] = [
    "writing",
    "directing",
    "cinematography",
    "editing",
    "sound",
    "performance",
  ];

  return (
    <>
      <section className="border-t border-border pt-16">
        <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--sage)]/60 px-4 py-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-ink" />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink">
            Unlocked
          </span>
        </div>
        <h2 className="mt-6 font-display text-[56px] leading-[0.95] tracking-tight max-w-3xl">
          Now the film teaches you back.
        </h2>
      </section>

      <section className="pt-16 space-y-16">
        {order.map((craft, i) => (
          <article
            key={craft}
            className="grid gap-8 sm:grid-cols-[180px_1fr] border-t border-border pt-12"
          >
            <div className="sm:sticky sm:top-8 h-fit">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {String(i + 1).padStart(2, "0")} / 06
              </span>
              <h3 className="mt-3 font-display text-[28px] leading-tight">
                {craftLabels[craft]}
              </h3>
            </div>
            <div className="prose-canon max-w-2xl">
              <p>{film.analysis[craft]}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="border-t border-border pt-16 mt-16">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          Go deeper
        </span>
        <h2 className="mt-4 font-display text-[42px] leading-[1.05]">
          Your next move.
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {film.extras.map((extra, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                {extra.label}
              </span>
              <p className="mt-3 text-[14px] leading-[1.55] text-foreground/85">
                {extra.note}
              </p>
            </div>
          ))}
        </div>

        <NextFilm director={director} film={film} />
      </section>
    </>
  );
}

function NextFilm({ director, film }: { director: Director; film: Film }) {
  const nextIdx = director.films.findIndex((f) => f.slug === film.slug) + 1;
  const next = director.films[nextIdx];

  return (
    <div className="mt-16 rounded-3xl border border-border bg-card p-10">
      {next ? (
        <div className="flex items-center justify-between gap-6 flex-wrap">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Next in the {director.name.split(" ").slice(-1)[0]} arc
            </span>
            <p className="mt-3 font-display text-[36px] leading-tight">
              {next.title}{" "}
              <span className="font-sans text-[16px] text-muted-foreground ml-2">
                ({next.year})
              </span>
            </p>
            <p className="mt-2 italic text-foreground/75">{next.tagline}</p>
          </div>
          <Link
            href={`/d/${director.slug}/${next.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-[13px] text-background"
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            You've completed the {director.name.split(" ").slice(-1)[0]} arc
          </span>
          <p className="mt-3 font-display text-[36px] leading-tight">
            One director down. The next one is coming.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground hover:opacity-70"
          >
            Back to the Canon →
          </Link>
        </div>
      )}
    </div>
  );
}
