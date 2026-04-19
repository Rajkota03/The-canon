"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, BookOpen, ArrowRight, RefreshCw, AlertCircle } from "lucide-react";
import type { WritingSeed } from "@/content/writing-seeds";
import { writingSeeds } from "@/content/writing-seeds";
import {
  getReadWritingNotes,
  markWritingNoteRead,
  subscribeWriting,
} from "@/lib/progress";
import { Button } from "@/components/ui/button";

type Note = WritingSeed & { source: "seed" | "ai" };

const accents = ["lavender", "blush", "sage"] as const;
type Accent = (typeof accents)[number];

const accentBg: Record<Accent, string> = {
  lavender: "bg-[color:var(--lavender)]/50",
  blush: "bg-[color:var(--blush)]/50",
  sage: "bg-[color:var(--sage)]/55",
};

function pickSeed(readTitles: Set<string>): Note | null {
  const unread = writingSeeds.filter(
    (s) => !readTitles.has(s.title.trim().toLowerCase())
  );
  if (unread.length === 0) return null;
  return { ...unread[0], source: "seed" };
}

export function WritingFeed() {
  const [note, setNote] = useState<Note | null>(null);
  const [readCount, setReadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [accentIdx, setAccentIdx] = useState(0);
  const firstLoadRef = useRef(false);

  useEffect(() => {
    const hydrate = () => {
      const read = getReadWritingNotes();
      setReadCount(read.length);
      setAccentIdx(read.length % accents.length);
    };
    hydrate();
    setHydrated(true);
    return subscribeWriting(hydrate);
  }, []);

  const loadNext = useCallback(
    async (opts: { skipSeed?: boolean } = {}) => {
      setLoading(true);
      setError(null);
      try {
        const read = getReadWritingNotes();
        const readTitleSet = new Set(
          read.map((n) => n.title.trim().toLowerCase())
        );

        if (!opts.skipSeed) {
          const seed = pickSeed(readTitleSet);
          if (seed) {
            setNote(seed);
            return;
          }
        }

        const res = await fetch("/api/craft/writing", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            servedTitles: read.slice(0, 40).map((n) => n.title),
            servedCitations: read.slice(0, 40).map((n) => n.citation),
          }),
        });
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        const data = (await res.json()) as WritingSeed;
        setNote({ ...data, source: "ai" });
      } catch (err) {
        console.error(err);
        setNote(null);
        setError(
          "The Page's AI refill isn't connected yet — enable AI Gateway in Vercel settings, then `vercel env pull .env.local`. Seeds you've read are safely in your notebook."
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (hydrated && !firstLoadRef.current && !note && !loading) {
      firstLoadRef.current = true;
      loadNext();
    }
  }, [hydrated, note, loading, loadNext]);

  const markAndNext = useCallback(() => {
    if (!note) return;
    markWritingNoteRead({
      title: note.title,
      citation: note.citation,
      insight: note.insight,
      tryThis: note.tryThis,
      tags: note.tags,
      source: note.source,
    });
    setNote(null);
    setAccentIdx((i) => (i + 1) % accents.length);
    loadNext();
  }, [note, loadNext]);

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const accent = accents[accentIdx];

  return (
    <div className="max-w-3xl mx-auto">
      <header className="pt-8 sm:pt-12 pb-8 sm:pb-10">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          The Page · writing craft
        </span>
        <h1 className="mt-4 sm:mt-5 font-display text-[42px] sm:text-[64px] lg:text-[72px] leading-[0.98] sm:leading-[0.95] tracking-tight">
          One note at a time.
        </h1>
        <p className="mt-5 sm:mt-6 max-w-xl text-[15px] sm:text-[16px] leading-[1.6] text-foreground/75">
          A feed of real writing-craft hacks — techniques reverse-engineered
          from working screenwriters. Specific, observable, usable tomorrow. No
          Save-the-Cat. No "show don't tell." You'll never see the same note
          twice.
        </p>
        <div className="mt-6 flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            <BookOpen className="h-3 w-3" />
            {readCount} note{readCount === 1 ? "" : "s"} read
          </span>
        </div>
      </header>

      {error && !note && (
        <div className="rounded-2xl border border-[color:var(--blush)] bg-[color:var(--blush)]/40 p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 mt-0.5 text-ink" />
            <div>
              <p className="font-display text-[18px] text-ink">The Page is quiet.</p>
              <p className="mt-1 text-[14px] text-ink/80 leading-[1.55]">{error}</p>
              <Button
                onClick={() => loadNext({ skipSeed: false })}
                className="mt-4 h-10 px-5 rounded-full"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Try again
              </Button>
            </div>
          </div>
        </div>
      )}

      {loading && !note && (
        <div className="flex items-center justify-center py-24">
          <div className="text-center">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground mx-auto" />
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Pulling the next page
            </p>
          </div>
        </div>
      )}

      {note && (
        <article
          key={note.title}
          className={`relative overflow-hidden rounded-3xl border border-border bg-card p-7 sm:p-10 md:p-14 animate-in fade-in duration-500`}
        >
          <div className={`absolute -top-20 -right-20 h-56 w-56 rounded-full ${accentBg[accent]} blur-2xl`} />

          <div className="relative">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <span>Note {String(readCount + 1).padStart(3, "0")}</span>
              <span>·</span>
              <span>{note.source === "seed" ? "curated" : "generated"}</span>
            </div>

            <h2 className="mt-5 sm:mt-6 font-display text-[34px] sm:text-[48px] lg:text-[56px] leading-[1.02] sm:leading-[0.98] tracking-tight">
              {note.title}
            </h2>

            <p className="mt-3 sm:mt-4 font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.18em] text-foreground/70">
              {note.citation}
            </p>

            <div className="mt-8 sm:mt-10 prose-canon max-w-2xl">
              <p className="text-[15px]! sm:text-[16px]! leading-[1.7]! sm:leading-[1.75]!">{note.insight}</p>
            </div>

            <div
              className={`mt-8 sm:mt-10 rounded-2xl ${accentBg[accent]} p-5 sm:p-6 md:p-7 border border-border/40`}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/70">
                Try this
              </span>
              <p className="mt-3 font-display text-[18px] sm:text-[22px] leading-[1.4] text-ink">
                {note.tryThis}
              </p>
            </div>

            {note.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {note.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 sm:pt-8 border-t border-border">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Read it. Let it settle. Then turn the page.
              </span>
              <Button
                onClick={markAndNext}
                disabled={loading}
                className="h-11 px-6 rounded-full whitespace-nowrap self-start sm:self-auto"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Turning
                  </>
                ) : (
                  <>
                    Mark read · Next page
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </article>
      )}

      {readCount > 0 && (
        <div className="mt-16 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            {readCount} note{readCount === 1 ? "" : "s"} in your notebook
          </p>
        </div>
      )}
    </div>
  );
}
