import { useState, useEffect, useCallback } from "react";
import { getEpisodes } from "@/lib/api/episodes";
import { Episode, ApiResponse } from "@/types";

export function useEpisodes(
  query: string,
  page: number,
  genreId?: number | null
) {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEpisodes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data: ApiResponse<Episode[]> = await getEpisodes(
        query,
        page,
        genreId
      );
      setEpisodes(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch episodes");
    } finally {
      setLoading(false);
    }
  }, [query, page, genreId]);

  useEffect(() => {
    fetchEpisodes();
  }, [fetchEpisodes]);

  return { episodes, loading, error, refetch: fetchEpisodes };
}
