"use client";

export type FilmState = "summoned" | "watched" | "unlocked";

type ProgressMap = Record<string, { state: FilmState; unlockedAt?: string; attempts: number }>;

const KEY = "the-canon/progress/v1";

function read(): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return {};
    return JSON.parse(raw) as ProgressMap;
  } catch {
    return {};
  }
}

function write(map: ProgressMap) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(map));
  window.dispatchEvent(new Event("the-canon:progress"));
}

function keyFor(directorSlug: string, filmSlug: string) {
  return `${directorSlug}/${filmSlug}`;
}

export function getFilmState(directorSlug: string, filmSlug: string): FilmState {
  const map = read();
  return map[keyFor(directorSlug, filmSlug)]?.state ?? "summoned";
}

export function getAttempts(directorSlug: string, filmSlug: string): number {
  const map = read();
  return map[keyFor(directorSlug, filmSlug)]?.attempts ?? 0;
}

export function markWatched(directorSlug: string, filmSlug: string) {
  const map = read();
  const k = keyFor(directorSlug, filmSlug);
  map[k] = { ...(map[k] ?? { attempts: 0 }), state: map[k]?.state === "unlocked" ? "unlocked" : "watched" };
  write(map);
}

export function incrementAttempt(directorSlug: string, filmSlug: string) {
  const map = read();
  const k = keyFor(directorSlug, filmSlug);
  map[k] = {
    state: map[k]?.state ?? "summoned",
    unlockedAt: map[k]?.unlockedAt,
    attempts: (map[k]?.attempts ?? 0) + 1,
  };
  write(map);
}

export function unlock(directorSlug: string, filmSlug: string) {
  const map = read();
  const k = keyFor(directorSlug, filmSlug);
  map[k] = {
    state: "unlocked",
    unlockedAt: new Date().toISOString(),
    attempts: map[k]?.attempts ?? 0,
  };
  write(map);
}

export function getAllProgress(): ProgressMap {
  return read();
}

export function subscribe(listener: () => void) {
  if (typeof window === "undefined") return () => {};
  const handler = () => listener();
  window.addEventListener("the-canon:progress", handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener("the-canon:progress", handler);
    window.removeEventListener("storage", handler);
  };
}
