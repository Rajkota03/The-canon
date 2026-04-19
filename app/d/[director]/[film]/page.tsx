import { SiteHeader } from "@/components/site-header";
import { FilmView } from "@/components/film-view";

export default async function FilmPage({
  params,
}: {
  params: Promise<{ director: string; film: string }>;
}) {
  const { director: directorSlug, film: filmSlug } = await params;

  return (
    <div className="relative">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-5 sm:px-6 pb-24 sm:pb-32">
        <FilmView directorSlug={directorSlug} filmSlug={filmSlug} />
      </main>
    </div>
  );
}
