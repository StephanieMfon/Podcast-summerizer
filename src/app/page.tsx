import { Suspense } from "react";
import { PodcastHeader } from "@/components/layout/header";
import { PodcastHero } from "@/components/sections/hero-section";
import WhyItMattersSection from "@/components/sections/why-it-matters";
import PodcastFooter from "@/components/layout/footer";
import { getEpisodes } from "@/lib/api/episodes";
import { EpisodesSection } from "@/components/sections/podcast-episodes";
import { EpisodesSkeleton } from "@/components/sections/podcast-episodes/episodes-skeleton";
import HowItWorksSection from "@/components/sections/how it works";
import { PageProps } from "@/types";

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = params.q || "podcast";
  const page = parseInt(params.page || "1");
  const genreId = params.genre_id ? parseInt(params.genre_id) : null;
  const selectedCategory = params.category || "All";

  let episodesData = null;
  let fetchError = null;

  try {
    episodesData = await getEpisodes(query, page, genreId);
  } catch (error) {
    fetchError =
      error instanceof Error ? error.message : "Failed to fetch episodes";
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <PodcastHeader />
      <PodcastHero />
      <Suspense fallback={<EpisodesSkeleton />}>
        <EpisodesSection
          initialEpisodes={episodesData?.data || []}
          initialQuery={query}
          initialPage={page}
          initialGenreId={genreId}
          initialCategory={selectedCategory}
          initialError={fetchError}
        />
      </Suspense>
      <HowItWorksSection />
      <WhyItMattersSection />
      <PodcastFooter />
    </div>
  );
}
