import { Episode, GetEpisodesParams } from "@/types";

export class ListenNotesService {
  private readonly apiKey: string | undefined;
  // TODO: update listen notes dummy API
  private readonly baseUrl = "https://listen-api-test.listennotes.com/api/v2";

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_LISTEN_NOTES_API_KEY;
  }

  async getEpisodes({
    query = "podcast",
    offset,
    genreId,
  }: GetEpisodesParams): Promise<Episode[]> {
    console.log(genreId);
    try {
      const response = await fetch(
        `${this.baseUrl}/search?q=${encodeURIComponent(
          query
        )}&type=episode&len_min=10&len_max=60&offset=${offset}&sort_by_date=0&safe_mode=1&genre_ids=${genreId}`,
        {
          headers: {
            "X-ListenAPI-Key": this.apiKey as string,
          },
        }
      );

      if (!response.ok) {
        console.log(response);
        throw new Error(`Listen Notes API error: ${response.status}`);
      }

      const data = await response.json();
      return data.results.map(this.transformEpisode);
    } catch (error) {
      console.error("Listen Notes API error:", error);
      throw new Error("Failed to fetch episodes");
    }
  }

  private transformEpisode(episode: {
    id: string;
    title_original?: string;
    title_highlighted?: string;
    description_original?: string;
    description_highlighted?: string;
    podcast?: { publisher_original?: string };
    thumbnail?: string;
    image?: string;
    audio?: string;
    audio_length_sec?: number;
    pub_date_ms?: number;
  }): Episode {
    return {
      id: episode.id,
      title:
        episode.title_original ||
        episode.title_highlighted ||
        "Untitled Episode",
      description:
        episode.description_original || episode.description_highlighted || "",
      publisher: episode.podcast?.publisher_original || "Unknown Publisher",
      thumbnail:
        episode.thumbnail || episode.image || "/placeholder-podcast.jpg",
      audio: episode.audio || "",
      audio_length_sec: episode.audio_length_sec || 0,
      pub_date_ms: episode.pub_date_ms || Date.now(),
    };
  }
}
