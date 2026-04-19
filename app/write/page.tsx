import { SiteHeader } from "@/components/site-header";
import { WritingFeed } from "@/components/writing-feed";

export const metadata = {
  title: "The Page — Writing craft, one note at a time",
  description:
    "Hacks, tricks, and techniques from working screenwriters. Deep, specific, usable tomorrow. Never the same note twice.",
};

export default function WritePage() {
  return (
    <div className="relative">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 sm:px-6 pb-24 sm:pb-32">
        <WritingFeed />
      </main>
    </div>
  );
}
