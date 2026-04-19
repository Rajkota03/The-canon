import { SiteHeader } from "@/components/site-header";
import { DirectorView } from "@/components/director-view";

export default async function DirectorPage({
  params,
}: {
  params: Promise<{ director: string }>;
}) {
  const { director: slug } = await params;

  return (
    <div className="relative">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-5 sm:px-6 pb-24 sm:pb-32">
        <DirectorView slug={slug} />
      </main>
    </div>
  );
}
