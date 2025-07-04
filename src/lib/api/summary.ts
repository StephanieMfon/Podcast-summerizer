import { ApiResponse, Summary } from "@/types";

export async function summarizeEpisode(
  episodeId: string,
  title: string,
  description: string
): Promise<ApiResponse<Summary>> {
  const response = await fetch("/api/summary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ episodeId, title, description }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate summary");
  }

  return response.json();
}
