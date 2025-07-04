import { PodcastHeroProps } from "@/types";
import { SearchInput } from "./podcast-episodes/search-input";

export function PodcastHero({ initialQuery }: PodcastHeroProps) {
  return (
    <section className="pt-8 md:py-20 px-6">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-br from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
            AI-Powered <br />
            Podcast Summaries
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Get instant summaries of any podcast episode. Save time, extract key
            insights, and decide what&apos;s worth listening to before you
            commit.
          </p>
          <SearchInput defaultValue={initialQuery} />
        </div>
      </div>
    </section>
  );
}
