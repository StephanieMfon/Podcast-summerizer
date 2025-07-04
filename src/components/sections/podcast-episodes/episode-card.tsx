"use client";

import { EpisodeCardProps } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock } from "lucide-react";

import { formatDuration } from "@/lib/shared/text-formatter";
import { EpisodeDialog } from "./episode-dialog";
import { Button } from "@/components/ui/button";
import PodcastThumbnail from "@/components/ui/podcast_thumbnail";

export function EpisodeCard({
  episode,
  onSummarize,
  summaries,
}: EpisodeCardProps) {
  return (
    <EpisodeDialog
      episode={episode}
      onSummarize={onSummarize}
      summaries={summaries}
      trigger={
        <Card className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-300 hover:transform hover:scale-[1.02] group h-59 flex justify-start flex-col pt-3 px-0 cursor-pointer">
          <CardHeader className="flex min-h-15 flex-shrink-0 px-3 gap-2">
            <div className="flex gap-2">
              <div className="flex-shrink-0">
                <PodcastThumbnail
                  src={episode.thumbnail}
                  alt={episode.title}
                  className=""
                />

                <div className="text-sm text-gray-500 mt-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{formatDuration(episode.audio_length_sec)}</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-md font-semibold text-white group-hover:text-purple-300 transition-colors line-clamp-3">
                  {episode.title}
                </CardTitle>
                <CardDescription className="text-gray-400 text-sm mt-2">
                  {episode.publisher}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-1 flex-1 flex flex-col px-3">
            <div>
              <p
                className="text-gray-400 text-decoration-line text-sm line-clamp-2 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: episode.description }}
                suppressHydrationWarning={true}
              />
            </div>
            <Button
              variant="link"
              className="text-gray-400 p-0 h-auto text-sm self-start"
            >
              view more
            </Button>
          </CardContent>
        </Card>
      }
    />
  );
}
