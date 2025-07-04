import { NextRequest, NextResponse } from "next/server";
import { ListenNotesService } from "@/lib/infrastructure/listen-notes";
import { ApiResponse, Episode } from "@/types";
import { ErrorHandler } from "@/lib/shared/error-handler";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.trim() || "podcast";
    const offset = searchParams.get("offset");
    const genreId = searchParams.get("genre_id");

    const listenNotesService = new ListenNotesService();
    const episodes = await listenNotesService.getEpisodes({
      query,
      offset,
      genreId,
    });

    const response: ApiResponse<Episode[]> = {
      success: true,
      data: episodes,
    };

    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    ErrorHandler.logError({
      error,
      context: "Episode API",
    });
    const response: ApiResponse<Episode[]> = {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };

    return NextResponse.json(response, { status: 500 });
  }
}
