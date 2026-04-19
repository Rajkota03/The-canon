"use client";

import type { Director, Film, CraftAnalysis } from "@/content/canon";
import { directors as seedDirectors } from "@/content/canon";

const KEY = "the-canon/generated-directors/v1";

export type GeneratedFilm = Omit<Film, "analysis" | "extras"> & {
  analysis?: CraftAnalysis;
  extras?: Film["extras"];
};

export type GeneratedDirector = Omit<Director, "films"> & {
  films: GeneratedFilm[];
  generatedAt: string;
};

function readGenerated(): GeneratedDirector[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as GeneratedDirector[]) : [];
  } catch {
    return [];
  }
}

function writeGenerated(list: GeneratedDirector[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new Event("the-canon:generated"));
}

export function getAllDirectors(): Director[] {
  const gen = readGenerated().sort((a, b) => a.order - b.order);
  // Cast: generated films may omit analysis/extras; consumers must handle
  return [...seedDirectors, ...(gen as unknown as Director[])];
}

export function getGeneratedDirectors(): GeneratedDirector[] {
  return readGenerated();
}

export function getDirectorBySlug(slug: string): Director | undefined {
  return getAllDirectors().find((d) => d.slug === slug);
}

export function getFilmBySlug(
  directorSlug: string,
  filmSlug: string
): { director: Director; film: Film } | undefined {
  const director = getDirectorBySlug(directorSlug);
  if (!director) return undefined;
  const film = director.films.find((f) => f.slug === filmSlug);
  if (!film) return undefined;
  return { director, film };
}

export function isGeneratedDirector(slug: string): boolean {
  return readGenerated().some((d) => d.slug === slug);
}

export function addGeneratedDirector(dir: Omit<GeneratedDirector, "generatedAt">) {
  const list = readGenerated();
  if (list.some((d) => d.slug === dir.slug)) return;
  // Also reject if collides with a seeded slug
  if (seedDirectors.some((d) => d.slug === dir.slug)) return;
  list.push({ ...dir, generatedAt: new Date().toISOString() });
  writeGenerated(list);
}

export function setFilmAnalysis(
  dirSlug: string,
  filmSlug: string,
  analysis: CraftAnalysis,
  extras: Film["extras"]
) {
  const list = readGenerated();
  const dir = list.find((d) => d.slug === dirSlug);
  if (!dir) return;
  const film = dir.films.find((f) => f.slug === filmSlug);
  if (!film) return;
  film.analysis = analysis;
  film.extras = extras;
  writeGenerated(list);
}

export function subscribeCanon(listener: () => void) {
  if (typeof window === "undefined") return () => {};
  const handler = () => listener();
  window.addEventListener("the-canon:generated", handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener("the-canon:generated", handler);
    window.removeEventListener("storage", handler);
  };
}
