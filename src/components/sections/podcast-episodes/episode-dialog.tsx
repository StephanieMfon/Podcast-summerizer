"use client";

import { EpisodeDialogProps } from "@/types";
import { Button } from "@/components/ui/button";
import { Clock, Loader2, Star, Sparkles } from "lucide-react";
import { useState } from "react";

import { formatDuration } from "@/lib/shared/text-formatter";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PodcastThumbnail from "@/components/ui/podcast_thumbnail";
import { SummaryDisplay } from "@/components/ui/summary-display";

export function EpisodeDialog({
  episode,
  onSummarize,
  summaries,
  trigger,
}: EpisodeDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  const handleSummarize = async () => {
    setIsLoading(true);
    setSummaryError(null);

    try {
      await onSummarize(episode);
    } catch (err) {
      setSummaryError(
        err instanceof Error ? err.message : "Failed to generate summary"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="bg-[#0a0f1c] sm:max-w-[425px]  border-gray-800 max-h-[85vh] overflow-y-auto">
        <div className="flex gap-4">
          <div className="w-20 flex-shrink-0">
            <PodcastThumbnail
              src={episode.thumbnail}
              alt={episode.title}
              className=""
            />
            {episode.trending && (
              <div className="absolute -top-2 -right-2 bg-orange-500 rounded-full p-1">
                <Star className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <DialogTitle className="text-md font-semibold text-white group-hover:text-purple-300 transition-colors">
              {episode.title}
            </DialogTitle>
            <DialogDescription className="text-gray-300 text-sm mt-2">
              {episode.publisher}
            </DialogDescription>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{formatDuration(episode.audio_length_sec)}</span>
          </div>
        </div>

        <div
          className="text-gray-300 break-words overflow-hidden [&_a]:text-blue-400 [&_a]:underline [&_a:hover]:text-blue-300"
          dangerouslySetInnerHTML={{ __html: episode.description }}
          suppressHydrationWarning={true}
        />

        <Button
          onClick={handleSummarize}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 transition-all duration-200 group mt-auto"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              <span className="animate-pulse">Generating Summary...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
              Summarize
            </>
          )}
        </Button>

        {summaryError && (
          <div className="text-red-400 text-sm p-2 bg-red-950/50 border border-red-800 rounded flex items-center justify-between">
            <span>{summaryError}</span>
            <button
              onClick={handleSummarize}
              className="ml-2 text-xs underline hover:no-underline"
            >
              Retry
            </button>
          </div>
        )}

        {summaries.has(episode.id) && (
          <div className="overflow-y-auto flex-1 border-t border-gray-800 mt-2">
            <SummaryDisplay
              summary={summaries.get(episode.id)!}
              episodeTitle={episode.title}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
