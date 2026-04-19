import Link from "next/link";

export function CanonMark({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-baseline gap-2 group whitespace-nowrap ${className}`}
    >
      <span className="font-display text-xl sm:text-2xl leading-none tracking-tight">
        The Canon
      </span>
      <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground translate-y-[-2px]">
        01 / ∞
      </span>
    </Link>
  );
}
