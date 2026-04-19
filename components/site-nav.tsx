"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Tab = {
  href: string;
  label: string;
  soon?: boolean;
  activePrefix: string;
  hideOnMobile?: boolean;
};

const tabs: Tab[] = [
  { href: "/", label: "The Canon", activePrefix: "/" },
  { href: "/write", label: "The Page", activePrefix: "/write" },
  { href: "#", label: "The Frame", soon: true, activePrefix: "__never__", hideOnMobile: true },
  { href: "#", label: "The Cut", soon: true, activePrefix: "__never__", hideOnMobile: true },
  { href: "#", label: "The Stage", soon: true, activePrefix: "__never__", hideOnMobile: true },
];

function isActive(pathname: string, tab: Tab): boolean {
  if (tab.activePrefix === "/") return pathname === "/" || pathname.startsWith("/d/");
  if (tab.activePrefix === "__never__") return false;
  return pathname.startsWith(tab.activePrefix);
}

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 overflow-x-auto">
      {tabs.map((tab) => {
        const active = isActive(pathname, tab);
        const hiddenClass = tab.hideOnMobile ? "hidden sm:inline-flex" : "inline-flex";
        if (tab.soon) {
          return (
            <span
              key={tab.label}
              className={`${hiddenClass} shrink-0 items-center px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60 cursor-not-allowed`}
              title="Coming in the Canon's next doors"
            >
              {tab.label}
              <span className="ml-1.5 text-[8px] opacity-60">soon</span>
            </span>
          );
        }
        return (
          <Link
            key={tab.label}
            href={tab.href}
            className={`${hiddenClass} shrink-0 items-center px-3 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-[0.18em] transition-colors ${
              active
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
