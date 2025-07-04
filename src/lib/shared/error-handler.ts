import { ErrorLogData } from "@/types";

export class ErrorHandler {
  static logError({
    error,
    context,

    timestamp = new Date(),
  }: ErrorLogData): void {
    const errorDetails = {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      context,
      timestamp: timestamp.toISOString(),
    };

    console.error("Application Error:", errorDetails);
  }

  static getPublicMessage(error: unknown): string {
    if (error instanceof Error) {
      switch (error.message) {
        case "SUMMARY_FAILED":
          return "Unable to generate summary right now";
        case "RATE_LIMITED":
          return "Too many requests. Please try again in a moment";
        case "INVALID_INPUT":
          return "Please check your input and try again";
      }
    }

    return "Something went wrong. Please try again later";
  }
}
