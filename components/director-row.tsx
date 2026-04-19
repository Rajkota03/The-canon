"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Lock } from "lucide-react";
import type { Director } from "@/content/canon";
import { getAllDirectors, subscribeCanon } from "@/lib/canon-store";
import { isDirectorArcComplete, subscribe } from "@/lib/progress";

export function DirectorRow({ director }: { director: Director }) {
  const [unlocked, setUnlocked] = useState(!director.requires);

  useEffect(() => {
    const check = () => {
      if (!director.requires) {
        setUnlocked(true);
        return;
      }
      const predecessor = getAllDirectors().find(
        (d) => d.slug === director.requires
      );
      if (!predecessor) {
        setUnlocked(true);
        return;
      }
      setUnlocked(
        isDirectorArcComplete(
          predecessor.slug,
          predecessor.films.map((f) => f.slug)
        )
      );
    };
    check();
    const unsubP = subscribe(check);
    const unsubC = subscribeCanon(check);
    return () => {
      unsubP();
      unsubC();
    };
  }, [director.requires, director.slug]);

  const body = (
    <div
      className={`group block rounded-2xl border border-border bg-card p-8 transition-all ${
        unlocked
          ? "hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-[0_12px_40px_-16px_rgba(30,20,60,0.15)]"
          : "opacity-70 cursor-not-allowed"
      }`}
    >
      <div className="flex items-start justify-between gap-8">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Director {String(director.order).padStart(2, "0")} · {director.era}
          </span>
          <h3 className="mt-3 font-display text-4xl leading-tight">{director.name}</h3>
          <p className="mt-2 text-[14px] text-muted-foreground">
            {director.role} · {director.lifespan}
          </p>
          <p className="mt-5 max-w-xl text-[15px] leading-[1.65] text-foreground/80">
            {director.why.split(". ").slice(0, 2).join(". ") + "."}
          </p>
        </div>
        <div className="shrink-0">
          {unlocked ? (
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground group-hover:text-foreground transition-colors">
              Enter →
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              <Lock className="h-3 w-3" /> Locked
            </span>
          )}
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-border flex flex-wrap gap-x-6 gap-y-2">
        {director.films.map((f) => (
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
      {!unlocked && director.requires && (
        <p className="mt-5 italic text-[13px] text-foreground/60">
          Arrives when the{" "}
          <span className="font-medium not-italic">
            {getAllDirectors()
              .find((d) => d.slug === director.requires)
              ?.name.split(" ")
              .slice(-1)[0]}
          </span>{" "}
          arc closes — unlock all three of their films first.
        </p>
      )}
    </div>
  );

  if (!unlocked) return <div>{body}</div>;

  return <Link href={`/d/${director.slug}`}>{body}</Link>;
}
