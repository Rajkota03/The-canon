import { notFound } from "next/navigation";
import { getFilm, directors } from "@/content/canon";
import { SiteHeader } from "@/components/site-header";
import { FilmExperience } from "@/components/film-experience";

export function generateStaticParams() {
  return directors.flatMap((d) =>
    d.films.map((f) => ({ director: d.slug, film: f.slug }))
  );
}

export default async function FilmPage({
  params,
}: {
  params: Promise<{ director: string; film: string }>;
}) {
  const { director: directorSlug, film: filmSlug } = await params;
  const found = getFilm(directorSlug, filmSlug);
  if (!found) notFound();

  const { director, film } = found;

  return (
    <div className="relative">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-5 sm:px-6 pb-24 sm:pb-32">
        <FilmExperience director={director} film={film} />
      </main>
    </div>
  );
}
