import { z } from "zod";

export const episodeSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  publisher: z.string().min(1),
  thumbnail: z.string().url().optional(),
  audio: z.string().url().optional(),
  audio_length_sec: z.number().min(0),
  pub_date_ms: z.number().min(0),
});

export const summaryRequestSchema = z.object({
  episodeId: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1).max(5000),
});

export function validateEpisode(data: unknown) {
  return episodeSchema.safeParse(data);
}

export function validateSummaryRequest(data: unknown) {
  return summaryRequestSchema.safeParse(data);
}
