import { NextRequest, NextResponse } from "next/server";
import MongoDB from "@/lib/infrastructure/mongodb";
import { GeminiService } from "@/lib/infrastructure/gemini";
import { ApiResponse, Summary } from "@/types";
import { ErrorHandler } from "@/lib/shared/error-handler";
import { LRUCache } from "lru-cache";

const cache = new LRUCache({ max: 500, ttl: 1000 * 60 * 60 * 24 });

export async function POST(request: NextRequest): Promise<NextResponse> {
  cache.clear();
  try {
    const { episodeId, title, description } = await request.json();

    if (!episodeId || !title || !description) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const mongodb = MongoDB.getInstance();
    await mongodb.connect();

    if (cache.has(episodeId)) {
      return NextResponse.json({
        success: true,
        data: { summary: cache.get(episodeId) },
        cached: true,
      });
    }

    const existingSummary = await mongodb.summaries.findOne({ episodeId });

    if (existingSummary) {
      cache.set(episodeId, existingSummary.summary);

      return NextResponse.json({
        success: true,
        data: existingSummary,
        cached: true,
      });
    }

    const geminiService = new GeminiService();
    const summaryText = await geminiService.generateSummary(description, title);
    cache.set(episodeId, summaryText);

    const newSummary: Summary = {
      episodeId,
      summary: summaryText,
      createdAt: new Date(),
    };

    const result = await mongodb.summaries.insertOne(newSummary);
    newSummary._id = result.insertedId.toString();

    return NextResponse.json({
      success: true,
      data: newSummary,
      cached: false,
    });
  } catch (error) {
    ErrorHandler.logError({
      error,
      context: "Summary API",
    });

    const response: ApiResponse<Summary> = {
      success: false,
      error: "Failed to generate summary",
    };

    return NextResponse.json(response, { status: 500 });
  }
}
