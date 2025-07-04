"use client";
import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PaginationComponent } from "@/components/ui/pagination-component";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { Episode, EpisodesSectionProps, Summary } from "@/types";
import { summarizeEpisode } from "@/lib/api/summary";
import { useError } from "@/hooks/use-error";
import { ErrorHandler } from "@/lib/shared/error-handler";
import { useDebouncedSearch } from "@/hooks/use-debounce";
import { usePagination } from "@/hooks/use-pagination";
import { useEpisodes } from "@/hooks/use-episodes";
import { GenreFilter } from "@/components/ui/genre-filter";
import { EpisodeCard } from "./episode-card";
import { genreData } from "@/data";

export function EpisodesSection({
  initialQuery,
  initialPage,
  initialGenreId,
  initialCategory,
  initialError,
}: EpisodesSectionProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [summaries, setSummaries] = useState<Map<string, Summary>>(new Map());
  const { error, setError, resetError } = useError();
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const { currentPage, goToPage } = usePagination(initialPage);

  const {
    episodes,
    loading,
    error: fetchError,
    refetch,
  } = useEpisodes(initialQuery, currentPage, initialGenreId);

  useEffect(() => {
    setError(initialError || null);
  }, [initialError, setError]);

  const updateURL = useDebouncedSearch((newParams) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);

      Object.entries(newParams).forEach(([key, value]) => {
        if (
          value &&
          value !== "podcast" &&
          value !== "All" &&
          value !== "1" &&
          value !== "grid"
        ) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      router.replace(`/?${params.toString()}`);
    });
  });

  const handleGenreClick = (name: string, id: number | null) => {
    setSelectedCategory(name);
    goToPage(1);

    updateURL({
      q: initialQuery === "podcast" ? null : initialQuery,
      genre_id: id?.toString() || null,
      category: name === "All" ? null : name,
      page: null,
    });
  };

  const handlePageChange = (page: number) => {
    goToPage(page);
    updateURL({
      q: initialQuery === "podcast" ? null : initialQuery,
      genre_id: initialGenreId?.toString() || null,
      category: selectedCategory === "All" ? null : selectedCategory,
      page: page === 1 ? null : page.toString(),
    });
  };

  const handleSummarize = async (episode: Episode) => {
    const data = await summarizeEpisode(
      episode.id,
      episode.title,
      episode.description
    );

    if (!data.success) {
      throw new Error(data.error || "Failed to generate summary");
    }

    if (data.data) {
      setSummaries((prev) => new Map(prev.set(episode.id, data.data!)));
    }
  };

  return (
    <ErrorBoundary
      error={fetchError ? ErrorHandler.getPublicMessage(error) : ""}
      retry={() => {
        resetError();
        refetch();
      }}
    >
      <section id="discover" className="pb-16 m px-6 lg:px-24 lg:py-16">
        <div className="container mx-auto">
          <div className="flex flex-col gap-3 md:gap-0 md:flex-row items-center  justify-between mb-8">
            <h2 className="text-2xl font-semibold">Podcast Episodes</h2>
            <div className="flex items-center gap-4">
              <GenreFilter
                genres={genreData}
                selected={selectedCategory}
                isLoading={isPending || loading}
                onSelect={handleGenreClick}
              />
            </div>
          </div>

          <div
            className={`grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-5 ${
              isPending || loading ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            {episodes.map((episode: Episode) => (
              <div key={episode.id} className="space-y-6">
                <EpisodeCard
                  episode={episode}
                  onSummarize={handleSummarize}
                  summaries={summaries}
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <PaginationComponent
              currentPage={currentPage}
              onPageChange={handlePageChange}
              isLoading={isPending || loading}
              hasNextPage={episodes.length === 10}
            />
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
}
