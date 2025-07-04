import { ApiResponse, Episode } from "@/types";

export async function getEpisodes(
  query: string,
  page: number,
  genreId?: number | null
): Promise<ApiResponse<Episode[]>> {
  const offset = (page - 1) * 10;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const url = `${baseUrl}/api/episodes?q=${encodeURIComponent(
    query
  )}&offset=${offset}&genre_id=${genreId ?? ""}`;

  const response = await fetch(url, {
    cache: "no-store",
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch episodes");
  }

  return response.json();
}
